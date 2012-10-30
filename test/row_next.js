function equalNextRow(baseRowString, expected) {
  equal(Branches.Row.fromString(baseRowString).next().toString(),
        expected);
}

module('Branches.Row:next()');
test('blank yields blank', function() {
  equalNextRow('  ', '   ');
});
test('explosion yields blank', function() {
  equalNextRow('**', '   ');
});
test('left yields moving left', function() {
  equalNextRow('<', '< ');
});
test('right yields moving right', function() {
  equalNextRow('>', ' >');
});
test('X yields both sides moving opposite directions', function() {
  equalNextRow('X', '<>');
});
test('parallel structures', function() {
  equalNextRow('<<', '<< ');
  equalNextRow('<X', '<<>');
  equalNextRow('X>', '<>>');
  equalNextRow('>>', ' >>');
});
test('left/right merge yields explosion', function() {
  equalNextRow('><', ' * ');
});
test('X merge yields explosion in the middle', function() {
  equalNextRow('XX', '<*>');
});
test('X/left/right merges', function() {
  equalNextRow('X<', '<* ');
  equalNextRow('>X', ' *>');
  equalNextRow('>X<', ' ** ');
});
