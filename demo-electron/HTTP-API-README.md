# 🌐 设备信息HTTP API模块

这个模块为设备信息监控器添加了HTTP API功能，让你可以通过HTTP请求在浏览器中获取设备信息。

## 🚀 功能特性

- **RESTful API**: 标准的HTTP GET接口
- **跨域支持**: 支持CORS，可在任何网页中调用
- **自动端口管理**: 自动处理端口冲突
- **实时数据**: 每次请求都获取最新的设备信息
- **健康检查**: 提供API服务状态监控

## 📡 可用接口

### 1. 获取所有设备信息
```
GET /api/device-info
```
返回所有设备信息的完整数据，包括网卡、CPU、硬盘、主板、BIOS等。

### 2. 获取网卡信息
```
GET /api/network
```
返回所有网卡的详细信息，包括名称、MAC地址和类型。

### 3. 获取CPU信息
```
GET /api/cpu
```
返回CPU的ID和型号信息。

### 4. 获取硬盘信息
```
GET /api/disk
```
返回硬盘的序列号或型号信息。

### 5. 获取主板信息
```
GET /api/motherboard
```
返回主板的UUID或序列号信息。

### 6. 获取BIOS信息
```
GET /api/bios
```
返回BIOS的序列号或版本信息。

### 7. 健康检查
```
GET /api/health
```
返回API服务的状态信息。

## 🛠️ 使用方法

### 启动应用
```bash
npm run quick
```
应用启动后会自动启动HTTP服务器（默认端口3000）。

### 测试API
```bash
npm run http-test
```
这会打开测试页面，你可以在浏览器中测试所有API接口。

### 直接访问
在浏览器中访问 `http://localhost:3000` 查看API文档。

## 💻 代码示例

### JavaScript Fetch API
```javascript
// 获取所有设备信息
fetch('http://localhost:3000/api/device-info')
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      console.log('设备信息:', data.data);
    } else {
      console.error('获取失败:', data.error);
    }
  })
  .catch(error => console.error('请求失败:', error));

// 获取网卡信息
fetch('http://localhost:3000/api/network')
  .then(response => response.json())
  .then(data => console.log('网卡信息:', data.data.networkCards));
```

### jQuery AJAX
```javascript
$.ajax({
  url: 'http://localhost:3000/api/cpu',
  method: 'GET',
  success: function(data) {
    if (data.success) {
      console.log('CPU信息:', data.data.cpuId);
    }
  }
});
```

### Python requests
```python
import requests

response = requests.get('http://localhost:3000/api/disk')
data = response.json()

if data['success']:
    print('硬盘信息:', data['data']['diskSerial'])
else:
    print('获取失败:', data['error'])
```

### cURL命令行
```bash
# 获取所有设备信息
curl http://localhost:3000/api/device-info

# 获取网卡信息
curl http://localhost:3000/api/network

# 获取CPU信息
curl http://localhost:3000/api/cpu
```

## 🔧 配置选项

### 端口配置
默认端口是3000，如果被占用会自动尝试3001、3002等。

### CORS设置
默认允许所有来源访问，支持跨域请求。

## 📊 响应格式

### 成功响应
```json
{
  "success": true,
  "data": {
    // 具体的数据内容
  },
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

### 错误响应
```json
{
  "success": false,
  "error": "错误描述",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

## 🚨 注意事项

1. **权限要求**: 某些硬件信息获取可能需要管理员权限
2. **端口冲突**: 如果3000端口被占用，会自动使用下一个可用端口
3. **跨域访问**: 支持在浏览器中直接调用，无需特殊配置
4. **实时数据**: 每次请求都会重新获取设备信息，确保数据最新

## 🔍 故障排除

### 端口被占用
如果看到端口冲突错误，应用会自动尝试下一个端口。查看控制台输出确认实际使用的端口。

### 跨域问题
如果遇到跨域问题，确保API服务器正在运行，并且CORS头设置正确。

### 权限问题
某些硬件信息获取失败可能是权限问题，尝试以管理员权限运行应用。

## 📝 更新日志

- **v1.0.0**: 初始版本，支持基本的设备信息API
- 支持所有主要硬件信息的获取
- 自动端口管理和错误处理
- 完整的CORS支持
