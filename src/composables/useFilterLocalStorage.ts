/*
* 字段定义
* 标题：name
* 优先级：priority
* 状态：status
*/
import { useLocalStorage } from '@vueuse/core'
import type { ConditionItem, SelectedCondition, SimpleConditionItem } from '~/types'
import { Format, OperatorZh } from '~/types'
import { allConditionMap } from '~/utils'

export function useFilter() {
  // 使用 useLocalStorage 来持久化存储选中的条件列表
  const selectedConditionList = useLocalStorage<ConditionItem[]>('selectedConditionList', [])
  const unselectedConditionList = ref<SelectedCondition[]>([])
  const checkList = ref<string[]>([])
  const conditionList = useLocalStorage<SimpleConditionItem[]>('conditionList', [])

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

  function save(list: Ref<string[]>) {
    const newSelectedKeys = new Set(list.value)

    selectedConditionList.value.push(
      ...list.value.map(key => allConditionMap.value[key]),
    )

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
    // 不需要手动保存，useLocalStorage 会自动同步到 localStorage
  }

  /**
   * 设置默认条件列表
   * @throws {Error} 如果 allConditionMap 为空
   */
  function setDefaultConditions(): void {
    if (!allConditionMap.value || Object.keys(allConditionMap.value).length === 0) {
      throw new Error('allConditionMap is empty')
    }

    // 只有在 selectedConditionList 为空时才设置默认条件
    if (selectedConditionList.value.length === 0) {
      selectedConditionList.value = Object.values(allConditionMap.value)
        .filter((condition): condition is ConditionItem & { isDefault: true } =>
          condition.isDefault === true,
        )
        .map(condition => ({ ...condition }))
    }
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
    // 重置后，更新 localStorage
    localStorage.removeItem('selectedConditionList')
    localStorage.removeItem('conditionList')
  }

  function getConditionListDisplay(condition: SimpleConditionItem) {
    const { label, operator, value, format, options } = condition
    const operatorZh = OperatorZh[operator]

    if (format === Format.DATE_PICKER && Array.isArray(value) && value.length === 2) {
      const [start, end] = value
      return `${label} ${operatorZh} '${start}, ${end}'`
    }

    if (Array.isArray(value)) {
      const valueLabels = value
        .map(val => options?.find(option => option.value === val)?.label)
        .filter(Boolean)
        .join(', ')
      return `${label} ${operatorZh} '${valueLabels}'`
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

  onMounted(() => {
    setDefaultConditions()
    getUnselectedConditionList()
    // 如果 localStorage 中有保存的条件，则使用保存的条件
    if (selectedConditionList.value.length > 0) {
      handleFilter()
    }
  })

  return {
    selectedConditionList,
    unselectedConditionList,
    checkList,
    conditionList,
    getUnselectedConditionList,
    save,
    removeCondition,
    handleFilter,
    getConditionListDisplay,
    removeConditionValue,
    handleReset,
    setDefaultConditions,
  }
}
