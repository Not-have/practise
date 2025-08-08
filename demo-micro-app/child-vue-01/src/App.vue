<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

const menuItems = [
  { name: '首页', path: '/', icon: '🏠' },
  { name: '关于', path: '/about', icon: 'ℹ️' },
  { name: '产品', path: '/products', icon: '📦' },
  { name: '联系', path: '/contact', icon: '📞' }
]

const isActive = computed(() => (path: string) => {
  return route.path === path
})
</script>

<template>
  <div class="app">
    <!-- 左侧导航菜单 -->
    <nav class="sidebar">
      <ul class="nav-menu">
        <li v-for="item in menuItems" :key="item.path" class="nav-item">
          <router-link 
            :to="item.path" 
            :class="['nav-link', { active: isActive(item.path) }]"
          >
            <span class="nav-icon">{{ item.icon }}</span>
            <span class="nav-text">{{ item.name }}</span>
          </router-link>
        </li>
      </ul>
    </nav>
    
    <!-- 主内容区域 -->
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
.app {
  display: flex;
  min-height: 100vh;
  background-color: #f8f9fa;
}

.main-content {
  flex: 1;
  padding: 20px;
  margin-left: 250px; /* 为左侧菜单留出空间 */
  transition: margin-left 0.3s ease;
}

.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  width: 250px;
  height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.nav-menu {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-item {
  margin: 0;
}

.nav-link {
  display: flex;
  align-items: center;
  padding: 15px 20px;
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;
  border-left: 3px solid transparent;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
  border-left-color: rgba(255, 255, 255, 0.5);
  transform: translateX(5px);
}

.nav-link.active {
  background-color: rgba(255, 255, 255, 0.2);
  border-left-color: white;
  font-weight: 600;
}

.nav-icon {
  font-size: 1.2rem;
  margin-right: 12px;
  width: 20px;
  text-align: center;
}

.nav-text {
  font-size: 1rem;
  font-weight: 500;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .main-content {
    margin-left: 0;
    padding: 10px;
  }
  
  .sidebar {
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }
  
  .sidebar.open {
    transform: translateX(0);
  }
}

/* 全局样式 */
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
