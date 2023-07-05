# 报错解决

## 1、执行完 npm run eject 之后，babel-preset-react-app 报环境变量未定义

![](../assets/error1.jpg)

解决方法(修改完成后，重启 vsc)：
![const env = process.env.BABEL_ENV || process.env.NODE_ENV || 'development';](../assets/solve1.jpg)

