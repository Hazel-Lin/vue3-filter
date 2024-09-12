<script setup lang="ts">
import { useFilter, useShowDialog } from '~/composables'
import { Format } from '~/types'
import { allConditionMap } from '~/utils'

const { selectedConditionList, unselectedConditionList, checkList, removeConditionValue, getConditionListDisplay, conditionList, removeCondition, save, handleFilterFn, handleReset } = useFilter()
const { isShowDialog, hideDialog, showDialog } = useShowDialog()

const isSaveDisabled = computed(() => checkList.value.length === 0)

function handleSave() {
  if (checkList.value.length === 0) {
    return
  }
  save(checkList)
  hideDialog()
}
</script>

<template>
  <div class="flex flex-wrap">
    <el-tag
      v-for="condition in conditionList" :key="condition.key" closable type="info"
      class="mr-4"
      @close="removeConditionValue(condition.key)"
    >
      {{ getConditionListDisplay(condition) }}
    </el-tag>
    <el-button v-if="conditionList.length > 0" type="primary" link @click="handleReset">
      清空
    </el-button>
  </div>
  <div class="filter-wrap p-6 bg-gray-100 rounded-md">
    <el-row :gutter="16">
      <el-col v-for="item in selectedConditionList" :key="item.key" :span="12" class="mb-3">
        <div class="flex items-center relative group">
          <div class="w-24 h-8 rounded-l-1 flex items-center justify-center bg-white border-box border-t border-l border-b border-gray-300">
            {{ item.label }}
          </div>
          <el-input
            v-if="item.format === Format.INPUT"
            v-model="(item.value as string)"
            placeholder="请输入内容"
          />
          <div
            v-if="item.format === Format.LIST"
            class="bg-white h-8 w-full border-box border border-gray-300 rounded-r-1 px-3"
          >
            <el-checkbox-group v-model="(item.value as string[])" class="flex">
              <el-checkbox
                v-for="o in allConditionMap[item.fieldIdentifier].options"
                :key="o.value"
                :label="o.label"
                :value="o.value"
              />
            </el-checkbox-group>
          </div>
          <el-tooltip content="删除此条件" placement="top">
            <el-icon
              class="absolute right-0 mx-2 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
              :size="20"
              style="color: red"
              @click="removeCondition(item.key)"
            >
              <delete />
            </el-icon>
          </el-tooltip>
        </div>
      </el-col>
    </el-row>
    <div class="mt-4 flex justify-end space-x-2">
      <el-button @click="showDialog">
        添加条件
      </el-button>
      <el-button type="primary" @click="handleFilterFn">
        过滤
      </el-button>
      <el-button type="primary" @click="handleReset">
        重置
      </el-button>
    </div>
    <el-dialog
      v-model="isShowDialog"
      :close-on-click-modal="false"
      title="添加过滤条件"
      width="50%"
    >
      <div class="filter--filterDialogContent p-5 bg-gray-100">
        <div v-if="unselectedConditionList.length === 0">
          暂无数据
        </div>
        <el-checkbox-group v-else v-model="checkList">
          <el-checkbox v-for="field in unselectedConditionList" :key="field.key" :value="field.key">
            {{ field.label }}
          </el-checkbox>
        </el-checkbox-group>
      </div>

      <template v-if="unselectedConditionList.length !== 0" #footer>
        <span class="dialog-footer flex justify-end space-x-2">
          <el-button @click="hideDialog">取消</el-button>
          <el-button type="primary" :disabled="isSaveDisabled" @click="handleSave">保存</el-button>
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
.filter--filterDialogContent {
  background-color: #f6f7f9;
  padding: 20px;
}
:deep(.el-input__wrapper) {
  border-radius: 0 4px 4px 0;
}
</style>
