<script setup lang="ts">
import {
  RouterLink,
  RouterView
} from "vue-router";
</script>

<template>
  <div class="app-shell">
    <header class="tab-header">
      <RouterLink
        class="tab-link"
        to="/planet-demo-01"
      >
        星球demo-01
      </RouterLink>
      <RouterLink
        class="tab-link"
        to="/planet-demo-02"
      >
        星球demo-02
      </RouterLink>
      <RouterLink
        class="tab-link"
        to="/planet-demo-03"
      >
        星球demo-03
      </RouterLink>
    </header>

    <main class="page-content">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.app-shell {
  height: 100%;
  background: #f6f8fb;
  color: #172033;
  display: flex;
  flex-direction: column;
}

.tab-header {
  display: flex;
  gap: 8px;
  align-items: center;
  padding: 14px 24px 0;
  border-bottom: 1px solid #d8dee8;
  background: #ffffff;
}

.tab-link {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  padding: 0 18px;
  border: 1px solid transparent;
  border-bottom: 0;
  border-radius: 8px 8px 0 0;
  color: #5d687a;
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
}

.tab-link:hover {
  color: #1f6feb;
  background: #f2f6ff;
}

.tab-link.router-link-active {
  color: #172033;
  border-color: #d8dee8;
  background: #f6f8fb;
}

.page-content {
  flex: 1;
  width: 100%;
}
</style>
