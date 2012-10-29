var Branches = function(module) {
  module.Row = function(){
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
              output[i] = output[i] == ' ' ? '<' : '*';
              break;
            case '>':
              output[i + 1] = '>';
              break;
            case 'X':
              output[i] = output[i] == ' ' ? '<' : '*';
              output[i + 1] = '>';
              break;
          }
        }

        return module.Row.init(output);
      },

      separate: function(separationRow) {
        var ret = this.slice(0);
        for(var i=0; i < separationRow.length; i++) {
          if(separationRow[i] !== ' ' && ret[i] !== ' ' && ret[i] !== '*') {
            ret[i] = 'X';
          }
        }
        return module.Row.init(ret);
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
        return module.Row.init(str.split(''));
      },

      allFrom: function(separationRows) {
        var base = module.Row.fromString('X');
        var prev = base.separate(separationRows[0]);
        var ret = [prev];
        for(var i=1; i < separationRows.length; i++) {
          prev = prev.next().separate(separationRows[i]);
          ret.push(prev);
        }
        return ret;
      }
    };
  }();

  module.ui = function() {
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
      var branchRows = module.Row.allFrom(separationRows);
      for(var i = 0; i < separationRows.length; i++) {
        for(var j = 0; j < branchRows[i].length; j++) {
          $rows[i][j].html(branchRows[i][j].replace(' ', '.'));
        }
      }
    });
  };

  return module;
}({});
