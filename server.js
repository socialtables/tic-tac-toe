'use strict';

require('jsdom');

var express = require('express'),
	path = require('path'),
	React = require('react'),
	jsdom = require('jsdom').jsdom,
	serializeDocument = require('jsdom').serializeDocument;

var jquery = require('jquery');//(require('jsdom').jsdom().parentWindow);

require('node-jsx').install({extension: '.jsx'});

var App = require('./app/scripts/App.jsx'),
    model = require('./app/scripts/models/modelLocalStorage.js'),
	fs = require('fs');

var app = express();

(function configure () {
	app.use(express.static(path.join(__dirname, 'dist')));
//	app.engine('html')
})();

//app.get('/scripts/app.js', 'dist/scripts/app.js');

app.get('*', function(req, res) {
	debugger;
	fs.readFile('./app/index.html', function(err, indexHTML) {
		debugger;
		if (err) {
			throw err;
		}
		var doc = jsdom(indexHTML);
		var $ = jquery(doc.parentWindow);
//		console.log($('body').html());
		var props = {'model': model};
		var appHTML = React.renderToString(App(props));
//		res.setHeader('Content-Type', 'text/html');
		$('body').html(appHTML);
		var html = serializeDocument(doc);
		fs.writeFile('blaa', html);
		console.log(html);
		res.send(html);
//		res.send($(indexHTML).find('body').html(appHTML));
	});
});

var server = app.listen(process.env.PORT || 9000, function () {
	console.log('\nServer ready on port %d\n', server.address().port);
});
