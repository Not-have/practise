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
  build: {
    // 确保输出格式兼容 micro-app
    target: 'es2015',
    // 禁用代码分割，生成单个文件
    rollupOptions: {
      output: {
        manualChunks: undefined,
        inlineDynamicImports: true,
      },
    },
    // 生成 UMD 格式，兼容性更好
    lib: {
      entry: 'src/main.ts',
      name: 'VueApp',
      formats: ['umd'],
      fileName: () => 'app.js'
    },
    // 确保 CSS 内联
    cssCodeSplit: false,
  },
  // 开发服务器配置
  server: {
    port: 5175,
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
})
