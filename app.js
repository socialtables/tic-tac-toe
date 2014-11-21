var express = require('express');
var app = express();
var http = require('http').Server(app);
var jade = require('jade');
var bodyParser = require('body-parser');
var browserify = require('browserify-middleware')
var MongoClient = require('mongodb').MongoClient;
var io = require('socket.io')(http);



app.set('view engine', 'jade');

app.use(express.static('public'));
app.use(bodyParser.json());

// Just to note, I would usually never put login info in the source, but this 
// isn't sensitive information in this case so I've put it here for convenience.
MONGO_URI = 'mongodb://foobar:foobar@ds053390.mongolab.com:53390/tic_tac_toe'

io.on('connection', function(socket){
    socket.on('game_completed', function(outcome){
        MongoClient.connect(MONGO_URI, function(err, db){
            db.collection('games').insert(outcome, function(err, result){
                if(err) console.log(err);
            });
            io.emit('score_update', outcome)
        });
    })

})

app.get(
    '/js/bundle.js', 
    browserify(
        './public/coffee/main.coffee', 
        {
            transform: ['coffee-reactify'],
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