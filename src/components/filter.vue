<script setup lang="ts">
import { ref } from 'vue'
import { allConditionOptions, useFilter } from '~/composables'
// import type { ConditionItem } from '~/types'
import { Format } from '~/types'

const { allConditionMap, selectedConditionList } = useFilter()
const isDialogVisible = ref(false)

const fieldGroups = [
  {
    label: '基础字段',
    fields: [{
      label: '标题',
      key: 'subject',
    }, {
      label: '优先级',
      key: 'priority',
    }, {
      label: '状态',
      key: 'status',
    }],
  },

]

// function changeCondition(item: ConditionItem) {
//   const i = allConditionMap.value[item.fieldIdentifier]
//   item.format = i.format
//   item.label = i.label
//   item.key = i.key
//   item.value = i.value
//   item.operator = i.operator
// }

function openDialog() {
  isDialogVisible.value = true
}

function closeDialog() {
  isDialogVisible.value = false
}
</script>

<template>
  <div class="filter-wrap">
    <el-row :gutter="16">
      <el-col v-for="item in selectedConditionList" :key="item.key" :span="12">
        <div flex>
          <el-menu
            class="el-menu-demo flex-shrink-0"
            mode="horizontal"
            style="width: 200px;"
          >
            <el-sub-menu index="2">
              <template #title>
                {{ item.label }}
              </template>
              <el-menu-item v-for="o in allConditionOptions" :key="o.label">
                {{ o.label }}
              </el-menu-item>
            </el-sub-menu>
          </el-menu>
          <el-input v-if="item.format === Format.INPUT" v-model="item.value" placeholder="请输入内容" />
          <div
            v-if="item.format === Format.LIST"
            style="background-color: #fff; width: 100%;"
          >
            <el-checkbox-group v-model="item.value">
              <el-checkbox
                v-for="o in allConditionMap[item.fieldIdentifier].options"
                :key="o.value"
                :label="o.label"
                :value="o.value"
              />
            </el-checkbox-group>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-button type="primary" @click="openDialog">
      添加条件
    </el-button>
    <el-button type="success">
      过滤
    </el-button>
    <el-dialog v-model="isDialogVisible" title="添加过滤条件" width="50%">
      <el-tabs>
        <el-tab-pane label="条件 1">
          <el-row :gutter="16">
            <el-col v-for="field in fieldGroups" :key="field">
              <div>{{ field.label }}</div>
              <el-checkbox
                v-for="f in field.fields" :key="f.key" :value="f.key"
              >
                {{ f.label }}
              </el-checkbox>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="closeDialog">取消</el-button>
          <el-button type="primary" @click="closeDialog">保存</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.filter-wrap {
  background-color: #f6f7f9;
  border-radius: 4px;
  display: block;
  flex-shrink: 0;
  margin: 0 0 20px;
  padding: 24px;
}
</style>
