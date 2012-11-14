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
    var game = {};
    game.directives = module.Directive.many(numRows);
    game.rows = module.Row.allFrom(game.directives);
    game.onChange = onChange || function(){};
    game.toggle = function(row, col) {
      game.directives[row][col] = !game.directives[row][col];
      game.rows = module.Row.allFrom(game.directives);
      onChange(game, row);
    };

    onChange(game, 0);
    return game;
  };

  module.ui = function() {
    var $field = $('<div class="field" />').appendTo('body');

    var game = module.Game(8, function(game, changedRow) {
      var $stale = $('div.execution').addClass('stale');
      var $execution = $('<div class="execution" />').appendTo($field);
      $.each(game.rows, function(r, cols) {
        var $row = $('<div class="row" />').appendTo($execution);
        $.each(cols, function(c) {
          var $cell = $('<span class="cell ' + game.directives[r][c] + '">' + game.rows[r][c].toString().replace(' ', '.') + '</span>');
          $cell.appendTo($row).click(function() {
            game.toggle(r, c);
          });
        });
      });

      var startDrawRow = changedRow + 1;
      var cellHeight = parseInt($('.cell').css('height'), 10);
      var startHeight = cellHeight * startDrawRow;
      var fieldHeight = cellHeight * game.rows.length;
      var animationDuration = (game.rows.length - startDrawRow) * 100;
      $execution.css('height', startHeight).animate({height: fieldHeight}, animationDuration, 'linear', function() {
        $stale.remove();
      });
    });
  };

  return module;
}({});
