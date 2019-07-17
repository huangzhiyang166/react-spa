const webpack = require("webpack");
const path = require("path");
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.config.base');
const proxy = require("../proxy")
module.exports = merge(baseWebpackConfig("development"), {
    mode: 'development',
    output : {
        filename : "js/[name].[hash:16].js"
    },
    plugins : [
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        port: '9090',
        contentBase: path.join(__dirname, '../public'),
        compress: true,
        historyApiFallback: true,
        hot: true,
        https: false,
        noInfo: true,
        open: false,
        proxy
    },
    module : {
        rules : [
            {
                test : /\.css$/,
                use:[
                       { loader: "style-loader" },
                       { loader: "css-loader" },
                       {
                            loader: "postcss-loader",
                            options: {
                                sourceMap: true
                            }
                        },
                ]
            },
            {
                test : /\.scss$/,
                use:[
                       { loader: "style-loader" },
                       { loader: "css-loader" },
                       {
                            loader: "postcss-loader",
                            options: {
                                sourceMap: true
                            }
                        },
                        { 
                            loader: "sass-loader",
                            options: {
                                data: '@import "../src/assets/styles/style.scss";',
                                includePaths:[__dirname, 'src']
                            },
                        }
                ]
            }
        ]
    },
});
