<template>
  <div class="about">
    <h1>关于我们</h1>
    <p>这是一个使用 Vue 3 + TypeScript 构建的现代化 Web 应用。</p>
    <div class="content">
      <h2>技术栈</h2>
      <ul>
        <li>Vue 3 - 渐进式 JavaScript 框架</li>
        <li>TypeScript - 类型安全的 JavaScript</li>
        <li>Vue Router - 官方路由管理器</li>
        <li>Pinia - 状态管理库</li>
        <li>Vite - 快速构建工具</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
// 关于页面组件逻辑
</script>

<style scoped>
.about {
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