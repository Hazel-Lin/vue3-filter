/*
* 字段定义
* 标题：subject
* 优先级：priority
* 状态：status
*/
import type { ConditionItem, SelectedCondition, SimpleConditionItem } from '~/types'
import { allConditionMap, allConditionOptions } from '~/utils'
import { OperatorZh } from '~/types'

export function useFilter() {
  const selectedConditionList = ref<ConditionItem[]>([])
  const unselectedConditionList = ref<SelectedCondition[]>([])
  const checkList = ref<string[]>([])
  const conditionList = ref<SimpleConditionItem[]>([])

  function getUnselectedConditionList() {
    const selectedKeys = selectedConditionList.value.map(item => item.key)
    unselectedConditionList.value = allConditionOptions.value.filter(item => !selectedKeys.includes(item.key))
  }

  function save(list: Ref<string[]>) {
    list.value.forEach((key) => {
      const item = allConditionMap.value[key]
      selectedConditionList.value.push(item)
    })
    unselectedConditionList.value = unselectedConditionList.value.filter(item => !list.value.includes(item.key))
    list.value = []
  }

  function removeCondition(key: string) {
    selectedConditionList.value = selectedConditionList.value.filter(item => item.key !== key)
    unselectedConditionList.value.push({
      label: allConditionMap.value[key].label,
      key,
    })
  }

  function handleFilter() {
    return selectedConditionList.value.map(item => ({
      label: item.label,
      key: item.key,
      operator: item.operator,
      value: item.value,
      options: item.options || [],
    }))
  }

  function getDefaultCondition() {
    const defaultConditionList = Object.values(allConditionMap.value).filter((condition: ConditionItem) => condition.isDefault).map((condition: ConditionItem) => ({
      ...condition,
    }))
    selectedConditionList.value = defaultConditionList
  }

  function handleReset() {
    getDefaultCondition()
    getUnselectedConditionList()
    conditionList.value = []
  }

  function handleFilterFn() {
    const filtered = handleFilter().filter((item) => {
      if (Array.isArray(item.value)) {
        return item.value.length > 0
      }
      return item.value !== '' && item.value !== null && item.value !== undefined
    })
    conditionList.value = filtered
  }

  function getConditionListDisplay(condition: SimpleConditionItem) {
    if (Array.isArray(condition.value)) {
      const values = condition.value.map(val => condition.options?.find(option => option.value === val)?.label).join(', ')
      return `${condition.label} ${OperatorZh[condition.operator]} '${values}'`
    }
    return `${condition.label} ${OperatorZh[condition.operator]} '${condition.value}'`
  }

  function removeConditionValue(key: string) {
    const condition = selectedConditionList.value.find(item => item.key === key)
    if (condition) {
      condition.value = ''
      conditionList.value = conditionList.value.filter(item => item.key !== key)
    }
  }

  onMounted(() => {
    getDefaultCondition()
    getUnselectedConditionList()
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
    handleFilterFn,
    getConditionListDisplay,
    removeConditionValue,
    handleReset,
    getDefaultCondition,
  }
}
