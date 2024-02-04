// function result(num1, num2) {
//     if (typeof num1 !== "number" || typeof num2 !== "number") {
//         // 使用 throw 下面接着执行的代码，会终止
//         throw "参数错误";
//     }
//
//     return num1 * num2;
// }
//
// console.log(result(10, { num2: 20 }));
//
// console.log("后续的逻辑"); // 上面类型传入错误，这块不会执行


class UtilError {
    constructor(code, message) {
        this.code = code;
        this.message = message;
    }
}

function fun(value) {
    console.log("函数 start");

    if (value === 0) {
        /**
         * 支持抛出的类型：
         * 1、基本数据类型
         * 2、对象
         * 3、创建一个类（Error 这个类已经提供了，但是这个 Error 不符合的时候，你在进行修改，但是最后能继承一下） TypeError、RangeError、SyntaxError
         */
        // throw "value 不能为 0";
        // throw new UtilError(0, "value 不能为 0");
        // throw new Error("value 不能为 0");
        /*
        const err = new Error("value 不能为 0");
        // 下面的是 new Error 返回值中的属性，并且是可以修改的
        console.log(err.message);
        console.log(err.name);
        console.log(err.stack);

        throw err
        */
        const err = new TypeError();

        throw err;
        // 注：如果已经抛出异常，后面的代码就不会执行了
        console.log("throw 后的代码，不会执行了");
    }

    console.log("函数 end");
}

fun(0);
