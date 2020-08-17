//生产模式配置
const HtmlWebpackPlugin = require('html-webpack-plugin')
const optimizeCss = require('optimize-css-assets-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const prodConfig = {
    mode: 'production',
    devtool: 'cheap-module-source-map',
    module: {
        rules: [
            {
                test: /\.(c|le|sc)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../',
                        },
                    },
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
            minify: {
                //html代码压缩
                collapseWhitespace: true, //移除空格
                removeComments: true, //移除注释
            },
        }),
        //css代码抽离
        new MiniCssExtractPlugin({
            filename: 'css/[name]-[contenthash:8].css',
        }),
        //css代码压缩
        new optimizeCss(),
    ],
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
    // 忽略打包
    externals: {
        //拒绝JQuery被打包
        jquery: 'jquery', //包名
    },
}

module.exports = prodConfig
