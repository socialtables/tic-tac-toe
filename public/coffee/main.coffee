# @cjsx React.DOM 

$(document).ready ->

    R = React.DOM
    socket = io()


    Square = React.createClass({
        render: ->
            <span onClick={@props.onclick}> {@props.value} </span> 
    })

    Board = React.createClass({
        getInitialState: ->
            {squares: ('_' for i in [0...9]), turn: 0, inPlay: true}

 
        markSquare: (i) ->
            if @state.squares[i] == '_' and @state.inPlay
                @state.squares[i] = if @state.turn % 2 == 0 then 'X' else 'O'
                @state.turn += 1
                @forceUpdate()
                @checkGameState()

        winningGroups: [
            [0, 1, 2], 
            [3, 4, 5], 
            [6, 7, 8], 
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [2, 4, 6],
            [0, 4, 8]
        ]

        checkGameState: ->
            for [a, b, c] in @winningGroups
                if @state.squares[a] == @state.squares[b] == @state.squares[c]
                    if @state.squares[a] != '_'
                        @setState {inPlay: false}
                        for i in [a, b, c]
                            @state.squares[i] = '!'
                        @forceUpdate()
                        outcome = {}
                        if @state.squares[a] == 'X'
                            outcome = {winner: 'user1', loser: 'user2'}
                        else
                            outcome = {winner: 'user2', loser: 'user1'}
                        socket.emit('game_completed', {winner: 'user1', loser: 'user2'})
                        $('#newgame').show()

        render: ->
            <div>
            {(<Square onclick={@markSquare.bind(@, i)} value={@state.squares[i]}/> for i in [0...3])}
            <br/>
            {(<Square onclick={@markSquare.bind(@, i)} value={@state.squares[i]}/> for i in [3...6])}
            <br/>
            {(<Square onclick={@markSquare.bind(@, i)} value={@state.squares[i]}/> for i in [6...9])}
            </div>
    })

    $('#newgame').click(->
        $('#board').html('')
        $('#newgame').hide()
        React.render <Board/>, document.getElementById('board')
    )
