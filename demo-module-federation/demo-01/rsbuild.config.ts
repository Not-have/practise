import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { dependencies }  from './package.json';

export default defineConfig({
  server: {
    port: 3001
  },
  moduleFederation: {
    options: {
     name: 'host',
     remotes: {
       remote: 'remote@http://localhost:3000/remoteEntry.js',
     },
     shared: {
       ...dependencies,
       react: {
         singleton: true,
         requiredVersion: dependencies['react'],
       },
       'react-dom': {
         singleton: true,
         requiredVersion: dependencies['react-dom'],
       },
     },
    }
  },
  plugins: [pluginReact()]
});
