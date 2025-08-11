import { Link } from 'react-router-dom';
import styles from './index.module.css';

export default function NotFound() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404</h1>
      <p className={styles.description}>抱歉，您访问的页面不存在。</p>
      <Link to="/" className={styles.link}>
        返回首页
      </Link>
    </div>
  );
}