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
      isSolved: false,
      blankCell: -1,
      grid: [
          [0,1,2],
          [3,4,5],
          [6,7,8]
        ]
    }
  },

  _isSolved: function _isSolved(grid) {

    return _.isEqual(this.getInitialState().grid, grid || this.state.grid);

  },

  _getCellPosition: function _getCellPosition(flatGrid, index) {
    return flatGrid[index];
  },

  _shuffleGrid: function _shuffleGrid(flatGrid) {
    var SOLVING_MOVES = 8;
    var BLANK_CELL = _.random(0,8);
    var grid;
    var isReady = false;

    while(!isReady) {
      grid = _.flatten(this.state.grid);
      var previousPosition = -1;

      for(var move=0; move < SOLVING_MOVES; move++) {

        var validMove = false;

        while(!validMove) {
          var currentCell = {
            row: parseInt(grid[BLANK_CELL] / 3),
            col: grid[BLANK_CELL] % 3
          };

          var targetCell = {};

          if(!!_.random(1)) {
            targetCell.row = Math.max(Math.min(2, (currentCell.row + _.shuffle([-1,1])[0])), 0);
            targetCell.col = currentCell.col;
          } else {
            targetCell.col = Math.max(Math.min(2, (currentCell.col + _.shuffle([-1,1])[0])), 0);
            targetCell.row = currentCell.row;
          }

          targetIndex = grid.indexOf(targetCell.row * 3 + targetCell.col);
          var countCellsOutOfPlace = 0;

          validMove = targetIndex !== BLANK_CELL && previousPosition !== grid[targetIndex];
        }

        previousPosition = grid[BLANK_CELL];

        var saveTargetVal = grid[targetIndex];
        grid[targetIndex] = grid[BLANK_CELL];
        grid[BLANK_CELL] = saveTargetVal;

      }

      for(var i=0; i<grid.length; i++) {
        if(i !== grid[i]) {
          countCellsOutOfPlace++;
        }
      }

      isReady = countCellsOutOfPlace > (grid.length/1.5) && !this._isSolved(_.chunk(grid,3));
    }

    this.setState({
      blankCell: BLANK_CELL + 1
    });

    return _.chunk(grid,3);
  },

  handleMoveCell: function (currentMove) {
    // Pre-condition: validate cell and direction syntax before calling this method

    if (!currentMove || !currentMove.cell || !currentMove.direction) {
      throw Error('Please provide a valid move object');
    }

    // cell 9 is always empty space (for now)
    if (currentMove.cell === this.state.blankCell) {
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

    if(targetCellIndex + 1 !== this.state.blankCell) {
      this.setState({errorMsg: 'Forbidden Move: You can only move a cell into the blank space'});
      return;
    }

    flatGrid[cellIndex] = flatGrid[targetCellIndex];
    flatGrid[targetCellIndex] = cellPosition;

    var grid = _.chunk(flatGrid, 3);

    this.setState({
      grid: grid
    });

    if(this._isSolved(grid)) {
      this._solvedState();
    }

  },

  _solvedState: function _solvedState() {
    alert('solved');
    clearInterval(_interval);
    this.setState({
      isSolved: true,
      isPlaying: false,
      grid: this.getInitialState().grid
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
    var shuffledGrid = this._shuffleGrid();

    this.setState({
      isPlaying: true,
      grid: shuffledGrid
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
        <StartScreen isPlaying={this.state.isPlaying} handleStart={this.startHandler} handleReset={this.resetHandler} />
        <div className="container">
          <div className="row vertical-separation">
            <div className="col-xs-12">
              <img src="images/logo-sainsburys.png" width="25%" />
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12">
                <Timer elapsedTime={this.state.elapsedTime} />
                <JigsawGrid blankCell={this.state.blankCell} isPlaying={this.state.isPlaying} grid={this.state.grid} errorHandler={this.errorHandler} />
                <ErrorReporter message={this.state.errorMsg} />
                <Terminal parser={PuzzlePHPParser} errorMsgHandler={this.errorHandler} moveCellHandler={this.handleMoveCell} />
            </div>
          </div>
        </div>
      </div>
    );
  }

});

React.render(<PuzzleApp/>, document.getElementById('main'));
