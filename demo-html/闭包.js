function counter() {
  let count = 0;
  return function() {
    return count++; // 每次调用返回递增的值
  };
}

const counter1 = counter();
console.log(counter1()); // 0
console.log(counter1()); // 1