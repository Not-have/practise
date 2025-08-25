import { app, BrowserWindow } from 'electron';
import * as fs from 'fs';
import * as path from 'path';

let mainWindow: BrowserWindow | null = null;

// 改进环境变量检测
const isDev = process.env.NODE_ENV === 'development' || 
              process.env.ELECTRON_IS_DEV === 'true' ||
              !app.isPackaged;

console.log('🔍 环境检测结果:');
console.log('  NODE_ENV:', process.env.NODE_ENV);
console.log('  ELECTRON_IS_DEV:', process.env.ELECTRON_IS_DEV);
console.log('  app.isPackaged:', app.isPackaged);
console.log('  isDev:', isDev);
console.log('  __dirname:', __dirname);
console.log('  process.cwd():', process.cwd());

const createWindow = (): void => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 700,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  // 加载 HTML 文件（从项目根目录）
  mainWindow.loadFile('index.html');

  // 开发模式下打开开发者工具
  if (isDev) {
    console.log('🚀 开发模式已启用');
    mainWindow.webContents.openDevTools();
    
    // 监听 HTML 文件变化
    watchHtmlFile();
  } else {
    console.log('🏭 生产模式运行');
  }

  // 窗口关闭时清理引用
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

// 监听 HTML 文件变化
const watchHtmlFile = (): void => {
  if (!isDev || !mainWindow) {
    console.log('❌ 无法启动文件监听:', { isDev, hasWindow: !!mainWindow });
    return;
  }

  // 尝试多个可能的路径
  const possiblePaths = [
    path.resolve(__dirname, '..', 'index.html'),           // 从 dist 目录向上
    path.resolve(process.cwd(), 'index.html'),             // 从当前工作目录
    path.join(process.cwd(), 'index.html'),                // 相对路径
    path.resolve(__dirname, '..', '..', 'index.html')      // 更深层的向上查找
  ];

  console.log('🔍 尝试查找 HTML 文件路径:');
  possiblePaths.forEach((p, i) => {
    console.log(`  ${i + 1}. ${p} - ${fs.existsSync(p) ? '✅ 存在' : '❌ 不存在'}`);
  });

  // 找到存在的路径
  const htmlPath = possiblePaths.find(p => fs.existsSync(p));
  
  if (!htmlPath) {
    console.error('❌ 无法找到 HTML 文件');
    return;
  }

  console.log('📁 使用 HTML 文件路径:', htmlPath);
  
  try {
    // 使用 fs.watch 替代 fs.watchFile，更可靠
    const watcher = fs.watch(htmlPath, (eventType, filename) => {
      if (eventType === 'change') {
        console.log('🔄 HTML 文件已更新，刷新窗口...');
        console.log('  事件类型:', eventType);
        console.log('  文件名:', filename);
        console.log('  时间:', new Date().toISOString());
        
        // 延迟一下再刷新，确保文件写入完成
        setTimeout(() => {
          mainWindow?.webContents.reload();
        }, 100);
      }
    });

    console.log('✅ 正在监听 HTML 文件变化...');
    console.log('  文件路径:', htmlPath);
    console.log('  监听器类型:', watcher.constructor.name);
    console.log('  当前时间:', new Date().toISOString());

    // 保存监听器引用，以便后续清理
    (mainWindow as any).htmlWatcher = watcher;

  } catch (error) {
    console.error('❌ 启动文件监听失败:', error);
    
    // 回退到 fs.watchFile
    console.log('🔄 尝试使用 fs.watchFile 作为备选方案...');
    try {
      fs.watchFile(htmlPath, (curr, prev) => {
        if (curr.mtime > prev.mtime) {
          console.log('🔄 HTML 文件已更新 (watchFile)，刷新窗口...');
          mainWindow?.webContents.reload();
        }
      });
      console.log('✅ 使用 fs.watchFile 监听成功');
    } catch (fallbackError) {
      console.error('❌ 备选监听方案也失败了:', fallbackError);
    }
  }
};

app.whenReady().then(() => {
  console.log('🎯 应用准备就绪，创建主窗口...');
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
