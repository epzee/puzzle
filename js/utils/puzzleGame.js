//todo remove
var FakeStuff = {
  moveUp: function (cellIndex) {
    console.log('moveUp', cellIndex);
  },
  moveDown: function (cellIndex) {
    console.log('moveDown', cellIndex);
  },
  moveLeft: function (cellIndex) {
    console.log('moveLeft', cellIndex);
  },
  moveRight: function (cellIndex) {
    console.log('moveRight', cellIndex);
  }
};

var PuzzleGame = {
  moveCell: function (currentMove) {
    // Pre-condition: validate cell and direction syntax before calling this method

    if (!currentMove || !currentMove.cell || !currentMove.direction) {
      throw Error('Please provide a valid move object');
    }

    // cell 9 is always empty space (for now)
    if (currentMove.cell === 'nine') {
      throw Error('Can\'t move the empty cell');
    }

    var directionMap = {
      up: 'moveUp',
      down: 'moveDown',
      left: 'moveLeft',
      right: 'moveRight'
    };

    var cellMap = {
      one: 1,
      two: 2,
      three: 3,
      four: 4,
      five: 5,
      six: 6,
      seven: 7,
      eight: 8,
      nine: 9
    };

    FakeStuff[directionMap[currentMove.direction]](cellMap[currentMove.cell]);
  }
};