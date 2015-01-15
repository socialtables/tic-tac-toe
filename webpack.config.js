var path = require('path');

module.exports = {
  cache: true,
  entry: path.resolve(__dirname, 'app/scripts/index.jsx'),
  output: {
	path: path.resolve(__dirname, 'dist/scripts'),
  	filename: 'browser-bundle.js'
  },
  module: {
    loaders: [
      	{
			test: /\.jsx$/,
			loader: 'jsx-loader'
		},
		{
			test: /\.scss$/,
			loader: "style-loader!css-loader!sass-loader?outputStyle=expanded&" +
			  "includePaths[]=" +
				(path.resolve(__dirname, "./dist/bower_components")) + "&" +
			  "includePaths[]=" +
				(path.resolve(__dirname, "./node_modules"))
		}
    ]
  },
  resolve: {
	  extensions: ['', '.js', '.scss', '.jsx']
  },
  debug: true,
  devtool: "#inline-source-map"
};
