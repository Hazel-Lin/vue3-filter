import { Filter } from '@element-plus/icons-vue'
import { ElIcon } from 'element-plus'
import { defineComponent, onMounted, ref } from 'vue'
import FilterWrap from '~/components/FilterWrap'

export default defineComponent({
  setup() {
    const isFilterVisible = ref(true)
    const filterWrapRef = ref<InstanceType<typeof FilterWrap> | null>(null) // 使用类型断言

    const toggleFilter = () => {
      isFilterVisible.value = !isFilterVisible.value
    }

    onMounted(() => {
      filterWrapRef.value?.updateOptionsParam('test', { someKey: 'someValue' })
    })

    return () => (
      <>
        <ElIcon onClick={toggleFilter}>
          <Filter />
        </ElIcon>
        {isFilterVisible.value && <FilterWrap ref={filterWrapRef} />}
      </>
    )
  },
})
