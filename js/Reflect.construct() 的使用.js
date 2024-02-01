/**
 * 实现一个 new Fun1，调用和执行的时候，依然是 Fun1，但是希望最后创建出来的这个对象的类型是 Fun2
 */
function Fun1(name, age) {
    this.name = name;
    this.age = age;
}

function Fun2() {

}

// const fn = new fun1("里斯", 16);
// console.log(fn);

const fn2 = Reflect.construct(Fun1, ["里斯", 16], Fun2);
console.log(fn2);
