import { useState } from 'react';
import styles from './index.module.css';

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

export default function Contact() {
  const [form, setForm] = useState<ContactForm>({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 这里可以添加表单提交逻辑
    alert('消息已发送！');
    setForm({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>联系我们</h1>
      <p className={styles.description}>如果您有任何问题或建议，请随时联系我们。</p>
      
      <div className={styles.content}>
        {/* 联系信息 */}
        <div className={styles.infoSection}>
          <h2 className={styles.subtitle}>联系信息</h2>
          <ul className={styles.infoList}>
            <li className={styles.infoItem}>
              <span className={styles.infoIcon}>✉️</span>
              <span><strong>邮箱：</strong> contact@example.com</span>
            </li>
            <li className={styles.infoItem}>
              <span className={styles.infoIcon}>📞</span>
              <span><strong>电话：</strong> +86 123 4567 8900</span>
            </li>
            <li className={styles.infoItem}>
              <span className={styles.infoIcon}>📍</span>
              <span><strong>地址：</strong> 北京市朝阳区某某街道123号</span>
            </li>
          </ul>
        </div>

        {/* 联系表单 */}
        <div className={styles.formSection}>
          <h2 className={styles.subtitle}>发送消息</h2>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.label}>
                姓名
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                邮箱
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="message" className={styles.label}>
                消息
              </label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={4}
                className={styles.textarea}
              />
            </div>
            <button
              type="submit"
              className={styles.submitButton}
            >
              发送消息
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}