var StartScreen = React.createClass({
  render: function () {
    return (
      <div>
        <button className="btn btn-success" onClick={this.props.handleStart}>START !!!</button>
        <button className="btn btn-danger" onClick={this.props.handleReset}>RESET !!!</button>
      </div>
    );
  }
});