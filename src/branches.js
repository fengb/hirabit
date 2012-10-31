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

      branch: function(branchDirective) {
        var ret = this.slice(0);
        for(var i=0; i < branchDirective.length; i++) {
          if(branchDirective[i] && (this[i].left || this[i].right)) {
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

  module.BranchDirective = {
    fromString: function(string) {
      var ret = [];
      for(var i=0; i < string.length; i++) {
        ret[i] = (string[i] == '.');
      }
      return ret;
    },

    many: function(num) {
      var directives = [];
      for(var i = 0; i < num; i++) {
        directives[i] = [];
        for(var j = 0; j < i + 1; j++) {
          directives[i][j] = false;
        }
      }
      return directives;
    }
  };

  module.ui = function() {
    var branchDirectives = module.BranchDirective.many(8);

    var $rows = [];
    $.each(branchDirectives, function(i, branchDirective) {
      var $branchRow = $('<div />').appendTo('body');
      $rows.push([]);
      $.each(branchDirective, function(j, separation) {
        var $separation = $('<span>.</span>').appendTo($branchRow);
        $rows[i].push($separation);
        $separation.click(function() {
          /* Cannot be separation because we mutate the row. */
          branchDirective[j] = !branchDirective[j];
          $separation.toggleClass('active', branchDirective);
        });
      });
    });


    $('<button>Run!</button>').appendTo('body').click(function() {
      var rows = module.Row.allFrom(branchDirectives);
      for(var i = 0; i < rows.length; i++) {
        for(var j = 0; j < rows[i].length; j++) {
          $rows[i][j].html(rows[i][j].toString().replace(' ', '.'));
        }
      }
    });
  };

  return module;
}({});
