var React = window.React = require('react'),
    mountNode = document.body,
    Modal = require("./game/modal.jsx"),
    Game = require("./game/game.jsx"),
    model = require('./models/modelLocalStorage');

var App = React.createClass({
    render: function () {
        return (
			<div className="container">
				<div className="row">
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        <h1>Tic Tac Toe!</h1>
                    </div>
                    <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div id="modal-container">
                            <Modal model={this.props.model} forceUpdateOnParent={this.forceUpdate.bind(this)} />
                        </div>
                    </div>
					<div id="jumbotron" className="jumbotron col-xs-12 col-sm-12 col-md-12 col-lg-12">
					    <Game model={this.props.model} />
					</div>
				    <div className="footer">
				        <p>By Nick DeCoursin :)</p>
				    </div>
				</div>
			</div>
        )
    }
});

module.exports = (function () {
    React.render(<App model={model}/>, mountNode);
})();

