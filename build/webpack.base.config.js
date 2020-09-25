
const path = require("path")

const MiniCssExtractPlugin = require("mini-css-extract-plugin")



module.exports = {
    //入口
    entry:{
        app:'./src/page/index/index',
        detail:"./src/page/detail/index"
    },
    output:{
        path:path.resolve(__dirname,"../dist"),
        filename:'js/[name].[hash].js',
        publicPath:"/" //打包后的资源的访问路径前缀
    },
    resolve:{
        extensions:['.js','.vue','.jsx','.json'], //解析扩展 
        alias:{
            "@vue": path.resolve(__dirname,"../src/components/vue"),
            vue: path.resolve(__dirname,'../src/components/vue/platforms/web/entry-runtime-with-compiler'),
            compiler: path.resolve(__dirname,'../src/components/vue/compiler'),
            core: path.resolve(__dirname,'../src/components/vue/core'),
            shared: path.resolve(__dirname,'../src/components/vue/shared'),
            web: path.resolve(__dirname,'../src/components/vue/platforms/web'),
            weex: path.resolve(__dirname,'../src/components/vue/platforms/weex'),
            server: path.resolve(__dirname,'../src/components/vue/server'),
            sfc: path.resolve(__dirname,'../src/components/vue/sfc')
        }
    },
    plugins:[
        new MiniCssExtractPlugin({
            filename:'css/[name].css',
            chunkFilename:'css/[id].css'
        }),
        // new VueLoaderPlugin()
    ],
    module:{
        rules:[
            // {
            //     test:/\.vue$/,
            //     loader:'vue-loader'
            // },
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
                        loader:MiniCssExtractPlugin.loader,
                        options:{
                            hmr:true,
                            reloadAll:true
                        }
                    },
                    // {
                    //     loader:"style-loader"
                    // },
                    {
                        loader:"css-loader"
                    }
                ]
            },
            {
                test:/\.less$/,
                use:[
                    {
                        loader:MiniCssExtractPlugin.loader,
                        options:{
                            hmr:true,
                            reloadAll:true
                        }
                    },
                    // {
                    //     loader:"style-loader"
                    // },
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
}