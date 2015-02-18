var PuzzlePHPParser = {
  currentMove: {},
  parseCell: function (cell) {

    if (cell.indexOf('$') === -1) return false; // '$' is missing

    cell = cell.toLowerCase().split('$')[1];

    if (cell !== 'one' && cell !== 'two' && cell !== 'three' && cell !== 'four'
      && cell !== 'five' && cell !== 'six' && cell !== 'seven' && cell !== 'eight' && cell !== 'nine') return false;

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
    
    this.currentMove.cell = cellMap[cell];

  },
  parseMove: function (direction) {

    if (direction.indexOf('()') === -1) return false; // '()' is missing

    direction = direction.toLowerCase().split('()')[0];

    if (direction !== 'up' && direction !== 'down' && direction !== 'left' && direction !== 'right') return false;

    this.currentMove.direction = direction;

  },
  isValidCommand: function (cmd) {

    this.currentMove = {};

    cmd = cmd.split('->');
    if (cmd.length !== 2) return false; // '->' is missing

    this.parseCell(cmd[0]);
    this.parseMove(cmd[1]);

    return (!!this.currentMove.cell && !!this.currentMove.direction);
  }
};