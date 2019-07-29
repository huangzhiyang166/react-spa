const webpack = require("webpack");
const path = require("path");
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.config.base');
const proxy = require("../proxy");
const getEnvVar = require("./getEnvVar");
const envVar = getEnvVar("development");
let port = "9090";
if(envVar && envVar.REACT_APP_PORT){
    port = envVar.REACT_APP_PORT.replace(/"/g,"")
}
module.exports = merge(baseWebpackConfig("development"), {
    mode: 'development',
    output : {
        filename : "js/[name].[hash:16].js"
    },
    plugins : [
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        port,
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
