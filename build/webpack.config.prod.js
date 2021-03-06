const webpack = require("webpack");
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.config.base');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const config = merge(baseWebpackConfig("production"),{
    mode: 'production',
    optimization: {
		// minimizer : [
		// 	new UglifyJsPlugin({
		// 		cache: true,
		// 		parallel: true,
		// 		sourceMap: false
		// 	}),
		// ],
		runtimeChunk : "single",
        splitChunks: {
			// minChunks: 1,
			// （默认值：30000）块的最小大小
			minSize: 0,
			// webpack 将使用块的起源和名称来生成名称: `vendors~main.js`,如项目与"~"冲突，则可通过此值修改，Eg: '-'
			automaticNameDelimiter: '-',
			// cacheGroups is an object where keys are the cache group names.
			name: true,
			chunks : "all",
			cacheGroups: {
				common: {
					chunks: 'all',
					name: `common`,
					test : /[\\/]src[\\/]util[\\/]|[\\/]src[\\/]component[\\/]|[\\/]src[\\/]lib[\\/]|[\\/]src[\\/]assets[\\/]/,
					minSize : 10,
					priority: 9,
					reuseExistingChunk: true // 可设置是否重用该chunk
				},
				vendor: {
					chunks: 'all',
					name: 'vendor',
					minSize : 10,
					test: /[\\/]node_modules[\\/]/,
					priority: 10,
					reuseExistingChunk: true // 可设置是否重用该chunk
				},
			}
		},
	},
	module : {
		rules : [
			{
                test : /\.css$/,
                use:[
						MiniCssExtractPlugin.loader,
                        { loader: "css-loader" },
                        {
                            loader: "postcss-loader",
                            options: {
                                sourceMap: false
                            }
                        },
                ]
			},
			{
                test : /\.scss$/,
                use:[
						MiniCssExtractPlugin.loader,
                        { loader: "css-loader" },
                        {
                            loader: "postcss-loader",
                            options: {
                                sourceMap: false
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
	plugins : [
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: "css/[name].[contenthash:8].css",
			chunkFilename: "css/[name].[contenthash:8].css",
		}),
		new OptimizeCSSAssetsPlugin({
			assetNameRegExp: /\.css$/g,
			cssProcessor: require('cssnano'),
			// cssProcessorOptions: cssnanoOptions,
			cssProcessorPluginOptions: {
				preset: ['default', {
					discardComments: {
						removeAll: true,
					},
					normalizeUnicode: false
				}]
			},
			canPrint: true
		}),
	]
})

if(process.env.npm_config_report){ // 打包可视化
	config.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = config;
