module('Hirabit.Row:strokes()', {
  setup: function() {
    this.testStrokes = function(rowString, strokes) {
      var row = Hirabit.Row.fromString(rowString);
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

test('"<>*X" in the middle are 1 point each', function() {
  this.testStrokes('<<>', 1);
  this.testStrokes('<>>', 1);
  this.testStrokes('<*>', 1);
});

test('each "X" on edge is 0 points', function() {
  this.testStrokes('X>', 0);
  this.testStrokes('<X', 0);
  this.testStrokes('XX', 0);
});
