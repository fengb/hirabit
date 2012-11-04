module('Branches.Row:equivalentTo()');

test('equivalent to self', function() {
  var row = Branches.Row.fromString(' *<X>* ');
  ok(row.equivalentTo(row));
});

test('content differences are not equivalent', function() {
  var chars = ' <>X';
  for(var i = 0; i < chars.length; i++) {
    for(var j = i + 1; j < chars.length; j++) {
      var row1 = Branches.Row.fromString(chars[i]);
      var row2 = Branches.Row.fromString(chars[j]);
      ok(!row1.equivalentTo(row2), "'" + chars[i] + "' equivalent to '" +
                                         chars[j] + "' but shouldn't be");
      ok(!row2.equivalentTo(row1), "'" + chars[j] + "' equivalent to '" +
                                         chars[i] + "' but shouldn't be");
    }
  }
});

test('different lengths are not equivalent', function() {
  var row1 = Branches.Row.fromString(' ');
  var row2 = Branches.Row.fromString('  ');
  ok(!row1.equivalentTo(row2));
});

test('equivalent to same data but different instance', function() {
  var row1 = Branches.Row.fromString(' *<X>* ');
  var row2 = Branches.Row.fromString(' *<X>* ');
  ok(row1.equivalentTo(row2));
  ok(row2.equivalentTo(row1));
});
