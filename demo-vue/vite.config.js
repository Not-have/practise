import { defineApplicationConfig } from '@vben/vite-config';
export default defineApplicationConfig({
    overrides: {
        optimizeDeps: {
            include: [
                'echarts/core',
                'echarts/charts',
                'echarts/components',
                'echarts/renderers',
                'qrcode',
                '@iconify/iconify',
                'ant-design-vue/es/locale/zh_CN',
                'ant-design-vue/es/locale/en_US'
            ]
        },
        server: {
            proxy: {},
            warmup: {
                clientFiles: ['./index.html', './src/{views,components}/*']
            }
        }
    }
});
