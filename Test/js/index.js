function superSize(number) {
  return number.toString().split('').sort().reverse().join('');
}

console.log(superSize(123456));
console.log(superSize(105));
console.log(superSize(12));

