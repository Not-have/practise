import { exec } from 'child_process';
import * as os from 'os';
import { promisify } from 'util';

const execAsync = promisify(exec);

export interface DeviceInfo {
  networkCards: NetworkCard[];
  cpuId: string;
  diskSerial: string;
  motherboardUUID: string;
  biosSerial: string;
  timestamp: string;
}

export interface NetworkCard {
  name: string;
  macAddress: string;
  type: string;
}

export class DeviceInfoCollector {
  /**
   * 获取所有设备信息
   */
  static async getAllDeviceInfo(): Promise<DeviceInfo> {
    try {
      const [networkCards, cpuId, diskSerial, motherboardUUID, biosSerial] = await Promise.all([
        this.getNetworkCards(),
        this.getCPUID(),
        this.getDiskSerial(),
        this.getMotherboardUUID(),
        this.getBIOSSerial()
      ]);

      return {
        networkCards,
        cpuId,
        diskSerial,
        motherboardUUID,
        biosSerial,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('获取设备信息失败:', error);
      throw error;
    }
  }

  /**
   * 获取网卡信息
   */
  static async getNetworkCards(): Promise<NetworkCard[]> {
    try {
      const platform = os.platform();

      if (platform === 'win32') {
        // Windows
        const { stdout } = await execAsync('wmic nic get Name,MACAddress,AdapterType /format:csv');
        return this.parseNetworkInfo(stdout, platform);
      } else if (platform === 'darwin') {
        // macOS: 尝试多种方法获取网卡信息
        try {
          // 方法1: 使用networksetup获取网络服务
          const { stdout: servicesOutput } = await execAsync('networksetup -listallnetworkservices');
          const services = servicesOutput.trim().split('\n').filter(line => 
            line.trim() && !line.includes('*') && !line.includes('An asterisk')
          );
          
          const cards: NetworkCard[] = [];
          for (const service of services) {
            if (service.trim()) {
              // 过滤掉VPN和虚拟网络服务
              if (service.toLowerCase().includes('vpn') || 
                  service.toLowerCase().includes('shadowrocket') ||
                  service.toLowerCase().includes('clash') ||
                  service.toLowerCase().includes('proxifier') ||
                  service.toLowerCase().includes('tunnelblick')) {
                continue;
              }
              
              try {
                const { stdout: macOutput } = await execAsync(`networksetup -getmacaddress "${service.trim()}"`);
                const macMatch = macOutput.match(/([a-fA-F0-9:]+)/);
                if (macMatch) {
                  cards.push({
                    name: service.trim(),
                    macAddress: macMatch[1],
                    type: 'Network Service'
                  });
                }
              } catch (macError: any) {
                // 忽略特定错误，继续处理其他服务
                if (macError.code === 4) {
                  console.log(`跳过服务 ${service} (不支持MAC地址获取)`);
                } else {
                  console.log(`获取服务 ${service} 的MAC地址失败:`, macError.message);
                }
              }
            }
          }
          
          if (cards.length > 0) {
            return cards;
          }
        } catch (error) {
          console.log('macOS网卡方法1失败:', error);
        }

        try {
          // 方法2: 使用ifconfig获取接口信息
          const { stdout: ifconfigOutput } = await execAsync('ifconfig | grep -E "^(en|wl|bridge)"');
          const lines = ifconfigOutput.trim().split('\n');
          let currentInterface = '';
          const cards: NetworkCard[] = [];
          
          for (const line of lines) {
            const nameMatch = line.match(/^(\w+):/);
            if (nameMatch) {
              currentInterface = nameMatch[1];
            }
            
            if (line.includes('ether') && currentInterface) {
              const macMatch = line.match(/ether\s+([a-fA-F0-9:]+)/);
              if (macMatch) {
                // 过滤掉虚拟接口
                if (!currentInterface.includes('utun') && !currentInterface.includes('lo')) {
                  cards.push({
                    name: currentInterface,
                    macAddress: macMatch[1],
                    type: 'Network Interface'
                  });
                }
              }
            }
          }
          
          if (cards.length > 0) {
            return cards;
          }
        } catch (error) {
          console.log('macOS网卡方法2失败:', error);
        }

        // 方法3: 使用system_profiler获取网络硬件信息
        try {
          const { stdout: profilerOutput } = await execAsync('system_profiler SPNetworkDataType | grep -A 10 "Type:"');
          const lines = profilerOutput.trim().split('\n');
          let currentService = '';
          const cards: NetworkCard[] = [];
          
          for (const line of lines) {
            if (line.includes('Type:')) {
              currentService = line.split(':')[1]?.trim() || 'Unknown';
            }
            if (line.includes('Hardware Address:') && currentService) {
              const macMatch = line.match(/Hardware Address:\s*([a-fA-F0-9:]+)/);
              if (macMatch) {
                cards.push({
                  name: currentService,
                  macAddress: macMatch[1],
                  type: 'Network Hardware'
                });
              }
            }
          }
          
          if (cards.length > 0) {
            return cards;
          }
        } catch (error) {
          console.log('macOS网卡方法3失败:', error);
        }

        // 如果还是没有找到，至少提供一些基本信息
        return [{
          name: 'Network Interface',
          macAddress: 'N/A',
          type: 'Unknown'
        }];
      } else {
        // Linux
        const { stdout } = await execAsync('ip link show | grep -E "^(\\d+):" | grep -v "lo:"');
        return this.parseNetworkInfo(stdout, platform);
      }
    } catch (error) {
      console.error('获取网卡信息失败:', error);
      return [];
    }
  }

  /**
   * 解析网卡信息
   */
  private static async parseNetworkInfo(output: string, platform: string): Promise<NetworkCard[]> {
    const cards: NetworkCard[] = [];

    try {
      if (platform === 'win32') {
        // Windows CSV格式解析
        const lines = output.trim().split('\n');
        for (let i = 1; i < lines.length; i++) {
          const parts = lines[i].split(',');
          if (parts.length >= 3) {
            cards.push({
              name: parts[0].trim(),
              macAddress: parts[1].trim(),
              type: parts[2].trim()
            });
          }
        }
      } else if (platform === 'darwin') {
        // macOS ifconfig输出解析
        const lines = output.trim().split('\n');
        let currentInterface = '';
        for (const line of lines) {
          // 获取接口名称
          const nameMatch = line.match(/^(\w+):/);
          if (nameMatch) {
            currentInterface = nameMatch[1];
          }
          
          // 获取MAC地址
          if (line.includes('ether') && currentInterface) {
            const macMatch = line.match(/ether\s+([a-fA-F0-9:]+)/);
            if (macMatch) {
              cards.push({
                name: currentInterface,
                macAddress: macMatch[1],
                type: 'Ethernet'
              });
            }
          }
        }
        
        // 如果没有找到网卡，尝试使用networksetup命令
        if (cards.length === 0) {
          try {
            const { stdout: netStdout } = await execAsync('networksetup -listallnetworkservices');
            const services = netStdout.trim().split('\n').filter(line => line.trim() && !line.includes('*'));
            
            for (const service of services) {
              if (service.trim()) {
                try {
                  const { stdout: macStdout } = await execAsync(`networksetup -getmacaddress "${service.trim()}"`);
                  const macMatch = macStdout.match(/([a-fA-F0-9:]+)/);
                  if (macMatch) {
                    cards.push({
                      name: service.trim(),
                      macAddress: macMatch[1],
                      type: 'Network Service'
                    });
                  }
                } catch (macError) {
                  // 忽略单个服务的错误
                }
              }
            }
          } catch (netError) {
            // 如果networksetup也失败，尝试获取基本网络信息
            try {
              const { stdout: ifconfigStdout } = await execAsync('ifconfig | grep -E "^(en|wl|bridge|lo)" | head -5');
              const interfaces = ifconfigStdout.trim().split('\n');
              for (const line of interfaces) {
                const nameMatch = line.match(/^(\w+):/);
                if (nameMatch) {
                  cards.push({
                    name: nameMatch[1],
                    macAddress: 'N/A',
                    type: 'Network Interface'
                  });
                }
              }
            } catch (ifconfigError) {
              // 最后的备选方案
            }
          }
        }
      } else {
        // Linux ip命令输出解析
        const lines = output.trim().split('\n');
        for (const line of lines) {
          const nameMatch = line.match(/^(\d+):\s+(\w+):/);
          if (nameMatch) {
            cards.push({
              name: nameMatch[2],
              macAddress: 'N/A',
              type: 'Network Interface'
            });
          }
        }
      }
    } catch (error) {
      console.error('解析网卡信息失败:', error);
    }

    return cards;
  }

  /**
   * 获取CPU ID
   */
  static async getCPUID(): Promise<string> {
    try {
      const platform = os.platform();
      let command: string;

      if (platform === 'win32') {
        command = 'wmic cpu get ProcessorId /format:value';
      } else if (platform === 'darwin') {
        command = 'sysctl -n machdep.cpu.brand_string';
      } else {
        command = 'cat /proc/cpuinfo | grep "model name" | head -1';
      }

      const { stdout } = await execAsync(command);
      
      if (platform === 'win32') {
        const match = stdout.match(/ProcessorId=([^\r\n]+)/);
        return match ? match[1].trim() : 'Unknown';
      } else {
        return stdout.trim() || 'Unknown';
      }
    } catch (error) {
      console.error('获取CPU ID失败:', error);
      return 'Unknown';
    }
  }

  /**
   * 获取硬盘序列号
   */
  static async getDiskSerial(): Promise<string> {
    try {
      const platform = os.platform();

      if (platform === 'win32') {
        const { stdout } = await execAsync('wmic diskdrive get SerialNumber /format:value');
        const match = stdout.match(/SerialNumber=([^\r\n]+)/);
        return match ? match[1].trim() : 'Unknown';
      } else if (platform === 'darwin') {
        // macOS: 尝试多种方法获取硬盘信息
        try {
          // 方法1: 使用system_profiler获取存储信息
          const { stdout } = await execAsync('system_profiler SPStorageDataType');
          const physicalStoreMatch = stdout.match(/Physical Store[^]*?Serial Number:\s*(.+?)(?:\n|$)/);
          if (physicalStoreMatch) {
            return physicalStoreMatch[1].trim();
          }
          
          const modelMatch = stdout.match(/Model:\s*(.+?)(?:\n|$)/);
          if (modelMatch) {
            return modelMatch[1].trim();
          }
        } catch (error) {
          console.log('macOS硬盘方法1失败:', error);
        }

        try {
          // 方法2: 使用diskutil获取磁盘信息
          const { stdout: listOutput } = await execAsync('diskutil list');
          const diskMatch = listOutput.match(/\/dev\/disk(\d+)/);
          if (diskMatch) {
            const diskNum = diskMatch[1];
            const { stdout: infoOutput } = await execAsync(`diskutil info /dev/disk${diskNum}`);
            
            const fields = ['Device / Media Name', 'Device Identifier', 'Media Name', 'Volume Name'];
            for (const field of fields) {
              const match = infoOutput.match(new RegExp(`${field}:\\s*(.+?)(?:\\n|$)`));
              if (match) {
                return match[1].trim();
              }
            }
          }
        } catch (error) {
          console.log('macOS硬盘方法2失败:', error);
        }

        try {
          // 方法3: 获取系统信息
          const { stdout } = await execAsync('sw_vers -productName');
          return `${stdout.trim()} Storage`;
        } catch (error) {
          console.log('macOS硬盘方法3失败:', error);
        }

        return 'macOS Storage';
      } else {
        // Linux
        const { stdout } = await execAsync('lsblk -no SERIAL /dev/sda 2>/dev/null || echo "Unknown"');
        return stdout.trim() || 'Unknown';
      }
    } catch (error) {
      console.error('获取硬盘序列号失败:', error);
      return 'Unknown';
    }
  }

  /**
   * 获取主板UUID
   */
  static async getMotherboardUUID(): Promise<string> {
    try {
      const platform = os.platform();
      let command: string;

      if (platform === 'win32') {
        command = 'wmic baseboard get UUID /format:value';
      } else if (platform === 'darwin') {
        command = 'ioreg -l | grep "IOPlatformUUID"';
      } else {
        command = 'cat /sys/class/dmi/id/product_uuid 2>/dev/null || echo "Unknown"';
      }

      const { stdout } = await execAsync(command);
      
      if (platform === 'win32') {
        const match = stdout.match(/UUID=([^\r\n]+)/);
        return match ? match[1].trim() : 'Unknown';
      } else if (platform === 'darwin') {
        const match = stdout.match(/"IOPlatformUUID" = "([^"]+)"/);
        return match ? match[1].trim() : 'Unknown';
      } else {
        return stdout.trim() || 'Unknown';
      }
    } catch (error) {
      console.error('获取主板UUID失败:', error);
      return 'Unknown';
    }
  }

  /**
   * 获取BIOS序列号
   */
  static async getBIOSSerial(): Promise<string> {
    try {
      const platform = os.platform();

      if (platform === 'win32') {
        const { stdout } = await execAsync('wmic bios get SerialNumber /format:value');
        const match = stdout.match(/SerialNumber=([^\r\n]+)/);
        return match ? match[1].trim() : 'Unknown';
      } else if (platform === 'darwin') {
        // macOS: 尝试多种方法获取硬件信息
        try {
          // 方法1: 获取硬件序列号
          const { stdout } = await execAsync('system_profiler SPHardwareDataType');
          const serialMatch = stdout.match(/Serial Number:\s*(.+?)(?:\n|$)/);
          if (serialMatch) {
            return serialMatch[1].trim();
          }
          
          const modelMatch = stdout.match(/Model Name:\s*(.+?)(?:\n|$)/);
          if (modelMatch) {
            return modelMatch[1].trim();
          }
        } catch (error) {
          // 忽略错误，继续尝试其他方法
        }

        try {
          // 方法2: 获取系统版本信息
          const { stdout } = await execAsync('sw_vers -productVersion');
          return `macOS ${stdout.trim()}`;
        } catch (error) {
          // 忽略错误
        }

        return 'Unknown';
      } else {
        // Linux
        const { stdout } = await execAsync('cat /sys/class/dmi/id/bios_version 2>/dev/null || echo "Unknown"');
        return stdout.trim() || 'Unknown';
      }
    } catch (error) {
      console.error('获取BIOS序列号失败:', error);
      return 'Unknown';
    }
  }
}
