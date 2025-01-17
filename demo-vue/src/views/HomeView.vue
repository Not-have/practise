<script setup lang="ts">
import checkJsonSchema from "@/components/check-json-schema";
import Container from "@/components/container";
import {
  EUiEleType
} from "@/components/enum";

// 测试数据
const data = {
  label: "John Doe",
  "type": EUiEleType.BUTTON,
  "options": {
    "street": "123 Main St",
    "city": "Somewhere"
  }
};

const obj = checkJsonSchema(data)!;

</script>

<template>
  <main>
    <Container v-bind="obj" />
  </main>
</template>
