var Branches = {
  next: function(input) {
    var output = [];
    for(var i=0; i < input.length + 1; i++) {
      output[i] = ' ';
    }

    for(var i=0; i < input.length; i++) {
      switch(input[i]) {
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

    return output.join('');
  },

  separate: function(branches, separations) {
    var ret = branches.split('');
    for(var i=0; i < separations.length; i++) {
      if(separations[i] !== ' ' && ret[i] !== ' ') {
        ret[i] = 'X';
      }
    }
    return ret.join('');
  }
};
