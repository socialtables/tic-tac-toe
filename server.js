var express = require('express'),
	path = require('path'),
	React = require('react'),
	errorhandler = require('errorhandler');

var app = express();

app.use(errorhandler());
app.use(express.static(path.join(__dirname, 'dist')));
//app.engine('html');

//app.get('/scripts/app.js', 'dist/scripts/app.js');

app.get('*', function(req, res) {
	console.log("Nick error");
	res.render('dist/index');
});

var server = app.listen(process.env.PORT || 9000, function () {
	console.log('\nServer ready on port %d\n', server.address().port);
});
