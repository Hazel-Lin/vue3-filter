import { RemoveFilled } from '@element-plus/icons-vue'
import { ElButton, ElCheckbox, ElCheckboxGroup, ElCol, ElDialog, ElIcon, ElRow, ElTag, ElTooltip } from 'element-plus'
import { computed, defineComponent } from 'vue'
import { useFilter, useShowDialog } from '../composables'
import { type ConditionItem, Format } from '../types'
import CheckboxGroupWrapper from './CheckboxGroupWrapper'
import SelectWrap from './SelectWrap'

export default defineComponent({
  setup() {
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
        default:
          return SelectWrap
      }
    }

    return () => (
      <div>
        <div class="flex flex-wrap">
          {conditionList.value.map((condition: ConditionItem) => (
            <ElTag
              key={condition.key}
              closable
              type="info"
              class="mr-2"
              onClose={() => removeConditionValue(condition.key)}
            >
              {getConditionListDisplay(condition)}
            </ElTag>
          ))}
          {conditionList.value.length > 0 && (
            <ElButton type="primary" link onClick={handleReset}>
              清空
            </ElButton>
          )}
        </div>
        <div class="p-6 bg-gray-100 rounded-md bg-[#f6f7f9] block flex-shrink-0 mb-5">
          <ElRow gutter={16}>
            {selectedConditionList.value.map((item: ConditionItem) => (
              <ElCol key={item.key} span={12} class="mb-3">
                <div class="flex items-center relative group">
                  <div class="w-24 h-8 rounded-l-1 flex flex-shrink-0 items-center justify-center bg-white border-box border-t border-l border-b border-gray-300">
                    {item.label}
                  </div>
                  <component is={getComponentType(item)} v-model={item.value} item={item} />
                  <ElTooltip content="删除此条件" placement="top">
                    <ElIcon
                      class="absolute right-0 mx-2 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                      size={20}
                      style="color: red"
                      onClick={() => removeCondition(item.key)}
                    >
                      <RemoveFilled />
                    </ElIcon>
                  </ElTooltip>
                </div>
              </ElCol>
            ))}
          </ElRow>
          <div class="mt-4 flex justify-end space-x-2">
            <ElButton onClick={showDialog}>
              添加条件
            </ElButton>
            <ElButton type="primary" onClick={handleFilter}>
              过滤
            </ElButton>
            <ElButton type="primary" onClick={handleReset}>
              重置
            </ElButton>
          </div>
          <ElDialog
            v-model={isShowDialog.value}
            closeOnClickModal={false}
            title="添加过滤条件"
            width="50%"
          >
            <div class="p-5 bg-gray-100">
              {!hasUnselectedConditions.value
                ? (
                    <div>暂无数据</div>
                  )
                : (
                    <ElCheckboxGroup v-model={checkList.value}>
                      {unselectedConditionList.value.map((field: ConditionItem) => (
                        <ElCheckbox
                          key={field.key}
                          value={field.key}
                          label={field.label}
                        />
                      ))}
                    </ElCheckboxGroup>
                  )}
            </div>
            {hasUnselectedConditions.value && (
              {
                footer: () => (
                  <span class="dialog-footer flex justify-end space-x-2">
                    <ElButton onClick={hideDialog}>取消</ElButton>
                    <ElButton
                      type="primary"
                      disabled={isSaveDisabled.value}
                      onClick={handleSave}
                    >
                      保存
                    </ElButton>
                  </span>
                ),
              }
            )}
          </ElDialog>
        </div>
      </div>
    )
  },
})
