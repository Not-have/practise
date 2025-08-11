import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const menuItems = [
    { path: '/', label: '首页', icon: '🏠' },
    { path: '/one', label: '页面 One', icon: '📄' },
    { path: '/two', label: '页面 Two', icon: '📄' },
  ];

  return (
    <div className="topbar">
      <div className="topbar-header">
        <h2>Demo</h2>
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