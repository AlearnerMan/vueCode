
const path = require("path")
// 安装html-webpack-plugin
const HtmlWebpackPlugin = require("html-webpack-plugin")



module.exports = {
    // 指定构建环境
    mode: "development",
    //入口
    entry:{
        app:'./src/index'
    },
    output:{
        path:process.env.APP_ENV === 'test' ? path.resolve(__dirname,"../test"): path.resolve(__dirname,"../dist"),
        filename:'js/[name].js',
        publicPath:"/" //打包后的资源的访问路径前缀
    },
    module:{
        rules:[
            {
                test:/\.jsx?$/,
                exclude:/node_modules/, // 这个node_modules文件夹里面的js/jsx文件不需要使用babel-loader
                loader:'babel-loader'
                // babel-loader的参数配置也可以这样写，我们这里是新建一个.babelrc文件的方式来配置
                // use: {  
                //     loader: 'babel-loader',
                //     options: {
                //     presets: ['@babel/preset-env']
                //     }
                // }
            },
            {
                test:/\.css$/,
                use:[
                    {
                        loader:"style-loader"
                    },
                    {
                        loader:"css-loader"
                    }
                ]
            },
            {
                test:/\.less$/,
                use:[
                    {
                        loader:"style-loader"
                    },
                    {
                        loader:"css-loader"
                    },
                    {
                        loader:"less-loader"
                    }
                ]
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            filename:path.resolve(__dirname,"../dist/index.html"),
            template:path.resolve(__dirname,"../public/index.html"),
            inject:true,// 注入选项 有四个值 true,body(script标签位于body底部),head,false(不插入js文件)
            hash:true,//回给script标签中的js文件增加一个随机数 防止缓存 bundle.js?22b9692e22e7be37b57e
        })
    ]
}