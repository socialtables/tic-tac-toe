var _ = require('underscore');

var Model = (function () {
    function createPlayers (newPlayerX, newPlayerO) {
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

    function Model (key) {
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
            clearPlayerCells();
        }
        this.store();
    }

    Model.prototype.store = function () {
        if (this.players) {
            var data = {
                players: this.players,
                wasGameOver: this.wasGameOver
            };
            return localStorage.setItem(this.key, JSON.stringify(data));
        }
    };

    Model.prototype.clearPlayerCells = function () {
        _.each(this.players, function (player) {
            player.cells = []
        });
    };

    Model.prototype.createNewPlayers = function (newPlayerX, newPlayerO) {
        this.players = createPlayers(newPlayerX, newPlayerO);
        this.wasGameOver = false;
        this.store();
    }

    return Model;
})();

model = new Model('tic-tac-toe');

module.exports = model;
