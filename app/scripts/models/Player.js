var Backbone = require('backbone');

var Player = Backbone.Model.extend({
    defaults: {
        team: ''
    }
});

//module.exports = new Player({
//    '0': {
//        player: '',
//
//    }
//});

module.exports = Player;
