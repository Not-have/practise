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
      },
      bridge: {
        enableBridgeRouter: true,
      },
    }),
  ],
});
