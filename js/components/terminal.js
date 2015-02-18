var Terminal = React.createClass({
  getInitialState: function() {
    return {
      value: '',
      cmdIndex: -1,
      syntaxError: false
    };
  },
  historyHandler: function (keyCode) {

    var _cmdIndex = this.state.cmdIndex;

    if (keyCode === 38) {

      if (this.state.cmdIndex < (this.props.commands.length - 1)) {
        _cmdIndex++;
        console.log('incremented, going back', _cmdIndex);
      }

    } else {

      if (this.state.cmdIndex > 0) {
        _cmdIndex--;
        console.log('decremented, going forward', _cmdIndex);
      }
    }

    this.setState({cmdIndex: _cmdIndex}, function () {
      console.log(this.props.commands[this.state.cmdIndex]);
      this.setState({value: this.props.commands[this.state.cmdIndex]});
    });

  },
  keyHandler: function (e) {

    if (e.keyCode === 38 || e.keyCode === 40) {
      this.historyHandler(e.keyCode);
      e.preventDefault();
      return;
    }

    if (e.keyCode === 13) {
      if (this.props.parser.isValidCommand(this.state.value)) {

        console.log('history reset');
        this.setState({cmdIndex: -1});

        var validMove = this.props.moveCellHandler(this.props.parser.currentMove);

        if(validMove) {
          this.props.commands.unshift(this.state.value);
          this.setState({value: ''});
          this.props.errorMsgHandler('');
        }
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
            {this.props.commands.map(function(command, i){
              return <span key={i}>{command}</span>;
            })}
          </div>
        </div>
      </div>
    );
  }
});

// tip: http://facebook.github.io/react/docs/forms.html
