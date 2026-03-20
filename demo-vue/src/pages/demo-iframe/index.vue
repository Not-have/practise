<script lang="ts" setup>
import {
  onMounted,
  onUnmounted,
  ref
} from "vue";

const iframeRef = ref<HTMLIFrameElement | null>(null);

const handleMessage = (e: MessageEvent): void => {
  const targetWin = iframeRef.value?.contentWindow;

  if (!targetWin) {
    return;
  }

  if (e.source !== targetWin) {
    return;
  }

  // eslint-disable-next-line no-console
  console.log("iframe message:", e.data);
};

onMounted(() => {
  window.addEventListener("message", handleMessage);
});

onUnmounted(() => {
  window.removeEventListener("message", handleMessage);
});
</script>
<template>
  <div>
    <iframe
      ref="iframeRef"
      src="https://xxx.xxx.xxx/login?Xxxx=http://localhost:5173/"
      frameborder="0"
    ></iframe>
  </div>
</template>
<style scoped>
div {
  width: 100%;
  height: 100%;
}

iframe {
  width: 100%;
  height: 100%;
}
</style>
