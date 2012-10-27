module('Branches.next');
test('blank yields blank', function() {
  equal(new Branches('  ').next().toString(), '   ');
});
test('left yields moving left', function() {
  equal(new Branches('<').next().toString(), '< ');
});
test('right yields moving right', function() {
  equal(new Branches('>').next().toString(), ' >');
});
test('X yields both sides moving opposite directions', function() {
  equal(new Branches('X').next().toString(), '<>');
});
test('parallel structures', function() {
  equal(new Branches('<<').next().toString(), '<< ');
  equal(new Branches('<X').next().toString(), '<<>');
  equal(new Branches('X>').next().toString(), '<>>');
  equal(new Branches('>>').next().toString(), ' >>');
});
test('left/right collision cancels out', function() {
  equal(new Branches('><').next().toString(), '   ');
});
test('X collision cancels out middle', function() {
  equal(new Branches('XX').next().toString(), '< >');
});
test('X/left/right collisions', function() {
  equal(new Branches('X<').next().toString(), '<  ');
  equal(new Branches('>X').next().toString(), '  >');
  equal(new Branches('>X<').next().toString(), '    ');
});

module('Branches.separate');
test('no branches yields blank', function() {
  equal(new Branches(' ').separate('.').toString(), ' ');
});
test('no separations yields original', function() {
  equal(new Branches('<').separate(' ').toString(), '<');
});
test('separations yields X', function() {
  equal(new Branches('<<>').separate('. .').toString(), 'X<X');
});
