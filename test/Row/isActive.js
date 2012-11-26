module('Branches.Row:isActive()', {
  setup: function() {
    this.testActive = function(rowString) {
      var row = Branches.Row.fromString(rowString);
      ok(row[0].isActive());
    };

    this.testInactive = function(rowString) {
      var row = Branches.Row.fromString(rowString);
      ok(!row[0].isActive());
    };
  }
});

test('"<>X" are active', function() {
  var row = Branches.Row.fromString('<>X');
  for(var i=0; i < row.length; i++) {
    ok(row[i].isActive());
  }
});

test('" *" are not active', function() {
  var row = Branches.Row.fromString(' *');
  for(var i=0; i < row.length; i++) {
    ok(!row[i].isActive());
  }
});
