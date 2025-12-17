import { Card, Space, Tag, Typography } from 'antd';

const Demo01 = () => (
  <Card title="Demo 01 页面" bordered={false}>
    <Space direction="vertical" size="middle">
      <Typography.Paragraph>
        这里是 Demo 01 示例页面，用于展示基础信息内容。
      </Typography.Paragraph>
      <Space size="small" wrap>
        <Tag color="blue">导航</Tag>
        <Tag color="green">展示</Tag>
        <Tag color="purple">示例</Tag>
      </Space>
      <Typography.Text type="secondary">
        通过顶部菜单可快速切换到其他页面。
      </Typography.Text>
    </Space>
  </Card>
);

export default Demo01;

