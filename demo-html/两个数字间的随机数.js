function getRandomInt(min, max) {
  // 确保min和max是整数，并调整顺序（如果min > max）
  min = Math.ceil(min); // 向上取整
  max = Math.floor(max); // 向下取整
  if (min > max) [min, max] = [max, min]; // 交换顺序
  /**
   * Math.random() 生成一个0到1之间的随机数
   * 乘以 (max - min + 1)，得到一个0到(max - min + 1)之间的随机数
   * 加上 min，得到一个min到max之间的随机数
   * 使用 Math.floor() 取整，得到一个整数 min 到 max 之间的随机整数
   * 注意：max - min + 1 是为了包含 max
   * 例如，如果 min 是 1，max 是 10，那么 (max - min + 1) 就是 10 - 1 + 1 = 10，
   * 这样就可以生成 1 到 10 之间的随机整数
   */
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 示例：生成1到10之间的随机整数（包含1和10）
const randomInt = getRandomInt(1, 2);

console.log(randomInt);

// function getRandomFloat(min, max) {
//   // 调整顺序（如果min > max）
//   if (min > max) [min, max] = [max, min];
//   return Math.random() * (max - min) + min;
// }

// // 示例：生成1.5到5.5之间的随机浮点数
// const randomFloat = getRandomFloat(1.5, 5.5);
// console.log(randomFloat);