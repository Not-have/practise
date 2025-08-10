const One = () => {
  return (
    <div className="page-one">
      <div className="page-header">
        <h1>页面 One</h1>
        <p>第一个功能页面，展示蓝色主题</p>
      </div>
      
      <div className="content-section">
        <div className="feature-card">
          <h2>功能特色</h2>
          <ul>
            <li>现代化的 React 框架</li>
            <li>TypeScript 支持</li>
            <li>响应式设计</li>
            <li>微前端架构</li>
          </ul>
        </div>
        
        <div className="info-card">
          <h3>技术栈</h3>
          <p>基于 React + TypeScript + Vite 构建，采用现代化的开发工具链</p>
        </div>
      </div>
    </div>
  );
};

export default One;
