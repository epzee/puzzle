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
        this.state.commands.push(this.state.value);
        this.setState({value: ''});
        this.props.errorMsgHandler('');
        this.props.moveCellHandler(this.props.parser.currentMove);
      } else {
        this.props.errorMsgHandler('Syntax error! Remember, only valid PHP syntax like: $one->left();');
      }
    }
  },
  handleChange: function(event) {
    var newState = { value: event.target.value };
    if (!event.target.value) {
      this.props.errorMsgHandler('');
    }
    this.setState(newState);
  },
  render: function () {
    return (
      <div className="row vertical-separation terminal">
        <div className="col-xs-12">
          <input type="text" placeholder="Type your move here!" autofocus
            value={this.state.value}
            onKeyDown={this.keyHandler}
            onChange={this.handleChange} />
        </div>
        <div className="col-xs-12">
          <div className="history">
            {this.state.commands.map(function(object, i){
              return <span key={i}>{object}</span>;
            })}
          </div>
        </div>
      </div>
    );
  }
});

// tip: http://facebook.github.io/react/docs/forms.html
