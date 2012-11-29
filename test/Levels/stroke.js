module('Branches.Levels:stroke()', {
  setup: function() {
    this.levels = Branches.Levels([{name: 'bob', par: 0}, {name: 'doe', par: 5}]);
  }
});

test('stroke is undefined by default', function() {
  strictEqual(this.levels.stroke('bob'), undefined);
});

test('stroke is strokes for name', function() {
  this.levels.stroke('bob', 20);
  equal(this.levels.stroke('bob'), 20);
  this.levels.stroke('doe', 20);
  equal(this.levels.stroke('doe'), 20);
});

test('stroke only updates with lower values', function() {
  this.levels.stroke('bob', 20);
  this.levels.stroke('bob', 25);
  equal(this.levels.stroke('bob'), 20);
  this.levels.stroke('bob', 15);
  equal(this.levels.stroke('bob'), 15);
});
