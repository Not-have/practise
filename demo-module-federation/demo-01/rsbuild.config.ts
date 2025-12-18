// rsbuild.config.ts
import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';
import { pluginReact } from '@rsbuild/plugin-react';
import { defineConfig } from '@rsbuild/core';

export default defineConfig({
  plugins: [
    pluginReact(),
    pluginModuleFederation({
      name: 'test-01',
      remotes: {
        remote1: 'remote1@http://localhost:3002/remoteEntry.js',
        // 避免别名前缀冲突，改成与 remote1 不相关的前缀
        Rc: 'remote@http://localhost:3001/remoteEntry.js',
      },
      bridge: {
        enableBridgeRouter: true,
      },
    }),
  ],
});
