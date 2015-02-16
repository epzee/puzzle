var Timer = React.createClass({
  //getInitialState: function () {
  //  var _startTime = moment();
  //  setInterval(function () {
  //    this.setState({
  //      elapsedTime: moment(moment() - _startTime).format('mm:ss:SS')
  //    });
  //  }.bind(this), 10);
  //  return {
  //    elapsedTime: 0
  //  }
  //},
  render: function () {
    return (<h1>Elapsed time: {this.props.elapsedTime}</h1>);
  }
});