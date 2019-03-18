var transport = {
  stop: null
};
var car = {
  stop: true
};
car.__proto__ = transport;

console.log(car.stop); // true - потому что у объекта car есть свойство stop со значением true
delete car.stop;
console.log(car.stop); // null - у объекта car нет свойства stop обращаемся в прототип transport
delete transport.stop;
console.log(car.stop); // undefined - у объекта и у его прототипа нет такого свойства

// ============

function Car(brand, year, mileage, color) {
  this.brand = brand;
  this.year = year;
  this.mileage = mileage;
  this.color = color;
  this.isIgnited = false;
  this.amountOfFuel = 0;
}

Car.prototype = {
  ignition: function() {
    if (this.amountOfFuel > 0) {
      console.log('zom-zoom');
      this.isIgnited = true;  
    } else {
      console.log('Нужно заправить автомобиль');
    }  
  },
  start: function() {
    if (this.isIgnited) {
      console.log('Машина ' + this.brand + ' марки ' + this.color + ' цвета поехала!');
    } else {
      console.log('Включите вначале зажигание');
    }
  },
  stop: function() {
    if (this.isIgnited) {
      console.log('Машинка остановилась');
    } else {
      console.log('Зажигание и так выключено');
    }
  },
  fillTheAutomobile: function() {
    this.amountOfFuel = 10;
    console.log('Залили 10л, давай зажигай, бро!');
  },
  greetings: function () {
    console.log('=====================\nWelcome you are in Mustang! \nLets go for a ride?');
  }
}

var ford = new Car('ford', '2015', 10000, 'red');

ford.start();
