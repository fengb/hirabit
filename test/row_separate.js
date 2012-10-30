module('Branches.Row:separate()');

function equalSeparatedRow(baseRowString, separationString, expected) {
  var row = Branches.Row.fromString(baseRowString);
  equal(row.separate(separationString).toString(), expected);
}

test('no branches yields blank', function() {
  equalSeparatedRow(' ',
                    '.',
                    ' ');
});
test('no separations yields original', function() {
  equalSeparatedRow('<',
                    ' ',
                    '<');
});
test('separations yields X', function() {
  equalSeparatedRow('<<>',
                    '. .',
                    'X<X');
});
test('explosions yields explosion', function() {
  equalSeparatedRow('*',
                    '.',
                    '*');
});
