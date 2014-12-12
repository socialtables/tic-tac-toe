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

app.solutions = {
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
    getInitialState: function () {
        var gameBoard = [],
            winningSolution = [];
        for (var i = 0; i < 9; i++)
        {
            gameBoard.push(''); //TODO: Do I need to do this?
            if(i < 3) {
                winningSolution.push('');
            }
        }
        return {
            whoseTurn: app.PLAYERX,
            gameBoard: gameBoard,
            isGameOver: false,
            winningSolution: winningSolution
        }
    },
    updateScoreboard: function (player) {
        player.wins = player.wins + 1;
    },
    isGameOver: (function () {
        app.PLAYERO.cells = [];
        app.PLAYERX.cells = [];
        return function (player, index) {
            var gameOver = false,
                cells = player['cells'];
            cells.push(index);
            var possibleSolutions = app.solutions[index];
            _.each(possibleSolutions, function (arr) {
                if(_.contains(cells, arr[0]) && _.contains(cells, arr[1])) {
                    gameOver = true;
                    this.setState({winningSolution: cells});
                }
            }, this);
            return gameOver;
        };
    })(),
    clearBoard: function () {
        app.PLAYERO.cells = [];
        app.PLAYERX.cells = [];
        this.setState(this.getInitialState());
    },
    handleCellClick: function (location) {
        var player = this.state.whoseTurn,
            gameBoard = this.state.gameBoard;
        gameBoard[location] = player;
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
        if( this.isGameOver(player, location) ) {
            this.updateScoreboard(player);
            this.setState({isGameOver: true});
        }
        //if( this.isGameOver(player, location) ) {
        //    this.updateScoreboard(player);
        //    alert('Game over ' + player.displayName + ' has won!');
        //    //this.clearBoard();
        //};
    },
    componentDidUpdate: function (prevProps, prevState) {
        if(this.state.isGameOver) {
            //var player = prevState.whoseTurn;
			//alert('Game over ' + player.displayName + ' has won!');
			//this.clearBoard();
        }
    },
    render: function() {
        var Rows;
        Rows = [0,1,2].map(function (row) {
            return <Row row={row}
                        onCellClick={this.handleCellClick}
                        gameBoard={this.state.gameBoard}
                        isGameOver={this.state.isGameOver}
                        winningSolution={this.state.winningSolution}
                   />
        }, this);
        return  (
            <div>
				<div className="scoreboard">
					<ScoreBoard player={app.PLAYERX} className="pull-left"/>
					<ScoreBoard player={app.PLAYERO} className="pull-right"/>
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

var Row = React.createClass({
    getRowClassName: (function () {
        var lookup = ['top-row', 'middle-row', 'bottom-row'];
        return function (row) {
            return lookup[row];
        }
    })(),
    getBorder: function (row) {
        if(row === 0 || row === 1) {
            return border = <div className="border-top"></div> // Rename to border-bottom?
        }
        return '';
    },
    render: function () {
        var status,
            location,
            row = this.props.row,
            rowName = this.getRowClassName(row),
            border = this.getBorder(row);
        Cells = [0,1,2].map(function (cell) {
            location = row * 3 + cell;
            status = this.props.gameBoard[location];
            return <Cell onCellClick={this.props.onCellClick}
                         location={location}
                         status={status}
                         isGameOver={this.props.isGameOver}
                         isInWinningSolution={_.contains(this.props.winningSolution, location) ? true : false}
                   />
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
    getClassName: function (location) {
        var cellLocation = location % 3;
        if(cellLocation === 0) {
            return 'left';
        } else if (cellLocation === 1) {
            return 'center';
        }
		return 'right'
    },
    handleClick: function () {
        if (this.props.status || this.props.isGameOver) {
            return;
        }
        this.props.onCellClick(this.props.location);
    },
    getFill: function (status, isInWinningSolution) {
        debugger;
        if (status === app.PLAYERX && !isInWinningSolution) {
            return <div><img src="images/X.svg" /></div>;
        } else if (status === app.PLAYERO && !isInWinningSolution) {
            return <div><img src="images/O.svg" /></div>;
        } else if (status === app.PLAYERX && isInWinningSolution) {
            return <div><img src="images/Red-X.svg" /></div>;
        } else if (status === app.PLAYERO && isInWinningSolution) {
            return <div><img src="images/Red-O.svg" /></div>;
        }
        return '';
    },
    render: function () {
        var status = this.props.status,
            fill = this.getFill(status, this.props.isInWinningSolution),
            isGameOver = this.props.isGameOver,
            className = this.getClassName(this.props.location);
		className = "cell " + className + " col-xs-2 col-sm-2 col-md-2 col-lg-2";
		return (
			<div onClick={this.handleClick} className={className} ref="cell">
                <div className={"pointer " + (isGameOver ? '' : 'pointer-on')}>
                {fill}
                </div>
            </div>
        );
    }
});

var ScoreBoard = React.createClass({
    render: function () {
        var player = this.props.player;
        return (
            <div className={"scoreboard-player " + this.props.className}>
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

module.exports = function () {
    React.render(<Game />, mountNode);
}
