<template>
  <div class="products">
    <div class="products-hero">
      <div class="hero-content">
        <h1 class="hero-title">产品展示</h1>
        <p class="hero-subtitle">发现我们精心打造的产品</p>
        <div class="search-bar">
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="搜索产品..."
            class="search-input"
          >
          <button class="search-btn">🔍</button>
        </div>
      </div>
    </div>
    
    <div class="products-content">
      <div class="filters">
        <button 
          v-for="category in categories" 
          :key="category"
          @click="selectedCategory = category"
          :class="['filter-btn', { active: selectedCategory === category }]"
        >
          {{ category }}
        </button>
      </div>
      
      <div class="products-grid">
        <div 
          class="product-card" 
          v-for="product in filteredProducts" 
          :key="product.id"
          @click="selectProduct(product)"
        >
          <div class="product-image">
            <div class="image-placeholder">{{ product.icon }}</div>
            <div class="product-badge" v-if="product.badge">{{ product.badge }}</div>
          </div>
          <div class="product-info">
            <h3 class="product-name">{{ product.name }}</h3>
            <p class="product-description">{{ product.description }}</p>
            <div class="product-meta">
              <div class="product-rating">
                <span class="stars">★★★★★</span>
                <span class="rating-text">{{ product.rating }}</span>
              </div>
              <div class="product-price">¥{{ product.price }}</div>
            </div>
            <div class="product-tags">
              <span class="tag" v-for="tag in product.tags" :key="tag">{{ tag }}</span>
            </div>
            <button class="view-details-btn">查看详情</button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 产品详情模态框 -->
    <div class="modal" v-if="selectedProduct" @click="selectedProduct = null">
      <div class="modal-content" @click.stop>
        <button class="close-btn" @click="selectedProduct = null">×</button>
        <div class="modal-body">
          <div class="modal-image">
            <div class="image-placeholder large">{{ selectedProduct.icon }}</div>
          </div>
          <div class="modal-info">
            <h2>{{ selectedProduct.name }}</h2>
            <p class="modal-description">{{ selectedProduct.description }}</p>
            <div class="modal-price">¥{{ selectedProduct.price }}</div>
            <div class="modal-tags">
              <span class="tag" v-for="tag in selectedProduct.tags" :key="tag">{{ tag }}</span>
            </div>
            <button class="buy-btn">立即购买</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Product {
  id: number
  name: string
  description: string
  price: number
  icon: string
  category: string
  rating: number
  badge?: string
  tags: string[]
}

const products = ref<Product[]>([
  {
    id: 1,
    name: '智能手表 Pro',
    description: '新一代智能手表，支持健康监测、运动追踪和智能通知功能',
    price: 1999,
    icon: '⌚',
    category: '电子产品',
    rating: 4.8,
    badge: '热销',
    tags: ['智能', '健康', '运动']
  },
  {
    id: 2,
    name: '无线蓝牙耳机',
    description: '高品质音效，降噪技术，长时间续航，完美音质体验',
    price: 899,
    icon: '🎧',
    category: '电子产品',
    rating: 4.6,
    tags: ['无线', '降噪', '音质']
  },
  {
    id: 3,
    name: '便携充电宝',
    description: '大容量快充，支持多种设备，出行必备神器',
    price: 299,
    icon: '🔋',
    category: '配件',
    rating: 4.7,
    badge: '新品',
    tags: ['快充', '便携', '大容量']
  },
  {
    id: 4,
    name: '智能音箱',
    description: 'AI语音助手，高品质音响，智能家居控制中心',
    price: 599,
    icon: '🔊',
    category: '电子产品',
    rating: 4.5,
    tags: ['AI', '智能', '音响']
  },
  {
    id: 5,
    name: '无线充电器',
    description: '快速无线充电，兼容多种设备，简约设计',
    price: 199,
    icon: '⚡',
    category: '配件',
    rating: 4.4,
    tags: ['无线', '快充', '简约']
  },
  {
    id: 6,
    name: '智能摄像头',
    description: '高清监控，夜视功能，移动侦测，远程查看',
    price: 399,
    icon: '📹',
    category: '安防',
    rating: 4.6,
    tags: ['高清', '夜视', '远程']
  }
])

const searchQuery = ref('')
const selectedCategory = ref('全部')
const selectedProduct = ref<Product | null>(null)

const categories = ['全部', '电子产品', '配件', '安防']

const filteredProducts = computed(() => {
  let filtered = products.value
  
  if (selectedCategory.value !== '全部') {
    filtered = filtered.filter(product => product.category === selectedCategory.value)
  }
  
  if (searchQuery.value) {
    filtered = filtered.filter(product => 
      product.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }
  
  return filtered
})

const selectProduct = (product: Product) => {
  selectedProduct.value = product
}
</script>

<style scoped>
.products {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.products-hero {
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
  margin-bottom: 40px;
  opacity: 0.9;
  animation: fadeInUp 1s ease-out 0.2s both;
}

.search-bar {
  display: flex;
  max-width: 500px;
  margin: 0 auto;
  animation: fadeInUp 1s ease-out 0.4s both;
}

.search-input {
  flex: 1;
  padding: 15px 20px;
  border: none;
  border-radius: 50px 0 0 50px;
  font-size: 1.1rem;
  outline: none;
}

.search-btn {
  padding: 15px 20px;
  background: #ff6b6b;
  border: none;
  border-radius: 0 50px 50px 0;
  color: white;
  cursor: pointer;
  font-size: 1.1rem;
  transition: background 0.3s ease;
}

.search-btn:hover {
  background: #ee5a24;
}

.products-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px;
}

.filters {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 50px;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 12px 24px;
  border: 2px solid #667eea;
  background: transparent;
  color: #667eea;
  border-radius: 25px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
}

.filter-btn.active,
.filter-btn:hover {
  background: #667eea;
  color: white;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
}

.product-card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
}

.product-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.product-image {
  position: relative;
  height: 200px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-placeholder {
  font-size: 4rem;
  color: white;
}

.image-placeholder.large {
  font-size: 6rem;
}

.product-badge {
  position: absolute;
  top: 15px;
  right: 15px;
  background: #ff6b6b;
  color: white;
  padding: 5px 12px;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 600;
}

.product-info {
  padding: 30px;
}

.product-name {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 10px;
  color: #2c3e50;
}

.product-description {
  color: #7f8c8d;
  line-height: 1.6;
  margin-bottom: 20px;
}

.product-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.product-rating {
  display: flex;
  align-items: center;
  gap: 8px;
}

.stars {
  color: #f39c12;
  font-size: 1.1rem;
}

.rating-text {
  color: #7f8c8d;
  font-weight: 600;
}

.product-price {
  font-size: 1.5rem;
  font-weight: 700;
  color: #e74c3c;
}

.product-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
}

.tag {
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  padding: 4px 12px;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 500;
}

.view-details-btn {
  width: 100%;
  padding: 12px;
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.view-details-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}

/* 模态框样式 */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease;
}

.modal-content {
  background: white;
  border-radius: 20px;
  max-width: 800px;
  width: 90%;
  max-height: 90%;
  overflow-y: auto;
  position: relative;
  animation: slideIn 0.3s ease;
}

.close-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: #7f8c8d;
  z-index: 1;
}

.modal-body {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  padding: 40px;
}

.modal-image {
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 15px;
  height: 300px;
}

.modal-info h2 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 15px;
  color: #2c3e50;
}

.modal-description {
  color: #7f8c8d;
  line-height: 1.6;
  margin-bottom: 20px;
}

.modal-price {
  font-size: 2rem;
  font-weight: 700;
  color: #e74c3c;
  margin-bottom: 20px;
}

.modal-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 30px;
}

.buy-btn {
  padding: 15px 30px;
  background: linear-gradient(45deg, #ff6b6b, #ee5a24);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.buy-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(255, 107, 107, 0.4);
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

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-50px);
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
  
  .products-grid {
    grid-template-columns: 1fr;
  }
  
  .modal-body {
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 20px;
  }
  
  .modal-image {
    height: 200px;
  }
}
</style> 