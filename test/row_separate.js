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
