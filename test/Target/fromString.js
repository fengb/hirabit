module('Branches.Target.fromstring()', {
  setup: function() {
    this.equalStringValues = function(targetString, values) {
      var target = Branches.Target.fromString(targetString);
      for(var k in values) {
        equal(target[k].length, values[k].length);
        for(var i=0; i < values[k].length; i++) {
          strictEqual(target[k][i], values[k][i]);
        }
      }
    };
  }
});

test('"X" is considered false', function() {
  this.equalStringValues('X', {1: [false]});
});

test('"O" is considered true', function() {
  this.equalStringValues('O', {1: [true]});
});

test('" " is considered undefined', function() {
  this.equalStringValues(' ', {1: [undefined]});
});

test('multi character string', function() {
  this.equalStringValues('X O', {3: [false, undefined, true]});
});

test('multi row string', function() {
  this.equalStringValues('OO\nOOOO', {2: [true, true],
                                      4: [true, true, true, true]});
});
