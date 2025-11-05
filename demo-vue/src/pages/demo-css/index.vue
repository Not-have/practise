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

const dangerType = ref("default");

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
    <p :type="dangerType">
      属性选择器
    </p>
  </div>
</template>
<style scoped>
p[type="large"] {
  font-size: 36px;
  color: #c9399e;
}

p[type="default"] {
  font-size: 24px;
  color: #308d50;
}

p[type="small"] {
  font-size: 12px;
  color: #2c5fc4;
}
</style>
