import type { ConditionItem, Option } from '~/types'
import { ClassName, Format, Operator } from '~/types'
import { priorityOptions, statusOptions } from './constant'

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

// 通用的异步函数来获取选项
export async function getList(param: any = {}): Promise<Option[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          label: `男${param.name}`,
          value: 'male',
        },
        {
          label: '女',
          value: 'female',
        },
      ])
    }, 200)
  })
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
    options: priorityOptions,
  },
  status: {
    label: '状态',
    key: 'status',
    operator: Operator.CONTAINS,
    value: [],
    toValue: null,
    className: ClassName.STATUS,
    format: Format.SELECT,
    options: statusOptions,
    isDefault: true,
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
  test: {
    label: '测试',
    key: 'test',
    operator: Operator.CONTAINS,
    isDefault: true,
    value: '',
    toValue: null,
    className: ClassName.STRING,
    format: Format.SELECT,
    options: async (param: any = {}): Promise<Option[]> => {
      return await getList(param)
    },
  },
})
