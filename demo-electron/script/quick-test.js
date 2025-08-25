#!/usr/bin/env node

console.log('🧪 快速测试开发模式...');

// 设置环境变量
process.env.NODE_ENV = 'development';
process.env.ELECTRON_IS_DEV = 'true';

console.log('🔧 环境变量已设置:');
console.log('  NODE_ENV:', process.env.NODE_ENV);
console.log('  ELECTRON_IS_DEV:', process.env.ELECTRON_IS_DEV);

// 检查文件是否存在
const fs = require('fs');
const path = require('path');

const files = [
  'src/main.ts',
  'index.html',
  'tsconfig.json',
  'package.json'
];

console.log('\n📁 检查必要文件:');
files.forEach(file => {
  const exists = fs.existsSync(file);
  console.log(`  ${exists ? '✅' : '❌'} ${file}`);
});

// 尝试构建
console.log('\n🔨 尝试构建项目...');
const { execSync } = require('child_process');

try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ 构建成功！');
  
  console.log('\n🚀 现在可以运行以下命令启动开发模式:');
  console.log('  npm run dev');
  console.log('  或者');
  console.log('  node start-dev.js');
  
} catch (error) {
  console.error('❌ 构建失败:', error.message);
  console.log('\n💡 请先安装依赖: npm install');
}
