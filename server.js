var express = require("express");
var app = express();

var host = "127.0.0.1";
var port = 80;

app.use( express.static( "src" ) ); 

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
	
	console.log( "saved");

    response.send( history );
});

app.listen(port, host);

console.log( ["Server running at http://",host,":",port].join("") );