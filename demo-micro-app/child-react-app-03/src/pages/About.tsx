import styles from './About.module.css';

export default function About() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>关于我们</h1>
      <p className={styles.description}>
        这是一个使用 React Router 7 + TypeScript 构建的现代化 Web 应用。
      </p>
      
      <div className={styles.techStack}>
        <h2 className={styles.subtitle}>技术栈</h2>
        <ul className={styles.techList}>
          <li className={styles.techItem}>
            <span className={styles.bullet}></span>
            React 19 - 用于构建用户界面的 JavaScript 库
          </li>
          <li className={styles.techItem}>
            <span className={styles.bullet}></span>
            TypeScript - 类型安全的 JavaScript
          </li>
          <li className={styles.techItem}>
            <span className={styles.bullet}></span>
            React Router 7 - 官方路由管理器
          </li>
          <li className={styles.techItem}>
            <span className={styles.bullet}></span>
            CSS Modules - 模块化的 CSS 解决方案
          </li>
          <li className={styles.techItem}>
            <span className={styles.bullet}></span>
            Vite - 快速构建工具
          </li>
        </ul>
      </div>
    </div>
  );
}