module('Branches.next');
test('blank yields blank', function() {
  equal(Branches.fromString('  ').next().toString(), '   ');
});
test('left yields moving left', function() {
  equal(Branches.fromString('<').next().toString(), '< ');
});
test('right yields moving right', function() {
  equal(Branches.fromString('>').next().toString(), ' >');
});
test('X yields both sides moving opposite directions', function() {
  equal(Branches.fromString('X').next().toString(), '<>');
});
test('parallel structures', function() {
  equal(Branches.fromString('<<').next().toString(), '<< ');
  equal(Branches.fromString('<X').next().toString(), '<<>');
  equal(Branches.fromString('X>').next().toString(), '<>>');
  equal(Branches.fromString('>>').next().toString(), ' >>');
});
test('left/right collision cancels out', function() {
  equal(Branches.fromString('><').next().toString(), '   ');
});
test('X collision cancels out middle', function() {
  equal(Branches.fromString('XX').next().toString(), '< >');
});
test('X/left/right collisions', function() {
  equal(Branches.fromString('X<').next().toString(), '<  ');
  equal(Branches.fromString('>X').next().toString(), '  >');
  equal(Branches.fromString('>X<').next().toString(), '    ');
});

module('Branches.separate');
test('no branches yields blank', function() {
  equal(Branches.fromString(' ').separate('.').toString(), ' ');
});
test('no separations yields original', function() {
  equal(Branches.fromString('<').separate(' ').toString(), '<');
});
test('separations yields X', function() {
  equal(Branches.fromString('<<>').separate('. .').toString(), 'X<X');
});
