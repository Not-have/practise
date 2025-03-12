const a = [1,3,5,7];
const b = [2,4,6,8];

var c = a.concat(b).sort((a,b)=> a-b) // 错误写法
console.log(c);

// 双指针法
