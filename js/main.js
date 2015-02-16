var _interval; //todo refactor
// todo imgGrid
// todo terminal (parser + feedback)
// todo hide start button (maybe create new state?)

var PuzzleApp = React.createClass({
  getInitialState: function () {
    return {
      elapsedTime: '00:00:00',
      isPlaying: false
    }
  },
  startHandler: function () {

    if(!this.state.isPlaying) {
      var _startTime = moment();

      _interval = setInterval(function () {
        this.setState({
          elapsedTime: moment(moment() - _startTime).format('mm:ss:SS'),
          isPlaying: true
        });
      }.bind(this), 10);
    }

  },
  resetHandler: function () {
    if(this.state.isPlaying) {
      clearInterval(_interval);
      _interval = null;
      this.setState(this.getInitialState());
    }
  },
  render: function () {
    return (
      <div>
        <StartScreen isPlaying={this.state.isPlaying} handleStart={this.startHandler} handleReset={this.resetHandler} />
        <Timer elapsedTime={this.state.elapsedTime} />
      </div>
    );
  }
});

React.render(<PuzzleApp/>, document.getElementById('main'));
