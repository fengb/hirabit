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

function equalSeparatedRow(baseRowString, separationString, expected) {
  equal(Branches.Row.fromString(baseRowString).separate(separationString).toString(),
        expected);
}
module('Branches.Row:separate()');
test('no branches yields blank', function() {
  equalSeparatedRow(' ', '.',
                    ' ');
});
test('no separations yields original', function() {
  equalSeparatedRow('<', ' ',
                    '<');
});
test('separations yields X', function() {
  equalSeparatedRow('<<>', '. .',
                    'X<X');
});
test('explosions yields explosion', function() {
  equalSeparatedRow('*', '.',
                    '*');
});

module('Branches.Row.allFrom()');
test('length is the same as arg length', function() {
  var rows = Branches.Row.allFrom(['', '']);
  equal(rows.length, 2);
  rows = Branches.Row.allFrom(['', '', '', '']);
  equal(rows.length, 4);
});

test('values are transformed', function() {
  var rows = Branches.Row.allFrom([' ', '  ', '.  ']);
  equal(rows[0].toString(), 'X');
  equal(rows[1].toString(), '<>');
  equal(rows[2].toString(), 'X >');
});
