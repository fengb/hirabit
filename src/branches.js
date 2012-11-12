var Branches = function(module) {
  module.Directive = {
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

  module.Row = function() {
    function Node(symbol, description, left, right) {
      Node.values[symbol] = {
        description: description,
        left: left,
        right: right,
        toString: function() { return symbol; }
      };
      return Node.values[symbol];
    }
    Node.values = [];
    Node.left =    Node('<',   'left',  true, false);
    Node.right =   Node('>',  'right', false,  true);
    Node.branch =  Node('X', 'branch',  true,  true);
    Node.none =    Node(' ',  'empty', false, false);
    Node.merge =   Node('*',  'merge', false, false);

    function init(array) {
      for(var method in instanceMethods) {
        array[method] = instanceMethods[method];
      }
      return array;
    }

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
            output[i] = output[i].right ? Node.merge : Node.left;
          }
          if(this[i].right) {
            output[i+1] = Node.right;
          }
        }

        return init(output);
      },

      branch: function(directive) {
        var ret = this.slice(0);
        for(var i=0; i < directive.length; i++) {
          if(directive[i] && (this[i].left || this[i].right)) {
            ret[i] = Node.branch;
          }
        }
        return init(ret);
      },

      equivalentTo: function(that) {
        if(this.length != that.length) {
          return false;
        }

        for(var i = 0; i < this.length; i++) {
          if(this[i].left != that[i].left || this[i].right != that[i].right) {
            return false;
          }
        }
        return true;
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

      allFrom: function(directives) {
        var base = module.Row.fromString('X');
        var prev = base.branch(directives[0]);
        var ret = [prev];
        for(var i=1; i < directives.length; i++) {
          prev = prev.next().branch(directives[i]);
          ret.push(prev);
        }
        return ret;
      }
    };
  }();

  module.Directive = {
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

  module.Game = function(numRows, onChange) {
    onChange = onChange || function(){};
    var directives = module.Directive.many(numRows);
    var rows = module.Row.allFrom(directives);
    onChange(directives, rows, 0);

    return {
      directives: directives,
      rows: module.Row.allFrom(directives),

      toggle: function(row, col) {
        this.directives[row][col] = !this.directives[row][col];
        this.rows = module.Row.allFrom(directives);
        onChange(this.directives, this.rows, row);
      }
    };
  };

  module.ui = function() {
    var $field = $('<div class="field" />').appendTo('body');
    var cellHeight = 18;
    var fieldHeight = 144;

    var game = module.Game(8, function(directives, rows, changedRow) {
      var $stale = $('div.execution').addClass('stale');
      var $execution = $('<div class="execution" />').appendTo($field);
      $.each(rows, function(r, row) {
        var $row = $('<div class="row" />').appendTo($execution);
        $.each(row, function(c) {
          $cell = $('<span class="cell ' + directives[r][c] + '">' + rows[r][c].toString().replace(' ', '.') + '</span>').appendTo($row);
          $cell.click(function() {
            game.toggle(r, c);
          });
        });
      });

      var startDrawRow = changedRow + 1;
      var startHeight = cellHeight * startDrawRow;
      var animationDuration = (rows.length - startDrawRow) * 100;
      $execution.css('height', startHeight).animate({height: fieldHeight}, animationDuration, 'linear', function() {
        $stale.remove();
      });
    });
  };

  return module;
}({});
