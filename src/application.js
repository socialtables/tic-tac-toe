(function(){
    var Ratio = React.createClass({
        getRatio : function( _player ){
            var wins = 0;
            if(this.props.history.length === 0){
                return 0;
            } 
            $.each(this.props.history, function(){
                if(parseInt(this.player) === _player){
                    wins++
                }
            });

            return Math.round( (wins / this.props.history.length) * 100);
        },

        render : function(){
            return ( 
                <div>
                    <div>X {this.getRatio( -1 )}%</div>
                    <div>Draw {this.getRatio( 0 )}%</div>
                    <div>O {this.getRatio( 1 )}%</div>
                </div> 
            );
        }
    });

    var NewGameButton = React.createClass({
        clickHandler : function(){
            this.props.newGame();
        },

        render : function(){
            return ( <button onClick={this.clickHandler}>New Game</button>);
        }
    });

    var Game = React.createClass({
        getInitialState : function(){

            return {
                grid : [ 
                    0, 0, 0, 
                    0, 0, 0, 
                    0, 0, 0
                ],

                currentPlayer : -1,
                hasWinner : false,

                combination : [],
                history : []
            };
        },

        componentDidMount: function() {
            $.get("/games", function(result) {

              if (this.isMounted()) {
                this.setState({
                  history : result
                });
              }
            }.bind(this));
          },

        newGame : function(){
            this.setState( {
                grid : [ 
                    0, 0, 0, 
                    0, 0, 0, 
                    0, 0, 0
                ],

                currentPlayer : -1,
                hasWinner : false,

                combination : []
            } );
        },

        playerDisplay : function( _player ){
            var text = null;

            switch( _player ){
                case -1:
                    text = "X";
                break;

                case 1:
                    text = "O";
                break;

                default:
                    text = "";
            }

            return text;
        },

        currentPlayerDisplay : function(){
            return this.playerDisplay(this.state.currentPlayer); 
        },

        winnerCheck : function(){
            var hasWinner = false;
            var combination = [];
            var tmpGrid = this.state.grid;
            var winnngArrays = [];
            
            winnngArrays.push( [0,1,2] );
            winnngArrays.push( [3,4,5] );
            winnngArrays.push( [6,7,8] );
            winnngArrays.push( [0,3,6] );
            winnngArrays.push( [1,4,7] );
            winnngArrays.push( [2,5,8] );
            winnngArrays.push( [0,4,8] );
            winnngArrays.push( [2,4,6] );

            $.each(winnngArrays, function(){
                if(Math.abs( tmpGrid[ this[0] ] + tmpGrid[ this[1] ] + tmpGrid[ this[2] ]) === 3){
                    combination = this;
                    hasWinner = true;

                }
            });

            this.setState({combination : combination, hasWinner : hasWinner });
            
            console.log(hasWinner);
        },

        hasWinner : function(){
            return this.state.combination.length !== 0;
        },

        isDraw : function(){
            console.log( $.inArray(this.state.grid,0) );
            return $.inArray(this.state.grid,0) !== -1;
        },

        play : function( _index ){
            var tmpGrid         = this.state.grid;
            var currentPlayer   = this.state.currentPlayer
            tmpGrid[ _index ]   = currentPlayer; 
            this.setState({ grid : tmpGrid});

            this.winnerCheck();            

            //check for win first
            //last move might result in win
            if( this.state.hasWinner ){
                this.processWin();
            } 
            //check for Draw
            else if( this.isDraw() ){
                this.processDraw();
            } 

            else {
                this.setState({currentPlayer : this.state.currentPlayer *=-1 });    
            }          
            
        },

        processWin : function(){
            var self = this;
            var history = this.state.history;

            var message = ["player",this.currentPlayerDisplay(),"wins!","\n","New Game?"].join(" ");

            if( window.confirm( message ) ){
                //Save results
                var game = {status:"win",player:this.state.currentPlayer};

                $.post("/games", game, function(){
                    //start a new game
                    self.setState( {history : history.push(game)} );
                    self.newGame();
                });                     
            }
        },

        processDraw : function(){
            var self = this;

            var message = [""].join(" ");
            var game = {status:"draw",player:0};

            if( window.confirm( "It's A Draw!/nPlay Again?" ) ){
                //Save results
                $.post("/games", game, function(){
                    //start a new game
                    self.newGame();
                });                     
            }
        },

        render: function() {
            return (
                <div>
                    
                    <Ratio history={this.state.history} />
                    <div id='game'>                        
                        {this.state.grid.map( function( _tile, _index){
                            return ( 
                                <Tile 
                                    hasWinner={this.state.combination.length !== 0} 
                                    highlight={ $.inArray( _index, this.state.combination) !== -1 } 
                                    value={ _tile } 
                                    key={ _index } 
                                    index={ _index } 
                                    play = {this.play} 
                                    playerDisplay = {this.playerDisplay}/> 
                            );
                        }, this)}
                    </div> 
                    <NewGameButton newGame={this.newGame} />           
                </div>
            );
        }
    });

    var Tile = React.createClass({
        
        clickHandler : function(){
            if(this.props.value === 0 && !this.props.hasWinner){
                this.props.play( this.props.index );
            } else {
                console.log("uh uh uh");
            }
            
        },

        render: function() {
            var classes = ["tile"];

            if( this.props.highlight ){
                classes.push("highlight");
            }
            return ( <div onClick={ this.clickHandler }  className={classes.join(" ")}> { this.props.playerDisplay( this.props.value ) } </div> );
        }
    });

    React.render( <Game />, document.getElementById('content') );

})();