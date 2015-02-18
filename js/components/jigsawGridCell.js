var JigsawGridCell = React.createClass({
  render: function () {
    return (
      <div className={'jigsaw-grid-cell col-xs-4 jigsaw-grid-cell-' + this.props.cellPosition + ' jigsaw-grid-cell-view-' + this.props.cellIndex + (this.props.isBlank ? ' jigsaw-grid-cell-blank' : '')}>
        <div className="label">{this.props.cellIndex}</div>
      </div>
    );
  }
});
