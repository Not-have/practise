import { defineConfig } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';
import Unocss from 'unocss/vite';
import AutoImport from 'unplugin-auto-import/vite';
import commonjs from '@rollup/plugin-commonjs';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    uni(),
    Unocss(),
    commonjs(),
    AutoImport({
      dts: 'src/auto-imports.d.ts',
      imports: ['uni-app'], // 自动引入哪些内容
      dirs: ['src/']
    })
    /*
        {
            name: 'public-popup', // 插件名称
            enforce: 'pre', // 插件的执行顺序, 我们需要再vite的核心插件前执行
            // vite提供的钩子, 处理每个文件的时候都会触发一次改钩子
            // code: string 为文件数据
            // id: string 为文件路径
            transform(code, id) {
                // 过滤出位于 pages 或 pages-Xx 目录下的 .vue 文件
                if (/pages(-[^\/]+)?\/[^\/]+\/index\.vue$/.test(id)) {
                    const templateMatch = code.match(/<template[^>]*>[\s\S]+?<\/template>/);
                    if (templateMatch) {
                        const regex = /\/src(?:-[\w-]+)?\/(.+?)\.vue/;
                        const match = id.match(regex);
                        if (!match) return;

                        const templateCode = templateMatch[0];
                        // 在模板代码后面添加全局组件
                        const updatedTemplate = templateCode.replace(
                            // public-popup 是在 main.ts 中写入的全局引用 app.component('public-popup', PublicPopup); 
                            '</template>',
                            `
                                <public-popup eventBusName='/${match[1]}' />
                            </template>`
                        );
                        // 将更新后的模板代码替换原始代码中的模板部分
                        code = code.replace(templateCode, updatedTemplate);
                    }

                    return code;
                }
            }
        }
        */
  ]
});
