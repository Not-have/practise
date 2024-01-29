const message = "你好";

/**
 * 第一个参数 新字符串的长度
 * 第二个参数 填充的内容
 * 返回值：一个新的字符串
 */
const newMessage = message.padStart(5, "世界，").padEnd(6, "!");

console.log(newMessage);
