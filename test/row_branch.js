module('Branches.Row:separate()');

function equalBranchedRow(baseRowString, branchRow, expected) {
  var row = Branches.Row.fromString(baseRowString);
  equal(row.branch(branchRow).toString(), expected);
}

test('no branches yield blank', function() {
  equalBranchedRow(' ',
                   '.',
                   ' ');
});
test('no branches yield original', function() {
  equalBranchedRow('<',
                   ' ',
                   '<');
});
test('branches yield X', function() {
  equalBranchedRow('<<>',
                   '. .',
                   'X<X');
});
test('explosions yield explosion', function() {
  equalBranchedRow('*',
                   '.',
                   '*');
});
