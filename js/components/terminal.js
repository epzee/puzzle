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
      if (PuzzleParser.isValidCommand(this.state.value)) {
        this.state.commands.push(<li>{this.state.value}</li>);
        this.setState({value: '', syntaxError: false});
      } else {
        this.setState({syntaxError: true});
      }

    }
  },
  handleChange: function(event) {
    this.setState({value: event.target.value});
  },
  render: function () {
    var cx = React.addons.classSet;
    var classes = cx({
      'hidden': !this.state.syntaxError,
      'label label-danger': this.state.syntaxError
    });

    return (
      <div>
        <div className="col-xs-12">
          <ul>
            {this.state.commands}
          </ul>
        </div>
        <span className={classes}>Syntax error!</span>
        <input className="col-xs-6" type="text" placeholder="Type your move here!"
          value={this.state.value}
          onKeyDown={this.keyHandler}
          onChange={this.handleChange}></input>
      </div>
    );
  }
});

// tip: http://facebook.github.io/react/docs/forms.html
