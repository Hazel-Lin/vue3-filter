<script setup lang="ts">
const isFilterVisible = ref(true)
const filterWrapRef = ref()
function toggleFilter() {
  isFilterVisible.value = !isFilterVisible.value
}
onMounted(() => {
  filterWrapRef.value?.updateOptionsParam('test', { someKey: 'someValue' })
})
</script>

<template>
  <el-icon @click="toggleFilter">
    <Filter />
  </el-icon>
  <transition name="fade">
    <FilterWrap v-if="isFilterVisible" ref="filterWrapRef" />
  </transition>
</template>
