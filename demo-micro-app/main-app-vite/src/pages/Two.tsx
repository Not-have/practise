const Two = () => {
  return (
    <div className="page-two">
      <div className="page-header">
        <h1>页面 Two</h1>
        <p>第二个功能页面，展示绿色主题</p>
      </div>
      
      <div className="content-section">
        <div className="feature-card">
          <h2>项目特色</h2>
          <ul>
            <li>Vue 3 技术栈</li>
            <li>组件化开发</li>
            <li>状态管理</li>
            <li>路由系统</li>
          </ul>
        </div>
        
        <div className="info-card">
          <h3>技术架构</h3>
          <p>采用 Vue 3 + Composition API + Pinia 状态管理，构建现代化的前端应用</p>
        </div>
      </div>
    </div>
  );
};

export default Two;
