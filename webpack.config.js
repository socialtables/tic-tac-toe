var path = require('path'),
	webpack = require('webpack');

module.exports = {
  cache: true,
  entry: path.resolve(__dirname, 'app/scripts/index.jsx'),
  output: {
	path: path.resolve(__dirname, 'build/test'),
  	filename: 'browser-bundle.js'
  },
  module: {
    loaders: [
      	{
			test: /\.jsx$/,
			loader: 'jsx-loader?harmony'
		},
		{
			test: /\.scss$/,
			loader: "style-loader!css-loader!sass-loader?outputStyle=expanded&" +
			  "includePaths[]=" +
				(path.resolve(__dirname, "./build/bower_components")) + "&" +
			  "includePaths[]=" +
				(path.resolve(__dirname, "./node_modules"))
		}
    ]
  },
  resolve: {
	  extensions: ['', '.js', '.jsx', '.scss', '.json'],
	  root: [path.join(__dirname, 'build', 'bower_components')]
  },
  plugins: [
	  new webpack.ResolverPlugin([
		  new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
	  ], ["normal", "loader"])
  ],
  debug: true,
  devtool: "#inline-source-map"
};
