var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

const DEVELOPMENT = process.env.NODE_ENV === 'development';
const PRODUCTION = process.env.NODE_ENV === 'production';
console.log('Test:', PRODUCTION, DEVELOPMENT);

const entry = PRODUCTION
	?	[
			'./src/index.js'
		]
	:	[
			'./src/index.js',
			'webpack/hot/dev-server',
			'webpack-dev-server/client?http://localhost:8080'
		];

const plugins = PRODUCTION
	? [
			new webpack.optimize.UglifyJsPlugin(),
			new ExtractTextPlugin('style-[contenthash:10].css')
		]
	: [
			new webpack.HotModuleReplacementPlugin()
		];

const cssIdentifier = PRODUCTION ? '[hash:base64:10]' : '[path][name]---[local]';

const cssLoader = PRODUCTION
	?	ExtractTextPlugin.extract({
			loader: 'css-loader?minimize&localIdentName=' + cssIdentifier
		})
	: 	['style-loader', 'css-loader?localIdentName=' + cssIdentifier];

module.exports = {
  devtool: 'source-map',
  entry: entry,
  output: {
		path: path.join( __dirname, 'dist' ),
  	publicPath: '/dist/',
  	filename: 'bundle.js'
	},
	plugins: plugins,
	module: {
		loaders: [ {
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader',
			query: {
				presets: [
					'es2015',
					'stage-0',
					'react'
				]
			},
		}, {
			test: /\.(png|jpg|gif)$/,
			loaders: ['file-loader?name=[name].[ext]'],
			exclude: /node_modules/
		}, {
			test: /\.css$/,
			loaders: cssLoader,
			exclude: /node_modules/
		} ]
	}
};
