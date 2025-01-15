<script setup lang="tsx">
import {
  COMPONENT_MAP
} from "@/components/element-x";

import "element-plus/dist/index.css";

const obj = {
  type: "Button",
  label: "弄好",
  options: {
    plain: true,
    text: true,
    size: "small" as "small"
  }
};

const Dom = () => {
  const El = COMPONENT_MAP[obj.type as keyof typeof COMPONENT_MAP];

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
