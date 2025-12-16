<script lang="ts" setup>
import type {
  IEditorConfig
} from "@wangeditor/editor";

import {
  Editor,
  Toolbar
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
} from "@wangeditor/editor-for-vue";
import {
  computed,
  onBeforeUnmount,
  shallowRef
} from "vue";

import "@wangeditor/editor/dist/css/style.css"; // 引入 css

interface IProps {
  modelValue: string;
}

const {
  modelValue
} = defineProps<IProps>();

const emit = defineEmits<{
  (e: "update:modelValue" | "change", value: string): void;
}>();

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();

const editorStyle = computed(() => ({
  height: "500px",
  overflowY: "hidden"
}));

const mergedEditorConfig = computed<Partial<IEditorConfig>>(() => ({
  placeholder: "请输入内容...",

  // 关闭默认自动聚焦，避免有多个编辑器时总是最后一个获得焦点
  autoFocus: false
}));

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;

  if (editor == null) {
    return;
  }

  editor.destroy();
});

const handleCreated = (editor: Editor): void => {
  editorRef.value = editor; // 记录 editor 实例，重要！
};

const normalizeEmptyHtml = (value: string): string => {
  const cleaned = value?.trim();

  if (cleaned === "<p><br></p>" || cleaned === "<p></p>" || cleaned === "<p><br></p><p></p>") {
    return "";
  }

  return value;
};

const handleUpdateValue = (value: string): void => {
  const normalizedValue = normalizeEmptyHtml(value);

  emit("update:modelValue", normalizedValue);
  emit("change", normalizedValue);
};

</script>
<template>
  <div style="border: 1px solid #ccc">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      mode="default"
    />
    <Editor
      :value="modelValue"
      :style="editorStyle"
      :default-config="mergedEditorConfig"
      mode="default"
      @update:model-value="handleUpdateValue"
      @on-created="handleCreated"
    />
  </div>
</template>
