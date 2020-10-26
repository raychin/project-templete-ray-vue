/**
 * Created by xieyuanbin on 2017/8/17.
 * Email:yuanbin.xie@tempus.cn
 */

const Merge = require("webpack-merge");
const BaseConfig = require("./webpack.base.config");

let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let CopyWebpackPlugin = require('copy-webpack-plugin');
let BUILD_PATH = path.join(__dirname, "../dist"); //输出目录
let webpack = require('webpack');

let routesArr = require('./util/routesArr') //导入路由分析脚本

//获取执行的npm命令
var npmScripts = process.env.npm_lifecycle_event;
var definePlugin = null;
//根据不同的命令判断配置全局环境变量DefinePlugin
// 这个设置会重置mode的值
if (npmScripts === "test") {
	//测试服务器
	definePlugin = new webpack.DefinePlugin({
		'process.env.NODE_ENV': '"test"',
		'pages': JSON.stringify(routesArr.pagesArr),
		'blocks': JSON.stringify(routesArr.blocksArr)
	})

} else if (npmScripts === "build") {
	//生产服务器
	definePlugin = new webpack.DefinePlugin({
		'process.env.NODE_ENV': '"production"',
		'pages': JSON.stringify(routesArr.pagesArr),
		'blocks': JSON.stringify(routesArr.blocksArr)
	})

}

module.exports = Merge(BaseConfig, {
	mode: 'production',
	output: {
		path: BUILD_PATH,
		filename: "js/[name].[chunkhash:8].min.js"
	},
	optimization: {
		splitChunks: {
			chunks: "all",  // 对哪些块优化 all | async | initial
			minChunks: 1,  // 分割前必须共享模块的最小块数
			minSize: 30000,  // 要生成的块的最小大小
			name: true,  // boolean|function(string)
			maxAsyncRequests: 5,  // 按需加载时的最大并行请求数
			maxInitialRequests: 3,  // 入口点处的最大并行请求数
			automaticNameDelimiter: "_",  // 块连接间隔符 'vendors~main.js'
			cacheGroups: {
				default: {
					minChunks: 2,
					priority: -20,
					reuseExistingChunk: true,
				},
				vendors: {
					test: /[\\/]node_modules[\\/]/,
					priority: -10,
				}
			}
		},
		runtimeChunk: {name: 'runtime'},
		minimize: true,
		// minimizer: [new UglifyJsPlugin({/* your config */})],  // 更加详细可控的配置 替换minimize
	},
	plugins: [
		// https://github.com/ampedandwired/html-webpack-plugin
		new HtmlWebpackPlugin({
			filename: path.join(BUILD_PATH, "index.html"),
			template: './src/index.html',
			// chunks: ["manifest", "vendor", "index"],
			inject: true,
			hash: true,
			minify: { //压缩HTML文件
				removeComments: true, //移除HTML中的注释
				collapseWhitespace: true //删除空白符与换行符
			}
		}),
		definePlugin,
		new CopyWebpackPlugin([{
			context: path.join(__dirname, "../src/static"),
			from: "*.js",
			to: path.join(BUILD_PATH, "./static"),
			toType: 'dir'
		},
			{
				context: path.join(__dirname, "../src/static/assets"),
				from: {
					glob: '**/*',
					dot: true
				},
				to: path.join(BUILD_PATH, "./static/assets"),
				toType: 'dir'
			}
		])

	]
});