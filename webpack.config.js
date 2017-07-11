var webpack = require('webpack');
var path = require('path');
var publicPath = 'http://localhost:8000/';
var hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';

module.exports = {
	entry: {
		main: ['./client/src/js/main.js', hotMiddlewareScript]
	},
	output: {
		path: path.resolve(__dirname, './client/dist/js'),
		publicPath: publicPath,
        filename: '[name].js',
	},
	devtool: 'source-map',
	module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /^node_modules$/,
            loader: 'babel-loader',
            query: {
		        presets: ["es2015", "react"]
		    }
        },
        {
			test: /\.css$/,
			loader: 'style-loader!css-loader'
		},
        {
            test: /\.(png|jpg)$/,
            loader: 'url?limit=8192&context=client&name=[path][name].[ext]'
        }, {
            test: /\.scss$/,
            loader: 'style!css?sourceMap!resolve-url!sass?sourceMap'
        }]
    },
    plugins: [
    	//为组件分配ID，通过这个插件webpack可以分析和优先考虑使用最多的模块，并为它们分配最小的ID
        new webpack.optimize.OccurrenceOrderPlugin(),   
        new webpack.HotModuleReplacementPlugin(),     //热加载插件
        new webpack.NoErrorsPlugin()    //不显示错误
    ]
}