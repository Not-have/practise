# demo-react-native-087

这是一个基于 Expo / React Native 的入门示例项目。项目使用 Expo Router 做页面路由，并同时支持 iOS、Android 和 Web。

## 目录结构说明

```text
.
├── app.json                  # Expo 应用配置，例如应用名称、图标、启动屏、插件等
├── package.json              # 项目依赖和 npm scripts，例如 start / ios / android / web
├── tsconfig.json             # TypeScript 配置，包含 @/* 路径别名
├── assets/                   # 图片、图标、启动屏等静态资源
│   ├── expo.icon/            # iOS 图标资源配置
│   └── images/               # App 中使用的图片资源
├── scripts/                  # 项目辅助脚本
│   └── reset-project.js      # 重置示例项目用的脚本
└── src/                      # 主要源码目录
    ├── app/                  # Expo Router 页面目录：文件名会自动变成路由
    │   ├── _layout.tsx       # 根布局，负责主题、启动动画、Tab 导航
    │   ├── index.tsx         # 首页，对应路由 /
    │   └── explore.tsx       # Explore 页面，对应路由 /explore
    ├── components/           # 可复用 UI 组件
    │   ├── app-tabs.tsx      # iOS / Android 使用的原生 Tab 导航
    │   ├── app-tabs.web.tsx  # Web 使用的 Tab 导航
    │   ├── animated-icon.tsx # iOS / Android 首页图标和启动动画
    │   ├── animated-icon.web.tsx
    │   │                     # Web 首页图标实现
    │   ├── themed-text.tsx   # 自动适配主题色的文字组件
    │   ├── themed-view.tsx   # 自动适配主题色的 View 组件
    │   └── ui/               # 更基础的 UI 小组件
    ├── constants/            # 常量配置
    │   └── theme.ts          # 颜色、字体、间距等主题配置
    ├── hooks/                # 自定义 React Hooks
    │   ├── use-theme.ts      # 根据系统浅色/深色模式返回主题颜色
    │   ├── use-color-scheme.ts
    │   │                     # 原生端读取系统主题
    │   └── use-color-scheme.web.ts
    │                         # Web 端读取系统主题，兼容静态渲染
    └── global.css            # Web 端全局样式
```

## 初学者阅读顺序

如果你是第一次学习 React Native，可以按这个顺序看：

1. `src/app/_layout.tsx`：先理解整个 App 的外层结构。
2. `src/app/index.tsx`：再看首页是如何由组件拼出来的。
3. `src/components/themed-text.tsx` 和 `src/components/themed-view.tsx`：理解项目如何封装通用组件。
4. `src/constants/theme.ts`：了解颜色、间距、字体这些 UI 常量从哪里来。
5. `src/app/explore.tsx`：最后看更完整的页面示例，包括滚动、链接、图片和折叠面板。

## 常用命令

```bash
npm install
npm run start
npm run ios
npm run android
npm run web
```

其中 `npm run start` 会启动 Expo 开发服务器，然后你可以根据终端提示选择打开 iOS、Android 或 Web。
