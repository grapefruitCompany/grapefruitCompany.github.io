var str = 'Завтрак в 23:59';
console.log(str.match(/([0-1]\d|2[0-3]):[0-5]\d/g));

var plus = ' -12.5 + -2 ';
var minus = '1--2';
var slash = ' 1.1/2 ';
var space = '1 2.5';
var power = '1 * 2.5';

var exp = /(-?\d*\.?\d+)|[*/+-:]/g;

console.log(plus.match(exp));
console.log(minus.match(exp));
console.log(slash.match(exp));
console.log(space.match(exp));
console.log(power.match(exp));

function createURL(str, obj) {
  var result = str;
  console.log(str);
  for (var key in obj) {
    var expression = '{' + key + '}';
    result = result.replace(expression, obj[key]);
  }  

  return result;
}

let url = createURL(
 '/api/countries/{country}/regions/{region}/',
 { country: 'Ukraine', region: 'Kiev'}
);

console.log(url);
