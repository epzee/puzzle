var Terminal = React.createClass({
  getInitialState: function() {
    return {
      value: '',
      syntaxError: false,
      commands: []
    };
  },
  keyHandler: function (e) {

    if (e.keyCode === 13) {
      if (this.props.parser.isValidCommand(this.state.value)) {
        //todo make child component and remove from state, use props
        this.state.commands.push(<span>{this.state.value}</span>);
        this.setState({value: '', syntaxError: false});
        this.props.moveCellHandler(this.props.parser.currentMove);
      } else {
        this.setState({syntaxError: true});
      }
    }
  },
  handleChange: function(event) {
    var newState = { value: event.target.value };
    if (!event.target.value) {
      newState.syntaxError = false;
    }
    this.setState(newState);
  },
  render: function () {
    return (
      <div className="row vertical-separation terminal">
        <span className={(this.state.syntaxError ? 'label label-danger' : 'hidden')}>Syntax error!</span>
        <div className="col-xs-12">
          <input type="text" placeholder="Type your move here!"
            value={this.state.value}
            onKeyDown={this.keyHandler}
            onChange={this.handleChange}>
          </input>
        </div>
        <div className="col-xs-12">
          <div className="history">
            {this.state.commands}
          </div>
        </div>
      </div>
    );
  }
});

// tip: http://facebook.github.io/react/docs/forms.html