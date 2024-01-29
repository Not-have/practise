/**
 * 获取 3 的 3 次方
 */
const result1 = Math.pow(3, 3);

const result2 = 3 ** 3;

console.log(result1, result2);

/**
 * Object.setPrototypeOf 方法用于设置对象的原型（prototype）。它接收两个参数，第一个是要设置原型的对象，第二个是新的原型对象。它返回一个修改后的对象。
 */
const person = {
    name: "John",
    sayHello() {

        console.log(`Hello, my name is ${this.name}`);
    }
};

const student = {
    study() {
        console.log(this.name);
        console.log(`${this.name} is studying.`);
    }
};

// 设置 student 的原型为 person
Object.setPrototypeOf(student, person);

student.sayHello(); // Hello, my name is John
student.study();    // John is studying.