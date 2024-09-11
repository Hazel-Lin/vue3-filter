/**
 * @fileoverview Type definitions for the application.
 * 类型定义：选项枚举 | 接口入参 | 接口返回值 | 界面渲染数据
 *
 */
export const condition = [
  [
    {
      fieldIdentifier: 'subject',
      operator: 'CONTAINS',
      value: [
        'test',
      ],
      toValue: null,
      className: 'string',
      format: 'input',
    },
    {
      fieldIdentifier: 'priority',
      operator: 'CONTAINS',
      value: [
        'b35be8b9bf82273ec9d79b270f',
      ],
      toValue: null,
      className: 'option',
      format: 'list',
    },
    {
      fieldIdentifier: 'status',
      operator: 'CONTAINS',
      value: [
        '100005',
      ],
      toValue: null,
      className: 'status',
      format: 'list',
    },
    {
      fieldIdentifier: 'workitemType',
      operator: 'CONTAINS',
      value: [
        '9uy29901re573f561d69jn40',
      ],
      toValue: null,
      className: 'workitemType',
      format: 'list',
    },
    {
      fieldIdentifier: 'creator',
      operator: 'CONTAINS',
      value: [
        '625e27767e8dbc28d806e4f6',
      ],
      toValue: null,
      className: 'user',
      format: 'list',
    },
    {
      fieldIdentifier: 'gmtCreate',
      operator: 'BETWEEN',
      value: [
        '2024-10-07 00:00:00',
      ],
      toValue: '2024-10-08 23:59:59',
      className: 'dateTime',
      format: 'input',
    },
  ],
]
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
  CONTAINS = 'CONTAINS',
  BETWEEN = 'BETWEEN',
  LESS_THAN_AND_EQUAL = 'LESS_THAN_AND_EQUAL',
  MORE_THAN = 'MORE_THAN',
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

export interface Condition {
  fieldIdentifier: string
  operator: Operator
  value: string[]
  toValue: string | null
  className: ClassName
  format: Format
}
