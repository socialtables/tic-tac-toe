var _ = require('underscore');

var LocalStorage = {
    getItem: function (key) {
        if(Modernizr.localstorage) {
            return localStorage.getItem(key);
        } else {
            console.log("Sorry, this browser does not support localStorage!");
        }
    },
    setItem: function (key, string) {
        if(Modernizr.localstorage) {
            return localStorage.setItem(key, string);
        } else {
            console.log("Sorry, this browser does not support localStorage!");
        }
    }
};

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

    var isNewKey = false;

    function Model (key) {
        this.key = key;
        this.wasGameOver = false;
        this.players = createPlayers();
        var storage,
            model;
		storage = LocalStorage.getItem(key);
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

    Model.prototype.isNewKey = function () {
		return isNewKey;
    };

    Model.prototype.store = function () {
        if (this.players) {
            var data = {
                players: this.players,
                wasGameOver: this.wasGameOver
            };
            if(LocalStorage.getItem(this.key)) {
                isNewKey = false;
            } else {
                isNewKey = true;
            };
            return LocalStorage.setItem(this.key, JSON.stringify(data));
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
    };

    Model.prototype.makeNewGame = function () {
        this.clearPlayerCells();
        this.wasGameOver = false;
    }

    return Model;
})();

model = new Model('tic-tac-toe');

module.exports = model;
