'use strict';

//require('node-jsx').install({extension: '.jsx'});

var express = require('express'),
	session = require('express-session'),
	errorhandler = require('errorhandler'),
	path = require('path'),
	React = require('react'),
	nunjucks = require('nunjucks'),
	App = require('./build/scripts/App.js'),
    model = require('./app/scripts/models/modelLocalStorage.js'),
	fs = require('fs');

var app = express();

app.use(errorhandler());
app.use(session({secret: 'gogreenbaypackers'}));

app.get('/', function(req, res) {
	var props = {'model': model};
	var appHTML = React.renderToString(App(props));
	nunjucks.render('build/index.html', {bodyContent: appHTML}, function(err, html) {
		if(err) {
			throw err;
		};
		res.send(html);
	});
});

// Below routes
app.use(express.static(path.join(__dirname, 'dist')));

var server = app.listen(process.env.PORT || 9000, function () {
	console.log('\nServer ready on port %d\n', server.address().port);
});
