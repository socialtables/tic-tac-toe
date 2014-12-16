var _ = require('underscore');

var PlayerModel = function (key) {
    //debugger;
    var storage,
        model;
	this.key = key;
    this.wasGameOver = false;
    storage = localStorage.getItem(key);
    if(storage) {
        model = JSON.parse(storage);
        this.players = model.players;
        this.wasGameOver = model.wasGameOver;
    }
    if(model && this.players) {
        if(this.wasGameOver) {
            this.clearPlayerCells();
        }
    }
	else {
        this.players = {
            'PLAYERX': {
                wins: 0,
                displayName: 'Player X',
                cells: [],
                keyName: 'playerX'
            },
            'PLAYERO': {
                wins: 0,
                displayName: 'Player O',
                cells: [],
                keyName: 'playerO'
            }
        }
        this.store();
    }
};

PlayerModel.prototype.store = function () {
    obj = {
        players: this.players,
        wasGameOver: this.wasGameOver
	};
    if (this.players && this.wasGameOver) {
        return localStorage.setItem(this.key, JSON.stringify(obj));
    }
};

PlayerModel.prototype.clearPlayerCells = function () {
    _.each(this.players, function (player) {
        player.cells = [];
    });
};

module.exports = PlayerModel;
