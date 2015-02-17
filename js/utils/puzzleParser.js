var PuzzleParser = {
  currentMove: {},
  parseCell: function (cell) {

    if (cell.indexOf('$') === -1) return false; // '$' is missing

    cell = cell.toLowerCase().split('$')[1];

    //todo check empty cell
    if (cell !== 'one' && cell !== 'two' && cell !== 'three' && cell !== 'four'
      && cell !== 'five' && cell !== 'six' && cell !== 'seven' && cell !== 'eight' && cell !== 'nine') return false;

    this.currentMove.cell = cell;

  },
  parseMove: function (move) {

    if (move.indexOf('()') === -1) return false; // '()' is missing

    move = move.toLowerCase().split('()')[0];

    if (move !== 'up' && move !== 'down' && move !== 'left' && move !== 'right') return false;

    this.currentMove.move = move;

  },
  isValidCommand: function (cmd) {

    this.currentMove = {};

    cmd = cmd.split('->');
    if (cmd.length !== 2) return false; // '->' is missing

    this.parseCell(cmd[0]);
    this.parseMove(cmd[1]);

    return (!!this.currentMove.cell && !!this.currentMove.move);
  }
};