const webpack = require('webpack')
const path = require('path')

module.exports = {
	mode: 'development',
	entry: [
		__dirname + '/demo/index.jsx'
	],
	output: {
		publicPath: '/',
		filename: '../demo/demo.js'
	},
	resolve: {
		extensions: ['', '.js', '.jsx', '.ts', '.tsx']
	},
	devServer: {
		hot: true,
		historyApiFallback: true,
		open: true,
		static: path.join(__dirname),
		compress: true,
		liveReload: true,
		port: 8080,
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						"presets": [
							"@babel/preset-env",
							"@babel/preset-react"
						],
						plugins: ['@babel/plugin-transform-object-rest-spread']
					}
				}
			},
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
		]
	}
};
