module('Branch.Levels:scores()', {
  setup: function() {
    this.levels = Branches.Levels([{name: 'bob', par: 0}, {name: 'doe', par: 0}]);
  }
});

test('in order', function() {
  var scores = this.levels.scores();
  equal(scores[0].name, 'bob');
  equal(scores[1].name, 'doe');
});

test('contain stroke information if applicable', function() {
  this.levels.score('doe', 500);
  var scores = this.levels.scores();
  equal(scores[0].stroke, undefined);
  equal(scores[1].stroke, 500);
});
