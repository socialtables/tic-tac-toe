(function(){
  var Board = React.createClass({
    render: function() {
      return <div> 
                <div id='board'> </div> 
                <Status/>
              </div>;
    }
  });

  var Cell = React.createClass({
    render: function() {
      return <div className='cell'></div>;
    }
  });

  var Status = React.createClass({
    render: function() {
      return <div id='menu'></div>;
    }
  });

  React.renderComponent(
    <Board/>,
    $('#tic-tac-toe')[0]
  );
})();