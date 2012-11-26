module('Branches.Target:[]');

test('correct values', function() {
  var target = Branches.Target.fromString('OX ');
  strictEqual(target[3][0], true);
  strictEqual(target[3][1], false);
  strictEqual(target[3][2], undefined);
});

test('missing elemetn remains undefined', function() {
  var target = Branches.Target.fromString('OX ');
  strictEqual(target[1][2], undefined);
  strictEqual(target[0][4], undefined);
});
