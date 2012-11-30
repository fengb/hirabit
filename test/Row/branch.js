module('Hirabit.Row:branch()', {
  setup: function() {
    this.equalBranchedRow = function(rowString, branchString, expected) {
      var row = Hirabit.Row.fromString(rowString);
      var directive = Hirabit.Directive.fromString(branchString);
      equal(row.branch(directive).toString(), expected);
    };
  }
});

test('no branches yield blank', function() {
  this.equalBranchedRow(' ',
                        '.',
                        ' ');
});
test('no branches yield original', function() {
  this.equalBranchedRow('<',
                        ' ',
                        '<');
});
test('branches yield X', function() {
  this.equalBranchedRow('<<>',
                        '. .',
                        'X<X');
});
test('explosions yield explosion', function() {
  this.equalBranchedRow('*',
                        '.',
                        '*');
});
