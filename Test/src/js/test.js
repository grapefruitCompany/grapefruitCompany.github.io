// Object.prototype[Symbol.toPrimitive] = function(hint) {
//   return hint == "string" ? 
//           Object.prototype.toString() : 
//           this.a;
// }
// console.log('{a: 2} ', {a: 2});
// console.log('({a: 2} + "2") === "22"', ({a: 2} + '2') === '22'); //true
// console.log('({a: 2} + 2) === 4', ({a: 2} + 2) === 4); //true
// console.log('({b: 2} + 2) === 4', ({b: 2} + 2) === 4); //true

// console.log('["2"] + 2', ["2"] + 2); //NaN
// console.log('["2"] * 2', ["2"] * 2); //NaN

// Object.prototype[Symbol.toPrimitive] = function(hint) {
//   return hint == "string" ? 
//           Object.prototype.toString() : 
//           Object.prototype.valueOf(); // TypeError: Cannot convert object to primitive value
// }

Array.prototype.reduce2 = function(f, initialValue) {
  // http://speakingjs.com/es5/ch18.html#_arrays_can_also_have_properties
  //how to skip holes and undefined items in array
  let realLength = countElements(this); // <-how to count real length of array and giv back his real array without holes.
  function countElements(arr) {
    var elemCount = 0;
    arr.forEach(function () {
        elemCount++;
    });
    return elemCount;
  }
  switch (true) {
    case (this.length === 1 && initialValue === undefined):
      //Якщо масив складається тільки з одного елемента 
      // (незалежно від його позиції) і значення initialValue 
      // не задане, буде повернуто єдине наявне значення, 
      // а функція callback не буде викликана.
      return this[0]; // <- here should be only element without holes
      break;
    case (this.length === 1 && initialValue !== undefined):
      return f(initialValue, arr[i]);
      break;
    case (this.length === 0 && initialValue === undefined):
      //Якщо масив порожній і значення initialValue не задане, 
      //буде створено помилку TypeError. 
      throw new TypeError('Reduce of empty array with no initial value');
      break;
    case (this.length === 0 && initialValue !== undefined):
      //якщо значення initialValue задане, 
      // але масив порожній, буде повернуто єдине наявне значення, 
      // а функція callback не буде викликана.
      return initialValue;
      break;
    default:
      // Якщо значення initialValue не задане, 
      // reduce() виконуватиме callback функцію 
      // починаючи з індексу 1, пропустивши перший 
      // індекс. Якщо initialValue задане, виконання 
      // почнеться із 0-го індексу.
      let acc = initialValue === undefined ? this[0] : initialValue;
      let i = initialValue === undefined ? 1 : 0;
      for (; i < this.length; i++) {
        acc = f(acc, this[i], i, this);
      }
      return acc;
  }
}

let arr = [1, 2, 3, 4, 5];
let reducer = (acc, cur) => acc + cur;
console.log(arr.reduce(reducer, 0));
console.log(arr.reduce2(reducer, 0));
console.log([7].reduce(reducer));
console.log([7].reduce2(reducer));
console.log([].reduce(reducer, 0));
console.log([].reduce2(reducer, 0));
// console.log([].reduce(reducer));
// console.log([].reduce2(reducer));