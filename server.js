var express = require('express');
var app = express();
var server = require('http').Server(app);

var bodyParser = require('body-parser');

var host = "127.0.0.1";
var port = 80;

app.use( express.static( "src" ) ); 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

var history = [];

app.get("/", function(request, response){ 
    response.sendFile('index.html', {root:__dirname});
});

//List all games
app.get("/games", function(request, response){ 
    response.send( history );
});

//Save Game
app.post("/games", function(request, response){
	history.push( request.body );

    response.send( history );
});

app.listen(port, host);

console.log( ["Server running at http://",host,":",port].join("") );