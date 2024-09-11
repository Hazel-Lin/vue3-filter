/*
* 字段定义
* 标题：subject
* 优先级：priority
* 状态：status
*/

// 轻量的条件选项列表
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
  //  已经选中的条件列表
  const selectedConditionList = ref([
    {
      label: '标题',
      key: 'subject',
      operator: 'CONTAINS',
      value: '',
      toValue: null,
      className: 'string',
      format: 'input',
      fieldIdentifier: 'subject',
    },
    {
      key: 'priority',
      label: '优先级',
      operator: 'CONTAINS',
      value: ['high'],
      toValue: null,
      className: 'option',
      format: 'list',
      fieldIdentifier: 'priority',
    },
  ])
  // 所有选项的 map
  const allConditionMap = ref({
    subject: {
      label: '标题',
      key: 'subject',
      operator: 'CONTAINS',
      value: '',
      toValue: null,
      className: 'string',
      format: 'input',
      fieldIdentifier: 'subject',
    },
    priority: {
      label: '优先级',
      key: 'priority',
      operator: 'CONTAINS',
      value: [],
      toValue: null,
      className: 'option',
      format: 'list',
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
      operator: 'CONTAINS',
      value: [],
      toValue: null,
      className: 'status',
      format: 'list',
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
