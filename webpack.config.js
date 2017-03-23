var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
var TypedocWebpackPlugin = require('typedoc-webpack-plugin');

var nodeModules = {};
fs.readdirSync('node_modules')
	.filter(function (x) {
		return ['.bin'].indexOf(x) === -1;
	})
	.forEach(function (mod) {
		nodeModules[mod] = 'commonjs ' + mod;
	});

module.exports = {
	entry: './src/app.ts',
	target: 'node',
	devtool: 'source-map',
	output: {
		path: path.join(__dirname, 'build'),
		filename: 'app.js'
	},
	module: {
		loaders: [{
			test: /\.ts$/,
			loader: 'ts-loader'
		}]
	},
	resolve: {
		alias: {
			'components': './src/components',
			'core': './src/core'
		}
	},
	plugins: [
		new TypedocWebpackPlugin({})
	],
	externals: nodeModules
};