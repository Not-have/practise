// postcss.config.js
import postcssPxtorem from 'postcss-pxtorem'

export default {
  plugins: [
    postcssPxtorem({
      rootValue: 75, // 75表示750设计稿，37.5表示375设计稿
      rootValue: 16, // 1rem = 16px
      propList: ['*'], // 所有属性都转换
      minPixelValue: 2, // 小于 2px 不转换
      mediaQuery: false, // 是否转换媒体查询中的 px
    }),
  ],
}
