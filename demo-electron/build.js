#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

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
  
  // 复制 HTML 文件到 dist 目录
  if (fs.existsSync('index.html')) {
    fs.copyFileSync('index.html', 'dist/index.html');
    console.log('📄 复制 index.html 到 dist 目录');
  }

  console.log('✅ 构建完成！');
  console.log('💡 运行 npm start 启动应用');
  
} catch (error) {
  console.error('❌ 构建失败:', error.message);
  process.exit(1);
}
