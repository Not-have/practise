const { exec } = require('child_process');
const { promisify } = require('util');
const os = require('os');

const execAsync = promisify(exec);

async function testBasic() {
  console.log('🧪 基本功能测试...\n');
  
  const platform = os.platform();
  console.log(`🖥️ 操作系统: ${platform}`);
  console.log(`📱 平台版本: ${os.release()}\n`);
  
  try {
    // 测试基本命令
    if (platform === 'darwin') {
      console.log('🍎 macOS系统测试...\n');
      
      // 测试CPU信息
      try {
        const { stdout: cpu } = await execAsync('sysctl -n machdep.cpu.brand_string');
        console.log('✅ CPU信息:', cpu.trim());
      } catch (error) {
        console.log('❌ CPU信息获取失败:', error.message);
      }
      
      // 测试系统信息
      try {
        const { stdout: version } = await execAsync('sw_vers -productVersion');
        console.log('✅ 系统版本:', version.trim());
      } catch (error) {
        console.log('❌ 系统版本获取失败:', error.message);
      }
      
      // 测试网络服务
      try {
        const { stdout: services } = await execAsync('networksetup -listallnetworkservices');
        console.log('✅ 网络服务数量:', services.trim().split('\n').filter(l => l.trim() && !l.includes('*')).length);
      } catch (error) {
        console.log('❌ 网络服务获取失败:', error.message);
      }
      
    } else if (platform === 'win32') {
      console.log('🪟 Windows系统测试...\n');
      
      try {
        const { stdout: cpu } = await execAsync('wmic cpu get Name /format:value');
        console.log('✅ CPU信息获取成功');
      } catch (error) {
        console.log('❌ CPU信息获取失败:', error.message);
      }
      
    } else {
      console.log('🐧 Linux系统测试...\n');
      
      try {
        const { stdout: cpu } = await execAsync('cat /proc/cpuinfo | grep "model name" | head -1');
        console.log('✅ CPU信息:', cpu.trim());
      } catch (error) {
        console.log('❌ CPU信息获取失败:', error.message);
      }
    }
    
    console.log('\n✨ 基本测试完成！');
    
  } catch (error) {
    console.error('❌ 测试失败:', error);
  }
}

testBasic();
