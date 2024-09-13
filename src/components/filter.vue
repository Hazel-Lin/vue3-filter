<script setup lang="ts">
import { useFilter, useShowDialog } from '~/composables'
import { type ConditionItem, Format } from '~/types'
import CheckboxGroupWrapper from './CheckboxGroupWrapper.vue'
import DatePickerWrap from './DatePickerWrap.vue'
import InputWrap from './InputWrap.vue'
import SelectWrap from './SelectWrap.vue'

const { selectedConditionList, unselectedConditionList, checkList, removeConditionValue, getConditionListDisplay, conditionList, removeCondition, save, handleFilter, handleReset } = useFilter()
const { isShowDialog, hideDialog, showDialog } = useShowDialog()

const isSaveDisabled = computed(() => checkList.value.length === 0)
const hasUnselectedConditions = computed(() => unselectedConditionList.value.length !== 0)
function handleSave() {
  if (checkList.value.length === 0) {
    return
  }
  save(checkList)
  hideDialog()
}
function getComponentType(item: ConditionItem) {
  switch (item.format) {
    case Format.SELECT:
      return SelectWrap
    case Format.CHECKBOX:
      return CheckboxGroupWrapper
    case Format.DATE_PICKER:
      return DatePickerWrap
    default:
      return InputWrap
  }
}
</script>

<template>
  <div class="flex flex-wrap">
    <el-tag
      v-for="condition in conditionList" :key="condition.key" closable type="info"
      class="mr-2"
      @close="removeConditionValue(condition.key)"
    >
      {{ getConditionListDisplay(condition) }}
    </el-tag>
    <el-button v-if="conditionList.length > 0" type="primary" link @click="handleReset">
      清空
    </el-button>
  </div>
  <div class="p-6 bg-gray-100 rounded-md  bg-[#f6f7f9] block flex-shrink-0 mb-5">
    <el-row :gutter="16">
      <el-col v-for="item in selectedConditionList" :key="item.key" :span="12" class="mb-3">
        <div class="flex items-center relative group">
          <div class="w-24 h-8 rounded-l-1 flex flex-shrink-0 items-center justify-center bg-white border-box border-t border-l border-b border-gray-300">
            {{ item.label }}
          </div>
          <component :is="getComponentType(item)" v-model="item.value" :item="item" />
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
      <el-button type="primary" @click="handleFilter">
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
      <div class="p-5 bg-gray-100">
        <div v-if="!hasUnselectedConditions">
          暂无数据
        </div>
        <el-checkbox-group v-else v-model="checkList">
          <el-checkbox
            v-for="field in unselectedConditionList"
            :key="field.key"
            :value="field.key"
            :label="field.label"
          />
        </el-checkbox-group>
      </div>

      <template v-if="hasUnselectedConditions" #footer>
        <span class="dialog-footer flex justify-end space-x-2">
          <el-button @click="hideDialog">取消</el-button>
          <el-button
            type="primary"
            :disabled="isSaveDisabled"
            @click="handleSave"
          >
            保存
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-input__wrapper),
:deep(.el-select__wrapper) {
  border-radius: 0 4px 4px 0;
}
</style>
