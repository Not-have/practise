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
    <div :type="dangerType">
      <p>
        属性选择器
      </p>
    </div>
  </div>
</template>
<style lang="less" scoped>
@import url("@/styles/variables.less");

div{
  color: rgb(70, 193, 54);
}

div[type="large"] {
  p {
    font-size: 36px;
    color: rgb(218, 47, 167);
  }
}

div[type="default"] {
  p {
    font-size: 24px;
  }
}

div[type="small"] {
  p {
    font-size: 12px;
    color: darken(@brand-color, 10%);
  }
}

</style>
