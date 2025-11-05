<script setup lang="ts">

import {
  useRoute
} from "vue-router";

const route = useRoute();
</script>

<template>
  <el-container class="layout-root">
    <el-header height="60px">
      <el-menu
        :default-active="route.path"
        mode="horizontal"
        router
        background-color="#ffffff"
        text-color="#303133"
        active-text-color="#409eff"
        :ellipsis="false"
      >
        <el-menu-item index="css">
          css
        </el-menu-item>
      </el-menu>
    </el-header>
    <el-main>
      <router-view />
    </el-main>
  </el-container>
</template>

<style scoped>
.layout-root {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

.el-header {
  display: flex;
  align-items: center;
  box-shadow: 0 2px 8px rgb(0 0 0 / 6%);
}

.el-main {
  flex: 1;
  padding: 16px;
  overflow-y: auto;
}
</style>
