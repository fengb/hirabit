module('Branches.Target:length', {
  setup: function() {
    this.testLength = function(targetString, length) {
      var target = Branches.Target.fromString(targetString);
      equal(target.length, length);
    };
  }
});

test('length of single segment', function() {
  this.testLength('O', 1);
  this.testLength('XOX', 3);
});

test('length of multi segment is longest', function() {
  this.testLength('X', 1);
  this.testLength('OOO', 3);
  this.testLength('XXXXXO', 6);
});
