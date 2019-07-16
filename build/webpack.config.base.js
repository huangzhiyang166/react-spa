const path = require('path');
const DIST_PATH = path.resolve(__dirname, '../dist');
const SRC_PATH = path.resolve(__dirname, '../src');
const PUBLIC_PATH = path.resolve(__dirname, '../public');
const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const getViewConfig = require("./getViewConfig");
const pck = require("../package.json");
const getEnvVar = require("./getEnvVar");
const version = pck.version;
const config = getViewConfig();
const entry = config.reduce((prev,current) => {
    const {entry,chunkName} = current;
    prev[chunkName] = entry;
    return prev;
},{})

module.exports = (env="development") => {
	return {
        mode: 'development',
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
            ...config.map((item) => {
                const {filename,template,chunkName,title} = item;
                const option = {
                    filename,
                    template,
                    chunks : ["vendor","common","runtime",chunkName]
                };
                option["title"] = title || pck.title || pck.name || "";
                option["process"] = {};
                option["process"]["env"] = {
                    NODE_ENV: env,
                    ...getEnvVar(env),
                    version
                };
                return new HtmlWebPackPlugin(option);
            }),
            new CopyWebpackPlugin([
                {
                    from: path.resolve(__dirname,"../public"),
                    to: DIST_PATH,
                    toType: 'dir',
                    ignore: [
                        "DS_Store","index.html"
                    ]
                }
            ]),
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: env==="production" ? '"production"' : '"development"',
                    ...getEnvVar(env),
                    version : '"' + version + '"'
                }
            })
        ]
    }
};

