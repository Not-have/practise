<script setup lang="ts">
import {
  ref,
  onMounted
} from "vue";

import {
  Image
} from "vant";

const imgData = ref("");

onMounted(async () => {
  const controller = new AbortController();

  setTimeout(() => controller.abort(), 5000);

  try {
    const res = await fetch("/image-proxy/upload/goods/1/detail/c85e8f8d8bd7b0c3ab7cee002bbc4e4a64278c01.jpg", {
      signal: controller.signal,
      referrerPolicy: "no-referrer"
    });

    const blob = await res.blob();

    imgData.value = URL.createObjectURL(blob);
  } catch (error) {
    console.error("Image load failed:", error);
  }
});

</script>

<template>
  <h1>You did it!</h1>
  <Image
    width="100"
    height="100"
    :src="imgData"
  />
  <img
    :src="imgData"
    style="width:100px;height:100px;object-fit:cover"
  />
</template>

<style scoped></style>
