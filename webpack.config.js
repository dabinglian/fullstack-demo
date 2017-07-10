var webpack = require('webpack');
var path = require('path')

module.exports = {
	entry: {
		main: './client/src/main.js'
	},
	output: {
		path: path.resolve(__dirname, './dist/js'),
        filename: '[name].[chunkhash].js',
	},
	module: {
        loaders: [{
            test: /\.js$/,
            exclude: /^node_modules$/,
            loader: 'babel-loader'
        }]
    }
}