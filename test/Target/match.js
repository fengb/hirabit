module('Hirabit.Target:match()', {
  setup: function() {
    function runMatch(targetString, activeString) {
      var target = Hirabit.Target.fromString(targetString);
      var objs = [];
      for(var i=0; i < activeString.length; i++) {
        objs[i] = {active: activeString[i] !== ' '};
      }
      return target.match(objs);
    }

    this.testMatch = function(targetString, activeString) {
      ok(runMatch(targetString, activeString));
    };

    this.testNotMatch = function(targetString, activeString) {
      ok(!runMatch(targetString, activeString));
    };
  }
});

test('"O" matches active', function() {
  this.testMatch('O', 'a');
});

test('"O" does not match inactive', function() {
  this.testNotMatch('O', ' ');
});

test('"X" matches inactive', function() {
  this.testMatch('X', ' ');
});

test('"X" does not match active', function() {
  this.testNotMatch('X', 'a');
});

test('" " matches anything', function() {
  this.testMatch(' ', 'a');
  this.testMatch(' ', ' ');
});

test('array matches', function() {
  this.testMatch('OX', 'a ');
  this.testMatch('XO', ' a');
});

test('array non matches', function() {
  this.testNotMatch('OX', ' a');
  this.testNotMatch('OX', '  ');
  this.testNotMatch('OX', 'aa');
});

test('target with different length than row matches', function() {
  this.testMatch('OXX', 'a');
});

test('two directives match', function() {
  this.testMatch('XOX\nOO', 'aa');
  this.testMatch('XOX\nOO', ' a ');
  this.testMatch('OO\nXOX', 'aa');
  this.testMatch('OO\nXOX', ' a ');
});

test('two directives no match', function() {
  this.testNotMatch('XOX\nOO', '  ');
  this.testNotMatch('XOX\nOO', 'a a');
  this.testNotMatch('OO\nXOX', '  ');
  this.testNotMatch('OO\nXOX', 'a a');
});
