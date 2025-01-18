<script setup lang="ts">
import VueJsonPretty from "vue-json-pretty";
import "vue-json-pretty/lib/styles.css";
const str = "{\"name\":\"John Doe\",\"age\":30,\"isDeveloper\":true,\"languages\":[\"JavaScript\",\"TypeScript\",\"Python\"],\"address\":{\"street\":\"123 Main St\",\"city\":\"New York\",\"country\":\"USA\"}}";

</script>

<template>
  <div class="json">
    <VueJsonPretty :data="str" />
  </div>
</template>
