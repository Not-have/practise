<script setup lang="ts">
import {
  ref
} from "vue";

import {
  VcSelectRegion
} from "@/components";

const regionValue = ref<string[]>([]);

</script>
<template>
  <div>
    <h1>Demo Components</h1>
    <p>regionValue: {{ regionValue }}</p>
    <VcSelectRegion
      v-model="regionValue"
    />
    <hr />
  </div>
</template>
<style scoped>

</style>
