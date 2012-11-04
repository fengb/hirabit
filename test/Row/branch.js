module('Branches.Row:separate()', {
  setup: function() {
    this.equalBranchedRow = function(rowString, branchString, expected) {
      var row = Branches.Row.fromString(rowString);
      var branchDirective = Branches.BranchDirective.fromString(branchString);
      equal(row.branch(branchDirective).toString(), expected);
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
