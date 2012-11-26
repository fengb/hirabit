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
        toString: function() { return symbol; },
        isActive: function() { return left || right; }
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

  module.Target = {
    fromString: function(string) {
      var lines = string.split('\n');
      var target = [];
      for(var i=0; i < lines.length; i++) {
        var line = lines[i];
        var targetRow = target[line.length] = [];
        for(var j=0; j < line.length; j++) {
          switch(line[j]) {
            case 'X':
              targetRow[j] = false;
              break;
            case 'O':
              targetRow[j] = true;
              break;
            default:
              targetRow[j] = undefined;
          }
        }
      }

      target.match = function(row) {
        var targetRow = this[row.length];
        if(targetRow) {
          for(var i=0; i < targetRow.length; i++) {
            if(targetRow[i] !== undefined && targetRow[i] !== row[i].isActive()) {
              return false;
            }
          }
        }
        return true;
      };

      target.matchAll = function(rows) {
        for(var i=0; i < rows.length; i++) {
          if(!this.match(rows[i])) {
            return false;
          }
        }
        return true;
      };

      return target;
    }
  };

  module.Game = function(target, onChange) {
    var game = {height: target.length - 1};
    var directives = module.Directive.many(game.height);
    var rows = module.Row.allFrom(directives);
    onChange = onChange || function(){};

    game.toggle = function(row, col) {
      directives[row][col] = !directives[row][col];
      rows = module.Row.allFrom(directives);
      onChange(game, row);
    };

    game.cells = function() {
      var cells = [];
      for(var i=0; i < rows.length; i++) {
        for(var j=0; j < rows[i].length; j++) {
          cells.push({
            r: i,
            c: j,
            description: rows[i][j].description,
            directive: directives[i][j]
          });
        }
      }
      return cells;
    };

    onChange(game);
    return game;
  };

  module.ui = function() {
    var $field = $('<div class="field" />').appendTo('body');

    var target = module.Target.fromString('XXXXXXXXXXXXXXXXXXXX');
    var game = module.Game(target, function(game, changedRow) {
      var $stale = $('div.execution').addClass('stale');
      var $execution = $('<div class="execution" />').appendTo($field);
      var $row;
      var lastR;
      $.each(game.cells(), function(i, cell) {
        if(lastR !== cell.r) {
          $row = $('<div class="row" />').appendTo($execution);
          lastR = cell.r;
        }
        $('<span class="cell" />').
          addClass(cell.directive.toString()).addClass(cell.description).
          appendTo($row).click(function() {
            game.toggle(cell.r, cell.c);
          });
      });

      if(changedRow !== undefined) {
        var startDrawRow = changedRow + 1;
        var cellHeight = parseInt($('span.cell').css('height'), 10);
        var startHeight = cellHeight * startDrawRow;
        var fieldHeight = cellHeight * game.height;
        var animationDuration = (game.height - startDrawRow) * 10;
        $execution.css('height', startHeight).animate({height: fieldHeight}, animationDuration, 'linear', function() {
          $stale.remove();
        });
      }
    });
  };

  return module;
}({});
