<script setup lang="ts">
import type { ConditionItem } from '~/types'

const { item } = defineProps<{
  item: ConditionItem
}>()
const dateValue = defineModel() as Ref<string>
const shortcuts = computed(() => item.shortcuts)
</script>

<template>
  <el-date-picker
    v-model="dateValue"
    type="datetimerange"
    range-separator="至"
    :shortcuts="shortcuts"
    start-placeholder="开始日期"
    end-placeholder="结束日期"
    class="w-full"
    value-format="YYYY-MM-DD HH:mm:ss"
  />
</template>
