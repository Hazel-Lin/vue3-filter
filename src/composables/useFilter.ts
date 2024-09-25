import type { ConditionItem, SelectedCondition, SimpleConditionItem } from '~/types'
import { Format, OperatorZh } from '~/types'
import { allConditionMap } from '~/utils'

export function useFilter() {
  const selectedConditionList = ref<ConditionItem[]>([])
  const unselectedConditionList = ref<SelectedCondition[]>([])
  const checkList = ref<string[]>([])
  const conditionList = ref<SimpleConditionItem[]>([])

  const allConditionOptions = computed(() => Object.values(allConditionMap.value).map(({ label, key }: ConditionItem) => ({
    label,
    key,
  })))

  /**
   * 检查值是否有效（非空数组或非空值）
   * @param value - 要检查的值
   * @returns 值是否有效
   */
  function isValidValue(value: unknown): boolean {
    if (Array.isArray(value)) {
      return value.length > 0
    }
    else if (typeof value === 'string') {
      return value.trim() !== ''
    }
    return false
  }

  function getUnselectedConditionList() {
    const selectedKeySet = new Set(selectedConditionList.value.map(item => item.key))
    unselectedConditionList.value = allConditionOptions.value.filter(item => !selectedKeySet.has(item.key))
  }

  async function save(list: Ref<string[]>) {
    const newSelectedKeys = new Set(list.value)

    for (const key of list.value) {
      const condition = allConditionMap.value[key]
      if (typeof condition.options === 'function') {
        const options = await fetchOptions(key, condition.options)
        selectedConditionList.value.push({
          ...condition,
          options,
        })
      }
      else {
        selectedConditionList.value.push(condition)
      }
    }

    unselectedConditionList.value = unselectedConditionList.value.filter(
      item => !newSelectedKeys.has(item.key),
    )

    list.value = []
  }

  function removeCondition(key: string) {
    const removedCondition = selectedConditionList.value.find(item => item.key === key)

    if (removedCondition) {
      selectedConditionList.value = selectedConditionList.value.filter(item => item.key !== key)
      unselectedConditionList.value.push({
        label: removedCondition.label,
        key,
      })
    }
  }

  function handleFilter() {
    conditionList.value = selectedConditionList.value
      .filter(({ value }) => isValidValue(value))
      .map(({ label, key, operator, value, format, options }) => ({
        label,
        key,
        operator,
        value,
        format,
        options: options ?? [],
      }))
  }

  // 清空所有选中条件的值
  function resetAllConditions() {
    selectedConditionList.value.forEach((item) => {
      item.value = Array.isArray(item.value) ? [] : ''
    })

    conditionList.value = []
  }
  function handleReset() {
    resetAllConditions()
    setDefaultConditions()
    getUnselectedConditionList()
  }

  function getConditionListDisplay(condition: SimpleConditionItem) {
    const { label, operator, value, format, options } = condition
    const operatorZh = OperatorZh[operator]

    if (format === Format.DATE_PICKER && Array.isArray(value) && value.length === 2) {
      const [start, end] = value
      return `${label} ${operatorZh} '${start}, ${end}'`
    }

    if (format === Format.SELECT) {
      let valueLabels: string
      if (Array.isArray(options)) {
        if (Array.isArray(value)) {
          valueLabels = value
            .map(val => options.find(option => option.value === val)?.label)
            .filter((label): label is string => label !== undefined)
            .join(', ')
        }
        else {
          valueLabels = options.find(option => option.value === value)?.label || ''
        }
      }
      else {
        valueLabels = ''
      }
      return `${label} ${operatorZh} '${valueLabels}'`
    }
    if (format === Format.CHECKBOX) {
      if (Array.isArray(options)) {
        if (Array.isArray(value)) {
          const valueLabels = value
            .map(val => options.find(option => option.value === val)?.label)
            .filter((label): label is string => label !== undefined)
            .join(', ')
          return `${label} ${operatorZh} '${valueLabels}'`
        }
      }
    }

    return `${label} ${operatorZh} '${value}'`
  }

  function removeConditionValue(key: string) {
    const condition = selectedConditionList.value.find(item => item.key === key)
    if (condition) {
      condition.value = ''
      conditionList.value = conditionList.value.filter(item => item.key !== key)
    }
  }
  /**
   * 异步获取选项
   * @param key - 条件的key
   * @param callback - 获取选项的回调函数
   */
  async function fetchOptions(key: string, callback: () => Promise<any>) {
    try {
      return await callback()
    }
    catch (error) {
      console.error(`获取 ${key} 的选项失败:`, error)
    }
  }
  /**
   * 设置默认条件列表
   * @throws {Error} 如果 allConditionMap 为空
   */
  function setDefaultConditions(): void {
    if (!allConditionMap.value || Object.keys(allConditionMap.value).length === 0) {
      throw new Error('allConditionMap is empty')
    }

    selectedConditionList.value = Object.values(allConditionMap.value)
      .filter((condition): condition is ConditionItem & { isDefault: true } =>
        condition.isDefault === true,
      )
      .map(condition => ({ ...condition }))

    selectedConditionList.value.forEach(async (condition) => {
      if (typeof condition.options === 'function') {
        condition.options = await fetchOptions(condition.key, condition.options)
      }
    })
  }
  // 添加一个新的方法来更新 options 的参数
  async function updateOptionsParam(key: string, param: any) {
    const condition = allConditionMap.value[key]
    if (condition && typeof condition.options === 'function') {
      const options = await condition.options(param)
      condition.options = options
      // 如果这个条件已经被选中，我们需要重新获取选项
      const selectedCondition = selectedConditionList.value.find(item => item.key === key)
      if (selectedCondition) {
        selectedCondition.options = options
      }
    }
  }
  onMounted(() => {
    setDefaultConditions()
    getUnselectedConditionList()
  })

  return {
    selectedConditionList,
    unselectedConditionList,
    checkList,
    conditionList,
    fetchOptions,
    getUnselectedConditionList,
    save,
    removeCondition,
    handleFilter,
    getConditionListDisplay,
    removeConditionValue,
    handleReset,
    setDefaultConditions,
    updateOptionsParam,
  }
}
