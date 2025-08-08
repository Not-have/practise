<template>
  <div class="home">
    <h1>首页</h1>
    <p>欢迎来到我们的 Vue 应用！</p>
    <div class="content">
      <h2>功能特色</h2>
      <ul>
        <li>现代化的 Vue 3 框架</li>
        <li>TypeScript 支持</li>
        <li>响应式设计</li>
        <li>右侧竖着展示的导航菜单</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
// 首页组件逻辑
</script>

<style scoped>
.home {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.content {
  margin-top: 30px;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  padding: 8px 0;
  border-bottom: 1px solid #ddd;
}

li:last-child {
  border-bottom: none;
}
</style> 