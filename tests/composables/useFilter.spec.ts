import { beforeEach, describe, expect, it } from 'vitest'
import { useFilter } from '~/composables/useFilter'
import type { ConditionItem, SimpleConditionItem } from '~/types'
import { Operator } from '~/types'
import { allConditionMap } from '~/utils'

describe('useFilter composable', () => {
  let filter: ReturnType<typeof useFilter>

  // actually, I get unselectedConditionList in onMounted, but it's not work
  // so why I need beforeEach to get unselectedConditionList

  beforeEach(() => {
    filter = useFilter()
    filter.getDefaultCondition()
    filter.getUnselectedConditionList()
  })

  // 打开弹窗后，获取未选条件
  it('should get unselected condition list', () => {
    expect(filter.unselectedConditionList.value).toEqual([
      { label: '状态', key: 'status' },
    ])
  })

  // 保存条件
  it('should add selected items to selectedConditionList and remove them from unselectedConditionList', () => {
    const list = ref(['status'])
    filter.save(list)

    expect(filter.selectedConditionList.value).toEqual(Object.values(allConditionMap.value))

    expect(filter.unselectedConditionList.value).toEqual([])

    expect(list.value).toEqual([])
  })

  // 测试未选条件为空的情况

  it('should not add items to selectedConditionList when checkList is empty', () => {
    const checkList = ref([])
    filter.save(checkList)

    expect(filter.selectedConditionList.value).toEqual([
      {
        label: '标题',
        key: 'subject',
        operator: 'CONTAINS',
        value: '',
        toValue: null,
        className: 'string',
        format: 'input',
        fieldIdentifier: 'subject',
        isDefault: true,
      },
      {
        key: 'priority',
        label: '优先级',
        operator: 'CONTAINS',
        value: [],
        toValue: null,
        className: 'option',
        format: 'list',
        fieldIdentifier: 'priority',
        isDefault: true,
        options: [
          { label: '高', value: 'high' },
          { label: '中', value: 'middle' },
          { label: '低', value: 'low' },
        ],
      },
    ])

    expect(filter.unselectedConditionList.value).toEqual([
      { label: '状态', key: 'status' },
    ])

    expect(checkList.value).toEqual([])
  })

  it('should remove condition', () => {
    filter.removeCondition('priority')
    expect(filter.selectedConditionList.value).toEqual([
      {
        label: '标题',
        key: 'subject',
        operator: 'CONTAINS',
        value: '',
        toValue: null,
        className: 'string',
        format: 'input',
        fieldIdentifier: 'subject',
        isDefault: true,
      },
    ])
    expect(filter.unselectedConditionList.value).toEqual([
      { label: '状态', key: 'status' },
      { label: '优先级', key: 'priority' },
    ])
  })
  // 点击过滤按钮，输出正确的筛选条件值
  it('should output correct conditions when click filter button', () => {
    filter.selectedConditionList.value[0].value = '123'
    const result = filter.handleFilter()

    expect(result).toEqual([
      {
        label: '标题',
        key: 'subject',
        operator: 'CONTAINS',
        value: '123',
        options: [],
      },
      {
        label: '优先级',
        key: 'priority',
        operator: 'CONTAINS',
        value: [],
        options: [
          { label: '高', value: 'high' },
          { label: '中', value: 'middle' },
          { label: '低', value: 'low' },
        ],
      },
    ])
  })

  // 点击重置按钮
  // 添加选项后重置
  // 输入值之后重置
  it('should reset to default conditions when add condition', () => {
    // 添加选项后重置
    const list = ref(['status'])
    filter.save(list)
    filter.handleReset()
    expect(filter.selectedConditionList.value).toEqual(
      Object.values(allConditionMap.value).filter((condition: ConditionItem) => condition.isDefault),
    )
    expect(filter.unselectedConditionList.value).toEqual([
      { label: '状态', key: 'status' },
    ])
  })
  it('should reset to default conditions when input value', () => {
    // 输入值之后重置
    filter.selectedConditionList.value[0].value = '123'
    filter.handleReset()
    expect(filter.selectedConditionList.value).toEqual(
      Object.values(allConditionMap.value).filter((condition: ConditionItem) => condition.isDefault),
    )
    expect(filter.unselectedConditionList.value).toEqual([
      { label: '状态', key: 'status' },
    ])
    // 清空对应的值
    filter.selectedConditionList.value[0].value = ''
  })
  it('should reset to default conditions when remove condition', () => {
    filter.removeCondition('priority')
    filter.handleReset()
    expect(filter.selectedConditionList.value).toEqual(
      Object.values(allConditionMap.value).filter((condition: ConditionItem) => condition.isDefault),
    )
    expect(filter.unselectedConditionList.value).toEqual([
      { label: '状态', key: 'status' },
    ])
    expect(filter.conditionList.value).toEqual([])
  })
  it('should get condition list display', () => {
    const condition: SimpleConditionItem = {
      label: '标题',
      key: 'status',
      operator: Operator.CONTAINS,
      value: '123',
    }
    const display = '标题 包含 \'123\''
    expect(filter.getConditionListDisplay(condition)).toEqual(display)
    const condition2: SimpleConditionItem = {
      label: '优先级',
      key: 'priority',
      operator: Operator.CONTAINS,
      value: ['high', 'low'],
      options: [
        { label: '高', value: 'high' },
        { label: '中', value: 'middle' },
        { label: '低', value: 'low' },
      ],
    }
    const display2 = '优先级 包含 \'高, 低\''
    expect(filter.getConditionListDisplay(condition2)).toEqual(display2)
  })
  it('should remove condition value', () => {
    filter.conditionList.value = [
      {
        label: '标题',
        key: 'subject',
        operator: Operator.CONTAINS,
        value: '123',
        options: [],
      },
    ]
    filter.removeConditionValue('subject')
    expect(filter.conditionList.value).toEqual([])
    const condition = filter.selectedConditionList.value.find((condition: ConditionItem) => condition.key === 'subject')
    expect(condition?.value).toEqual('')
  })
})
