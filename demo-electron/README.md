# 设备信息监控器 - Electron应用

这是一个基于Electron的设备信息监控应用，可以实时获取和显示您的设备硬件信息。

## 🚀 功能特性

- **网卡信息**: 获取所有网卡的MAC地址和类型
- **CPU信息**: 获取CPU ID和型号信息
- **硬盘信息**: 获取硬盘序列号
- **主板信息**: 获取主板smBIOS UUID
- **BIOS信息**: 获取BIOS序列号
- **实时更新**: 每30秒自动更新设备信息
- **跨平台支持**: 支持Windows、macOS和Linux

## 🛠️ 技术架构

- **主进程**: 负责设备信息获取和IPC通信
- **预加载脚本**: 安全地暴露API给渲染进程
- **渲染进程**: 现代化的Web界面展示设备信息
- **设备信息模块**: 跨平台硬件信息获取

## 项目结构

```
demo-electron/
├── src/                    # TypeScript 源代码
│   ├── main.ts            # 主进程代码
│   ├── preload.ts         # 预加载脚本
│   └── deviceInfo.ts      # 设备信息获取模块
├── dist/                   # 编译后的 JavaScript 代码
├── index.html              # 渲染进程 HTML（独立文件）
├── tsconfig.json           # TypeScript 配置
└── package.json            # 项目配置
```

## 📦 安装和运行

### 1. 安装依赖
```bash
npm install
```

### 2. 构建项目
```bash
npm run build
```

### 3. 启动应用
```bash
# 开发模式（支持热重载）
npm run dev

# 生产模式
npm start
```

## 开发命令

- `npm run build` - 编译 TypeScript 代码
- `npm start` - 构建并启动应用
- `npm run dev` - 开发模式启动应用（推荐）
- `npm run watch` - 监听 TypeScript 文件变化并自动编译

## 🔧 开发说明

### 项目结构
```
demo-electron/
├── src/
│   ├── main.ts              # 主进程入口
│   ├── preload.ts           # 预加载脚本
│   └── deviceInfo.ts        # 设备信息获取模块
├── dist/                    # 编译输出目录
├── index.html               # 主界面
└── package.json
```

### 设备信息获取

应用使用系统命令来获取硬件信息：

- **Windows**: 使用`wmic`命令
- **macOS**: 使用`system_profiler`、`ifconfig`等命令
- **Linux**: 使用`cat`、`ip`等命令

### 安全特性

- 使用`contextIsolation`确保渲染进程安全
- 通过预加载脚本暴露有限的API
- 禁用`nodeIntegration`防止安全风险

## 🌐 界面特性

- 响应式设计，支持不同屏幕尺寸
- 现代化UI设计，使用CSS Grid和Flexbox
- 实时状态指示器
- 优雅的加载动画和错误处理

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

## ⚠️ 注意事项

1. **权限要求**: 某些硬件信息获取可能需要管理员权限
2. **平台差异**: 不同操作系统的命令输出格式可能不同
3. **性能考虑**: 设备信息每30秒更新一次，避免频繁查询

## 🔍 故障排除

### 常见问题

1. **设备信息获取失败**
   - 检查应用是否有足够权限
   - 确认系统命令是否可用

2. **编译错误**
   - 运行`npm run build`查看详细错误信息
   - 确认TypeScript版本兼容性

3. **界面显示异常**
   - 检查浏览器控制台错误信息
   - 确认预加载脚本是否正确加载

4. **路径问题**：确保 `index.html` 在项目根目录
5. **权限问题**：某些系统可能需要特殊权限来监听文件
6. **编辑器问题**：某些编辑器可能使用临时文件，导致监听失效

## 📝 许可证

ISC License
