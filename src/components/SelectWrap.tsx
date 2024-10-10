import type { ConditionItem, Option } from '../types'
import { ElOption, ElSelect } from 'element-plus'
import { computed, defineComponent } from 'vue'

export default defineComponent({
  name: 'SelectWrap',
  props: {
    item: {
      type: Object as () => ConditionItem,
      required: true,
    },
  },
  setup(props) {
    const selectedValue = ref<string | string[]>([])
    const options = computed<Option[]>(() => {
      if (Array.isArray(props.item.options)) {
        return props.item.options
      }
      return []
    })

    const isMultiple = computed(() => Array.isArray(selectedValue.value))

    return () => (
      <ElSelect
        v-model={selectedValue.value}
        placeholder={`请选择${props.item.label}`}
        class="flex-1"
        multiple={isMultiple.value}
        clearable
      >
        {options.value.map(option => (
          <ElOption
            key={option.value}
            label={option.label}
            value={option.value}
          />
        ))}
      </ElSelect>
    )
  },
})
