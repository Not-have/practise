import "antd/dist/reset.css";
import { Link, Navigate, Route, Routes, useLocation } from 'react-router';
import { Layout as AntdLayout, Menu, type MenuProps } from 'antd';



import Demo01 from '../pages/demo-01';
import Demo02 from '../pages/demo-02';

const navItems = [
  { key: '/', label: 'Demo 01' },
  { key: '/demo-02', label: 'Demo 02' },
];

export default function Layout() {

  const { pathname } = useLocation();
  const selectedKey =
    navItems.find((item) => item.key !== '/' && pathname.startsWith(item.key))?.key || '/';

  const menuItems: MenuProps['items'] = navItems.map((item) => ({
    key: item.key,
    label: <Link to={item.key}>{item.label}</Link>,
  }));

  return <AntdLayout style={{ minHeight: '100%' }}>
    <AntdLayout.Header style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <Menu 
            theme="dark"
            mode="horizontal"
            selectedKeys={[selectedKey]}
            items={menuItems}
            style={{ flex: 1, minWidth: 0 }} />
    </AntdLayout.Header>

    <AntdLayout.Content style={{ padding: '24px' }}>
      <Routes>
        <Route path="/" element={<Demo01 />} />
        <Route path="/demo-02" element={<Demo02 />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AntdLayout.Content>
  </AntdLayout>
}
