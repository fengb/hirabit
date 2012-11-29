module('Branches.Levels:stroke()', {
  setup: function() {
    this.levelsData = [{name: 'bob', par: 0}, {name: 'doe', par: 5}];
    this.levels = Branches.Levels(this.levelsData);
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

test('persists stroke information', function() {
  var strokes = {};
  var levels = Branches.Levels(this.levelsData, strokes);

  deepEqual(strokes, {});
  levels.stroke('bob', 4);
  deepEqual(strokes, {bob: 4});
});

test('loads stroke information', function() {
  var levels = Branches.Levels(this.levelsData, {doe: 18});
  equal(levels.stroke('doe'), 18);
});
