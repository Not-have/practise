import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';

// Docs: https://rsbuild.rs/config/
export default defineConfig({
  plugins: [
    pluginReact(),
    pluginModuleFederation({
      name: 'remote1',
      exposes: {
        './export-app': './src/export-app.tsx', // 导出应用类型远程模块
      },
      bridge: {
        // 启用 Bridge Router 路由能力，默认为 true
        enableBridgeRouter: true, 
      }
    }),
  ],
});
