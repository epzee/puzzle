// TODO
// -- Overlay (start screen and solved state)
// -- history: clear on reset + make child component and remove from state, use props
// -- change syntax again!?
//
// nice to have:
// -- up arrow on terminal
// -- module loader
// -- js parser / option / image
// -- tests

var _interval; //todo refactor _interval

var PuzzleApp = React.createClass({
  getInitialState: function () {
    return {
      elapsedTime: '00:00:00',
      errorMsg: '',
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

  handleMoveCell: function (currentMove) {
    // Pre-condition: validate cell and direction syntax before calling this method

    if (!currentMove || !currentMove.cell || !currentMove.direction) {
      throw Error('Please provide a valid move object');
    }

    // cell 9 is always empty space (for now)
    if (currentMove.cell === 9) {
      this.setState({errorMsg: 'Can\'t move the empty cell'});
      return;
    }

    var directionMap = {
      up: 'moveUp',
      down: 'moveDown',
      left: 'moveLeft',
      right: 'moveRight'
    };

    this[directionMap[currentMove.direction]](currentMove.cell);
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
      this.setState({errorMsg: 'Forbidden Move: You can\'t move cell ' + (cellIndex + 1) + ' outside the grid'});
      return;
    }

    var targetCellIndex = flatGrid.indexOf(targetCellPosition);

    if(targetCellIndex !== 8) {
      this.setState({errorMsg: 'Forbidden Move: You can only move a cell into the blank space'});
      return;
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
  },

  resetHandler: function () {
    if(this.state.isPlaying) {
      clearInterval(_interval);
      _interval = null;
      this.setState(this.getInitialState());
    }
  },
  errorHandler: function (msg) {
    this.setState({errorMsg: msg});
  },

  render: function () {
    return (
      <div>
        <Timer elapsedTime={this.state.elapsedTime} />
        <JigsawGrid isPlaying={this.state.isPlaying} grid={this.state.grid} errorHandler={this.errorHandler} />
        <ErrorReporter message={this.state.errorMsg} />
        <Terminal parser={PuzzlePHPParser} errorMsgHandler={this.errorHandler} moveCellHandler={this.handleMoveCell} />
        <StartScreen isPlaying={this.state.isPlaying} handleStart={this.startHandler} handleReset={this.resetHandler} />
      </div>
    );
  }

});

React.render(<PuzzleApp/>, document.getElementById('main'));
