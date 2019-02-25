typeNumber(100);

printSimpleNumbers(10);

printFizzBuzz(100);

countSymbolInString('n', 'Looong');

var min = 0;
var max = 1;

console.log('Between ' + min + ' and ' + max + ' random number is ' + getRandom(min, max));

var fibonacciNumber = 10;

console.log('By Loop: Fibonacci number is ' + fibonacciNumber + ' and in Fibonacci it\'s ' + getFibonacciNumberByLoop(fibonacciNumber));

console.log('By Recursion: Fibonacci number is ' + fibonacciNumber + ' and in Fibonacci it\'s ' + getFibonacciNumberByRecursion(fibonacciNumber));

reverseString('Ababa gala maga');

function typeNumber(number) {

  console.log('====================\nNumber more then 100');
  
  var x = prompt('Type number more then ' + number);

  if (x > 100 || x === null) {
    alert('Great job! You did it!');
  } else {
    typeNumber(number);
  }
}

function printSimpleNumbers(num) {
  console.log('====================\nSimple numbers');

  var result = [];

  for (var i = 2; i < num; i++) {
    if (isItSimple(i)) {
      result.push(i);
    }
  }
  console.log('All simple numbers under ' + num + ' is ' + result);

  return result;
}

function isItSimple(num) {
  var isSimple = true;

  for (var i = 2; i < num; i++) {
    if ((num % i) === 0) {
      isSimple = false;
      break;
    }
  }

  return isSimple;
}

function printFizzBuzz(num) {
  console.log('====================\nFizzBuzz');
  var print;

  for (var i = 1; i <= num; i++) {
    print = i;
    if (i % 3 === 0) {
      print = 'Fizz';
      if (i % 5 === 0) {
        print += 'Buzz';
      }
    } else if (i % 5 === 0) {
      print = 'Buzz';
    }
    console.log(print);
  }
}

function countSymbolInString(s, str) {
  console.log('====================\nHow many times symbol is in string');
  console.log('We are counting how many times is "' + s +'" in string: ' + str);
  var allSymbols = str.toLowerCase().split('');
  var counter = 0;
  s = s.toLowerCase();

  for (var i = 0; i < allSymbols.length; i++) {
    if (allSymbols[i] === s) {
      counter++;
    }
  }

  console.log(counter);
  return counter;
}

function getRandom(min, max) {
  console.log('====================\nRandom number from min and max');
  return Math.round(min + Math.random() * (max - min));
}

function getFibonacciNumberByLoop(num) {
  console.log('====================\nPrint N-number from Fibonacci');
  var fiboArray = [1,1,];

  if (num > 2) {
    num -= 2;
    for (var i = 1; i <= num; i++) {
      fiboArray.push(fiboArray[i] + fiboArray[i-1]);
    }  
  }

  console.log('Fibo Array by loop: ' + fiboArray);

  return fiboArray[fiboArray.length - 1];
}

function getFibonacciNumberByRecursion(n) {
  return (n === 1 || n === 2) ? 1 : Math.round(getFibonacciNumberByRecursion(n - 1) * 1.618);
}

function reverseString(str) {
  console.log('====================\nReverse String');
  console.log(str + '\nAnd now it\'s reversed');
  var result = '';

  for (var i = str.length; i > 0; i--) {
    result += str[i - 1];
  }

  console.log(result);
}