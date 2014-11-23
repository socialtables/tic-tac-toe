(function(){

    var Game = React.createClass({
        getInitialState : function(){

            return {
                grid : [ 
                    0, 0, 0, 
                    0, 0, 0, 
                    0, 0, 0
                ],

                currentPlayer : 1,

                history : []
            };
        },

        newGame : function(){
            this.setState( this.getInitialState() );
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

        hasWinner : function(){
            var hasWinner = false;
            var tmpGrid = this.state.grid;
            var winnngArrays = [];
            
            winnngArrays.push( [ tmpGrid[0], tmpGrid[1], tmpGrid[2] ] );
            winnngArrays.push( [ tmpGrid[3], tmpGrid[4], tmpGrid[5] ] );
            winnngArrays.push( [ tmpGrid[6], tmpGrid[7], tmpGrid[8] ] );
            winnngArrays.push( [ tmpGrid[0], tmpGrid[3], tmpGrid[6] ] );
            winnngArrays.push( [ tmpGrid[1], tmpGrid[4], tmpGrid[7] ] );
            winnngArrays.push( [ tmpGrid[2], tmpGrid[5], tmpGrid[8] ] );
            winnngArrays.push( [ tmpGrid[0], tmpGrid[4], tmpGrid[8] ] );
            winnngArrays.push( [ tmpGrid[2], tmpGrid[4], tmpGrid[6] ] );

            $.each(winnngArrays, function(){
                if(Math.abs( this[0] + this[1] + this[2]) === 3){
                    hasWinner = true;
                }
            });

            return hasWinner;
        },

        isDraw : function(){
            var draw = true;
            var tmpGrid = this.state.grid;
            
            $.each( tmpGrid, function( _tile ){
                if( _tile === 0){
                    draw = false;
                }
            });

            return draw;
        },

        play : function( _index ){
            var self = this;
            var tmpGrid         = this.state.grid;
            var currentPlayer   = this.state.currentPlayer;
            tmpGrid[ _index ]   = currentPlayer; 

            //check for win
            if( this.hasWinner() ){
                var message = ["player",this.currentPlayerDisplay(),"wins!","\n","New Game?"].join(" ");

                console.log( message );

                if( window.confirm( message ) ){
                    //Save results
                    $.post("/games", {status:"win",player:currentPlayer}, function(){
                        //start a new game
                        self.newGame();
                    });
                         
                }
                
            } 

            //check for Draw
            else if( this.isDraw() ){
                console.log( "draw" );

                //Save and start a new game
                this.newGame();
            } 

            else {
                console.log( [currentPlayer,""].join(" "))
                
                this.setState({ grid : tmpGrid, currentPlayer : currentPlayer *=-1 });    
            }
        },

        render: function() {
            return (
                <div>
                    <div id='game'>
                        {this.state.grid.map( function( _tile, _index){
                            return ( <Tile value={ _tile } key={ _index } index={ _index } play = {this.play} playerDisplay = {this.playerDisplay}/> );
                        }, this)}
                    </div>            
                </div>
            );
        }
    });

    var Tile = React.createClass({
        
        clickHandler : function(){
            if(this.props.value === 0){
                this.props.play( this.props.index );
            } else {
                console.log("uh uh uh");
            }
            
        },

        render: function() {
            console.log(this.props);
            return ( <div onClick={ this.clickHandler }  className='tile'> { this.props.playerDisplay( this.props.value ) } </div> );
        }
    });

    React.render( <Game />, document.getElementById('content') );

})();