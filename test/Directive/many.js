module('Branches.Directive.many()');

test('generates <num> directives', function() {
  var directives = Branches.Directive.many(12);
  equal(directives.length, 12);
});

test('each directive length = index + 1', function() {
  var directives = Branches.Directive.many(7);
  for(var i = 0; i < directives.length; i++) {
    equal(directives[i].length, i + 1);
  }
});

test('each directive has all values = false', function() {
  var directives = Branches.Directive.many(3);
  for(var i = 0; i < directives.length; i++) {
    for(var j = 0; j < directives[i].length; j++) {
      equal(directives[i][j], false);
    }
  }
});
