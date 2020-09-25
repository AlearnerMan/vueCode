
const path = require("path")
// 安装html-webpack-plugin
const HtmlWebpackPlugin = require("html-webpack-plugin")
const webpackBaseConfig = require("./webpack.base.config.js")
// 根据不同规则合并两个配置项，
const { merge } = require("webpack-merge")


module.exports = merge(webpackBaseConfig,{
    // 指定构建环境
    mode: "development",
    plugins:[
        new HtmlWebpackPlugin({
            filename:path.resolve(__dirname,"../dist/index.html"),
            template:path.resolve(__dirname,"../public/index.html"),
            inject:true,// 注入选项 有四个值 true,body(script标签位于body底部),head,false(不插入js文件)
            chunks:['app']
        }),
        new HtmlWebpackPlugin({
            filename:path.resolve(__dirname,"../dist/detail.html"),
            template:path.resolve(__dirname,"../public/index.html"),
            inject:true,// 注入选项 有四个值 true,body(script标签位于body底部),head,false(不插入js文件)
            chunks:['detail']
        })
    ],
    // 开启本地服务时的服务配置
    devServer:{
        historyApiFallback:true, // 当找不到路径的时候 默认加载index.html文件
        hot:false, 
        contentBase:false, 
        compress:false,
        noInfo: false,
        stats:'errors-only',
    }
})