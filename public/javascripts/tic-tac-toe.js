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
          gameStatus = this.state.gameStatus,
          winner = this.state.winner;

      if( cells[cellIndex] !== ' ' ) { return; }
      if( gameStatus != 'playing' ) { return; }

      cells[cellIndex] = player;
      this.setState({
        cells: cells, 
        player: player, 
        gameStatus: gameStatus,
        winner: winner
      });

    },
    boardFull: function() {
      var cells = this.state.cells;

      return cells.indexOf(' ') === -1
    },
    updateGameStatus: function() {
      var cells = this.state.cells,
          player = this.state.player,
          winner = '',
          gameStatus = this.state.gameStatus;

      if(gameStatus !== 'playing') { return; }
      if(this.boardFull()) { gameStatus = 'draw';}

      this.winConditions.forEach(function(checking){
        var row = checking.map(function(cellIndex){
          return cells[cellIndex];
        }).join('');

        if(row === 'XXX') {
          winner = 'X';
          gameStatus = 'over';
        } else if(row === 'OOO') {
          winner = 'O';
          gameStatus = 'over';
        }
      });

      this.setState({
        cells: cells,
        player: (player === 'X' ? 'O' : 'X'),
        gameStatus: gameStatus,
        winner: winner
      });
    },
    render: function() {
      var cells = this.state.cells,
          playerTurn = this.playerTurn,
          updateGameStatus = this.updateGameStatus;

      return (<div className='row'> 
        <div className='small-5 columns' id='board'>
          {
            cells.map(function(player, index){
              return (<Cell player={player} cellIndex={index} playerTurn={playerTurn} updateGameStatus={updateGameStatus}/>);
            })
          }
        </div>
        <Status board={this} player={this.state.player}/>
      </div>);
    }
  });


  var Cell = React.createClass({
    clickCell: function() {
      var cellIndex = this.props.cellIndex,
          playerTurn = this.props.playerTurn,
          updateGameStatus = this.props.updateGameStatus;

      playerTurn( cellIndex );
      updateGameStatus();
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
        <div className='small-4 columns' id='status'>
          <h1 className={ bgType }>
            { statusMsg }
          </h1>
          <PlayAgainButton board={board}/>
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

  React.renderComponent(
    <Board/>,
    $('#tic-tac-toe')[0]
  );
})();