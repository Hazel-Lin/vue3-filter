import type { ConditionItem } from '~/types'
import { ClassName, Format, Operator } from '~/types'

export function createDateShortcuts(shortcuts = []): { text: string, value: () => Date[] }[] {
  const defaultShortcuts = [
    {
      text: '近一周',
      value: () => {
        const end = new Date()
        const start = new Date()
        start.setDate(start.getDate() - 7)
        return [start, end]
      },
    },
    {
      text: '近一个月',
      value: () => {
        const end = new Date()
        const start = new Date()
        start.setMonth(start.getMonth() - 1)
        return [start, end]
      },
    },
    {
      text: '近三个月',
      value: () => {
        const end = new Date()
        const start = new Date()
        start.setMonth(start.getMonth() - 3)
        return [start, end]
      },
    },
  ]
  return [...defaultShortcuts, ...shortcuts]
}

// 所有选项的 map
export const allConditionMap = ref<Record<string, ConditionItem>>({
  name: {
    label: '标题',
    key: 'name',
    operator: Operator.CONTAINS,
    value: '',
    toValue: null,
    className: ClassName.STRING,
    format: Format.INPUT,
    isDefault: true,
  },
  priority: {
    label: '优先级',
    key: 'priority',
    operator: Operator.CONTAINS,
    value: [],
    toValue: null,
    className: ClassName.OPTION,
    format: Format.CHECKBOX,
    isDefault: true,
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
  },
  status: {
    label: '状态',
    key: 'status',
    operator: Operator.CONTAINS,
    value: [],
    toValue: null,
    className: ClassName.STATUS,
    format: Format.SELECT,
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
  createdAt: {
    label: '创建时间',
    key: 'createdAt',
    operator: Operator.BETWEEN,
    value: '',
    toValue: null,
    className: ClassName.DATE_TIME,
    format: Format.DATE_PICKER,
    shortcuts: createDateShortcuts(),
  },
})
