<script setup lang="ts">
import {
  onMounted,
  onUnmounted,
  ref
} from "vue";

import {
  useCounterStore
} from "@/stores/counter";

const counter = useCounterStore();

const count = ref(0);

const handleClick = (): void => {
  count.value++;
};

onMounted(() => {
  counter.registerClickHandler(handleClick);
});

onUnmounted(() => {
  counter.clearClickHandler();
});
</script>
<template>
  <div>
    <h1>demo-stores</h1>
    <p>count: {{ count }}</p>
  </div>
</template>
