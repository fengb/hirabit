var Branches = {
  next: function(input) {
    var output = [];
    for(var i=0; i < input.length + 1; i++) {
      output[i] = ' ';
    }

    for(var i=0; i < input.length; i++) {
      switch(input[i]) {
        case '<':
          output[i] = '<';
          break;
        case '>':
          output[i + 1] = '>';
          break;
      }
    }

    return output.join('');
  }
};
