var JigsawGridCell = React.createClass({
  render: function () {
    return (
      <div className={'jigsaw-grid-cell col-xs-4 jigsaw-grid-cell-' + this.props.cellPosition + ' jigsaw-grid-cell-view-' + this.props.cellIndex}>
        <div className="label">{this.props.cellIndex}</div>
      </div>
    );
  }
});
