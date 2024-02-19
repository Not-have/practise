const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { DefinePlugin } = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin")
module.exports = {
    /**
     * webpack 打包为什么打包的
     * target值内容：web、node
     */
    target: "web",
    mode: "development",
    devtool: "source-map",
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "./build"),
        filename: "js/main.js" // 指定js的打包目录
    },
    devServer: {
        /**
         * 某些资源在webpak打包中加载不到的资源，就可以在contentBase中去指定加载的文件夹地址中去查找
         * 配置这个的时候 webpack-dev-server 使用  3.11.2 的版本，没有问题，使用最近的会报错，我没解决
         * CopyWebpackPlugin 没有这个的时候，使用上面的 就可以加载到，因为我没有拷贝，所以 就加载不到了（在开发过程中，使用CopyWebpackPlugin 他会浪费资源，所以就可以 使用contentBase，所以 在开发过程中 就可以注销掉下面的CopyWebpackPlugin配置，但是在生产资源时，依然要拷贝的）
         */
        contentBase: "./public",
        /**
         * 模块的热替换：
         * 模块热替换是指在 应用程序运行过程中，替换、添加、删除模块，而无需重新刷新整个页面
         * 比如：你在使用计算器的时候，你不想修改代码之后，计算器的结果也丢失的情况下 使用
         * 
         */
        hot: true,
        // host: "0.0.0.0",
        port: 7777,
        /**
         * 是否为静态文件开启gzip 
         * 默认值是 false
         */
        compress: true,
        /**
         * 跨域
         */
        proxy: {
            // /api 是代理的地址
            "/api": {
                // 下面是服务器的地址
                target: "http://localhost:8888",
                /**
                 * "^/api": "这个里面写的内容会被匹配到url里面"
                 * ^/api 是匹配 /api 后面的内容
                 */
                pathRewrite: {
                    "^/api": ""
                },
                /**
                 * secure：默认情况下不接收转发到https的服务器上且证书无效，如果希望支持，可以设置为false
                 */
                secure: false,
                /**
                 * 修改源：一般为true
                 */
                changeOrigin: true
            }
        }
    },
    resolve: {
        /**
         * 如果是一个文件:
         * 他会根据extensions里面写的自动给路径后面匹配，去文件夹中查找相应的文件
         * extensions 里面的默认值有：[".js", ".json", ".mjs", ".wasm"]
         * 可以给下面加入 .vue .ts .jsx
         */
        extensions: [".js", ".json", ".mjs", ".wasm"],
        /**
         * 如果是一个文件夹
         * 会在文件夹中根据 resolve.mainFiles配置选项中指定的文件顺序查找
         * resolve.mainFiles的默认值是 ['index']
         * 再根据 resolve.extensions来解析扩展名
         * mainFiles 一般不配置
         */
        mainFiles: ["index"],
        /**
         * 是配置别名alias
         * "别名名字": path.resolve(__dirname, "相对与配置文件的相对路径")
         */
        alias: {
            "js": path.resolve(__dirname, "./src/js")
        }
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "postcss-loader",
                ]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                type: "asset",
                generator: {
                    filename: "img/[name]_[hash:6][ext]",
                },
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024,
                    }
                }
            },
            {
                test: /\.(eot|ttf|woff2?)$/,
                type: "asset/resource",
                generator: {
                    filename: "font/[name]-[hash:8][ext]"
                }
            },
            {
                test: /\.js$/,
                loader: "babel-loader"
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: "指定html打包模板",
            template: "./public/index.html",
        }),
        new DefinePlugin({
            BASE_URL: " './' "
        }),
        // 在开发的时候，节省性能  就可以注销
        // new CopyWebpackPlugin({
        //     patterns: [
        //         {
        //             from: "public",
        //             to: "./",
        //             globOptions: {
        //                 ignore: [
        //                     "**/index.html"
        //                 ]
        //             }
        //         }
        //     ]
        // })
    ]
}