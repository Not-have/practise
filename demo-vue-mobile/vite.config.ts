import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  // 配置代理
  server: {
    proxy: {
      '/image-proxy': {
        target: 'https://images21.douhuomall.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/image-proxy/, ''),
        configure: (proxy, options) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            proxyReq.setHeader('Referer', 'https://www.douhuomall.com');
            proxyReq.setHeader('X-Forwarded-Host', 'www.douhuomall.com');
          });
        },
      }
    },
  },
})
