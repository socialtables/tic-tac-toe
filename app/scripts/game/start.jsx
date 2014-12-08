/** @jsx React.DOM */

var React = require('react');
var mountNode = $("#jumbotron")[0];

var Game = React.createClass({
    render: function() {
        return  (
            <div className="game">
                <TopRow />
				<MiddleRow />
				<BottomRow />
            </div>
        );
    }
});

var TopRow = React.createClass({
    handleCellClick: function (cell) {
        ;
	},
    render: function () {
        return (
            <div className="row top-row">
				<div className="col-xs-3 col-sm-3 col-md-3 col-lg-3"></div>
                <Cell onCellClick={this.handleCellClick} location="left" />
                <Cell onCellClick={this.handleCellClick} location="center" />
                <Cell onCellClick={this.handleCellClick} location="right" />
				<div className="border-top"></div>
            </div>
        );
    }
});

var MiddleRow = React.createClass({
    render: function () {
        return (
            <div className="row middle-row">
				<div className="col-xs-3 col-sm-3 col-md-3 col-lg-3"></div>
					<Cell onCellClick={this.handleCellClick} location="left" />
					<Cell onCellClick={this.handleCellClick} location="center" />
					<Cell onCellClick={this.handleCellClick} location="right" />
				<div className="border-top"></div>
			</div>
        );
    }
});

var BottomRow = React.createClass({
    render: function () {
        return (
            <div className="row bottom-row">
				<div className="col-xs-3 col-sm-3 col-md-3 col-lg-3"></div>
				<Cell onCellClick={this.handleCellClick} location="left" />
			    <Cell onCellClick={this.handleCellClick} location="center" />
				<Cell onCellClick={this.handleCellClick} location="right" />
			</div>
        );
    }
});

var Cell = React.createClass({
    getInitialState: function () {
        return {data: false};
    },
    handleClick: function () {
        debugger;
        if (this.state.data) {
            return;
        }
        var cell = this.refs.cell.getDOMNode();
		$(cell).css('background-color', 'red');
        this.props.onCellClick({cell: cell});
        this.setState({data: 'red'});
    },
    render: function () {
		var className = "cell " + this.props.location + " cell col-xs-2 col-sm-2 col-md-2 col-lg-2";
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
