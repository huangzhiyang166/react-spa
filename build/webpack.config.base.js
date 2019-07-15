const path = require('path');
const DIST_PATH = path.resolve(__dirname, '../dist');
const SRC_PATH = path.resolve(__dirname, '../src');
const PUBLIC_PATH = path.resolve(__dirname, '../public');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const getViewConfig = require("./getViewConfig");
const config = getViewConfig();
const entry = config.reduce((prev,current) => {
    const {entry,chunkName} = current;
    prev[chunkName] = entry;
    return prev;
},{})
const plugins = config.map((item) => {
    const {filename,template,chunkName,title} = item;
    const option = {
        filename,
        template,
        chunks : ["vendor","common","runtime",chunkName]
    };
    if(title) option[title] = title;
    return new HtmlWebPackPlugin(option);
})
module.exports = {
    entry,
    output: {
        path: DIST_PATH,
        filename: "js/[name].[contenthash:8].js",
        chunkFilename: 'js/[name].[contenthash:8].js',
    },
    resolve: {
        alias: {
            "@" : SRC_PATH,  //指向"src"目录
        },
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)/,
                use: {
                    loader: 'url-loader',
                    options: {
                        outputPath: 'image/', // 图片输出的路径
                        limit: 10,
                        name : "[name].[hash:8].[ext]",
                    }
                }
            }
        ],
    },
    plugins : [
        ...plugins,
        new CleanWebpackPlugin()
    ]
};
