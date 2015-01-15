'use strict';

var express = require('express'),
	errorhandler = require('errorhandler'),
	path = require('path');

var app = express();

app.use(errorhandler());
app.use(express.static(path.join(__dirname, 'build')));

app.get('*', function(req, res) {
	var str = "This is an error. Check your server.js";
	console.log(str);
	res.send(str);
});

var server = app.listen(process.env.PORT || 9000, function () {
	console.log('\nServer ready on port %d\n', server.address().port);
});
