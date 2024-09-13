import { beforeEach, describe, expect, it } from 'vitest'
import { useFilter } from '~/composables/useFilter'
import type { ConditionItem, SimpleConditionItem } from '~/types'
import { Format, Operator } from '~/types'
import { allConditionMap } from '~/utils'

describe('useFilter composable', () => {
  let filter: ReturnType<typeof useFilter>

  // actually, I get unselectedConditionList in onMounted, but it's not work
  // so why I need beforeEach to get unselectedConditionList

  beforeEach(() => {
    filter = useFilter()
    filter.setDefaultConditions()
    filter.getUnselectedConditionList()
  })

  // 打开弹窗后，获取未选条件
  it('should get unselected condition list', () => {
    expect(filter.unselectedConditionList.value).toEqual([
      { label: '状态', key: 'status' },
      { label: '创建时间', key: 'createdAt' },
    ])
  })

  // 保存条件
  it('should add selected items to selectedConditionList and remove them from unselectedConditionList', () => {
    const list = ref(['status'])
    filter.save(list)
    const selectedList = filter.selectedConditionList.value.map((condition: ConditionItem) => condition.key).map((key: string) => allConditionMap.value[key])

    expect(filter.selectedConditionList.value).toEqual(selectedList)

    expect(filter.unselectedConditionList.value).toEqual([
      { label: '创建时间', key: 'createdAt' },
    ])

    expect(list.value).toEqual([])
  })

  // 测试未选条件为空的情况

  it('should not add items to selectedConditionList when checkList is empty', () => {
    const checkList = ref([])
    filter.save(checkList)

    expect(filter.selectedConditionList.value).toEqual([
      allConditionMap.value.name,
      allConditionMap.value.priority,
    ])

    expect(filter.unselectedConditionList.value).toEqual([
      { label: '状态', key: 'status' },
      { label: '创建时间', key: 'createdAt' },
    ])

    expect(checkList.value).toEqual([])
  })

  it('should remove condition', () => {
    filter.removeCondition('priority')

    expect(filter.selectedConditionList.value).toEqual([
      allConditionMap.value.name,
    ])
    expect(filter.unselectedConditionList.value).toEqual([
      { label: '状态', key: 'status' },
      { label: '创建时间', key: 'createdAt' },
      { label: '优先级', key: 'priority' },
    ])
  })
  // 点击过滤按钮，输出正确的筛选条件值
  it('should output correct conditions when click filter button', () => {
    filter.selectedConditionList.value[0].value = '123'
    filter.handleFilter()

    expect(filter.conditionList.value).toEqual([
      {
        label: '标题',
        key: 'name',
        operator: 'CONTAINS',
        value: '123',
        options: [],
        format: Format.INPUT,
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
      { label: '创建时间', key: 'createdAt' },
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
      { label: '创建时间', key: 'createdAt' },
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
      { label: '创建时间', key: 'createdAt' },
    ])
    expect(filter.conditionList.value).toEqual([])
  })
  it('should get condition list display', () => {
    const condition: SimpleConditionItem = {
      label: '标题',
      key: 'status',
      operator: Operator.CONTAINS,
      value: '123',
      format: Format.INPUT,
    }
    const display = '标题 包含 \'123\''
    expect(filter.getConditionListDisplay(condition)).toEqual(display)
    const condition2: SimpleConditionItem = {
      label: '优先级',
      key: 'priority',
      operator: Operator.CONTAINS,
      format: Format.CHECKBOX,
      value: ['high', 'low'],
      options: [
        {
          label: '紧急',
          value: 'urgent',
        },
        {
          label: '高',
          value: 'high',
        },
        {
          label: '中',
          value: 'middle',
        },
        {
          label: '低',
          value: 'low',
        },
        {
          label: '无关紧要',
          value: 'insignificant',
        },
      ],
    }
    const display2 = '优先级 包含 \'高, 低\''
    expect(filter.getConditionListDisplay(condition2)).toEqual(display2)
    const condition3: SimpleConditionItem = {
      label: '创建时间',
      key: 'createdAt',
      operator: Operator.BETWEEN,
      value: ['2024-09-11 00:00:00', '2024-09-12 00:00:00'],
      format: Format.DATE_PICKER,
    }
    const display3 = '创建时间 介于 \'2024-09-11 00:00:00, 2024-09-12 00:00:00\''
    expect(filter.getConditionListDisplay(condition3)).toEqual(display3)
  })
  it('should remove condition value', () => {
    filter.conditionList.value = [
      {
        label: '标题',
        key: 'name',
        operator: Operator.CONTAINS,
        value: '123',
        options: [],
        format: Format.INPUT,
      },
    ]
    filter.removeConditionValue('name')
    expect(filter.conditionList.value).toEqual([])
    const condition = filter.selectedConditionList.value.find((condition: ConditionItem) => condition.key === 'name')
    expect(condition?.value).toEqual('')
  })
  // 添加一个状态选项，点击过滤后，清空数据，再次添加条件，发现之前添加的条件还在
  it('should reset value of all conditions when click clear button', () => {
    // 添加一个状态选项
    filter.save(ref(['status']))

    expect(filter.selectedConditionList.value).toEqual([
      allConditionMap.value.name,
      allConditionMap.value.priority,
      allConditionMap.value.status,
    ])
    //  状态选中值
    filter.selectedConditionList.value[2].value = ['new']
    // 点击过滤
    filter.handleFilter()

    expect(filter.conditionList.value).toEqual([
      {
        label: '状态',
        key: 'status',
        operator: Operator.CONTAINS,
        format: Format.SELECT,
        value: ['new'],
        options: [
          {
            label: '新',
            value: 'new',
          },
          {
            label: '接受/处理',
            value: 'in_progress',
          },
          {
            label: '已分配',
            value: 'assigned',
          },
          {
            label: '已解决',
            value: 'resolved',
          },
          {
            label: '已验证',
            value: 'verified',
          },
          {
            label: '重新打开',
            value: 'reopened',
          },
          {
            label: '已拒绝',
            value: 'rejected',
          },
          {
            label: '已关闭',
            value: 'closed',
          },
          {
            label: '挂起',
            value: 'suspended',
          },
        ],
      },
    ])
    const display = '状态 包含 \'新\''
    expect(filter.getConditionListDisplay(filter.conditionList.value[0])).toEqual(display)
    // 点击清空 恢复到初始状态
    filter.handleReset()

    expect(filter.conditionList.value).toEqual([])
    expect(filter.selectedConditionList.value).toEqual(
      Object.values(allConditionMap.value).filter((condition: ConditionItem) => condition.isDefault),
    )
    // 再次添加条件
    filter.save(ref(['status']))
    expect(filter.selectedConditionList.value).toEqual([
      allConditionMap.value.name,
      allConditionMap.value.priority,
      allConditionMap.value.status,
    ])
    expect(filter.selectedConditionList.value[2].value).toEqual([])
  })
})
