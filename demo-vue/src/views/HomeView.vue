<script setup lang="ts">
import checkJsonSchema from "@/components/check-json-schema";
import {
  EUiEleType
} from "@/components/enum";

// 测试数据
const data = {
  label: "John Doe",
  "type": EUiEleType.BORDER,
  "options": {
    "street": "123 Main St",
    "city": "Somewhere"
  }
};

console.log(checkJsonSchema(data));

</script>

<template>
  <main>
    home
  </main>
</template>
