<script setup lang="ts">
import {
  ref
} from "vue";

import {
  ElRadioGroup,
  ElRadioButton
} from "element-plus";

const type = [
  "large",
  "default",
  "small"
];

const dangerType = ref("small");

</script>
<template>
  <div>
    <ElRadioGroup v-model="dangerType">
      <ElRadioButton
        v-for="item in type"
        :key="item"
        :label="item"
      >
        {{ item }}
      </ElRadioButton>
    </ElRadioGroup>
    <p>段落一</p>
    <p :type="dangerType">
      段落二
    </p>
    <p>段落三</p>
  </div>
</template>
<style scoped>
p[type="large"] {
  font-size: 24px;
  color: #c9399e;
}

p[type="default"] {
  font-size: 16px;
  color: #308d50;
}

p[type="small"] {
  font-size: 12px;
  color: #2c5fc4;
}
</style>
