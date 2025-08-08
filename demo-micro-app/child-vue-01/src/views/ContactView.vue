<template>
  <div class="contact">
    <h1>联系我们</h1>
    <p>如果您有任何问题或建议，请随时联系我们。</p>
    <div class="contact-content">
      <div class="contact-info">
        <h2>联系信息</h2>
        <ul>
          <li><strong>邮箱：</strong> contact@example.com</li>
          <li><strong>电话：</strong> +86 123 4567 8900</li>
          <li><strong>地址：</strong> 北京市朝阳区某某街道123号</li>
        </ul>
      </div>
      <div class="contact-form">
        <h2>发送消息</h2>
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="name">姓名：</label>
            <input type="text" id="name" v-model="form.name" required>
          </div>
          <div class="form-group">
            <label for="email">邮箱：</label>
            <input type="email" id="email" v-model="form.email" required>
          </div>
          <div class="form-group">
            <label for="message">消息：</label>
            <textarea id="message" v-model="form.message" rows="4" required></textarea>
          </div>
          <button type="submit">发送消息</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const form = ref({
  name: '',
  email: '',
  message: ''
})

const submitForm = () => {
  // 这里可以添加表单提交逻辑
  alert('消息已发送！')
  form.value = { name: '', email: '', message: '' }
}
</script>

<style scoped>
.contact {
  padding: 20px;
  max-width: 1000px;
  margin: 0 auto;
}

.contact-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  margin-top: 30px;
}

.contact-info, .contact-form {
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
}

.contact-info ul {
  list-style-type: none;
  padding: 0;
}

.contact-info li {
  padding: 8px 0;
  border-bottom: 1px solid #ddd;
}

.contact-info li:last-child {
  border-bottom: none;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.form-group textarea {
  resize: vertical;
}

button {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #0056b3;
}

@media (max-width: 768px) {
  .contact-content {
    grid-template-columns: 1fr;
  }
}
</style> 