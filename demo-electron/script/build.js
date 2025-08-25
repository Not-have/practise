#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');

console.log('🚀 开始构建 Electron 项目...');

try {
  // 检查 dist 目录是否存在，如果不存在则创建
  if (!fs.existsSync('dist')) {
    fs.mkdirSync('dist');
    console.log('📁 创建 dist 目录');
  }

  // 运行 TypeScript 编译
  console.log('🔨 编译 TypeScript...');
  execSync('npx tsc', { stdio: 'inherit' });
  
  console.log('✅ 构建完成！');
  console.log('💡 HTML 文件保持独立，修改后刷新窗口即可');
  console.log('💡 运行 npm start 启动应用');
  
} catch (error) {
  console.error('❌ 构建失败:', error.message);
  process.exit(1);
}
