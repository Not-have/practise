<script setup lang="ts">
import checkJsonSchema from "@/components/check-json-schema";
import {
  EUiEleType
} from "@/components/enum";

const json = {
  type: EUiEleType.BUTTON,
  label: "你好"
};

const result = checkJsonSchema(json);

console.log(result);

</script>

<template>
  <main>
    home
  </main>
</template>
