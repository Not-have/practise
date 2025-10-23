<script setup lang="tsx">
import Index from "./compenents/index.vue";
import {
  onMounted
} from "vue";
onMounted(() => {
  document.documentElement.removeAttribute("theme-mode");
});
</script>
<template>
  <div>
    <t-chat-item>
      <template #content>
        <Index />
      </template>
    </t-chat-item>
  </div>
</template>
