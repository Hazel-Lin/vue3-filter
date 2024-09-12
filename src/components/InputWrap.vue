<script setup lang="ts">
const inputValue = defineModel<string>()
</script>

<template>
  <el-input
    v-model="inputValue"
    placeholder="请输入内容"
    clearable
  />
</template>
