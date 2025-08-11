import { Link, useLocation } from 'react-router-dom';
import styles from './Navigation.module.css';

interface MenuItem {
  name: string;
  path: string;
  icon: string;
}

const menuItems: MenuItem[] = [
  { name: '首页', path: '/', icon: '🏠' },
  { name: '关于', path: '/about', icon: 'ℹ️' },
  { name: '产品', path: '/products', icon: '📦' },
  { name: '联系', path: '/contact', icon: '📞' },
];

export function Navigation() {
  const location = useLocation();
  
  return (
    <nav className={styles.nav}>
      <ul className={styles.menu}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <li key={item.path} className={styles.menuItem}>
              <Link
                to={item.path}
                className={`${styles.link} ${isActive ? styles.active : ''}`}
              >
                <span className={styles.icon}>{item.icon}</span>
                <span className={styles.text}>{item.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}