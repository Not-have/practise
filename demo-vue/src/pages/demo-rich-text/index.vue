<script lang="ts" setup>

import {
  reactive, ref
} from "vue";

import {
  type FormInstance,
  ElForm,
  ElFormItem,
  ElButton,
  ElInput
} from "element-plus";

import {
  RichText
} from "./components";

const formRef = ref<FormInstance>();

const dynamicValidateForm = reactive<{
  richText01: string;
  richText02: string;
  richText03: string;
}>({
  richText01: "",
  richText02: "",
  richText03: ""
});

const submitForm = (formEl: FormInstance | undefined) => {

  if (!formEl) {
    return;
  }

  formEl.validate(valid => {
    if (valid) {
      // eslint-disable-next-line no-console
      console.log("submit!");
    } else {
      // eslint-disable-next-line no-console
      console.log("error submit!");
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) {
    return;
  }

  formEl.resetFields();
  dynamicValidateForm.richText01 = "";
  dynamicValidateForm.richText02 = "";
};
</script>

<template>
  <ElForm
    ref="formRef"
    style="max-width: 600px"
    :model="dynamicValidateForm"
    class="demo-dynamic"
  >
    <ElFormItem
      prop="richText01"
      label="Rich Text 01"
      :rules="[
        {
          required: true,
          message: 'Rich Text 01 is required',
          trigger: 'change',
        }
      ]"
    >
      {{ dynamicValidateForm.richText01 }}
      <RichText v-model="dynamicValidateForm.richText01" />
    </ElFormItem>
    <ElFormItem
      prop="richText02"
      label="Rich Text 02"
      :rules="[
        {
          required: true,
          message: 'Rich Text 02 is required',
          trigger: 'blur',
        }
      ]"
    >
      {{ dynamicValidateForm.richText02 }}
      <RichText v-model="dynamicValidateForm.richText02" />
    </ElFormItem>
    <ElFormItem
      prop="richText03"
      label="Rich Text 03"
      :rules="[
        {
          required: true,
          message: 'Rich Text 03 is required',
          trigger: 'change',
        }
      ]"
    >
      {{ dynamicValidateForm.richText03 }}
      <ElInput v-model="dynamicValidateForm.richText03" />
    </ElFormItem>
    <ElFormItem>
      <ElButton
        type="primary"
        @click="submitForm(formRef)"
      >
        Submit
      </ElButton>
      <ElButton @click="resetForm(formRef)">
        Reset
      </ElButton>
    </ElFormItem>
  </ElForm>
</template>
