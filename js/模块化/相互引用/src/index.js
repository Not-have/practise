// es module导入
import { name, age } from './test-01'
console.log(name, age)

// commonjs导入
const bar = require("./test-02")
console.log(bar.name)
