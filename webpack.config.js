var path = require('path'),
	webpack = require('webpack');

module.exports = {
  cache: true,
  entry: path.resolve(__dirname, 'app/scripts/index.jsx'),
  output: {
	path: path.resolve(__dirname, 'build/scripts'),
  	filename: 'browser-bundle.js'
  },
  module: {
    loaders: [
      	{
			test: /\.jsx$/,
			loader: 'jsx-loader?harmony'
		}
    ]
  },
  resolve: {
	  extensions: ['', '.js', '.jsx', '.scss', '.json']
  },
  debug: true,
  devtool: "#inline-source-map"
};
