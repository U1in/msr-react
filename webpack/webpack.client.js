const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const webpackConfig = {
	entry: path.join(__dirname, '../view/page/index.js'),
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: 'js/[name].js'
	},
	resolve: {
    extensions: ['.jsx', '.js'],
    alias: {
    	'@': path.join(__dirname, '../', "views")
    }
	},
	mode:"development",
	//处理css modules正则
	module:{
		rules:[
			{
				test:/\.js$/,
				exclude:/node_modules/,
				use: ['babel-loader']
			},
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: ['babel-loader']
			},
			//后面可以用oneOf
			//css处理
			{
				//css modules
				//不以.global.css结尾
				test: (str) => {
					const notGlobal = !(/.global.css$/.test(str));
					const isCss = (/.css$/.test(str));
					return notGlobal && isCss;
				},
				exclude: /node_modules/,
        use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							modules: {
								localIdentName: '[name]__[local]--[hash:base64:5]',
							},
						}
					}
				]
			},
			//css处理
			{
				//普通模式
				//*.global.css
				test: /^(.*\.global)\.css/,
				exclude: /node_modules/,
        use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader'
					}
				]
			},
			//css处理
			{
				//node_modules里的处理
				test: /\.css$/,
				include: /node_modules/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader'
					}
				]
			},
			//less处理
      {
				//modules
				//不以.global.less结尾
				test: (str) => {
					const notGlobal = !(/.global.less$/.test(str));
					const isLess = (/.less$/.test(str));
					return notGlobal && isLess;
				},
				exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							modules: {
								localIdentName: '[name]__[local]--[hash:base64:5]',
							},
						}
					},
					{
						loader: "postcss-loader",
						options: {
							plugins: [
								autoprefixer()
							]
						}
					},
          'less-loader'
				]
			},
			//less处理
      {
				//普通模式
				test: /^(.*\.global)\.less/,
        use: [
          MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader'
					},
					{
						loader: "postcss-loader",
						options: {
							plugins: [
								autoprefixer()
							]
						}
					},
          'less-loader'
				]
			},
      {
				//node_modules里的处理
				test: /\.less$/,
				include: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader'
					},
					{
						loader: "postcss-loader",
						options: {
							plugins: [
								autoprefixer()
							]
						}
					},
          'less-loader'
				]
			},
			{
				test: /\.(png|jpg|gif|jpeg)$/,
				exclude:/node_modules/,
				use:[
					{
						loader:'url-loader',
						options:{
							limit:5000,
							name: '[name].[ext]',
							outputPath: './images/',
							publicPath: '/images',
						}
					}
				]
			}
		]
	},
	plugins:[
		//热更新忽略
		new webpack.WatchIgnorePlugin([path.resolve(__dirname, '../dist')]),
		new MiniCssExtractPlugin({
			filename: '/css/[name].css',
      chunkFilename: '/css/[id].css',
		}),
		//打包分析
		new BundleAnalyzerPlugin({
			openAnalyzer: false,
		}),
		//打包文件映射
		new ManifestPlugin(),
		//导入配置文件
		// new webpack.DefinePlugin({ CONFIG: JSON.stringify(require("config")) }),
		//开发模式不加hash因为热重载会有很多文件
		new CleanWebpackPlugin({
			//热重载不要清理文件
			cleanStaleWebpackAssets: false,
		}),
	],
	optimization: {
		runtimeChunk: 'single',
		splitChunks: {
			chunks: 'all',
			cacheGroups: {
				vendor: {
					test: /node_modules/,
					name: "vendor"
				},
			},
		},
	}
};


module.exports = webpackConfig;