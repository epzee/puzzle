var JigsawGrid = React.createClass({
  getInitialState: function () {
    var cells = [];
    var grid = _.flatten(this.props.grid);

    grid.forEach(function (position, index) {
      cells[index] = <JigsawGridCell cellIndex={index + 1} cellPosition={position} />;
    });

    return {
      cells: cells
    };
  },

  reorder: function () {
    for(var row=0; row<3; row++) {
      for(var col=0; col<3; col++) {
        this.state.cells[row * 3 + col].props.cellPosition = this.props.grid[row][col] + 1;
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
