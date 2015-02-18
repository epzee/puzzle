var JigsawGrid = React.createClass({
  getInitialState: function () {
    var cells = [];
    var grid = _.flatten(this.props.grid);

    grid.forEach(function (position, index) {
      var cellIndex = index + 1;
      cells[index] = <JigsawGridCell isBlank={false} cellIndex={cellIndex} cellPosition={position} />;
    });

    return {
      cells: cells
    };
  },

  reorder: function () {
    var blankCellIndex = this.props.blankCell;
    for(var row=0; row<3; row++) {
      for(var col=0; col<3; col++) {
        var cell = this.state.cells[row * 3 + col];
        cell.props.cellPosition = this.props.grid[row][col] + 1;
        cell.props.isBlank = blankCellIndex === cell.props.cellIndex;
      }
    }
  },

  render: function () {

    this.reorder();

    return (
      <div className="row">
        <div className="col-xs-12">
          <div id="jigsawGrid" className={(this.props.isPlaying ? ' is-playing' : '')}>
            <div className="jigsaw-grid-container">
            {this.state.cells}
            </div>
          </div>
        </div>
      </div>
    );
  }
});
