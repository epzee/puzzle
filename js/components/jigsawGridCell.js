var JigsawGridCell = React.createClass({
  getCellName: function (index) {
    var names = {
      1: 'one',
      2: 'two',
      3: 'three',
      4: 'four',
      5: 'five',
      6: 'six',
      7: 'seven',
      8: 'eight',
      9: 'nine'
    };

    return names[index];
  },
  render: function () {
    return (
      <div className={'jigsaw-grid-cell col-xs-4 jigsaw-grid-cell-' + this.props.cellPosition + ' jigsaw-grid-cell-view-' + this.props.cellIndex + (this.props.isBlank ? ' jigsaw-grid-cell-blank' : '')}>
        <div className="label">{this.getCellName(this.props.cellIndex)}</div>
      </div>
    );
  }
});
