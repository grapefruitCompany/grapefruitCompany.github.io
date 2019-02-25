'use strict';

var person = {
  name: 'Pechenkin',
  salary: 800,
};

console.log('getName - person: ' + getName.call(person));
console.log('getName - global: ' + getName.call(this));

console.log('getDoubled - person salary: ' + getDoubled.call(person));
console.log('getDoubledTrippled - person salary: ' + getDoubledTrippled.call(null, getDoubled.call(person)));

var mustang = new Car('mustang', 2008, 5000, 'red');
var bmw = new Car('bmw', 2015, 100, 'green');
var audi = new Car('audi', 2018, 50000, 'yellow');
console.log('Car - brand: ' + mustang.brand);
console.log('Car - brand: ' + bmw.brand);
console.log('Car - brand: ' + audi.brand);

var losSantos = new City('Los Santos', 1000, 'GTA');
losSantos.addCitizen();
losSantos.addCitizen();
losSantos.addCitizen();
losSantos.addCitizen();
losSantos.addCitizen();

printObject(losSantos);

var user = {
  login: 'Andrew',
  password: '1',

  loginOk: function() {
    console.log(this.login + ' - login success');
  },

  loginFail: function() {
    console.log(this.login + ' - login failed');      
  },

  checkPassword: function() {
    // var self = this;
    // ask("Your password?", 
    //   this.password,
    //   function() {
    //     self.loginOk();
    //   }, 
    //   function() {
    //     self.loginFail();  
    //   });
    ask("Your password?", this.password, this.loginOk.bind(this), this.loginFail.bind(this));

  },
};

user.checkPassword();

var user2 = user;
user = null;
user2.checkPassword();

function ask(question, answer, ok, fail) {
  var result = prompt(question, '');
  if (result === answer) {
    ok();
  } else {
    fail();
  }
}

function getName() {
  return this.name;
}

function getDoubledTrippled(n) {
  return n * 3;
}

function getDoubled() {
  return this.salary * 2;
}

function Car(brand, year, mileage, color) {
  this.brand = brand;
  this.year = year;
  this.mileage = mileage;
  this.color = color;
  this.isIgnited = false;
  this.amountOfFuel = 0;
  this.ignition = function() {
    if (this.amountOfFuel > 0) {
      console.log('zom-zoom');
      this.isIgnited = true;  
    } else {
      console.log('Нужно заправить автомобиль');
    }  
  };
  this.start = function() {
    if (this.isIgnited) {
      console.log('Машина ' + this.brand + ' марки ' + this.color + ' цвета поехала!');
    } else {
      console.log('Включите вначале зажигание');
    }
  };
  this.stop = function() {
    if (this.isIgnited) {
      console.log('Машинка остановилась');
    } else {
      console.log('Зажигание и так выключено');
    }
  };
  this.fillTheAutomobile = function() {
    this.amountOfFuel = 10;
    console.log('Залили 10л, давай зажигай, бро!');
  };
  this.greetings = function () {
    console.log('=====================\nWelcome you are in Mustang! \nLets go for a ride?');
  };
}

function printObject(obj) {
  for (var key in obj) {
    console.log(key + ' ' + obj[key]);
  }
}

function City(name, population, country) {
  this.name = name;
  this.population = population;
  this.country = country;
  this.getPopulation = function() {
    return this.population;
  };
  this.getCityName = function() {
    return this.name;
  };
  this.addCitizen = function() {
    this.population += 1;
  }
}

