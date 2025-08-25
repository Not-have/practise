#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 启动 Electron 开发模式...');

// 设置环境变量
const env = {
  ...process.env,
  NODE_ENV: 'development',
  ELECTRON_IS_DEV: 'true'
};

console.log('🔧 环境变量设置:');
console.log('  NODE_ENV:', env.NODE_ENV);
console.log('  ELECTRON_IS_DEV:', env.ELECTRON_IS_DEV);

// 先构建项目
console.log('🔨 构建 TypeScript 项目...');
const buildProcess = spawn('npm', ['run', 'build'], {
  stdio: 'inherit',
  env
});

buildProcess.on('close', (code) => {
  if (code === 0) {
    console.log('✅ 构建完成，启动 Electron...');
    
    // 启动 Electron
    const electronProcess = spawn('npx', ['electron', '.'], {
      stdio: 'inherit',
      env,
      cwd: process.cwd()
    });

    electronProcess.on('close', (electronCode) => {
      console.log(`🎭 Electron 进程退出，代码: ${electronCode}`);
      process.exit(electronCode);
    });

    electronProcess.on('error', (error) => {
      console.error('❌ 启动 Electron 失败:', error);
      process.exit(1);
    });

  } else {
    console.error(`❌ 构建失败，退出代码: ${code}`);
    process.exit(code);
  }
});

buildProcess.on('error', (error) => {
  console.error('❌ 构建过程出错:', error);
  process.exit(1);
});
