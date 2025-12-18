import { Layout as AntdLayout, Menu } from 'antd';

export default function Layout() {
  return <AntdLayout style={{ minHeight: '100vh' }}>
    <Menu
      theme="dark"
      mode="horizontal"
      style={{ flex: 1, minWidth: 0 }}
    />
  </AntdLayout>
}
