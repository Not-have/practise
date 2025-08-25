import { createServer, IncomingMessage, ServerResponse } from 'http';
import { URL } from 'url';
import { DeviceInfoCollector } from './deviceInfo';

export class DeviceInfoHTTPServer {
  private server: any;
  private port: number;
  private isRunning: boolean = false;
  private mainWindow: any; // 主窗口引用

  constructor(port: number = 3000, mainWindow?: any) {
    this.port = port;
    this.mainWindow = mainWindow;
  }

  /**
   * 启动HTTP服务器
   */
  start(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.isRunning) {
        console.log('✅ HTTP服务器已经在运行');
        resolve();
        return;
      }

      try {
        console.log(`🚀 正在启动HTTP服务器，端口: ${this.port}`);
        
        this.server = createServer(this.handleRequest.bind(this));

        // 绑定到localhost，确保可以访问
        this.server.listen(this.port, '127.0.0.1', () => {
          this.isRunning = true;
          console.log(`🌐 HTTP服务器已启动，端口: ${this.port}`);
          console.log(`📡 API地址: http://localhost:${this.port}`);
          resolve();
        });

        this.server.on('error', (error: any) => {
          console.error('❌ HTTP服务器错误:', error);
          
          if (error.code === 'EADDRINUSE') {
            console.log(`⚠️ 端口 ${this.port} 已被占用，尝试使用端口 ${this.port + 1}`);
            this.port += 1;
            // 避免无限递归
            if (this.port < 3010) {
              this.start().then(resolve).catch(reject);
            } else {
              reject(new Error('无法找到可用端口'));
            }
          } else {
            console.error('❌ HTTP服务器启动失败:', error);
            reject(error);
          }
        });

      } catch (error) {
        console.error('❌ 创建HTTP服务器失败:', error);
        reject(error);
      }
    });
  }

  /**
   * 停止HTTP服务器
   */
  stop(): void {
    if (this.server && this.isRunning) {
      this.server.close();
      this.isRunning = false;
      console.log('🛑 HTTP服务器已停止');
    }
  }

  /**
   * 处理HTTP请求
   */
  private async handleRequest(req: IncomingMessage, res: ServerResponse): Promise<void> {
    try {
      // 设置CORS头
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
      res.setHeader('Content-Type', 'application/json; charset=utf-8');

      // 处理OPTIONS预检请求
      if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
      }

      const url = new URL(req.url || '/', `http://${req.headers.host}`);
      const path = url.pathname;

      console.log(`📥 HTTP请求: ${req.method} ${path}`);

      // 路由处理
      switch (path) {
        case '/':
          this.handleRoot(req, res);
          break;
        case '/api/device-info':
          await this.handleDeviceInfo(req, res);
          break;
        case '/api/network':
          await this.handleNetworkInfo(req, res);
          break;
        case '/api/cpu':
          await this.handleCPUInfo(req, res);
          break;
        case '/api/disk':
          await this.handleDiskInfo(req, res);
          break;
        case '/api/motherboard':
          await this.handleMotherboardInfo(req, res);
          break;
        case '/api/bios':
          await this.handleBIOSInfo(req, res);
          break;
        case '/api/config':
          await this.handleConfig(req, res);
          break;
        case '/api/health':
          this.handleHealth(req, res);
          break;
        default:
          this.handleNotFound(req, res);
      }
    } catch (error) {
      console.error('❌ 处理HTTP请求失败:', error);
      this.sendError(res, 500, 'Internal Server Error');
    }
  }

  /**
   * 处理根路径
   */
  private handleRoot(_req: IncomingMessage, res: ServerResponse): void {
    const html = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>设备信息API</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        .endpoint { background: #f5f5f5; padding: 15px; margin: 10px 0; border-radius: 5px; }
        .method { background: #007bff; color: white; padding: 2px 8px; border-radius: 3px; font-size: 12px; }
        .url { font-family: monospace; color: #333; }
        .description { color: #666; margin-top: 5px; }
    </style>
</head>
<body>
    <h1>🖥️ 设备信息API服务</h1>
    <p>这是一个HTTP API服务，提供设备硬件信息查询功能。</p>
    
    <h2>📡 可用接口</h2>
    
    <div class="endpoint">
        <span class="method">GET</span>
        <span class="url">/api/device-info</span>
        <div class="description">获取所有设备信息</div>
    </div>
    
    <div class="endpoint">
        <span class="method">GET</span>
        <span class="url">/api/network</span>
        <div class="description">获取网卡信息</div>
    </div>
    
    <div class="endpoint">
        <span class="method">GET</span>
        <span class="url">/api/cpu</span>
        <div class="description">获取CPU信息</div>
    </div>
    
    <div class="endpoint">
        <span class="method">GET</span>
        <span class="url">/api/disk</span>
        <div class="description">获取硬盘信息</div>
    </div>
    
    <div class="endpoint">
        <span class="method">GET</span>
        <span class="url">/api/motherboard</span>
        <div class="description">获取主板信息</div>
    </div>
    
    <div class="endpoint">
        <span class="method">GET</span>
        <span class="url">/api/bios</span>
        <div class="description">获取BIOS信息</div>
    </div>
    
    <div class="endpoint">
        <span class="method">GET</span>
        <span class="url">/api/config</span>
        <div class="description">获取应用配置</div>
    </div>
    
    <div class="endpoint">
        <span class="method">POST</span>
        <span class="url">/api/config?action=show</span>
        <div class="description">显示窗口</div>
    </div>
    
    <div class="endpoint">
        <span class="method">POST</span>
        <span class="url">/api/config?action=hide</span>
        <div class="description">隐藏窗口</div>
    </div>
    
    <div class="endpoint">
        <span class="method">POST</span>
        <span class="url">/api/config?action=minimize</span>
        <div class="description">最小化窗口</div>
    </div>
    
    <div class="endpoint">
        <span class="method">POST</span>
        <span class="url">/api/config?action=restore</span>
        <div class="description">还原窗口</div>
    </div>
    
    <div class="endpoint">
        <span class="method">GET</span>
        <span class="url">/api/health</span>
        <div class="description">健康检查</div>
    </div>
    
    <h2>🧪 测试示例</h2>
    <p>在浏览器中访问 <a href="/api/device-info">/api/device-info</a> 来测试API</p>
    
    <h2>📚 使用说明</h2>
    <p>你可以通过HTTP GET请求来获取设备信息，支持跨域访问。</p>
    <p>示例：<code>fetch('http://localhost:${this.port}/api/device-info')</code></p>
</body>
</html>`;
    
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(html);
  }

  /**
   * 处理设备信息请求
   */
  private async handleDeviceInfo(_req: IncomingMessage, res: ServerResponse): Promise<void> {
    try {
      const deviceInfo = await DeviceInfoCollector.getAllDeviceInfo();
      this.sendSuccess(res, deviceInfo);
    } catch (error) {
      console.error('获取设备信息失败:', error);
      this.sendError(res, 500, 'Failed to get device info');
    }
  }

  /**
   * 处理网卡信息请求
   */
  private async handleNetworkInfo(_req: IncomingMessage, res: ServerResponse): Promise<void> {
    try {
      const networkCards = await DeviceInfoCollector.getNetworkCards();
      this.sendSuccess(res, { networkCards });
    } catch (error) {
      console.error('获取网卡信息失败:', error);
      this.sendError(res, 500, 'Failed to get network info');
    }
  }

  /**
   * 处理CPU信息请求
   */
  private async handleCPUInfo(_req: IncomingMessage, res: ServerResponse): Promise<void> {
    try {
      const cpuId = await DeviceInfoCollector.getCPUID();
      this.sendSuccess(res, { cpuId });
    } catch (error) {
      console.error('获取CPU信息失败:', error);
      this.sendError(res, 500, 'Failed to get CPU info');
    }
  }

  /**
   * 处理硬盘信息请求
   */
  private async handleDiskInfo(_req: IncomingMessage, res: ServerResponse): Promise<void> {
    try {
      const diskSerial = await DeviceInfoCollector.getDiskSerial();
      this.sendSuccess(res, { diskSerial });
    } catch (error) {
      console.error('获取硬盘信息失败:', error);
      this.sendError(res, 500, 'Failed to get disk info');
    }
  }

  /**
   * 处理主板信息请求
   */
  private async handleMotherboardInfo(_req: IncomingMessage, res: ServerResponse): Promise<void> {
    try {
      const motherboardUUID = await DeviceInfoCollector.getMotherboardUUID();
      this.sendSuccess(res, { motherboardUUID });
    } catch (error) {
      console.error('获取主板信息失败:', error);
      this.sendError(res, 500, 'Failed to get motherboard info');
    }
  }

  /**
   * 处理BIOS信息请求
   */
  private async handleBIOSInfo(_req: IncomingMessage, res: ServerResponse): Promise<void> {
    try {
      const biosSerial = await DeviceInfoCollector.getBIOSSerial();
      this.sendSuccess(res, { biosSerial });
    } catch (error) {
      console.error('获取BIOS信息失败:', error);
      this.sendError(res, 500, 'Failed to get BIOS info');
    }
  }

  /**
   * 处理配置请求
   */
  private async handleConfig(req: IncomingMessage, res: ServerResponse): Promise<void> {
    try {
      const url = new URL(req.url || '/', `http://${req.headers.host}`);
      const action = url.searchParams.get('action');

      console.log(`📋 配置请求: action=${action}`);

      if (req.method === 'GET') {
        // 获取当前配置
        const config = await this.getCurrentConfig();
        this.sendSuccess(res, config);
      } else if (req.method === 'POST') {
        // 执行窗口控制操作
        const result = await this.executeWindowAction(action);
        this.sendSuccess(res, result);
      } else {
        this.sendError(res, 405, 'Method not allowed');
      }
    } catch (error) {
      console.error('处理配置请求失败:', error);
      this.sendError(res, 500, 'Failed to handle config request');
    }
  }

  /**
   * 处理健康检查请求
   */
  private handleHealth(_req: IncomingMessage, res: ServerResponse): void {
    this.sendSuccess(res, {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      service: 'Device Info API',
      version: '1.0.0'
    });
  }

  /**
   * 处理404错误
   */
  private handleNotFound(_req: IncomingMessage, res: ServerResponse): void {
    this.sendError(res, 404, 'Endpoint not found');
  }

  /**
   * 发送成功响应
   */
  private sendSuccess(res: ServerResponse, data: any): void {
    res.writeHead(200);
    res.end(JSON.stringify({
      success: true,
      data,
      timestamp: new Date().toISOString()
    }, null, 2));
  }

  /**
   * 发送错误响应
   */
  private sendError(res: ServerResponse, statusCode: number, message: string): void {
    res.writeHead(statusCode);
    res.end(JSON.stringify({
      success: false,
      error: message,
      timestamp: new Date().toISOString()
    }, null, 2));
  }

  /**
   * 获取服务器状态
   */
  getStatus(): { isRunning: boolean; port: number } {
    return {
      isRunning: this.isRunning,
      port: this.port
    };
  }

  /**
   * 设置主窗口引用
   */
  setMainWindow(window: any): void {
    this.mainWindow = window;
    console.log('🖥️ HTTP服务器主窗口引用已设置');
  }

  /**
   * 获取当前配置
   */
  private async getCurrentConfig(): Promise<any> {
    // 这里应该从主进程获取配置，暂时返回默认值
    return {
      windowMode: 'desktop', // 'desktop' 或 'background'
      autoStart: true,
      showInTaskbar: true,
      minimizeToTray: false
    };
  }

  /**
   * 执行窗口控制操作
   */
  private async executeWindowAction(action: string | null): Promise<any> {
    if (!action) {
      throw new Error('Missing action parameter');
    }

    console.log(`🖥️ 执行窗口操作: ${action}`);

    // 检查是否有主窗口引用
    if (!this.mainWindow) {
      throw new Error('主窗口引用不可用');
    }

    try {
      switch (action) {
        case 'show':
          this.mainWindow.show();
          this.mainWindow.focus();
          console.log('✅ 窗口已显示');
          return {
            action,
            status: 'success',
            message: '窗口已显示'
          };
          
        case 'hide':
          this.mainWindow.hide();
          console.log('✅ 窗口已隐藏');
          return {
            action,
            status: 'success',
            message: '窗口已隐藏'
          };
          
        case 'minimize':
          this.mainWindow.minimize();
          console.log('✅ 窗口已最小化');
          return {
            action,
            status: 'success',
            message: '窗口已最小化'
          };
          
        case 'restore':
          if (this.mainWindow.isMinimized()) {
            this.mainWindow.restore();
            console.log('✅ 窗口已还原');
          } else {
            this.mainWindow.show();
            console.log('✅ 窗口已显示');
          }
          return {
            action,
            status: 'success',
            message: '窗口已还原'
          };
          
        default:
          throw new Error(`未知的操作类型: ${action}`);
      }
    } catch (error: any) {
      console.error('❌ 窗口操作失败:', error);
      throw new Error(`窗口操作失败: ${error.message}`);
    }
  }
}
