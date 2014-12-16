var React = require('react'),
    app = require('./globals'),
    mountNode = $("#modal-container")[0];

var BootstrapButton = React.createClass({
    render: function() {
        return (
			<button onClick={this.props.handleClick.bind(undefined)} className="btn btn-primary">New Game</button>
        );
    }
});

var BootstrapModal = React.createClass({
    componentDidMount: function() {
        $(this.getDOMNode()).modal();
    },
    close: function() {
        $(this.getDOMNode()).modal('hide');
    },
    open: function() {
        $(this.getDOMNode()).modal('show');
    },
    handleSubmit: function (event) {
        var playerX = this.refs.playerX.getDOMNode().value;
        var playerO = this.refs.playerO.getDOMNode().value;
        if(playerX) {
            app.PLAYERX.displayName = playerX;
        }
        if(playerO) {
            app.PLAYERO.displayName = playerO;
        }
        this.close();
    },
    render: function() {
        return (
            <div className="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal">
							<span aria-hidden="true">&times;</span>
                            </button>
                            <h3>New Game</h3>
                        </div>
                        <div className="modal-body">
                            <form className="form-horizontal" role="form">
                                <div className="form-group">
                                    <label className="col-xs-4 control-label" for="playerX">Player X:</label>
                                    <div className="col-xs-8 no-padding-left">
                                        <input type="text" className="form-control" id="playerX" ref="playerX"/>
									</div>
								</div>
								<div className="form-group">
									<label className="col-xs-4 control-label" for="playerO">Player O:</label>
									<div className="col-xs-8 no-padding-left">
										<input type="text" className="form-control" id="playerO" ref="playerO"/>
									</div>
								</div>
							</form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                            <button onClick={this.handleSubmit} type="button" className="btn btn-primary">Start</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    },
});

var Modal = React.createClass({
    render: function() {
        return (
            <div>
                <BootstrapModal ref="modal" />
                <BootstrapButton handleClick={this.openModal} className="btn-default"/>
            </div>
        );
    },
    openModal: function() {
        this.refs.modal.open();
    },
    closeModal: function() {
        this.refs.modal.close();
    }
});

module.exports = function () {
    React.render(<Modal />, mountNode);
}
