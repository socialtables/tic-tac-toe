/** @jsx React.DOM */

var React = require('react'),
    BackboneReactMixin = require('backbone-react-component'),
    mountNode = $("#jumbotron")[0];
//var Players = require('../collections/Players');
//var Player = require('../collections/Player');

var app = app || {};
app.PLAYERO = 'playerO';
app.PLAYERX = 'playerX';

var Game = React.createClass({
    mixins: [BackboneReactMixin],
    getInitialState: function () {
        return {
            whoseTurn: app.PLAYERX,

        }
    },
    handleCellClick: function (location) {
        debugger;
        //var collect = this.getCollection();
        var whoseTurn = this.state.whoseTurn;
        if (whoseTurn === app.PLAYERX) {
            this.setState({whoseTurn: app.PLAYERO})
        } else {
            this.setState({whoseTurn: app.PLAYERX})
        }
    },
    render: function() {
        var Rows, rows = [[0,[0,1,2]], [1,[0,1,2]], [2,[0,1,2]]];
        Rows = rows.map(function (row) {
            return <Row row={row} onCellClick={this.handleCellClick} whoseTurn={this.state.whoseTurn}/>
        }, this);
        return  (
            <div className="game">
                {Rows}
            </div>
        );
    }
});

var Row = React.createClass({
    getRowClassName: function (row) {
        lookup = ['top-row', 'middle-row', 'bottom-row'];
        return lookup[row];
    },
    getBorder: function (rowName) {
        if(rowName === 'top-row' || rowName === 'middle-row') {
            return border = <div className="border-top"></div> // Rename to border-bottom?
        }
        return '';
    },
    render: function () {
        var rowNumber = this.props.row[0],
            rowName = this.getRowClassName(rowNumber),
            border = this.getBorder(rowName),
            cells = this.props.row[1];
        Cells = cells.map(function (cell) {
            return <Cell onCellClick={this.props.onCellClick} location={[rowNumber, cell]} whoseTurn={this.props.whoseTurn}/>
        }, this);
        return (
            <div className={"row " + rowName}>
                <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3"></div>
				{Cells}
				{border}
            </div>
        );
    }
});

var Cell = React.createClass({
    getInitialState: function () {
        return {isSet: false};
    },
    getClassName: function (location) {
        if(location === 0) {
            return 'left';
        } else if (location === 1) {
            return 'center';
        }
		return 'right'
    },
    handleClick: function () {
        if (this.state.isSet) {
            return;
        }
        var cell = this.refs.cell.getDOMNode();
		$(cell).css('background-color', 'red');
        $(cell).text(this.props.whoseTurn);
        this.props.onCellClick({location: this.props.location});
        this.setState({isSet: true});
    },
    render: function () {
        var className = this.getClassName(this.props.location[1]);
		className = "cell " + className + " col-xs-2 col-sm-2 col-md-2 col-lg-2";
		return (
			<div onClick={this.handleClick} className={className} ref="cell">
                {this.state.data}
            </div>
        );
    }
});

module.exports = function () {
    React.render(<Game />, mountNode);
}
