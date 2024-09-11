// 编写 filter 组件测试用例
/**
 * 渲染成功
 * 初始化条件：标题、优先级、状态、工作项类型、创建时间、创建人
 * 单个条件点击删除按钮 删除单一条件
 * 点击添加按钮 打开弹窗勾选条件 点击保存按钮 添加条件
 */
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Filter from '../src/components/Filter.vue'

describe('filter.vue', () => {
  it('should render', () => {
    const wrapper = mount(Filter, { props: { initial: 10 } })
    expect(wrapper.text()).toContain('10')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should be interactive', async () => {
    const wrapper = mount(Filter, { props: { initial: 0 } })
    expect(wrapper.text()).toContain('0')

    expect(wrapper.find('.inc').exists()).toBe(true)

    await wrapper.get('button').trigger('click')

    expect(wrapper.text()).toContain('1')
  })
})
