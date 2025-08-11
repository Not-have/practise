import styles from './Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>欢迎来到我们的应用</h1>
      <p className={styles.description}>
        这是一个使用 React Router 7 + TypeScript 构建的现代化 Web 应用。
      </p>
      
      <div className={styles.features}>
        <h2 className={styles.subtitle}>功能特色</h2>
        <div className={styles.featureGrid}>
          <div className={styles.featureItem}>
            <span className={styles.featureIcon}>⚛️</span>
            <span>现代化的 React 19 框架</span>
          </div>
          <div className={styles.featureItem}>
            <span className={styles.featureIcon}>📝</span>
            <span>TypeScript 支持</span>
          </div>
          <div className={styles.featureItem}>
            <span className={styles.featureIcon}>📱</span>
            <span>响应式设计</span>
          </div>
          <div className={styles.featureItem}>
            <span className={styles.featureIcon}>🎯</span>
            <span>左侧竖着展示的导航菜单</span>
          </div>
        </div>
      </div>
    </div>
  );
}