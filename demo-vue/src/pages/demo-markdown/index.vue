<script setup lang="ts">
import {
  markdownToWord
} from "@/utils/transform-md-word";

import {
  markdown
} from "./data";

const handleDownload = async () => {
  try {
    await markdownToWord(markdown, "在时光深处寻找生命的意义.docx");
  } catch (error) {
    console.error("下载失败:", error);
  }
};
</script>

<template>
  <div>
    <h1>Demo Markdown</h1>
    <el-button
      type="primary"
      @click="handleDownload"
    >
      下载 Word 文档
    </el-button>
  </div>
</template>
