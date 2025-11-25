<script setup lang="ts">
import {
  ref
} from "vue";

import {
  VcSelectRegion,
  VcWaterfall,
  type IWaterfallItem
} from "@/components";

const regionValue = ref<string[]>([]);

const list = ref<IWaterfallItem[]>([
  {
    id: 1,
    src: "https://picsum.photos/200/300",
    title: "Title 1",
    description: "Description 1"
  },
  {
    id: 2,
    src: "https://picsum.photos/200/300"
  },
  {
    id: 3,
    src: "https://picsum.photos/200/300"
  },
  {
    id: 4,
    src: "https://picsum.photos/200/300"
  },
  {
    id: 5,
    src: "https://picsum.photos/200/300"
  },
  {
    id: 6,
    src: "https://picsum.photos/200/300"
  },
  {
    id: 7,
    src: "https://picsum.photos/200/300"
  },
  {
    id: 8,
    src: "https://picsum.photos/200/300"
  },
  {
    id: 9,
    src: "https://picsum.photos/200/300"
  }
]);
</script>
<template>
  <div>
    <h1>Demo Components</h1>
    <p>regionValue: {{ regionValue }}</p>
    <VcSelectRegion
      v-model="regionValue"
    />
    <hr />
    <VcWaterfall :list="list" />
  </div>
</template>
<style scoped>

</style>
