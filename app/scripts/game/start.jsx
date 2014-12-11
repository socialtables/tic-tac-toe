/** @jsx React.DOM */

var React = require('react'),
    BackboneReactMixin = require('backbone-react-component'),
    mountNode = $("#jumbotron")[0],
    _ = require('underscore');
//var Players = require('../collections/Players');
//var Player = require('../collections/Player');

var app = {
    PLAYERX: {
        wins: 0,
        displayName: 'Player X'
    },
	PLAYERO: {
        wins: 0,
        displayName: 'Player O'
	}
}

app.winningSolutions = {
    '0': [
        [1,2], // row0
        [3,6], // column0
        [4,8] // diagonal
    ],
    '1': [
        [0,2], // row0
        [4,7] // column1
    ],
    '2': [
        [0,1], // row0
        [5,8], // column2
        [6,4] // reverse diagonal
    ],
    '3': [
        [0,6], // row1
        [4,5], // column0
    ],
    '4': [
        [3,5], // row1
        [0,8], // column1
        [6,2], // diagonal
        [0,8] // reverse diagonal
    ],
    '5': [
        [3,4], // row2
        [2,8], // column2
    ],
    '6': [
        [7,8], // row2
        [0,3], // column0
        [4,2] // reverse diagonal
    ],
    '7': [
        [6,8], // row2
        [1,4], // column1
    ],
    '8': [
        [6,7], // row2
        [2,5], // column2
        [0,4] // diagonal
    ]
}

var Game = React.createClass({
    mixins: [BackboneReactMixin],
    updateScoreboard: function (player) {
        player.wins = player.wins + 1;
        return;
    },
    isGameOver: (function () {
        app.PLAYERO.cells = [];
        app.PLAYERX.cells = [];
        return function (player, index) {
            var gameOver = false,
                cells = player['cells'];
            cells.push(index);
            var solutions = app.winningSolutions[index];
            _.each(solutions, function (arr) {
                if(_.contains(cells, arr[0]) && _.contains(cells, arr[1])) {
                    gameOver = true;
                }
            });
            if( gameOver) {
                this.updateScoreboard(player);
                alert('Game over ' + player.displayName + ' has won!');
            }
            return gameOver;
        };
    })(),
    getInitialState: function () {
        var gameBoard = [];
        for (var i = 0; i < 9; i++)
        {
            gameBoard.push('');
        }
        return {
            whoseTurn: app.PLAYERX,
            gameBoard: gameBoard
        }
    },
    handleCellClick: function (location) {
        var player = this.state.whoseTurn;
        var index = location[0] * 3 + location[1];
        var gameBoard = this.state.gameBoard;
        gameBoard[index] = player;
        this.isGameOver(player, index);
        if (player === app.PLAYERX) {
            this.setState({
                whoseTurn: app.PLAYERO,
                gameBoard: gameBoard
            })
        } else {
            this.setState({
                whoseTurn: app.PLAYERX,
                gameBoard: gameBoard
            })
        }
    },
    render: function() {
        var Rows;
        Rows = [0,1,2].map(function (row) {
            return <Row row={row} onCellClick={this.handleCellClick} whoseTurn={this.state.whoseTurn}/>
        }, this);
        return  (
            <div>
				<div className="scoreboard">
                    <div className="pull-left">
                        <ScoreBoard player={app.PLAYERX} />
					</div>
                    <div className="pull-right">
                        <ScoreBoard player={app.PLAYERO} />
                    </div>
				</div>
                <div className="game">
					{Rows}
                </div>
                <div className="player-turn">
                    <PlayerTurn player={this.state.whoseTurn} />
                </div>
            </div>
        );
    }
});

var ScoreBoard = React.createClass({
    render: function () {
        var player = this.props.player;
        return (
            <div>
                <div>
				{player.displayName}
                </div>
                <div>
                {player.wins}
                </div>
			</div>
        )
    }
});

var PlayerTurn = React.createClass({
    render: function () {
        var playerDisplayName = this.props.player.displayName;
        return (
            <p>
            {playerDisplayName}
			</p>
        )
    }
});

var Row = React.createClass({
    getRowClassName: function (row) {
        lookup = ['top-row', 'middle-row', 'bottom-row'];
        return lookup[row];
    },
    getBorder: function (row) {
        if(row === 0 || row === 1) {
            return border = <div className="border-top"></div> // Rename to border-bottom?
        }
        return '';
    },
    render: function () {
        var row = this.props.row,
            rowName = this.getRowClassName(row),
            border = this.getBorder(row);
        Cells = [0,1,2].map(function (cell) {
            return <Cell onCellClick={this.props.onCellClick} location={[row, cell]} whoseTurn={this.props.whoseTurn}/>
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
        var cell = this.refs.cell.getDOMNode(),
            player = this.props.whoseTurn;
        if (player === app.PLAYERX) {
            $(cell).append('<div><img src="images/X.svg" /></div>');
        } else {
            $(cell).append('<div><img src="images/O.svg" /></div>');
        }
        this.props.onCellClick(this.props.location);
        this.setState({isSet: true});
    },
    render: function () {
        var className = this.getClassName(this.props.location[1]);
		className = "cell " + className + " col-xs-2 col-sm-2 col-md-2 col-lg-2";
		return (
			<div onClick={this.handleClick} className={className} ref="cell">
                <div className="pointer">
                </div>
            </div>
        );
    }
});

module.exports = function () {
    React.render(<Game />, mountNode);
}
