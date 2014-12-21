(function(){
  var Board = React.createClass({
    getInitialState: function() {
      return {
        cells: [' ',' ',' ',
                ' ',' ',' ',
                ' ',' ',' '],
        player: 'X'
      };
    },

    playerTurn: function(cellIndex) {
      var player = this.state.player,
          cells = this.state.cells;

      if( cells[cellIndex] !== ' ' ) { return; }

      cells[cellIndex] = player;
      this.setState({cells: cells, player: (player === 'X' ? 'O' : 'X')});

    },

    render: function() {
      var cells = this.state.cells,
          playerTurn = this.playerTurn;

      return <div> 
        <div id='board'>
          {
            cells.map(function(player, index){
              return <Cell player={player} cellIndex={index} playerTurn={playerTurn}/>;
            })
          }
        </div>
        <Status board={this} player={this.state.player}/>
      </div>;
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
      return <div className='cell' onClick={this.clickCell}>{player}</div>;
    }
  });

  var Status = React.createClass({
    render: function() {
      var board = this.props.board;
          player = this.props.player;

      return <div id='status'>
        <h1>{ player + '\'s' } turn to go.</h1>
        <PlayAgainButton board={board}/>
      </div>;
    }
  });

  var PlayAgainButton = React.createClass({
    resetBoard: function(){
      var board = this.props.board;
      board.setState({
        cells: [' ',' ',' ',
                ' ',' ',' ',
                ' ',' ',' '],
        player: 'X'
      });
    },
    render: function() {
      return <button onClick={this.resetBoard}>Play Again</button>;
    }
  });

  React.renderComponent(
    <Board/>,
    $('#tic-tac-toe')[0]
  );
})();