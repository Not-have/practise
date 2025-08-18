<template>
  <div class="about">
    <div class="about-hero">
      <div class="hero-content">
        <h1 class="hero-title">关于我们</h1>
        <p class="hero-subtitle">致力于创造优秀的用户体验</p>
      </div>
    </div>
    
    <div class="about-content">
      <div class="mission-section">
        <h2>我们的使命</h2>
        <p>这是一个使用 Vue 3 + TypeScript 构建的现代化 Web 应用，我们致力于为用户提供最佳的前端开发体验。</p>
      </div>
      
      <div class="tech-stack-section">
        <h2>技术栈</h2>
        <div class="tech-grid">
          <div class="tech-card" v-for="tech in techStack" :key="tech.name">
            <div class="tech-icon">{{ tech.icon }}</div>
            <h3>{{ tech.name }}</h3>
            <p>{{ tech.description }}</p>
            <div class="tech-tags">
              <span class="tag" v-for="tag in tech.tags" :key="tag">{{ tag }}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="stats-section">
        <h2>项目统计</h2>
        <div class="stats-grid">
          <div class="stat-card" v-for="stat in stats" :key="stat.label">
            <div class="stat-number">{{ stat.value }}</div>
            <div class="stat-label">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const techStack = ref([
  {
    icon: '⚡',
    name: 'Vue 3',
    description: '渐进式 JavaScript 框架，提供响应式数据绑定和组件化开发',
    tags: ['Composition API', '响应式', '组件化']
  },
  {
    icon: '🔷',
    name: 'TypeScript',
    description: '类型安全的 JavaScript 超集，提供更好的开发体验和代码质量',
    tags: ['类型安全', '智能提示', '错误检查']
  },
  {
    icon: '🧭',
    name: 'Vue Router',
    description: '官方路由管理器，为单页应用提供强大的导航功能',
    tags: ['路由管理', '导航守卫', '懒加载']
  },
  {
    icon: '📦',
    name: 'Pinia',
    description: '现代化的状态管理库，提供简单直观的状态管理方案',
    tags: ['状态管理', 'TypeScript', 'DevTools']
  },
  {
    icon: '⚡',
    name: 'Vite',
    description: '快速构建工具，提供极速的开发服务器和构建体验',
    tags: ['快速构建', '热更新', 'ES模块']
  }
])

const stats = ref([
  { value: '100%', label: 'TypeScript 覆盖率' },
  { value: '99.9%', label: '代码质量' },
  { value: '< 1s', label: '启动时间' },
  { value: '100+', label: '组件库' }
])
</script>

<style scoped>
.about {
  height: 100%;
  overflow-y: auto;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.about-hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 80px 20px;
  text-align: center;
  color: white;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 20px;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
  animation: fadeInUp 1s ease-out;
}

.hero-subtitle {
  font-size: 1.5rem;
  opacity: 0.9;
  animation: fadeInUp 1s ease-out 0.2s both;
}

.about-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px;
}

.mission-section {
  text-align: center;
  margin-bottom: 80px;
  padding: 40px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.mission-section h2 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 20px;
  color: #2c3e50;
}

.mission-section p {
  font-size: 1.2rem;
  color: #7f8c8d;
  line-height: 1.6;
  max-width: 800px;
  margin: 0 auto;
}

.tech-stack-section {
  margin-bottom: 80px;
}

.tech-stack-section h2 {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 50px;
  color: #2c3e50;
}

.tech-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

.tech-card {
  background: white;
  padding: 40px 30px;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.tech-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.tech-icon {
  font-size: 3rem;
  margin-bottom: 20px;
  display: block;
}

.tech-card h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 15px;
  color: #2c3e50;
}

.tech-card p {
  color: #7f8c8d;
  line-height: 1.6;
  margin-bottom: 20px;
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
}

.tag {
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
}

.stats-section {
  text-align: center;
}

.stats-section h2 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 50px;
  color: #2c3e50;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 30px;
}

.stat-card {
  background: white;
  padding: 40px 20px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
}

.stat-number {
  font-size: 3rem;
  font-weight: 700;
  color: #667eea;
  margin-bottom: 10px;
}

.stat-label {
  font-size: 1.1rem;
  color: #7f8c8d;
  font-weight: 500;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-subtitle {
    font-size: 1.2rem;
  }
  
  .tech-grid {
    grid-template-columns: 1fr;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style> 