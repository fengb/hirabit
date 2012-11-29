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
    function Node(symbol, description, left, right, active) {
      Node.values[symbol] = {
        description: description,
        left: left,
        right: right,
        active: active,
        toString: function() { return symbol; }
      };
      return Node.values[symbol];
    }
    Node.values = [];
    Node.left =    Node('<',   'left',  true, false, true);
    Node.right =   Node('>',  'right', false,  true, true);
    Node.branch =  Node('X', 'branch',  true,  true, true);
    Node.merge =   Node('*',  'merge', false, false, true);
    Node.none =    Node(' ',  'empty', false, false, false);

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

      strokes: function() {
        var strokes = 0;
        for(var i=1; i < this.length - 1; i++) {
          strokes += this[i].active ? 1 : 0;
        }
        return strokes;
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

      for(i=0; i < target.length; i++) {
        if(target[i] === undefined) {
          target[i] = [];
        }
      }

      target.match = function(row) {
        var targetRow = this[row.length];
        if(targetRow) {
          for(var i=0; i < targetRow.length; i++) {
            if(targetRow[i] !== undefined && targetRow[i] !== row[i].active) {
              return false;
            }
          }
        }
        return true;
      };

      return target;
    }
  };

  module.Game = function(level, onChange) {
    var target = module.Target.fromString(level.target);
    var game = {height: target.length - 1};
    var directives = module.Directive.many(game.height);
    var rows = module.Row.allFrom(directives);
    onChange = onChange || function(){};

    game.toggle = function(cell) {
      directives[cell.r][cell.c] = !directives[cell.r][cell.c];
      rows = module.Row.allFrom(directives);
      onChange(game, cell.r);
    };

    game.cells = function() {
      var cells = [];
      for(var i=0; i < rows.length; i++) {
        for(var j=0; j < rows[i].length; j++) {
          cells.push({
            r: i,
            c: j,
            description: rows[i][j].description,
            split: directives[i][j],
            target: target[rows[i].length][j]
          });
        }
      }
      return cells;
    };

    game.complete = function() {
      for(var i=0; i < rows.length; i++) {
        if(!target.match(rows[i])) {
          return false;
        }
      }
      return true;
    };

    game.strokes = function() {
      var strokes = 0;
      for(var i=0; i < rows.length; i++) {
        strokes += rows[i].strokes();
      }
      return strokes;
    };

    onChange(game);
    return game;
  };

  module.ui = function(target, $field) {
    $field = $field || $('<div />').appendTo('body');
    $field.empty().addClass('branches');

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

        var classes = [
          cell.description
        ];
        if(cell.split) {
          classes.push('split');
        }
        if(cell.target === true) {
          classes.push('target');
        } else if(cell.target === false) {
          classes.push('untarget');
        }

        $('<span class="cell" />').
          addClass(classes.join(' ')).
          appendTo($row).click(function() {
            game.toggle(cell);
            console.log([game.complete(), game.strokes()]);
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
