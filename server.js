var express = require('express'),
	path = require('path'),
	React = require('react');

var app = express();

(function configure () {
	app.use(express.static(path.join(__dirname, 'dist')));
//	app.engine('html')
})();

//app.get('/scripts/app.js', 'dist/scripts/app.js');

app.get('*', function(req, res) {
	res.render('dist/game');
});

var server = app.listen(process.env.PORT || 9000, function () {
	console.log('\nServer ready on port %d\n', server.address().port);
});
