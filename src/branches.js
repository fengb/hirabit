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

  module.ui = function() {
    var directives = module.Directive.many(8);

    var $field = $('<div class="field" />').appendTo('body');
    var $directives = $('<div class="directives" />').appendTo($field);
    $.each(directives, function(i, directive) {
      var $directive = $('<div />').appendTo($directives);
      $.each(directive, function(j) {
        var $separation = $('<span>.</span>').appendTo($directive);
        $separation.click(function() {
          /* Cannot be separation because we mutate the row. */
          directive[j] = !directive[j];
          $separation.toggleClass('active', directive);
          animateExecution(i);
        });
      });
    });

    function animateExecution(changedRow) {
      var rows = module.Row.allFrom(directives);
      var $oldExecutions = $('div.execution').addClass('stale');
      var $execution = $('<div class="execution" />').appendTo($field);
      for(var i = 0; i < rows.length; i++) {
        var $row = $('<div />').appendTo($execution);
        for(var j = 0; j < rows[i].length; j++) {
          $row.append('<span>' + rows[i][j].toString().replace(' ', '&nbsp;') + '</span>');
        }
      }

      var startDrawRow = (changedRow === undefined) ? 0               // Redraw everything
                                                    : changedRow + 1; // Changed row is drawn instantaneously.
      var rowHeight = parseInt($execution.find('span').css('height'), 10);
      var startHeight = rowHeight * startDrawRow;
      var endHeight = rowHeight * rows.length;
      var animationDuration = (rows.length - startDrawRow) * 100;
      $execution.css('height', startHeight).animate({height: endHeight}, animationDuration, 'linear', function() {
        $oldExecutions.remove();
      });
    }
    animateExecution();
  };

  return module;
}({});
