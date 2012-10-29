function Branches(val) {
  this.val = val;
}

Branches.fromString = function(str) {
  return new Branches(str.split(''));
};

Branches.prototype.toString = function() {
  return this.val.join('');
};

Branches.prototype.next = function() {
  var output = [];
  for(var i=0; i < this.val.length + 1; i++) {
    output[i] = ' ';
  }

  for(i=0; i < this.val.length; i++) {
    switch(this.val[i]) {
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

  return new Branches(output);
};

Branches.prototype.separate = function(separations) {
  var ret = this.val.slice(0);
  for(var i=0; i < separations.length; i++) {
    if(separations[i] !== ' ' && ret[i] !== ' ') {
      ret[i] = 'X';
    }
  }
  return new Branches(ret);
};
