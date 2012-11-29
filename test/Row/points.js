module('Branches.Row:points()', {
  setup: function() {
    this.testPoints = function(rowString, points) {
      var row = Branches.Row.fromString(rowString);
      equal(row.points(), points);
    };
  }
});

test('basic is 0 points', function() {
  this.testPoints('X', 0);
  this.testPoints('<>', 0);
});

test('" " in the middle is 0 points', function() {
  this.testPoints('< >', 0);
});

test('"<>*" in the middle are 1 point each', function() {
  this.testPoints('<<>', 1);
  this.testPoints('<>>', 1);
  this.testPoints('<*>', 1);
});

test('"X" in the middle is 2 points', function() {
  this.testPoints('<X>', 2);
});

test('each "X" on edge is 1 additional point', function() {
  this.testPoints('X>', 1);
  this.testPoints('<X', 1);
  this.testPoints('XX', 2);
});
