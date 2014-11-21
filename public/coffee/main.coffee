# React = require 'react'
$(document).ready ->

    R = React.DOM
    console.log 'Blerg'

    React.render(
        R.p null, 'Blah'
        document.getElementById('board')
    )