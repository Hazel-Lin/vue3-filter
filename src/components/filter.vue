<script setup lang="ts">
// 初始化条件：标题、优先级、状态、工作项类型、创建时间、创建人
import { allConditionOptions, useFilter } from '~/composables'
import { Format } from '~/types'

const { allConditionMap, selectedConditionList } = useFilter()

function changeCondition(item) {
  const i = allConditionMap.value[item.fieldIdentifier]
  item.format = i.format
  item.label = i.label
  item.key = i.key
  item.value = i.value
  item.operator = i.operator

  // item = { ...i }
}
</script>

<template>
  <div class="filter-wrap">
    <el-row :gutter="16">
      <el-col v-for="item in selectedConditionList" :key="item.key" :span="12">
        <div flex>
          <el-select
            v-model="item.fieldIdentifier"
            style="width: 130px;"
            @change="changeCondition(item)"
          >
            <el-option
              v-for="opt in allConditionOptions"
              :key="opt.key"
              :label="opt.label"
              :value="opt.key"
            />
          </el-select>
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
  </div>
</template>

<style lang="scss" scoped>
.filter-wrap{
    background-color:#f6f7f9;
    border-radius: 4px;
    display: block;
    flex-shrink: 0;
    margin: 0 0 20px;
    padding: 24px;
}
</style>
