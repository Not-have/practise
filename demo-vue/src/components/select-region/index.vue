<script setup lang="ts">
import {
  ref,
  watch
} from "vue";

import {
  ElCascader,
  type CascaderProps,
  type CascaderValue
} from "element-plus";

import {
  regionData
} from "./region-data";

interface IProps {
  modelValue?: string[];
  placeholder?: string;
  clearable?: boolean;
  disabled?: boolean;
  size?: "large" | "default" | "small";
  showAllLevels?: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
  modelValue: () => [],
  placeholder: "请选择省市区",
  clearable: true,
  disabled: false,
  size: "default",
  showAllLevels: true
});

const emit = defineEmits<{
  "update:modelValue": [value: string[]];
  change: [value: string[]];
}>();

const cascaderValue = ref<string[]>(props.modelValue);

// 监听外部传入的值变化
watch(
    () => props.modelValue,
    newVal => {
      cascaderValue.value = newVal;
    },
    {
      deep: true
    }
);

// 处理级联选择器变化
const handleChange = (value: CascaderValue | null | undefined): void => {
  const stringArray = (value as string[]) || [];

  cascaderValue.value = stringArray;
  emit("update:modelValue", stringArray);
  emit("change", stringArray);
};

// 级联选择器配置
const cascaderProps: CascaderProps = {
  expandTrigger: "hover" as const,
  emitPath: true,
  checkStrictly: true
};
</script>

<template>
  <div class="vc-select-region">
    <ElCascader
      v-model="cascaderValue"
      :options="regionData"
      :props="cascaderProps"
      :placeholder="placeholder"
      :clearable="clearable"
      :disabled="disabled"
      :size="size"
      :show-all-levels="showAllLevels"
      style="width: 100%"
      @change="handleChange"
    />
  </div>
</template>

<style scoped>
.vc-select-region {
  width: 100%;
}
</style>
