var _interval; //todo refactor
// todo imgGrid
// todo terminal (parser + feedback)
// todo hide start button (maybe create new state?)

var PuzzleApp = React.createClass({
  getInitialState: function () {
    return {
      elapsedTime: '00:00:00'
    }
  },
  startHandler: function () {

    var _startTime = moment();

    _interval = setInterval(function () {
      this.setState({
        elapsedTime: moment(moment() - _startTime).format('mm:ss:SS')
      });
    }.bind(this), 10);

  },
  resetHandler: function () {
    clearInterval(_interval);
    this.setState(this.getInitialState());
  },
  render: function () {
    return (
      <div>
        <StartScreen handleStart={this.startHandler} handleReset={this.resetHandler} />
        <Timer elapsedTime={this.state.elapsedTime} />
      </div>
    );
  }
});

React.render(<PuzzleApp/>, document.getElementById('main'));