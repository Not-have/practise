<template>
  <div class="products">
    <h1>产品展示</h1>
    <p>浏览我们的产品目录</p>
    <div class="products-grid">
      <div class="product-card" v-for="product in products" :key="product.id">
        <h3>{{ product.name }}</h3>
        <p>{{ product.description }}</p>
        <div class="price">¥{{ product.price }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Product {
  id: number
  name: string
  description: string
  price: number
}

const products = ref<Product[]>([
  {
    id: 1,
    name: '产品 A',
    description: '这是一个很棒的产品，具有出色的性能和品质。',
    price: 199
  },
  {
    id: 2,
    name: '产品 B',
    description: '另一个优秀的产品，满足您的各种需求。',
    price: 299
  },
  {
    id: 3,
    name: '产品 C',
    description: '高端产品，为您提供最佳的体验。',
    price: 399
  }
])
</script>

<style scoped>
.products {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 30px;
}

.product-card {
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
  border: 1px solid #ddd;
}

.product-card h3 {
  margin-top: 0;
  color: #333;
}

.price {
  font-size: 1.2em;
  font-weight: bold;
  color: #007bff;
  margin-top: 10px;
}
</style> 