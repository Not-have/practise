import { contextBridge, ipcRenderer } from 'electron';

// 暴露安全的API给渲染进程
contextBridge.exposeInMainWorld('electronAPI', {
  // 获取设备信息
  getDeviceInfo: () => ipcRenderer.invoke('get-device-info'),
  
  // 监听设备信息更新
  onDeviceInfoUpdate: (callback: (data: any) => void) => {
    ipcRenderer.on('device-info-update', (_event, data) => callback(data));
  },
  
  // 移除监听器
  removeDeviceInfoListener: () => {
    ipcRenderer.removeAllListeners('device-info-update');
  }
});

// 类型声明
declare global {
  interface Window {
    electronAPI: {
      getDeviceInfo: () => Promise<any>;
      onDeviceInfoUpdate: (callback: (data: any) => void) => void;
      removeDeviceInfoListener: () => void;
    };
  }
}
