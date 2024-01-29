const obj = {
    name: "里斯",
    age: 16
};

console.log(Object.keys(obj)); // [ 'name', 'age' ]
console.log(Object.values(obj)); // [ '里斯', 16 ]

/**
 * 了解的知识点
 */
console.log(Object.values(["aa", "bb", "cc"])); // [ 'aa', 'bb', 'cc' ]
console.log(Object.values("abc")); // [ 'a', 'b', 'c' ]
