const obj = {
    name: "里斯",
    age: 16,
    fun: function result(num1, num2) {
        return num1 * num2;
    }
};

setTimeout(() => {
    obj.name = "哈哈";
    console.log("我修改了 obj.name");
}, 1000)

setTimeout(() => {
    console.log(obj.age);
}, 3000)

/**
 * module 是这个模块本身的对象（他是 test.js 这个文件的对象），这个对象里面有个属性叫 exports
 * exports 也是对象
 */
module.exports = obj;
