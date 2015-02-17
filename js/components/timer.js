var Timer = React.createClass({
  render: function () {
    return (
      <div className="well text-center vertical-separation">
        <h1>{this.props.elapsedTime}</h1>
      </div>
    );
  }
});
