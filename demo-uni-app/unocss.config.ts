/**
 * docs:
 * https://alfred-skyblue.github.io/unocss-docs-cn/
 * https://juejin.cn/post/7259586263247863865
 * https://github.com/MellowCo/unocss-preset-weapp
 */
import presetWeapp from 'unocss-preset-weapp';
import { defineConfig } from 'unocss';
import { transformerAttributify, transformerClass } from 'unocss-preset-weapp/transformer';

// 可以写属性会自动增加class,也可以写class
const prefix = "uno-"
export default defineConfig({
    // 配置 UnoCSS 以适配微信小程序的样式编写规范和限制
    presets: [
        presetWeapp({ prefix }) // 工具预设
    ],
    // 是 UnoCSS 的转换器，用于处理 CSS 类名和属性化类名之间的转换
    transformers: [
        transformerAttributify(), // 支持属性化模式
        transformerClass() // 转换转义类名，支持class写法
    ],
    // 定义快捷方式
    shortcuts: [
        { center: 'flex items-center justify-center' },
        { around: 'flex items-center justify-around' },
        { between: 'flex items-center justify-between' }
    ],
    rules: [['border-box', { 'box-sizing': 'border-box' }]]
});
