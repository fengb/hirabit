module('Branches.next');
test('blank yields blank', function() {
  equal(Branches.next('  '), '   ');
});
test('left yields moving left', function() {
  equal(Branches.next('<'), '< ');
});
test('right yields moving right', function() {
  equal(Branches.next('>'), ' >');
});
