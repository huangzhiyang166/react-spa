const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.config.base');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
module.exports = merge(baseWebpackConfig, {
    mode: 'production',
    optimization: {
        splitChunks: {
            // （默认值3）入口点上的最大并行请求数
			minChunks: 1,
			// （默认值：30000）块的最小大小
			minSize: 100,
			// webpack 将使用块的起源和名称来生成名称: `vendors~main.js`,如项目与"~"冲突，则可通过此值修改，Eg: '-'
			automaticNameDelimiter: '-',
			// cacheGroups is an object where keys are the cache group names.
			name: true,
			chunks : "all",
			cacheGroups: {
				common: {
					chunks: 'all',
					name: `common`,
					test : /[\\/]src[\\/]util[\\/]|[\\/]src[\\/]component[\\/]|[\\/]src[\\/]lib[\\/]/,
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
		new MiniCssExtractPlugin({
			filename: "css/[name].[contenthash:8].css",
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
		})
	]
});
