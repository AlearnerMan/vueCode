
const path = require("path")


const webpackBaseConfig = require("./webpack.base.config.js")
const { merge } = require("webpack-merge")

// 安装html-webpack-plugin
const HtmlWebpackPlugin = require("html-webpack-plugin")

const TerserWebpackPlugin = require('terser-webpack-plugin')
// 压缩css
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
// 打包之前会删除之前的打包目录
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
// 在打包结束之后会启动一个服务在浏览器可以查看打包的大小以及打包出来的文件中包含的内容
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin
// 复制静态资源
const CopyWebpackPlugin = require("copy-webpack-plugin")

module.exports = merge(webpackBaseConfig,{
    // 指定构建环境
    mode: "production",
    plugins:[
        new HtmlWebpackPlugin({
            filename:path.resolve(__dirname,"../dist/index.html"),
            template:path.resolve(__dirname,"../public/index.html"),
            inject:true,// 注入选项 有四个值 true,body(script标签位于body底部),head,false(不插入js文件)
            hash:true,//回给script标签中的js文件增加一个随机数 防止缓存 bundle.js?22b9692e22e7be37b57e
            //压缩选项 会有很多选项 可以去npm官网上查看对应的配置
            minify:{
                removeComments:true,//去注释
                collapseWhitespace:true,//去空格
                removeAttributeQuotes:true, // 去属性的引号
            },
            chunks:["app"]
        }),
        new HtmlWebpackPlugin({
            filename:path.resolve(__dirname,"../dist/detail.html"),
            template:path.resolve(__dirname,"../public/index.html"),
            inject:true,// 注入选项 有四个值 true,body(script标签位于body底部),head,false(不插入js文件)
            hash:true,//回给script标签中的js文件增加一个随机数 防止缓存 bundle.js?22b9692e22e7be37b57e
            //压缩选项 会有很多选项 可以去npm官网上查看对应的配置
            minify:{
                removeComments:true,//去注释
                collapseWhitespace:true,//去空格
                removeAttributeQuotes:true, // 去属性的引号
            },
            chunks:["detail"]
        }),
        new CleanWebpackPlugin(),
        new BundleAnalyzerPlugin(),
        new CopyWebpackPlugin({
            patterns:[
                {
                    from:path.resolve(__dirname,"../static"),
                    to:path.resolve(__dirname,"../dist/static")
                }
            ]
        })
    ],
    // Optimization 这个选项是可以覆盖webpack内置的一些配置 比如 压缩、分包机制等等
    optimization:{
        minimizer:[
            new TerserWebpackPlugin({
                parallel:true,
                sourceMap:false,
                exclude:/\/node_modules/,
                extractComments: true, // 这个选项如果为true 会生成一个app.js.LICENSE.txt文件 存储特定格式的注释
                terserOptions:{
                    warnings:false,
                    compress:{
                        unused:true,
                        drop_debugger:true,
                        drop_console:true
                    },
                }
            }),
            new OptimizeCssAssetsPlugin({
                cssProcessorOptions:{safe:true,discardComments:{removeAll:true}}
            })
        ],
        splitChunks:{
            chunks:"all"
        }
    }
})