<script setup lang="ts">
import type { ConditionItem } from '~/types'

const { item } = defineProps<{
  item: ConditionItem
}>()

const selectedValue = defineModel<string | string[]>()
const options = computed(() => item.options)
const isMultiple = computed(() => Array.isArray(selectedValue.value))
</script>

<template>
  <el-select
    v-model="selectedValue"
    :placeholder="`请选择${item.label}`"
    class="flex-1"
    :multiple="isMultiple"
    clearable
  >
    <el-option
      v-for="option in options"
      :key="option.value"
      :label="option.label"
      :value="option.value"
    />
  </el-select>
</template>
