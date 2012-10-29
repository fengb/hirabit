var Branches = function(){
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

      return Branches.init(output);
    },

    separate: function(separations) {
      var ret = this.slice(0);
      for(var i=0; i < separations.length; i++) {
        if(separations[i] !== ' ' && ret[i] !== ' ') {
          ret[i] = 'X';
        }
      }
      return Branches.init(ret);
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
      return Branches.init(str.split(''));
    }
  };
}();
