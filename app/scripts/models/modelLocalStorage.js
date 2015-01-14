'use strict';

//var MongoClient = require('mongodb').MongoClient;
//
//// Connect to the db
//MongoClient.connect("mongodb://localhost:27017/tictactoe", function(err, db) {
//  if(!err) {
//    console.log("We are connected");
//  }
//
//  db.createCollection('test', {strict: true}, function (err, collection) {});
//});

var _ = require('underscore');
//	Modernizr = require('modernizr/modernizr.js');

var localStorage = {
	getItem: function(key) {
		return false;
	},
	setItem: function(key, value) {
		return true;
	}
};

var createPlayers = function (newPlayerX, newPlayerO) {
    var playerX = newPlayerX || 'Player X';
    var playerO = newPlayerO || 'Player O';
    return {
        'PLAYERX': {
            wins: 0,
            displayName: playerX,
            cells: [],
            keyName: 'playerX'
        },
        'PLAYERO': {
            wins: 0,
            displayName: playerO,
            cells: [],
            keyName: 'playerO'
        }
    }
}

var isNewKey = false;

var Model = (function () {
    return function (key) {
        this.key = key;
        this.wasGameOver = false;
        this.players = createPlayers();
        var storage,
            model;
        storage = localStorage.getItem(key);
        if(storage) {
            model = JSON.parse(storage);
            this.players = model.players;
            this.wasGameOver = model.wasGameOver;
        }
        if(this.players && this.wasGameOver) {
            this.clearPlayerCells();
        }
        this.store();
    }
})();

Model.prototype = _.extend(Model.prototype, {
    isNewKey: function () {
        return isNewKey;
    },
    store: function () {
        if (this.players) {
            var data = {
                players: this.players,
                wasGameOver: this.wasGameOver
            };
            isNewKey = !localStorage.getItem(this.key);
            return localStorage.setItem(this.key, JSON.stringify(data));
        }
    },
    clearPlayerCells: function () {
		_.each(this.players, function (player) {
			player.cells = []
		});
	},
	createNewPlayers: function (newPlayerX, newPlayerO) {
		this.players = createPlayers(newPlayerX, newPlayerO);
		this.wasGameOver = false;
		this.store();
	},
	makeNewGame: function () {
		this.clearPlayerCells();
		this.wasGameOver = false;
	}
});

var model = new Model('tic-tac-toe');

module.exports = model;
