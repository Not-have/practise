<script setup lang="ts">
import {
  onMounted
} from "vue";

onMounted(() => {
  document.documentElement.removeAttribute("theme-mode");
});

const doc = `
# This is TDesign


\`\`\`bash
$ npm i tdesign-vue-next
\`\`\`

---

\`\`\`javascript
import { createApp } from 'vue';
import App from './app.vue';

const app = createApp(App);
app.use(TDesignChat);
\`\`\`
`;
</script>
<template>
  <div>
    <t-chat-content
      role="assistant"
      :content="doc"
      variant="base"
    />
  </div>
</template>
