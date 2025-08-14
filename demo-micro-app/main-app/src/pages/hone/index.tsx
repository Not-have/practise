import { Link } from 'react-router-dom';
import './index.css';

const Home = () => {
  return (
    <div className="home-page">
      <div className="welcome-section">
        <h1 className="welcome-title">欢迎来到微应用</h1>
        <p className="welcome-subtitle">这是一个基于 React Router 的微应用示例</p>
        
        <div className="action-buttons">
          <Link to="/" className="action-btn home-btn">
            首页
          </Link>
          <Link to="/react-03" className="action-btn one-btn">
            react-03
          </Link>
          <Link to="/vue-02" className="action-btn two-btn">
            vue-02
          </Link>
        </div>
      </div>

      <div className="route-description">
        <h2 className="description-title">路由说明</h2>
        <div className="route-cards">
          <div className="route-card home-card">
            <h3 className="card-title">首页 (/)</h3>
            <p className="card-description">应用的主页面,包含导航链接</p>
          </div>
          <div className="route-card one-card">
            <h3 className="card-title">页面 One (/one)</h3>
            <p className="card-description">第一个功能页面,展示蓝色主题</p>
          </div>
          <div className="route-card two-card">
            <h3 className="card-title">页面 Two (/two)</h3>
            <p className="card-description">第二个功能页面,展示绿色主题</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;