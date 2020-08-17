//开发模式和生产模式共同的配置
const { resolve } = require('path')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { merge } = require('webpack-merge')
const devConfig = require('./webpack.dev')
const prodConfig = require('./webpack.prod')

const commonConfig = {
    entry: './src/index.js',
    //多页面入口配置
    // entry: {
    //     index: './src/index.js',
    //     test: './src/test.js',
    // },
    output: {
        filename: 'js/[name]-[hash:8].js',
        path: resolve(__dirname, '../dist'),
    },
    module: {
        rules: [
            {
                //eslint检测
                // test: /\.js$/,
                // exclude: /node_modules/,
                // enforce: 'pre', //优先执行，先执行eslint，再执行babel-loader
                // loader: 'eslint-loader',
                // options: {
                //     fix: true, //自动修复
                // },
            },
            {
                //oneOf，找到第一个，就不再继续往下找
                oneOf: [
                    {
                        //处理图片(背景图片)
                        test: /\.(jpg|png|gif)$/,
                        loader: 'url-loader',
                        options: {
                            name: '[name]-[hash:8].[ext]',
                            outputPath: 'images',
                            limit: 8 * 1024,
                        },
                    },
                    {
                        // 处理html文件的img图片（负责引入img，从而能被url-loader进行处理）
                        test: /\.html$/,
                        loader: 'html-loader',
                    },
                    {
                        //处理字体图标
                        test: /\.(svg|woff|ttf|eot)$/,
                        // exclude:/.\(js|css|less|scss|html|jpg|png|gif)$/,  //除了这些格式的文件都使用file-loader处理
                        loader: 'file-loader',
                        options: {
                            name: '[name]-[hash:8].[ext]',
                            outputPath: 'media',
                        },
                    },
                    {
                        //处理js和react
                        test: /\.jsx?$/,
                        exclude: /node_modules/,
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true,
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin({
            dry: true,
            cleanStaleWebpackAssets: true,
        }),
    ],
}

//根据配置package.json -> scripts 的环境变量来执行文件，如果没有配置，就走开发模式
module.exports = (env) => {
    if (env && env.production) {
        return merge(commonConfig, prodConfig)
    } else {
        return merge(commonConfig, devConfig)
    }
}
