#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🧪 测试文件监听功能...');

const htmlPath = path.resolve(__dirname, 'index.html');
console.log('📁 HTML 文件路径:', htmlPath);

// 检查文件是否存在
if (!fs.existsSync(htmlPath)) {
  console.error('❌ HTML 文件不存在');
  process.exit(1);
}

// 读取原始内容
const originalContent = fs.readFileSync(htmlPath, 'utf8');
console.log('📖 原始文件大小:', originalContent.length, '字符');

// 尝试监听文件
try {
  console.log('👀 开始监听文件变化...');
  
  fs.watchFile(htmlPath, (curr, prev) => {
    console.log('🔄 文件变化检测到!');
    console.log('  当前时间:', curr.mtime);
    console.log('  之前时间:', prev.mtime);
    console.log('  文件大小:', curr.size);
  });

  console.log('✅ 文件监听已启动');
  console.log('💡 现在修改 index.html 文件来测试监听功能');
  
  // 5秒后自动停止
  setTimeout(() => {
    console.log('⏰ 测试完成，停止监听');
    process.exit(0);
  }, 5000);

} catch (error) {
  console.error('❌ 启动文件监听失败:', error);
  process.exit(1);
}
