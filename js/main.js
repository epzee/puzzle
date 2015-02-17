var _interval; //todo refactor
// todo imgGrid
// todo terminal (parser + feedback)
// todo hide start button (maybe create new state?)

var PuzzleApp = React.createClass({
  getInitialState: function () {
    return {
      elapsedTime: '00:00:00',
      isPlaying: false,
      grid: [
          [0,1,2],
          [3,4,5],
          [6,7,8]
        ]
    }
  },

  _getCellPosition: function _getCellPosition(flatGrid, index) {
    return flatGrid[index];
  },

  _move: function _move(cellIndex, rowOffset, colOffset) {
    cellIndex--;
    var flatGrid = _.flatten(this.state.grid);

    var cellPosition = this._getCellPosition(flatGrid, cellIndex);
    var cellRowPosition = parseInt(cellPosition / 3);
    var cellColPosition = cellPosition % 3;

    var targetRow = cellRowPosition + rowOffset;
    var targetCol = cellColPosition + colOffset;
    var targetCellPosition = (targetRow * 3) + targetCol;

    if(targetRow < 0 || targetRow > 2 || targetCol < 0 || targetCol > 2) {
      throw Error('Forbidden Move: You can\'t move cell ' + (cellIndex + 1) + ' outside the grid');
    }

    var targetCellIndex = flatGrid.indexOf(targetCellPosition);

    if(targetCellIndex !== 8) {
      throw Error('Forbidden Move: You can only move a cell into the blank space');
    }

    flatGrid[cellIndex] = flatGrid[targetCellIndex];
    flatGrid[targetCellIndex] = cellPosition;

    this.setState({
      grid: _.chunk(flatGrid, 3)
    });

  },

  moveUp: function moveUp(cellIndex) {
    this._move(cellIndex, -1, 0);
  },

  moveDown: function moveDown(cellIndex) {
    this._move(cellIndex, 1, 0);
  },

  moveLeft: function moveLeft(cellIndex) {
    this._move(cellIndex, 0, -1);
  },

  moveRight: function moveRight(cellIndex) {
    this._move(cellIndex, 0, 1);
  },

  startHandler: function () {

    var _startTime = moment();

    this.setState({
      isPlaying: true,
      grid: _.chunk(_.shuffle(_.flatten(this.state.grid)),3)
    });

    _interval = setInterval(function () {
      this.setState({
        elapsedTime: moment(moment() - _startTime).format('mm:ss:SS')
      });
    }.bind(this), 10);

    setTimeout(function () {
      this.moveUp(1);
    }.bind(this), 500);

    setTimeout(function () {
      this.moveDown(1);
    }.bind(this), 1000);

    setTimeout(function () {
      this.moveLeft(1);
    }.bind(this), 1500);

    setTimeout(function () {
      this.moveRight(1);
    }.bind(this), 2000);

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
        <JigsawGrid isPlaying={this.state.isPlaying} grid={this.state.grid} />
      </div>
    );
  }

});

React.render(<PuzzleApp/>, document.getElementById('main'));
