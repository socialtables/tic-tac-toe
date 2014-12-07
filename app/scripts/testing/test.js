var _ = require('underscore');

var nick = function (obj) {

    if( obj.sayHi )
    {
        console.log("hiiiiiiii");
    }
    else {
        console.log("my name is nick.");
    }

}

module.exports = nick;
