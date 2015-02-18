var SplashScreen = React.createClass({
  render: function () {
    return (
      <div className={!this.props.isPlaying || this.props.isSolved ? '' : 'hidden'}>
        <div className="overlay"></div>
        <div className="overlay-content">
          <div className="container">
              <div className="row vertical-separation">
                <div className={this.props.isSolved ? 'hidden' : ''}>
                  <div className="col-xs-12 text-center white-box">
                    <h1>Interesting title here!</h1>
                    <p>Syntax exmaple here! $one->up();</p>
                    <button className="btn btn-lg btn-success" onClick={this.props.handleStart}>Play!</button>
                  </div>
                </div>
                <div className={this.props.isSolved ? '' : 'hidden'}>
                  <div className="col-xs-12 text-center white-box">
                    <h1>You WON!</h1>
                    <p>It took you {this.props.elapsedTime} to solve this!!!</p>
                    <button className="btn btn-lg btn-warning" onClick={this.props.handleReset}>Play Again!</button>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    );
  }
});
