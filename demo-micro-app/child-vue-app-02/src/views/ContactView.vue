<template>
  <div class="contact">
    <div class="contact-hero">
      <div class="hero-content">
        <h1 class="hero-title">联系我们</h1>
        <p class="hero-subtitle">我们随时为您提供帮助和支持</p>
      </div>
    </div>
    
    <div class="contact-content">
      <div class="contact-grid">
        <div class="contact-info-card">
          <h2>联系信息</h2>
          <div class="info-items">
            <div class="info-item" v-for="info in contactInfo" :key="info.type">
              <div class="info-icon">{{ info.icon }}</div>
              <div class="info-content">
                <h3>{{ info.title }}</h3>
                <p>{{ info.value }}</p>
              </div>
            </div>
          </div>
          
          <div class="social-links">
            <h3>关注我们</h3>
            <div class="social-icons">
              <a href="#" class="social-icon" v-for="social in socialLinks" :key="social.name">
                {{ social.icon }}
              </a>
            </div>
          </div>
        </div>
        
        <div class="contact-form-card">
          <h2>发送消息</h2>
          <form @submit.prevent="submitForm" class="contact-form">
            <div class="form-group">
              <label for="name">姓名</label>
              <input 
                type="text" 
                id="name" 
                v-model="form.name" 
                required
                placeholder="请输入您的姓名"
              >
            </div>
            
            <div class="form-group">
              <label for="email">邮箱</label>
              <input 
                type="email" 
                id="email" 
                v-model="form.email" 
                required
                placeholder="请输入您的邮箱地址"
              >
            </div>
            
            <div class="form-group">
              <label for="subject">主题</label>
              <select id="subject" v-model="form.subject" required>
                <option value="">请选择主题</option>
                <option value="general">一般咨询</option>
                <option value="support">技术支持</option>
                <option value="business">商务合作</option>
                <option value="feedback">意见反馈</option>
              </select>
            </div>
            
            <div class="form-group">
              <label for="message">消息内容</label>
              <textarea 
                id="message" 
                v-model="form.message" 
                rows="5" 
                required
                placeholder="请详细描述您的问题或需求..."
              ></textarea>
            </div>
            
            <button type="submit" class="submit-btn" :disabled="isSubmitting">
              <span v-if="!isSubmitting">发送消息</span>
              <span v-else>发送中...</span>
            </button>
          </form>
        </div>
      </div>
      
      <div class="map-section">
        <h2>我们的位置</h2>
        <div class="map-placeholder">
          <div class="map-content">
            <div class="map-icon">📍</div>
            <h3>北京市朝阳区</h3>
            <p>某某街道123号，科技园区A座</p>
            <button class="directions-btn">获取路线</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const isSubmitting = ref(false)

const contactInfo = ref([
  {
    icon: '📧',
    title: '邮箱地址',
    value: 'contact@example.com',
    type: 'email'
  },
  {
    icon: '📞',
    title: '联系电话',
    value: '+86 123 4567 8900',
    type: 'phone'
  },
  {
    icon: '📍',
    title: '办公地址',
    value: '北京市朝阳区某某街道123号',
    type: 'address'
  },
  {
    icon: '🕒',
    title: '工作时间',
    value: '周一至周五 9:00-18:00',
    type: 'hours'
  }
])

const socialLinks = ref([
  { name: '微信', icon: '💬' },
  { name: '微博', icon: '📱' },
  { name: 'GitHub', icon: '🐙' },
  { name: 'LinkedIn', icon: '💼' }
])

const submitForm = async () => {
  isSubmitting.value = true
  
  // 模拟表单提交
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  alert('消息已发送！我们会尽快回复您。')
  form.value = { name: '', email: '', subject: '', message: '' }
  isSubmitting.value = false
}
</script>

<style scoped>
.contact {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.contact-hero {
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

.contact-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px;
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  margin-bottom: 60px;
}

.contact-info-card,
.contact-form-card {
  background: white;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.contact-info-card h2,
.contact-form-card h2 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 30px;
  color: #2c3e50;
  text-align: center;
}

.info-items {
  margin-bottom: 40px;
}

.info-item {
  display: flex;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid #ecf0f1;
}

.info-item:last-child {
  border-bottom: none;
}

.info-icon {
  font-size: 2rem;
  margin-right: 20px;
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.info-content h3 {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 5px;
  color: #2c3e50;
}

.info-content p {
  color: #7f8c8d;
  margin: 0;
}

.social-links h3 {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 20px;
  color: #2c3e50;
  text-align: center;
}

.social-icons {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.social-icon {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  text-decoration: none;
  transition: all 0.3s ease;
}

.social-icon:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-weight: 600;
  margin-bottom: 8px;
  color: #2c3e50;
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 15px;
  border: 2px solid #ecf0f1;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: #f8f9fa;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #667eea;
  background: white;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-group textarea {
  resize: vertical;
  min-height: 120px;
}

.submit-btn {
  padding: 15px 30px;
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 10px;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.map-section {
  text-align: center;
}

.map-section h2 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 40px;
  color: #2c3e50;
}

.map-placeholder {
  background: white;
  border-radius: 20px;
  padding: 60px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 0 auto;
}

.map-content {
  text-align: center;
}

.map-icon {
  font-size: 4rem;
  margin-bottom: 20px;
}

.map-content h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 10px;
  color: #2c3e50;
}

.map-content p {
  color: #7f8c8d;
  margin-bottom: 30px;
}

.directions-btn {
  padding: 12px 24px;
  background: linear-gradient(45deg, #ff6b6b, #ee5a24);
  color: white;
  border: none;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.directions-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(255, 107, 107, 0.3);
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
  
  .contact-grid {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  
  .contact-info-card,
  .contact-form-card {
    padding: 30px 20px;
  }
  
  .info-item {
    flex-direction: column;
    text-align: center;
  }
  
  .info-icon {
    margin-right: 0;
    margin-bottom: 15px;
  }
  
  .map-placeholder {
    padding: 40px 20px;
  }
}
</style> 