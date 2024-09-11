/*
* 字段定义
* 标题：subject
* 优先级：priority
* 状态：status
*/

// 轻量的条件选项列表
import { ref } from 'vue'
import type { ConditionItem } from '~/types'
import { ClassName, Format, Operator } from '~/types'

export const allConditionOptions = ref([
  {
    label: '标题',
    key: 'subject',
  },
  {
    label: '优先级',
    key: 'priority',
  },
  {
    label: '状态',
    key: 'status',
  },
])

export function useFilter() {
  // 已经选中的条件列表
  const selectedConditionList = ref<ConditionItem[]>([
    {
      label: '标题',
      key: 'subject',
      operator: Operator.CONTAINS,
      value: [''],
      toValue: null,
      className: ClassName.STRING,
      format: Format.INPUT,
      fieldIdentifier: 'subject',
    },
    {
      key: 'priority',
      label: '优先级',
      operator: Operator.CONTAINS,
      value: ['high'],
      toValue: null,
      className: ClassName.OPTION,
      format: Format.LIST,
      fieldIdentifier: 'priority',
    },
  ])

  // 所有选项的 map
  const allConditionMap = ref<Record<string, ConditionItem>>({
    subject: {
      label: '标题',
      key: 'subject',
      operator: Operator.CONTAINS,
      value: [''],
      toValue: null,
      className: ClassName.STRING,
      format: Format.INPUT,
      fieldIdentifier: 'subject',
    },
    priority: {
      label: '优先级',
      key: 'priority',
      operator: Operator.CONTAINS,
      value: [],
      toValue: null,
      className: ClassName.OPTION,
      format: Format.LIST,
      fieldIdentifier: 'priority',
      options: [
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
      ],
    },
    status: {
      label: '状态',
      key: 'status',
      operator: Operator.CONTAINS,
      value: [],
      toValue: null,
      className: ClassName.STATUS,
      format: Format.LIST,
      fieldIdentifier: 'status',
      options: [
        {
          label: '待确认',
          value: '100001',
        },
        {
          label: '再次打开',
          value: '100002',
        },
        {
          label: '推迟修复',
          value: '100003',
        },
        {
          label: '已确认',
          value: '100004',
        },
        {
          label: '已选择',
          value: '100005',
        },
      ],
    },
  })

  return {
    selectedConditionList,
    allConditionMap,
  }
}
