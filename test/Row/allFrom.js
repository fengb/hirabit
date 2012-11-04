module('Branches.Row.allFrom()', {
  setup: function() {
    this.allFromBranchStrings = function(branchStrings) {
      var branchDirectives = [];
      for(var i=0; i < branchStrings.length; i++) {
        branchDirectives[i] = Branches.BranchDirective.fromString(branchStrings[i]);
      }
      return Branches.Row.allFrom(branchDirectives);
    };
  }
});

test('length is the same as arg length', function() {
  var rows = this.allFromBranchStrings(['', '']);
  equal(rows.length, 2);
  rows = this.allFromBranchStrings(['', '', '', '']);
  equal(rows.length, 4);
});

test('values are transformed', function() {
  var rows = this.allFromBranchStrings([' ', '  ', '.  ']);
  equal(rows[0].toString(), 'X');
  equal(rows[1].toString(), '<>');
  equal(rows[2].toString(), 'X >');
});
