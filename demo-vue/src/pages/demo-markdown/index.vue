<script setup lang="ts">
import {
  markdownToWord
} from "@/utils";
import {
  ElButton
} from "element-plus";

import {
  markdown
} from "./data";

const handleDownload = async () => {
  try {
    await markdownToWord({
      markdown,
      filename: "在时光深处寻找生命的意义.docx"
    });
  } catch (error) {
    console.error("下载失败:", error);
  }
};
</script>

<template>
  <div>
    <h1>Demo Markdown</h1>
    <ElButton
      type="primary"
      @click="handleDownload"
    >
      下载 Word 文档
    </ElButton>
  </div>
</template>
