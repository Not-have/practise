import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const menuItems = [
    { path: '/', label: '首页', icon: '🏠' },
    { path: '/one', label: '项目1', icon: 'ℹ️' },
    { path: '/two', label: '项目2', icon: '🛍️' },
  ];

  return (
    <div className="topbar">
      <div className="topbar-header">
        <h2>应用导航</h2>
      </div>
      <nav className="topbar-nav">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `topbar-nav-item ${isActive ? 'active' : ''}`
            }
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar; 