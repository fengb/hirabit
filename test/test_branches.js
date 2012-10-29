module('Branches.Row.next');
test('blank yields blank', function() {
  equal(Branches.Row.fromString('  ').next().toString(), '   ');
});
test('left yields moving left', function() {
  equal(Branches.Row.fromString('<').next().toString(), '< ');
});
test('right yields moving right', function() {
  equal(Branches.Row.fromString('>').next().toString(), ' >');
});
test('X yields both sides moving opposite directions', function() {
  equal(Branches.Row.fromString('X').next().toString(), '<>');
});
test('parallel structures', function() {
  equal(Branches.Row.fromString('<<').next().toString(), '<< ');
  equal(Branches.Row.fromString('<X').next().toString(), '<<>');
  equal(Branches.Row.fromString('X>').next().toString(), '<>>');
  equal(Branches.Row.fromString('>>').next().toString(), ' >>');
});
test('left/right collision cancels out', function() {
  equal(Branches.Row.fromString('><').next().toString(), '   ');
});
test('X collision cancels out middle', function() {
  equal(Branches.Row.fromString('XX').next().toString(), '< >');
});
test('X/left/right collisions', function() {
  equal(Branches.Row.fromString('X<').next().toString(), '<  ');
  equal(Branches.Row.fromString('>X').next().toString(), '  >');
  equal(Branches.Row.fromString('>X<').next().toString(), '    ');
});

module('Branches.Row.separate');
test('no branches yields blank', function() {
  equal(Branches.Row.fromString(' ').separate('.').toString(), ' ');
});
test('no separations yields original', function() {
  equal(Branches.Row.fromString('<').separate(' ').toString(), '<');
});
test('separations yields X', function() {
  equal(Branches.Row.fromString('<<>').separate('. .').toString(), 'X<X');
});
