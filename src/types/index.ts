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
export enum Operator {
  BETWEEN = 'BETWEEN',
  CONTAINS = 'CONTAINS',
  NOT_CONTAINS = 'NOT_CONTAINS',
  LESS_THAN_AND_EQUAL = 'LESS_THAN_AND_EQUAL',
  MORE_THAN_AND_EQUAL = 'MORE_THAN_AND_EQUAL',
  MORE_THAN = 'MORE_THAN',
  LESS_THAN = 'LESS_THAN',
}

// 中文翻译的枚举
export enum OperatorZh {
  BETWEEN = '介于',
  CONTAINS = '包含',
  NOT_CONTAINS = '不包含',
  LESS_THAN_AND_EQUAL = '小于等于',
  MORE_THAN_AND_EQUAL = '大于等于',
  MORE_THAN = '大于',
  LESS_THAN = '小于',
}

export enum Format {
  INPUT = 'input',
  LIST = 'list',
}

export enum ClassName {
  STRING = 'string',
  OPTION = 'option',
  STATUS = 'status',
  FLOAT = 'float',
  USER = 'user',
  DATE_TIME = 'dateTime',
  DATE = 'date',
}

export interface Option {
  label: string
  value: string
}

export interface ConditionItem {
  fieldIdentifier: string
  operator: Operator
  value: string[] | string
  toValue: string | null
  className: ClassName
  format: Format
  label: string
  key: string
  isDefault?: boolean
  options?: Option[]
}

export interface SimpleConditionItem {
  label: string
  key: string
  operator: Operator
  value: string[] | string
  options?: Option[]
}

export interface SelectedCondition {
  label: string
  key: string
}
