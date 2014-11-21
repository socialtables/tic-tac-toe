var express = require('express');
var app = express();
var http = require('http').Server(app);
var jade = require('jade');
var bodyParser = require('body-parser');
var browserify = require('browserify-middleware')
var MongoClient = require('mongodb').MongoClient;

app.set('view engine', 'jade');

app.use(express.static('public'));
app.use(bodyParser.json());

app.get(
    '/js/bundle.js', 
    browserify(
        './public/coffee/main.coffee', 
        {
            transform: ['coffeeify'],
            minify: true,
            precompile: true,
            cache: 'dynamic'
        }
    )
);

app.get('/', function(req, res){
    res.render('index.jade');
});

http.listen(5000, function(){
    console.log('Listening on *:' + '5000');
});