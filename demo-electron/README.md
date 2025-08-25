# Demo Electron with TypeScript

这是一个使用 TypeScript 的 Electron 项目。

## 项目结构

```
demo-electron/
├── src/           # TypeScript 源代码
│   └── main.ts   # 主进程代码
├── dist/          # 编译后的 JavaScript 代码
├── index.html     # 渲染进程 HTML（独立文件）
├── tsconfig.json  # TypeScript 配置
└── package.json   # 项目配置
```

## 安装依赖

```bash
npm install
```

## 开发命令

- `npm run build` - 编译 TypeScript 代码
- `npm start` - 构建并启动应用
- `npm run dev` - 开发模式启动应用（推荐）
- `npm run watch` - 监听 TypeScript 文件变化并自动编译

## 开发流程

1. 在 `src/` 目录下编写 TypeScript 代码
2. 在根目录修改 `index.html` 文件（独立文件）
3. 运行 `npm run dev` 启动开发模式
4. 修改 HTML 文件后，窗口会自动刷新
5. 修改 TypeScript 代码后，会自动重新编译

## 特性说明

### HTML 文件独立性
- `index.html` 文件保持独立，不会被复制到 `dist/` 目录
- 修改 HTML 文件后，在开发模式下窗口会自动刷新
- 无需重新编译即可看到 HTML 更改

### TypeScript 支持
- 严格的类型检查
- 现代 ES2020 语法支持
- 源码映射支持
- 声明文件生成

### 开发模式
- 自动打开开发者工具
- HTML 文件变化监听
- 自动窗口刷新
- TypeScript 文件自动编译
- 详细的调试日志

## 故障排除

### 如果文件监听不工作

1. **检查环境变量**：
   确保使用 `npm run dev` 启动

2. **手动设置环境变量**：
   ```bash
   NODE_ENV=development ELECTRON_IS_DEV=true npm start
   ```

3. **检查控制台输出**：
   启动应用后查看控制台日志，确认监听状态

### 常见问题

- **路径问题**：确保 `index.html` 在项目根目录
- **权限问题**：某些系统可能需要特殊权限来监听文件
- **编辑器问题**：某些编辑器可能使用临时文件，导致监听失效

## 命令说明

| 命令 | 说明 | 使用场景 |
|------|------|----------|
| `npm run build` | 编译 TypeScript | 生产构建 |
| `npm start` | 构建并启动 | 生产环境 |
| `npm run dev` | 开发模式启动 | 日常开发（推荐） |
| `npm run watch` | 监听编译 | 仅编译时使用 |
