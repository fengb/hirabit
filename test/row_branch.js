module('Branches.Row:separate()');

function equalBranchedRow(rowString, branchString, expected) {
  var row = Branches.Row.fromString(rowString);
  var branchDirective = Branches.BranchDirective.fromString(branchString);
  equal(row.branch(branchDirective).toString(), expected);
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
