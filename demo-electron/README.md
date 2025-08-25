# Demo Electron with TypeScript

这是一个使用 TypeScript 的 Electron 项目。

## 项目结构

```
demo-electron/
├── src/           # TypeScript 源代码
│   └── main.ts   # 主进程代码
├── dist/          # 编译后的 JavaScript 代码
├── index.html     # 渲染进程 HTML
├── tsconfig.json  # TypeScript 配置
└── package.json   # 项目配置
```

## 安装依赖

```bash
npm install
```

## 开发命令

- `npm run build` - 编译 TypeScript 代码
- `npm run build:watch` - 监听文件变化并自动编译
- `npm start` - 构建并启动应用
- `npm run dev` - 开发模式（监听文件变化并自动重启）

## 开发流程

1. 在 `src/` 目录下编写 TypeScript 代码
2. 运行 `npm run build` 编译代码
3. 运行 `npm start` 启动应用

## TypeScript 特性

- 严格的类型检查
- 现代 ES2020 语法支持
- 源码映射支持
- 声明文件生成
