#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔨 开始构建项目...');

try {
  // 清理dist目录
  if (fs.existsSync('dist')) {
    console.log('🧹 清理dist目录...');
    fs.rmSync('dist', { recursive: true, force: true });
  }

  // 编译TypeScript
  console.log('📝 编译TypeScript...');
  execSync('npx tsc', { stdio: 'inherit' });

  // 检查编译结果
  const requiredFiles = [
    'dist/main.js',
    'dist/preload.js',
    'dist/deviceInfo.js'
  ];

  console.log('✅ 检查编译结果...');
  requiredFiles.forEach(file => {
    if (fs.existsSync(file)) {
      console.log(`  ✅ ${file}`);
    } else {
      console.error(`  ❌ ${file} 缺失`);
      process.exit(1);
    }
  });

  console.log('🎉 构建完成！');
  console.log('📁 输出目录: dist/');
  console.log('🚀 运行命令: npm start');

} catch (error) {
  console.error('❌ 构建失败:', error.message);
  process.exit(1);
}
