module('Hirabit.Row:next()', {
  setup: function() {
    this.equalNextRow = function(baseRowString, expected) {
      var row = Hirabit.Row.fromString(baseRowString);
      equal(row.next().toString(), expected);
    };
  }
});

test('blank yields blank', function() {
  this.equalNextRow('  ', '   ');
});
test('explosion yields blank', function() {
  this.equalNextRow('**', '   ');
});
test('left yields moving left', function() {
  this.equalNextRow('<', '< ');
});
test('right yields moving right', function() {
  this.equalNextRow('>', ' >');
});
test('X yields both sides moving opposite directions', function() {
  this.equalNextRow('X', '<>');
});
test('parallel structures', function() {
  this.equalNextRow('<<', '<< ');
  this.equalNextRow('<X', '<<>');
  this.equalNextRow('X>', '<>>');
  this.equalNextRow('>>', ' >>');
});
test('left/right merge yields explosion', function() {
  this.equalNextRow('><', ' * ');
});
test('X merge yields explosion in the middle', function() {
  this.equalNextRow('XX', '<*>');
});
test('X/left/right merges', function() {
  this.equalNextRow('X<', '<* ');
  this.equalNextRow('>X', ' *>');
  this.equalNextRow('>X<', ' ** ');
});
