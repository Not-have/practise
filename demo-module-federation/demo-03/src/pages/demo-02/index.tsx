import { Alert, Card, List, Typography } from 'antd';

const highlights = [
  'React Router 顶部导航',
  '使用 antd 组件展示列表',
  '可与其他页面切换',
];

const Demo02 = () => (
  <Card title="Demo 02 页面" bordered={false}>
    <Alert
      message="提示"
      description="Demo 02 用来展示更丰富的内容布局。"
      type="info"
      showIcon
    />
    <Typography.Paragraph style={{ marginTop: 16 }}>
      这是第二个示例页面，可以放置表格、列表或其他需要的组件。
    </Typography.Paragraph>
    <List
      header="页面要点"
      dataSource={highlights}
      renderItem={(item) => <List.Item>{item}</List.Item>}
      bordered
    />
  </Card>
);

export default Demo02;

