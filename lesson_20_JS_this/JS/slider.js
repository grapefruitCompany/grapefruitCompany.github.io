;(function() {
  var arr = [{image: 'car.jpg', alt: 'Car'}, {image: 'apple.jpg', alt: 'Apple'}, {image: 'ship.jpg', alt: 'Ship'},];
  var counter = 0;

  showNextItem();
  showNextItem();
  showCurrentItem();
  addItem({image: 'rocket.jpg', alt: 'Rocket'}, 1);
  showCurrentItem();
  removeItem(0);
  showCurrentItem();
  showNextItem();

  function checkOrder() {
    if (counter > (arr.length - 1)) {
      counter = 0; 
    } else if (counter < 0) {
      counter = arr.length - 1;
    }
  }

  function showNextItem() {
    console.log('show Next Item');
    ++counter;
    checkOrder(); 
    printObject(arr[counter]);
  }

  function showPrevItem() {
    console.log('show Previous Item');
    --counter;
    checkOrder();
    printObject(arr[counter]);
  }

  function showParticularItem(n) {
    console.log('show Particular Item ' + n);
    counter = n;
    checkOrder();
    printObject(arr[counter]);
  }

  function showCurrentItem() {
    console.log('show Current Item');
    checkOrder(); 
    printObject(arr[counter]); 
  }

  function addItem(item, order) {
    console.log('add Item at place ' + order);
    if (counter >= order) {
      ++counter;
    }
    arr.splice(order, 0, item);
  }

  function removeItem(order) {
    console.log('remove Item ' + order);
    if (counter >= order) {
      --counter;
    }
    arr.splice(order, 1);
  }

  function printObject(obj) {
    for (var key in obj) {
      console.log(key + ' ' + obj[key]);
    }
  }
}());
