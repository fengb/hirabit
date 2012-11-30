module('Hirabit.Row:active', {
  setup: function() {
    this.testActive = function(rowString) {
      var row = Hirabit.Row.fromString(rowString);
      ok(row[0].active);
    };

    this.testInactive = function(rowString) {
      var row = Hirabit.Row.fromString(rowString);
      ok(!row[0].active);
    };
  }
});

test('"<>X*" are active', function() {
  var row = Hirabit.Row.fromString('<>X*');
  for(var i=0; i < row.length; i++) {
    ok(row[i].active);
  }
});

test('" " is not active', function() {
  var row = Hirabit.Row.fromString(' ');
  ok(!row[0].active);
});
