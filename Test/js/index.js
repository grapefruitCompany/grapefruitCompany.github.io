let xmen = ['Cyclops', 'Wolverine', 'Rogue'];

console.info('=> for');
for (let index = 0; index < xmen.length; index++) {
  console.log(xmen[index]);
}

console.info('=> for...in');
for (let key in xmen) {
  console.log(xmen[key]);
}

console.info('=> forEach');
xmen.forEach(xman => console.log(xman));

console.info('=> for...of');
for (let xman of xmen) {
  console.log(xman);
}