var _ = require('underscore');

var PlayerModel = function (key) {
    var createPlayers = function () {
        return {
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
    }
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
};

PlayerModel.prototype.store = function () {
    if (this.players) {
        var data = {
            players: this.players,
            wasGameOver: this.wasGameOver
        };
        return localStorage.setItem(this.key, JSON.stringify(data));
    }
};

PlayerModel.prototype.clearPlayerCells = function () {
    _.each(this.players, function (player) {
        player.cells = [];
    });
};

module.exports = PlayerModel;
