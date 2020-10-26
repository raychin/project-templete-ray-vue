let path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin')
// 显示webpack打包进度插件
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

module.exports = {


	entry: {
		index: "./src/main.js",
		// vendor: ["vue", 'vuex', 'vue-router', 'axios']
	},
	resolve: {
		extensions: ['.js', '.vue', '.json'],
		alias: {
			'vue$': 'vue/dist/vue.esm.js',
			'components': path.join(__dirname, "../src/components"),
			'pages': path.join(__dirname, "../src/pages"),
			'util': path.join(__dirname, "../src/util"),
			'api': path.join(__dirname, '../src/api')
		}
	},
	module: {

		rules: [{
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {}
            },
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
                ],
			},
			{
				test: /\.styl$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
				]
			},
			{
				test: /\.scss$/,
				loaders: ['style-loader', 'css-loader', 'sass-loader'],
			},
			{
				test: /\.(png|jpe?g|gif|svg|woff|eot|ttf)(\?.*)?$/,
				loader: 'file-loader',
				query: {
					// publicPath: 'cdn/', //图片打包引用到cdn
					name: "./assets/[name].[hash:8].[ext]"
				}
			}
		]
	},
	plugins: [
		// https://github.com/ampedandwired/html-webpack-plugin
		new MiniCssExtractPlugin({
			filename: "css/[name].[hash:8].css",
			chunkFilename: "css/[id].[hash:8].css"
		}),
		new VueLoaderPlugin(),
		new ProgressBarPlugin()
	]

};