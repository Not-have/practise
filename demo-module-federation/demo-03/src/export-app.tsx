import App from './App';
import { BrowserRouter } from 'react-router';
import { createBridgeComponent } from '@module-federation/bridge-react/v19';

// 包装一层 Router，避免远程被宿主消费时缺少路由上下文
const RemoteApp = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default createBridgeComponent({
  rootComponent: RemoteApp,
});
