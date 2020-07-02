const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const nodeExternals = require ('webpack-node-externals'); 

const webpackConfig = {
	entry: {
    index: path.join(__dirname, '../server/app.js'),
  },
	output: {
		path: path.resolve(__dirname, '../run'),
		filename: '[name].js'
	},
	resolve: {
    extensions: ['.jsx', '.js'],
    alias: {
    	'@': path.join(__dirname, '../', "views")
    }
	},
  mode:"development",
  target: 'node', 
  externals: [ nodeExternals() ], 
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
			{
				test: /\.css$/,
        use: ['ignore-loader']
			},
      {
				test: /\.less$/,
        use: ['ignore-loader']
			},
			{
				test:/\.(png|jpg|gif|jpeg)$/,
				exclude:/node_modules/,
				use: ['ignore-loader']
			}
		]
	},
	plugins:[
		//打包分析
		new BundleAnalyzerPlugin({
			openAnalyzer: false,
		}),
		//打包文件映射
		new ManifestPlugin(),
		//导入配置文件
		// new webpack.DefinePlugin({ CONFIG: JSON.stringify(require("config")) }),
		new CleanWebpackPlugin(),
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