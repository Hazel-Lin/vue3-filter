/**
 * @description 选项枚举
 * @enum {string}
 * 介于：BETWEEN
 * 包含：CONTAINS
 * 不包含：NOT_CONTAINS
 * 小于等于：LESS_THAN_AND_EQUAL
 * 大于等于：MORE_THAN_AND_EQUAL
 * 大于：MORE_THAN
 * 小于：LESS_THAN
 */
export const Operator = {
  BETWEEN: 'BETWEEN',
  CONTAINS: 'CONTAINS',
  NOT_CONTAINS: 'NOT_CONTAINS',
  LESS_THAN_AND_EQUAL: 'LESS_THAN_AND_EQUAL',
  MORE_THAN_AND_EQUAL: 'MORE_THAN_AND_EQUAL',
  MORE_THAN: 'MORE_THAN',
  LESS_THAN: 'LESS_THAN',
} as const

export type TOperator = typeof Operator[keyof typeof Operator]

export const OperatorZh: Record<TOperator, string> = {
  BETWEEN: '介于',
  CONTAINS: '包含',
  NOT_CONTAINS: '不包含',
  LESS_THAN_AND_EQUAL: '小于等于',
  MORE_THAN_AND_EQUAL: '大于等于',
  MORE_THAN: '大于',
  LESS_THAN: '小于',
}

export enum Format {
  SELECT = 'select',
  DATE_PICKER = 'datePicker',
  INPUT = 'input',
  CHECKBOX = 'checkbox',
}

export enum ClassName {
  STRING = 'string',
  OPTION = 'option',
  STATUS = 'status',
  DATE_TIME = 'dateTime',
  DATE = 'date',
}

export interface Option {
  label: string
  value: string
}

export interface ConditionItem {
  operator: TOperator
  value: string[] | string
  toValue: string | null
  className: ClassName
  format: Format
  label: string
  key: string
  isDefault?: boolean
  shortcuts?: { text: string, value: () => Date[] }[]
  options?: Option[] | (() => Promise<Option[]>)
}

export type SimpleConditionItem = Pick<ConditionItem, 'label' | 'key' | 'operator' | 'value' | 'format' | 'options'>

export type SelectedCondition = Pick<ConditionItem, 'label' | 'key'>
