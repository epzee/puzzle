var ErrorReporter = React.createClass({
  render: function () {
    return (
      <div className={'row vertical-separation ' + (this.props.message ? '' : 'hidden')}>
        <div className="col-xs-12">
          <span className="error">{this.props.message}</span>
        </div>
      </div>
    );
  }
});
