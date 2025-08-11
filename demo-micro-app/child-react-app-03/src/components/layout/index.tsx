import { Outlet } from 'react-router-dom';
import Navigation from '../navigation';
import styles from './index.module.css';

export default function Layout() {
  return (
    <div className={styles.layout}>
      <Navigation />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}