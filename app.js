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

// Just to note, I would usually never put login info in the source, but this 
// isn't sensitive information in this case so I've put it here for convenience.
MONGO_URI = 'mongodb://foobar:foobar@ds053390.mongolab.com:53390/tic_tac_toe'

// MongoClient.connect(MONGO_URI, function(err, db){
//     db.collection('games').insert({foo: 'bar'}, function(err, result){
//         if(err) console.log(err);
//     });
// });

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