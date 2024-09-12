<script setup lang="ts">
import type { ConditionItem } from '~/types'

const { item } = defineProps < {
  item: ConditionItem
}>()

const inputValue = defineModel<string[]>()

const options = computed(() => item.options)
</script>

<template>
  <div class="bg-white h-8 w-full border-box border border-gray-300 rounded-r-1 px-3">
    <el-checkbox-group v-model="inputValue" class="flex">
      <el-checkbox
        v-for="o in options"
        :key="o.value"
        :label="o.label"
        :value="o.value"
      />
    </el-checkbox-group>
  </div>
</template>
