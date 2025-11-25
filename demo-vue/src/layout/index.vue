<script setup lang="ts">
import {
  watch,
  ref
} from "vue";
import {
  useRoute
} from "vue-router";

import {
  useCounterStore
} from "@/stores/counter";
import {
  ElContainer,
  ElHeader,
  ElMain,
  ElMenu,
  ElMenuItem,
  ElFooter,
  ElButton
} from "element-plus";

const route = useRoute();

const counter = useCounterStore();

const activeIndex = ref("");

const syncActive = (): void => {
  activeIndex.value = route.path === "/" ? "/" : route.path;
};

watch(() => route.path, syncActive, {
  immediate: true
});
</script>

<template>
  <ElContainer class="layout-root">
    <ElHeader height="60px">
      <ElMenu
        :default-active="activeIndex"
        mode="horizontal"
        router
        background-color="#ffffff"
        text-color="#303133"
        active-text-color="#409eff"
        :ellipsis="false"
      >
        <ElMenuItem index="/css">
          css
        </ElMenuItem>
        <ElMenuItem index="/stores">
          stores
        </ElMenuItem>
        <ElMenuItem index="/waterfall">
          waterfall
        </ElMenuItem>
        <ElMenuItem index="/components">
          components
        </ElMenuItem>
        <ElMenuItem index="/markdown">
          markdown
        </ElMenuItem>
      </ElMenu>
    </ElHeader>
    <ElMain>
      <router-view />
    </ElMain>
    <ElFooter height="60px">
      <div class="footer-content">
        <ElButton @click="counter.invokeClickHandler()">
          footer
        </ElButton>
      </div>
    </ElFooter>
  </ElContainer>
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
