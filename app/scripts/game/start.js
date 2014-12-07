/** @jsx React.DOM */

var React = require('react'),
    $ = require('jquery');
var mountNode = $("#start");

var Start = React.createClass({
    render: function() {
        var createItem = function(itemText) {
            return <li>{itemText}</li>;
        };
        return <h1>hhhhhiiiiii</h1>;
    }
});

$(".left").on('click', function (event, any, thing) {
    $(this).css('background-color', 'red');
    debugger;
});

module.exports = function () {
    React.render(<Start />, mountNode[0]);
}
