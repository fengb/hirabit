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
