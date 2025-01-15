<script setup lang="tsx">
import {
  COMPONENT_MAP
} from "@/components/element-x";

import "element-plus/dist/index.css";

/**
 * 基础数据侧
 */
const obj = {
  type: "Button",
  label: "弄好",
  options: { }
};

// 转换数据（拆分，一个 ui 库，对应的就是一种转换）
// const transformButuon = (options: { shape: any; size?: "small"; }) => ({
//   [options.shape]: true,
//   size: "small" as "small"
// });

const Dom = () => {
  const El = COMPONENT_MAP[obj.type as keyof typeof COMPONENT_MAP];

  // const options = transformButuon(obj.options);

  return <El {...obj.options}>
    {obj.label}
  </El>;

};

</script>

<template>
  <div class="about">
    about

    <Dom />
  </div>
</template>
