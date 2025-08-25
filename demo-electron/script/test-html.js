#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🧪 测试 HTML 文件监听功能...');

// 模拟修改 HTML 文件
const htmlPath = path.join(__dirname, 'index.html');
const originalContent = fs.readFileSync(htmlPath, 'utf8');

// 添加一个测试标记
const testContent = originalContent.replace(
  '<title>Hello from Electron renderer111!</title>',
  '<title>Hello from Electron renderer111! (Modified)</title>'
);

console.log('📝 修改 HTML 文件...');
fs.writeFileSync(htmlPath, testContent);

// 等待 2 秒后恢复原文件
setTimeout(() => {
  console.log('🔄 恢复原始 HTML 文件...');
  fs.writeFileSync(htmlPath, originalContent);
  console.log('✅ 测试完成！');
}, 2000);
