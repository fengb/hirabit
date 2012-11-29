module('Branches.Row:strokes()', {
  setup: function() {
    this.testStrokes = function(rowString, strokes) {
      var row = Branches.Row.fromString(rowString);
      equal(row.strokes(), strokes);
    };
  }
});

test('basic is 0 strokes', function() {
  this.testStrokes('X', 0);
  this.testStrokes('<>', 0);
});

test('" " in the middle is 0 strokes', function() {
  this.testStrokes('< >', 0);
});

test('"<>*" in the middle are 1 point each', function() {
  this.testStrokes('<<>', 1);
  this.testStrokes('<>>', 1);
  this.testStrokes('<*>', 1);
});

test('"X" in the middle is 2 strokes', function() {
  this.testStrokes('<X>', 2);
});

test('each "X" on edge is 1 additional point', function() {
  this.testStrokes('X>', 1);
  this.testStrokes('<X', 1);
  this.testStrokes('XX', 2);
});
