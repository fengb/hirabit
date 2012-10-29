var BranchRow = function(){
  var instanceMethods = {
    toString: function() {
      return this.join('');
    },

    next: function() {
      var output = [];
      for(var i=0; i < this.length + 1; i++) {
        output[i] = ' ';
      }

      for(i=0; i < this.length; i++) {
        switch(this[i]) {
          case '<':
            output[i] = output[i] == ' ' ? '<' : ' ';
            break;
          case '>':
            output[i + 1] = '>';
            break;
          case 'X':
            output[i] = output[i] == ' ' ? '<' : ' ';
            output[i + 1] = '>';
            break;
        }
      }

      return BranchRow.init(output);
    },

    separate: function(separationRow) {
      var ret = this.slice(0);
      for(var i=0; i < separationRow.length; i++) {
        if(separationRow[i] !== ' ' && ret[i] !== ' ') {
          ret[i] = 'X';
        }
      }
      return BranchRow.init(ret);
    }
  };

  return {
    init: function(array) {
      for(var method in instanceMethods) {
        array[method] = instanceMethods[method];
      }
      return array;
    },

    fromString: function(str) {
      return BranchRow.init(str.split(''));
    }
  };
}();


var separationRows = [];
for(var i = 0; i < 8; i++) {
  separationRows[i] = Array(i + 2).join(' ').split('');
}


var $rows = [];
$.each(separationRows, function(i, separationRow) {
  var $separationRow = $('<div />').appendTo('body');
  $rows.push([]);
  $.each(separationRow, function(j, separation) {
    var $separation = $('<span>.</span>').appendTo($separationRow);
    $rows[i].push($separation);
    $separation.click(function() {
      /* Cannot be separation because we mutate the row. */
      separationRow[j] = separationRow[j] === ' ' ? '.' : ' ';
      $separation.toggleClass('active', separationRow[j] !== ' ');
    });
  });
});


$('<button>Run!</button>').appendTo('body').click(function() {
  var branchRow = BranchRow.fromString('X');
  for(var i = 0; i < separationRows.length; i++) {
    branchRow = branchRow.separate(separationRows[i]);
    for(var j = 0; j < branchRow.length; j++) {
      $rows[i][j].html(branchRow[j].replace(' ', '&nbsp;'));
    }
    branchRow = branchRow.next();
  }
});
