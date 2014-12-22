(function(){
  var Board = React.createClass({
    getInitialState: function() {
      return this.boardDefaults();
    },

    boardDefaults: function() {
      return {
        cells: [' ',' ',' ',
                ' ',' ',' ',
                ' ',' ',' '],
        player: 'X',
        gameStatus: 'playing',
        winner: ''
      }
    },

    winConditions: [[0,1,2],
                    [3,4,5],
                    [6,7,8],
                    [0,4,8],
                    [2,4,6],
                    [0,3,6],
                    [1,4,7],
                    [2,5,8]],

    playerTurn: function(cellIndex) {
      var player = this.state.player,
          cells = this.state.cells,
          gameStatus = this.state.gameStatus;

      if (cells[cellIndex] !== ' ' || gameStatus !== 'playing') { return; }

      cells[cellIndex] = player;
      this.updateGame(cells);
    },

    updateGame: function(cells) {
      var winner = '',
          player = this.state.player,
          gameStatus = this.state.gameStatus;

      if (this.boardFull(cells)) { gameStatus = 'draw'; }

      if (this.gameWon(cells)) { 
        gameStatus = 'over';
        winner = player;
      }

      this.setState({
        cells: cells,
        player: player = player === 'X' ? 'O' : 'X',
        gameStatus: gameStatus,
        winner: winner
      });
    },

    boardFull: function(cells) {
      return cells.indexOf(' ') === -1
    },

    gameWon: function(cells) {
      return this.winConditions.some(function(checking){
        var row = checking.map(function(cellIndex){
          return cells[cellIndex];
        }).join('');

        return row === 'XXX' || row === 'OOO'
      });
    },

    render: function() {
      var cells = this.state.cells,
          playerTurn = this.playerTurn;

      return (
        <div className='row'> 
          <div className='small-5 columns' id='board'>
            {
              cells.map(function(player, index){
                return (
                  <Cell 
                  player={player} 
                  key={index} 
                  cellIndex={index} 
                  playerTurn={playerTurn}/>
                );
              })
            }
          </div>
          <Status board={this} player={this.state.player}/>
        </div>
      );
    }
  });

  var Cell = React.createClass({
    clickCell: function() {
      var cellIndex = this.props.cellIndex,
          playerTurn = this.props.playerTurn;

      playerTurn( cellIndex );
    },

    render: function() {
      var player = this.props.player;
      return (
        <div className='cell small-4 columns text-center' 
          onClick={this.clickCell}>
          {player}
        </div>
      );
    }
  });

  var Status = React.createClass({
    render: function() {
      var board = this.props.board,
          player = this.props.player,
          gameStatus = board.state.gameStatus,
          winner = board.state.winner,
          bgType = gameStatus === 'over' ? 'win' : '',
          statusMsg;

      if(gameStatus === 'over') {
        statusMsg = 'Winner is ' + winner
      } else if (gameStatus === 'draw') {
        statusMsg = 'DRAW'
      } else {
        statusMsg = player + '\'s turn'
      }

      return (
        <div className='small-4 columns row' id='status'>
          <h1 className={ bgType }>
            { statusMsg }
          </h1>
          <PlayAgainButton board={ board }/>
        </div>
      );
    }
  });


  var PlayAgainButton = React.createClass({
    resetBoard: function(){
      var board = this.props.board;
      board.setState(board.boardDefaults());
    },

    render: function() {
      return (<button onClick={this.resetBoard}>
        Play Again
      </button>);
    }
  });

  React.render(<Board/>, $('#tic-tac-toe')[0]);
})();