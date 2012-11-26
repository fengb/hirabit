module('Branches.Target:length', {
  setup: function() {
    this.testLength = function(targetString, length) {
      var target = Branches.Target.fromString(targetString);
      equal(target.length, length);
    };
  }
});

test('length of single segment is line length + 1', function() {
  this.testLength('O', 2);
  this.testLength('XOX', 4);
});

test('length of multi segment is longest + 1', function() {
  this.testLength('X', 2);
  this.testLength('OOO', 4);
  this.testLength('XXXXXO', 7);
});
