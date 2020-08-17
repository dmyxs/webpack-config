//生产模式配置
const webpack = require('webpack')
const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const devConfig = {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    module: {
        rules: [
            {
                test: /\.(c|le|sc)ss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        //css兼容性处理,
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: () => [require('postcss-preset-env')()],
                        },
                    },
                    'less-loader',
                    'sass-loader',
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            title: '代码研习社',
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
    devServer: {
        contentBase: resolve(__dirname, 'build'), //项目构建路径
        open: true, //自动打开浏览器
        port: '3000', //端口号
        hot: true, //开启热更新
        hotOnly: true, //即使热更新不生效，也不自动刷新浏览器
        compress: true, //启动gzip压缩
        proxy: {
            //代理，解决跨域问题
            '/api': {
                target: 'http://localhost:8080',
            },
        },
    },
}

module.exports = devConfig
