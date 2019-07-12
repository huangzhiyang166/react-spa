const webpack = require("webpack");
const path = require("path");
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.config.base');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = merge(baseWebpackConfig, {
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
        proxy: {}
    }
});
