module('Branches.Levels:score()', {
  setup: function() {
    this.levels = Branches.Levels([{name: 'bob', par: 5}, {name: 'doe', par: 50}]);
  }
});

test('score is undefined by default', function() {
  strictEqual(this.levels.score('bob'), undefined);
});
