function User(f, l) {
  this.f = f;
  this.l = l;

  this.print = function() {
    console.log(this.f + ' ' + this.l);
  };
}

function Manager(f, l) {
  User.apply(this, arguments);
}

Manager.prototype = new User;

Manager.prototype.test = 1;

let u = new User('Levi', '9');
let m = new Manager('test', 'test');

console.log(u.test);
console.log(m.test);