var path = require('path');
var webpack = require("webpack");

var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

	entry: {
		app: __dirname + "/app/App.jsx",
		styles: __dirname + "/app/shared/styles.js",
		vendor: __dirname + "/app/shared/vendor.js"
	},

	output: {
		path: __dirname + "/build",
		filename: "[name].bundle.js",
	},

	plugins:[
		new webpack.optimize.CommonsChunkPlugin("vendor","vendor.bundle.js"),
		new HtmlWebpackPlugin({
			inject: true,
			template: './app/index.html'
		})
	],

	module:{
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel'
			},
			{
				test: /\.css$/,
				loader: 'style!css',
			},
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				loader: 'style!css!autoprefixer!sass'
			},
			{
				test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)|\.gif($|\?)/,
				loader: "url?limit=10000&mimetype=application/font-woff&name=fonts/[name].[ext]"
			}
		]
	},

	resolve:{
		extensions: ['','.js','jsx']
	},

	//set to false when go to prod :P
	watch: false,

	// sassLoader: {
	// 	includePaths: [ 'app/styles' ],
	// 	data: 	'@import "app/common/styles/variables";'+
	// 			'@import "app/common/styles/mixins";'+
	// 			'@import "app/common/styles/reset";'+
	// 			'@import "app/common/styles/reusable";'
	// }
};
 