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
test('X yields both sides moving opposite directions', function() {
  equal(Branches.next('X'), '<>');
});
test('parallel structures', function() {
  equal(Branches.next('<<'), '<< ');
  equal(Branches.next('<X'), '<<>');
  equal(Branches.next('X>'), '<>>');
  equal(Branches.next('>>'), ' >>');
});
test('left/right collision cancels out', function() {
  equal(Branches.next('><'), '   ');
});
test('X collision cancels out middle', function() {
  equal(Branches.next('XX'), '< >');
});
test('X/left/right collisions', function() {
  equal(Branches.next('X<'), '<  ');
  equal(Branches.next('>X'), '  >');
  equal(Branches.next('>X<'), '    ');
});
