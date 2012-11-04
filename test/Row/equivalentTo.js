module('Branches.Row:equivalentTo()');

function equivalent(row1, row2) {
  ok(row1.equivalentTo(row2), "'" + row1 + "' not equivalent to '" +
                                    row2 + "' but should be");
  ok(row2.equivalentTo(row1), "'" + row2 + "' not equivalent to '" +
                                    row1 + "' but should be");
}

function notEquivalent(row1, row2) {
  ok(!row1.equivalentTo(row2), "'" + row1 + "' equivalent to '" +
                                     row2 + "' but shouldn't be");
  ok(!row2.equivalentTo(row1), "'" + row2 + "' equivalent to '" +
                                     row1 + "' but shouldn't be");
}

test('equivalent to self', function() {
  var row = Branches.Row.fromString(' *<X>* ');
  equivalent(row, row);
});

test('equivalent to same data but different instance', function() {
  var row1 = Branches.Row.fromString(' *<X>* ');
  var row2 = Branches.Row.fromString(' *<X>* ');
  equivalent(row1, row2);
});

test('blank equivalent to merge', function() {
  var row1 = Branches.Row.fromString(' ');
  var row2 = Branches.Row.fromString('*');
  equivalent(row1, row2);
});

test('content differences are not equivalent', function() {
  var chars = ' <>X';
  for(var i = 0; i < chars.length; i++) {
    for(var j = i + 1; j < chars.length; j++) {
      var row1 = Branches.Row.fromString(chars[i]);
      var row2 = Branches.Row.fromString(chars[j]);
      notEquivalent(row1, row2);
    }
  }
});

test('different lengths are not equivalent', function() {
  var row1 = Branches.Row.fromString(' ');
  var row2 = Branches.Row.fromString('  ');
  notEquivalent(row1, row2);
});
