module('Branches.Row.fromString()', {
  setup: function() {
    this.equalNodeDescription = function(nodeString, description) {
      var row = Branches.Row.fromString(nodeString);
      equal(row[0].description, description);
    };
  }
});

test('correct toString() representation', function() {
  var rows = Branches.Row.fromString('<>* X');
  equal(rows.toString(), '<>* X');
});

test('correct description', function() {
  this.equalNodeDescription('<', 'left');
  this.equalNodeDescription('>', 'right');
  this.equalNodeDescription('X', 'branch');
  this.equalNodeDescription(' ', 'empty');
  this.equalNodeDescription('*', 'merge');
});
