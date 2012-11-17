module('Branches.Target:match()', {
  setup: function() {
    function runMatch(targetString, active) {
      var target = Branches.Target.fromString(targetString);
      var value = {isActive: function(){return active;}};
      return target.match([value]);
    }

    this.testMatch = function(targetString, active) {
      ok(runMatch(targetString, active));
    };

    this.testNotMatch = function(targetString, active) {
      ok(!runMatch(targetString, active));
    };
  }
});

test('"O" matches active', function() {
  this.testMatch('O', true);
});

test('"O" does not match inactive', function() {
  this.testNotMatch('O', false);
});

test('"X" matches inactive', function() {
  this.testMatch('X', false);
});

test('"X" does not match active', function() {
  this.testNotMatch('X', true);
});

test('" " matches anything', function() {
  this.testMatch(' ', true);
  this.testMatch(' ', false);
});
