var arrCandy = [43, 23, 57, 54, 60, 41, 10, 60, 50, 47, 60, 12, 60];
printAllAndLengthAndMax(arrCandy);
printBestFromArray(arrCandy);

var automobile = {
  brand: 'mustang',
  year: 2015,
  mileage: 1000,
  color: 'red',
  isIgnited: false,
  amountOfFuel: 0,
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
  },
};

automobile.greetings();

automobile.stop();

automobile.start();

automobile.ignition();

automobile.fillTheAutomobile();

automobile.ignition();

automobile.start();

automobile.stop();

var students = {
  Anna: 29, 
  Misha: 29, 
  Stepan: 1, 
  Elena: 29,
  Segey: 9,
  Ivan: 29,
  Oleg: 19,
};

console.log('Best students: ' + printBestStudent(students));

shuffleRandom([1, 2, 3, 'four', '$', 'six', '1.2.3', 8, 9, 10, 11, 12, 'Mustang']);

sumOfArray([1, 2, 3, 4, 'пять', null, undefined, [1, 2, 3,], 9, 10,]);

maxFromArray([1, 2, 3, 4, 'пять', null, undefined, [1,2,3], 9, 10, 60, 11]);

getAllConsecutiveVariatonsOfArray([1, 2, 3, 4, 5,]);

getMaxSumFromConsectiveSubArrays([1, -2, 3, 4, -9, 6,]);

isItnPalindrome('A man, a plan, a canal – Panama');
isItnPalindrome('sA man, a plan, a canal – Panama');
isItnPalindrome('Madam, I\'m Adam');
isItnPalindrome('Madam, I\'m AdamX');

function printAllAndLengthAndMax(arr) {
  console.log('=====================\nCandy Research');   
  for (var i = 0; i < arr.length; i++) {
    console.log('Образец под номером ' + (i + 1) + ' - результат - ' + arr[i]);
  }
  
  console.log('Всего проведено исследований: ' + arr.length);
  console.log('Наилучший результат: ' + maxFromArray(arr));
}

function printBestFromArray(arr) {
  var max = maxFromArray(arr);
  var result = [];
  
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] === max) {
      result.push(i + 1);  
    }
  }

  console.log('Образцы с наилучшими результатами под номерами: ' + '[' + result + ']');
}

function printBestStudent(obj) {
  console.log('=====================\nBest of students');
  var listOfNumbers = [];
  var listOfKeys = [];
  var maxNumber = 0;
  var keyOfMax = '';

  for (var key in obj) {
    listOfNumbers.push(obj[key]);
    listOfKeys.push(key);
  }

  maxNumber = maxFromArray(listOfNumbers);

  for (var i = 0; i < listOfNumbers.length; i++) {
    if (maxNumber === listOfNumbers[i]) {
      keyOfMax += listOfKeys[i] + ' ';
    }
  }

  return keyOfMax;
}

function shuffleRandom(arr) {
  console.log('=====================\nShuffle Array'); 
  var newArray = [];

  console.log('startArray: ' + arr);

  for (var i = 0; i < arr.length;) {
    var index = getRandomInt(arr.length) - 1;
    var item = arr.splice(index, 1);
    newArray.push(item);
  }

  console.log('shuffledArray: ' + newArray);
  return newArray;
}

function getRandomInt(max) {
  return Math.ceil(Math.random() * max);
}

function sumOfArray(arr) {
  var result = 0; 

  arr = cleaningArray(arr);

  for (var i = 0; i < arr.length; i++) {
    result += arr[i];
  }

  console.log('sum is: ' + result); 
  return result;
}

function cleaningArray(arr) {

  for (var i = 0; i < arr.length; i++) {
    if ((typeof arr[i]) !== 'number') {
      arr.splice(i, 1);
      i--;
    }
  }

  return arr;
}

function maxFromArray(arr) {
  arr = cleaningArray(arr);

  var max = arr[0];
  
  for (var i = 1; i < arr.length; i++) {
    if (max < arr[i]) {
      max = arr[i];
    }
  }
  
  console.log('Max is: ' + max);

  return max;
}

function getAllConsecutiveVariatonsOfArray(arr) {
  console.log('=====================\nAll consecutive possible variations of array');  
  var result = [];
  console.log('Start work with: ' + arr);

  for (var i = 1; i <= arr.length; i++) {
    result = result.concat(getSomeConsectiveVariations(i, arr));
  }

  console.log(result);
  
  return result;
}


function getSomeConsectiveVariations(some, arr) {
  var result = [];
  var count = arr.length - some + 1;

  for (var i = 0; i < count; i++) {
    var x = arr.slice(i, i + some);
    result.push(x);
  }

  return result;
}

function getMaxSumFromConsectiveSubArrays(arr) {
  console.log('=====================\nMax Sum of subarrays');
  console.log('Working Array: ' + arr);  
  var listOfSums = [];

  for (var i = 1; i <= arr.length; i++) {
    listOfSums = listOfSums.concat(getSumFromSubArrays(i, arr));
    console.log('List of sum of subarrays: ' + listOfSums);
  }

  return maxFromArray(listOfSums);
}

function getSumFromSubArrays(some, arr) {
  var result = [];
  var count = arr.length - some + 1;

  for (var i = 0; i < count; i++) {
    var x = arr.slice(i, i + some);
    console.log('Sub Array: ' + x);
    result.push(sumOfArray(x));
  }

  return result;
}

function isItnPalindrome(str) {
  console.log('=====================\nPalindrome'); 
  console.log('Is it palindrome: ' + str);
  var result = true;
  str = str.toLowerCase();
  str = str.split('');

  for (var i = 0; i < str.length; i++) {
    if (isItPunctuation(str[i])) {
      str.splice(i, 1);
      i--;
    }
  }

  for (var i = 0; i < Math.floor(str.length / 2); i++) {
    if (str[i] !== str[str.length - i - 1]) {
      result = false;
      break;
    }
  }

  console.log(result);
  return result;
}

function isItPunctuation(s) {
  var punctuation = [' ', '-', '–', ',', '.', '\'', '"', ';', ':', '!', '?',];
  var result = false;

  for (var i = 0; i < punctuation.length; i++) {    
    if (s === punctuation[i]) {
      result = true;
      break;
    }
  }

  return result;
}