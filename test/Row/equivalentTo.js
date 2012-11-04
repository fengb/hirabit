module('Branches.Row:equivalentTo()', {
  setup: function() {
    this.equivalent = function(rowString1, rowString2) {
      var row1 = Branches.Row.fromString(rowString1);
      var row2 = Branches.Row.fromString(rowString2);
      ok(row1.equivalentTo(row2), "'" + row1 + "' not equivalent to '" +
                                        row2 + "' but should be");
      ok(row2.equivalentTo(row1), "'" + row2 + "' not equivalent to '" +
                                        row1 + "' but should be");
    };

    this.notEquivalent = function(rowString1, rowString2) {
      var row1 = Branches.Row.fromString(rowString1);
      var row2 = Branches.Row.fromString(rowString2);
      ok(!row1.equivalentTo(row2), "'" + row1 + "' equivalent to '" +
                                         row2 + "' but shouldn't be");
      ok(!row2.equivalentTo(row1), "'" + row2 + "' equivalent to '" +
                                         row1 + "' but shouldn't be");
    };
  }
});

test('equivalent to same data', function() {
  this.equivalent(' *<X>* ', ' *<X>* ');
});

test('blank equivalent to merge', function() {
  this.equivalent(' ', '*');
});

test('content differences are not equivalent', function() {
  var chars = ' <>X';
  for(var i = 0; i < chars.length; i++) {
    for(var j = i + 1; j < chars.length; j++) {
      this.notEquivalent(chars[i], chars[j]);
    }
  }
});

test('different lengths are not equivalent', function() {
  this.notEquivalent(' ', '  ');
});
