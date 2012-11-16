module('Branches.Target.fromstring()', {
  setup: function() {
    this.equalStringValues = function(targetString, values) {
      var target = Branches.Target.fromString(targetString);
      equal(target.length, values.length);
      for(var i=0; i < target.length; i++) {
        equal(target[i], values[i]);
      }
    };
  }
});

test('"X" is considered false', function() {
  this.equalStringValues('X', [false]);
});

test('"O" is considered true', function() {
  this.equalStringValues('O', [true]);
});

test('" " is considered null', function() {
  this.equalStringValues(' ', [null]);
});

test('multi character string', function() {
  this.equalStringValues('X O', [false, null, true]);
});
