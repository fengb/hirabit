module('Branches.Target.fromstring()', {
  setup: function() {
    this.equalStringValues = function(targetString, values) {
      var target = Branches.Target.fromString(targetString);
      for(var k in values) {
        equal(target[k].length, values[k].length);
        for(var i=0; i < values[k].length; i++) {
          equal(target[k][i], values[k][i]);
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

test('" " is considered null', function() {
  this.equalStringValues(' ', {1: [null]});
});

test('multi character string', function() {
  this.equalStringValues('X O', {3: [false, null, true]});
});

test('multi row string', function() {
  this.equalStringValues('OO\nOOOO', {2: [true, true],
                                      4: [true, true, true, true]});
});
