// 客户端专用的 micro-app 初始化
let isInitialized = false;

export function initMicroApp() {
  // 避免重复初始化
  if (isInitialized) return;
  
  // 检查是否在客户端环境
  if (typeof window === "undefined") {
    return;
  }

  // 使用动态导入
  import("@micro-zoe/micro-app")
    .then((module) => {
      const microApp = module.default;
      
      // 配置 micro-app
      microApp.start({
        'router-mode': 'history',
        'disable-memory-router': true,
        'disable-patch-request': true
      });
      
      isInitialized = true;
      console.log("Micro-app initialized successfully");
    })
    .catch((error) => {
      console.warn("Failed to initialize micro-app:", error);
    });
}

// 默认导出
export default { initMicroApp }; 