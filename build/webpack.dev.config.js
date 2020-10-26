/**
 * Created by xieyuanbin on 2018/8/21.
 * Email:yuanbin.xie@tempus.cn
 */

const Merge = require("webpack-merge");
const BaseConfig = require("./webpack.base.config");

let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');

let BUILD_PATH = path.join(__dirname, "../dist"); //输出目录
let webpack = require('webpack');

let routesArr = require('./util/routesArr') //导入路由分析脚本

module.exports = Merge(BaseConfig, {
	mode: 'development',

	output: {
		path: BUILD_PATH,
		publicPath: "/",
		filename: "js/[name].min.js"
	},
	optimization: {
		splitChunks: {},
		minimize: false  // 是否压缩
	},
	plugins: [
		// https://github.com/ampedandwired/html-webpack-plugin
		new HtmlWebpackPlugin({
			filename: path.join(BUILD_PATH, "index.html"),
			template: './src/index.html',
			chunks: ["vendor", "index"],
			inject: true,
			hash: true,
			minify: { //压缩HTML文件
				removeComments: true, //移除HTML中的注释
				collapseWhitespace: true //删除空白符与换行符
			}
		}),
		new webpack.DefinePlugin({
			// 'process.env.NODE_ENV': '"test"',
			'pages': JSON.stringify(routesArr.pagesArr),
			'blocks': JSON.stringify(routesArr.blocksArr)
		})
	],
	devtool: 'inline-source-map',   //开启sourcemap便于开发环境定位错误
	devServer: {
		contentBase: BUILD_PATH,
		// quiet: true,
		// open: true,
		port: '9013',
		stats: "errors-only", //只显示错误统计信息 其他参数["minimal"，"normal"，"verbose"]
		// host: internalIp.v4.sync(),
		// host: '192.168.1.56',
		// proxy: {
		//     '*': {
		//         target: 'http://127.0.0.1:3033/',
		//         secure: false.
		//     }
		// }
	}


});