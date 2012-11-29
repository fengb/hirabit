module('Branches.Target:points()', {
  setup: function() {
    this.testPoints = function(targetString, points) {
      var target = Branches.Target.fromString(targetString);
      equal(target.points(), points);
    };
  }
});

test('"" is 0 points', function() {
  this.testPoints('', 0);
});

test('"O" is 1 point', function() {
  this.testPoints('O', 1);
});

test('"X" is 0 points', function() {
  this.testPoints('X', 0);
});
