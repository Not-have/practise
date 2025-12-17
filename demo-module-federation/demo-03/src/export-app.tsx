import App from './App';
import { createBridgeComponent } from '@module-federation/bridge-react';

// 使用 createBridgeComponent 将 App 包装为远程模块并导出
export default createBridgeComponent({
  rootComponent: App
});
