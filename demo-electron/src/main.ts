import { app, BrowserWindow, ipcMain } from 'electron';
import * as fs from 'fs';
import * as path from 'path';
import { DeviceInfoCollector } from './deviceInfo';
import { DeviceInfoHTTPServer } from './httpServer';

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
    width: 1000,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
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

// 设置IPC处理程序
const setupIpcHandlers = (): void => {
  // 处理获取设备信息的请求
  ipcMain.handle('get-device-info', async () => {
    try {
      console.log('🔍 正在获取设备信息...');
      const deviceInfo = await DeviceInfoCollector.getAllDeviceInfo();
      console.log('✅ 设备信息获取成功:', deviceInfo);
      return deviceInfo;
    } catch (error) {
      console.error('❌ 获取设备信息失败:', error);
      throw error;
    }
  });

  // 处理窗口控制请求
  ipcMain.handle('window-control', async (_event, action: string, value: any) => {
    try {
      console.log(`🖥️ 窗口控制请求: ${action} = ${value}`);
      
      switch (action) {
        case 'show':
          if (mainWindow) {
            mainWindow.show();
            mainWindow.focus();
            return { success: true, message: '窗口已显示' };
          }
          break;
          
        case 'hide':
          if (mainWindow) {
            mainWindow.hide();
            return { success: true, message: '窗口已隐藏' };
          }
          break;
          
        case 'minimize':
          if (mainWindow) {
            mainWindow.minimize();
            return { success: true, message: '窗口已最小化' };
          }
          break;
          
        case 'maximize':
          if (mainWindow) {
            if (mainWindow.isMaximized()) {
              mainWindow.unmaximize();
              return { success: true, message: '窗口已还原' };
            } else {
              mainWindow.maximize();
              return { success: true, message: '窗口已最大化' };
            }
          }
          break;
          
        case 'set-window-mode':
          if (value === 'background') {
            // 后台运行模式
            if (mainWindow) {
              mainWindow.hide();
              // 设置任务栏图标隐藏
              mainWindow.setSkipTaskbar(true);
            }
            return { success: true, message: '已切换到后台运行模式' };
          } else if (value === 'desktop') {
            // 桌面显示模式
            if (mainWindow) {
              mainWindow.show();
              mainWindow.setSkipTaskbar(false);
            }
            return { success: true, message: '已切换到桌面显示模式' };
          }
          break;
          
        default:
          return { success: false, message: '未知的操作类型' };
      }
      
      return { success: false, message: '操作失败' };
    } catch (error) {
      console.error('❌ 窗口控制失败:', error);
      throw error;
    }
  });

  // 定期更新设备信息（每30秒）
  // setInterval(async () => {
  //   if (mainWindow) {
  //     try {
  //       const deviceInfo = await DeviceInfoCollector.getAllDeviceInfo();
  //       mainWindow.webContents.send('device-info-update', deviceInfo);
  //       console.log('🔄 设备信息已更新');
  //     } catch (error) {
  //       console.error('❌ 更新设备信息失败:', error);
  //     }
  //   }
  // }, 300000);
};

// 启动HTTP服务器
let httpServer: DeviceInfoHTTPServer | null = null;

const startHTTPServer = async (): Promise<void> => {
  const ports = [3000, 3001, 3002, 3003, 3004, 3005];
  
  for (const port of ports) {
    try {
      console.log(`🚀 正在启动HTTP服务器，端口: ${port}...`);
      httpServer = new DeviceInfoHTTPServer(port, mainWindow); // 传递主窗口引用
      await httpServer.start();
      console.log(`✅ HTTP服务器启动成功，端口: ${port}`);
      
      // 验证服务器状态
      const status = httpServer.getStatus();
      console.log('📊 HTTP服务器状态:', status);
      
      // 设置全局变量，让测试页面知道实际使用的端口
      (global as any).HTTP_SERVER_PORT = port;
      
      return; // 成功启动，退出循环
      
    } catch (error) {
      console.error(`❌ 端口 ${port} 启动失败:`, error);
      if (httpServer) {
        httpServer.stop();
        httpServer = null;
      }
    }
  }
  
  console.error('❌ 所有端口都无法启动HTTP服务器');
};

app.whenReady().then(async () => {
  console.log('🎯 应用准备就绪，创建主窗口...');
  setupIpcHandlers();
  
  // 启动HTTP服务器
  await startHTTPServer();
  
  // 创建主窗口
  createWindow();
  
  // 更新HTTP服务器的主窗口引用
  if (httpServer && mainWindow) {
    httpServer.setMainWindow(mainWindow);
    console.log('✅ HTTP服务器主窗口引用已更新');
  }

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
      // 重新设置主窗口引用
      if (httpServer && mainWindow) {
        httpServer.setMainWindow(mainWindow);
      }
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    if (httpServer) {
      httpServer.stop();
    }
    app.quit();
  }
});

app.on('before-quit', () => {
  if (httpServer) {
    httpServer.stop();
  }
});
