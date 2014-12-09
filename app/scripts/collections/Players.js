var Backbone = require('backbone'),
    Player = require ('../models/Player');

var Players = Backbone.Collection.extend({
    model: Player
});

var players = new Players();
module.exports = players;
