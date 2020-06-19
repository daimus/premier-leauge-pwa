const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

module.exports = {
	entry: {
		shell: "./app/shell.js"
	},
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "[name]-[chunkhash].js",
		chunkFilename: "[chunkhash].js"
	},
	module: {
		rules: [
			{
				test: /\.html/,
				use: "html-loader"
			},
			{
				test: /\.css$/i,
				use: [
					'style-loader',
					'css-loader'
				]
			},
			{
				test: /\.scss$/i,
				use: [
					'style-loader',
					'css-loader',
					'sass-loader',
				]
			},
			{
				test: /\.(jpg|jpeg|png|woff|woff2|eot|ttf|svg|json)$/,
				loader: 'url-loader?limit=100000'
			},
			{
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./app/template/default.html",
			filename: "index.html",
			chunks: ['shell']
		}),
		new CopyWebpackPlugin({
			patterns: [
				{ from: 'app/assets/manifest.webmanifest' },
				{ from: 'app/assets/icons' }
			],
		}),
		new WorkboxWebpackPlugin.InjectManifest({
			swSrc: path.resolve(__dirname, 'app/sw.js'),
			swDest: 'sw.js',
			// exclude: [],
			mode: 'production'
		})
	]
};