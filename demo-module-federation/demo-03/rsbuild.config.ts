import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';

// Docs: https://rsbuild.rs/config/
export default defineConfig({
  server: {
    port: 3002
  },
  plugins: [
    pluginReact(),
    pluginModuleFederation({
      name: 'remote1',
      filename: 'remoteEntry.js',
      exposes: {
        './export-app': './src/export-app.tsx', // 导出应用类型远程模块
      },
      shared: {
        react: { singleton: true, requiredVersion: '^19.2.3' },
        'react-dom': { singleton: true, requiredVersion: '^19.2.3' },
        antd: { singleton: true, requiredVersion: '^6.1.1' },
        '@ant-design/cssinjs': { singleton: true },
      },
      bridge: {
        // 启用 Bridge Router 路由能力，默认为 true
        enableBridgeRouter: true, 
      }
    }),
  ],
});
