module('Branches.Levels:score()', {
  setup: function() {
    this.levels = Branches.Levels([{name: 'bob', par: 0}, {name: 'doe', par: 5}]);
  }
});

test('score is undefined by default', function() {
  strictEqual(this.levels.score('bob'), undefined);
});

test('score is strokes - par for name', function() {
  this.levels.score('bob', 20);
  equal(this.levels.score('bob'), 20);
  this.levels.score('doe', 20);
  equal(this.levels.score('doe'), 15);
});

test('score only updates with lower values', function() {
  this.levels.score('bob', 20);
  this.levels.score('bob', 25);
  equal(this.levels.score('bob'), 20);
  this.levels.score('bob', 15);
  equal(this.levels.score('bob'), 15);
});
