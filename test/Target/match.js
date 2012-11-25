module('Branches.Target:match()', {
  setup: function() {
    var active = {isActive: function(){return true;}};
    var inactive = {isActive: function(){return false;}};

    function runMatch(targetString, activeString) {
      var target = Branches.Target.fromString(targetString);
      var objs = [];
      for(var i=0; i < activeString.length; i++) {
        objs[i] = (activeString[i] === ' ') ? inactive : active;
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
