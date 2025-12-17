import { Link, Navigate, Route, Routes, useLocation } from 'react-router';
import { Layout, Menu, Typography } from 'antd';
import type { MenuProps } from 'antd';

import Demo01 from './pages/demo-01';
import Demo02 from './pages/demo-02';

const navItems = [
  { key: '/', label: '首页' },
  { key: '/demo-01', label: 'Demo 01' },
  { key: '/demo-02', label: 'Demo 02' },
];

const { Header, Content } = Layout;

const Home = () => (
  <>
    <Typography.Title level={5} style={{ marginBottom: 12 }}>
      欢迎来到 Demo 集合
    </Typography.Title>
    <Typography.Paragraph>
      使用顶部导航切换不同示例页面，查看各自的内容展示。
    </Typography.Paragraph>
  </>
);

const App = () => {
  const { pathname } = useLocation();
  const selectedKey =
    navItems.find((item) => item.key !== '/' && pathname.startsWith(item.key))?.key || '/';

  const menuItems: MenuProps['items'] = navItems.map((item) => ({
    key: item.key,
    label: <Link to={item.key}>{item.label}</Link>,
  }));

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <Typography.Title level={4} style={{ margin: 0, color: '#fff' }}>
          顶部导航示例
        </Typography.Title>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[selectedKey]}
          items={menuItems}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      <Content style={{ padding: '24px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/demo-01" element={<Demo01 />} />
          <Route path="/demo-02" element={<Demo02 />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Content>
    </Layout>
  );
};

export default App;
