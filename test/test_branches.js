module('BranchRow.next');
test('blank yields blank', function() {
  equal(BranchRow.fromString('  ').next().toString(), '   ');
});
test('left yields moving left', function() {
  equal(BranchRow.fromString('<').next().toString(), '< ');
});
test('right yields moving right', function() {
  equal(BranchRow.fromString('>').next().toString(), ' >');
});
test('X yields both sides moving opposite directions', function() {
  equal(BranchRow.fromString('X').next().toString(), '<>');
});
test('parallel structures', function() {
  equal(BranchRow.fromString('<<').next().toString(), '<< ');
  equal(BranchRow.fromString('<X').next().toString(), '<<>');
  equal(BranchRow.fromString('X>').next().toString(), '<>>');
  equal(BranchRow.fromString('>>').next().toString(), ' >>');
});
test('left/right collision cancels out', function() {
  equal(BranchRow.fromString('><').next().toString(), '   ');
});
test('X collision cancels out middle', function() {
  equal(BranchRow.fromString('XX').next().toString(), '< >');
});
test('X/left/right collisions', function() {
  equal(BranchRow.fromString('X<').next().toString(), '<  ');
  equal(BranchRow.fromString('>X').next().toString(), '  >');
  equal(BranchRow.fromString('>X<').next().toString(), '    ');
});

module('BranchRow.separate');
test('no branches yields blank', function() {
  equal(BranchRow.fromString(' ').separate('.').toString(), ' ');
});
test('no separations yields original', function() {
  equal(BranchRow.fromString('<').separate(' ').toString(), '<');
});
test('separations yields X', function() {
  equal(BranchRow.fromString('<<>').separate('. .').toString(), 'X<X');
});
