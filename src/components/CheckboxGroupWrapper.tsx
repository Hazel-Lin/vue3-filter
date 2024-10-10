import type { ConditionItem, Option } from '../types'
import { ElCheckbox, ElCheckboxGroup } from 'element-plus'
import { computed, defineComponent } from 'vue'

export default defineComponent({
  name: 'CheckboxGroupWrapper',
  props: {
    item: {
      type: Object as () => ConditionItem,
      required: true,
    },
  },
  setup(props) {
    const inputValue = ref<string[]>([])

    const options = computed<Option[]>(() => {
      if (Array.isArray(props.item.options)) {
        return props.item.options
      }
      return []
    })

    return () => (
      <div class="bg-white h-8 w-full border-box border border-gray-300 rounded-r-1 px-3">
        <ElCheckboxGroup v-model={inputValue.value} class="flex">
          {options.value.map(o => (
            <ElCheckbox key={o.value} label={o.label} value={o.value} />
          ))}
        </ElCheckboxGroup>
      </div>
    )
  },
})
