setTimeout(() => {
    console.log("setTimeout")
}, 1000)

queueMicrotask(() => {
    console.log("queueMicrotask")
})

Promise.resolve().then(() => {
    console.log("Promise then")
})
// 以上的代码，都不是立即执行的代码

function foo() {
    console.log("foo")
}

function bar() {
    console.log("bar")
    foo()
}

bar()

console.log("其他代码")
