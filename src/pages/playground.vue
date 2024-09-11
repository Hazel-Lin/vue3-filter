<script setup lang="ts">
const form = ref({
  name: '',
})
const show = ref(true)
</script>

<template>
  <el-dialog v-model="show" title="title">
    <el-form :model="form">
      <el-form-item label="name" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
