var StartScreen = React.createClass({
  render: function () {
    var button;
    var START_BUTTON = <button className="btn btn-success" onClick={this.props.handleStart}>START !!!</button>;
    var END_BUTTON   = <button className="btn btn-danger" onClick={this.props.handleReset}>RESET !!!</button>

    if(!this.props.isPlaying) {
      button = START_BUTTON;
    } else {
      button = END_BUTTON;
    }

    return (button);
  }
});
