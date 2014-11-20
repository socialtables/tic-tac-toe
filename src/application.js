
 var Game = React.createClass({
    render: function() {
        return <div>
            <div id='game'>
               {
                this.state.tiles.map( function(){
                  return (<Tile />);  
                }, this);
               } 
            </div>            
        </div>;
    },

    getInitialState : function(){
        return {
            tiles : {
                "a1" : "",
                "b1" : "",
                "c1" : "",
                "a2" : "",
                "b2" : "",
                "c2" : "",
                "a3" : "",
                "b3" : "",
                "c3" : ""
            }
        };
    }
});

var Tile = React.createClass({
    render: function() {
        return <div className='tile'></div>;
    }
});

var Menu = React.createClass({
    render: function() {
        return <div id='menu'></div>;
    }
});

React.renderComponent(
    <Game />,
    document.getElementById('container')
);