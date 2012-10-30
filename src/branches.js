var Branches = function(module) {
  module.Row = function(){
    function init(array) {
      for(var method in instanceMethods) {
        array[method] = instanceMethods[method];
      }
      return array;
    }

    function Node(humanName, left, right) {
      Node.values[humanName] = {
        left: left,
        right: right,
        toString: function() { return humanName; }
      };
      return Node.values[humanName];
    }
    Node.values = [];
    Node.left = Node('<', true, false);
    Node.right = Node('>', false, true);
    Node.both = Node('X', true, true);
    Node.none = Node(' ', false, false);
    Node.merge = Node('*', false, false);

    var instanceMethods = {
      toString: function() {
        return this.join('');
      },

      next: function() {
        var output = [];
        for(var i=0; i < this.length + 1; i++) {
          output[i] = Node.none;
        }

        for(i=0; i < this.length; i++) {
          if(this[i].left) {
            output[i] = output[i] == Node.none ? Node.left : Node.merge;
          }
          if(this[i].right) {
            output[i+1] = Node.right;
          }
        }

        return init(output);
      },

      branch: function(branchRow) {
        var ret = this.slice(0);
        for(var i=0; i < branchRow.length; i++) {
          if(branchRow[i] !== ' ' && (this[i].left || this[i].right)) {
            ret[i] = Node.both;
          }
        }
        return init(ret);
      }
    };

    return {
      fromString: function(str) {
        var array = [];
        for(var i=0; i < str.length; i++) {
          array[i] = Node.values[str[i]];
        }
        return init(array);
      },

      allFrom: function(branchRows) {
        var base = module.Row.fromString('X');
        var prev = base.branch(branchRows[0]);
        var ret = [prev];
        for(var i=1; i < branchRows.length; i++) {
          prev = prev.next().branch(branchRows[i]);
          ret.push(prev);
        }
        return ret;
      }
    };
  }();

  module.ui = function() {
    var branchRows = [];
    for(var i = 0; i < 8; i++) {
      branchRows[i] = Array(i + 2).join(' ').split('');
    }

    var $rows = [];
    $.each(branchRows, function(i, branchRow) {
      var $branchRow = $('<div />').appendTo('body');
      $rows.push([]);
      $.each(branchRow, function(j, separation) {
        var $separation = $('<span>.</span>').appendTo($branchRow);
        $rows[i].push($separation);
        $separation.click(function() {
          /* Cannot be separation because we mutate the row. */
          branchRow[j] = branchRow[j] === ' ' ? '.' : ' ';
          $separation.toggleClass('active', branchRow[j] !== ' ');
        });
      });
    });


    $('<button>Run!</button>').appendTo('body').click(function() {
      var rows = module.Row.allFrom(branchRows);
      for(var i = 0; i < rows.length; i++) {
        for(var j = 0; j < rows[i].length; j++) {
          $rows[i][j].html(rows[i][j].toString().replace(' ', '.'));
        }
      }
    });
  };

  return module;
}({});
