const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 启动设备信息监控器...\n');

// 检查是否已经构建
const fs = require('fs');
const distPath = path.join(__dirname, '..', 'dist');

if (!fs.existsSync(distPath)) {
  console.log('📝 首次启动，正在构建项目...');
  console.log('⏳ 请稍等...\n');
  
  // 构建项目
  const buildProcess = spawn('npm', ['run', 'build'], {
    stdio: 'inherit',
    shell: true
  });
  
  buildProcess.on('close', (code) => {
    if (code === 0) {
      console.log('\n✅ 构建完成！正在启动应用...\n');
      startElectron();
    } else {
      console.error('\n❌ 构建失败，请检查错误信息');
      process.exit(1);
    }
  });
} else {
  console.log('✅ 项目已构建，直接启动...\n');
  startElectron();
}

function startElectron() {
  // 启动Electron应用
  const electronProcess = spawn('npm', ['start'], {
    stdio: 'inherit',
    shell: true
  });
  
  electronProcess.on('close', (code) => {
    console.log(`\n👋 应用已退出 (代码: ${code})`);
  });
  
  // 处理进程退出信号
  process.on('SIGINT', () => {
    console.log('\n🛑 收到中断信号，正在关闭应用...');
    electronProcess.kill('SIGINT');
  });
  
  process.on('SIGTERM', () => {
    console.log('\n🛑 收到终止信号，正在关闭应用...');
    process.exit(0);
  });
}
