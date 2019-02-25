function startPaintTableByDiagonal() {
  paintTableByDiagonal();  
}

function startCreateSpanInBlockByID() {
  createSpanInBlockByID('busy');
  createSpanInBlockByID('free');
}

function startCreateCloneNode() {
  createCloneNode(document.getElementById('free'));
  createCloneNode(document.getElementById('busy'));
}

function startAddChildrenTo() {
  addChildrenTo(document.getElementById('free'), 2, 'span');
}

function startReplaceElementBy() {
  var replaceMe = document.createElement('div');
  replaceMe.innerHTML = 'I want you to repalace me';
  document.getElementById('busy').appendChild(replaceMe);

  var justDiv = document.createElement('div');
  justDiv.innerHTML = 'I want to stay on my position, don\'t touch me';
  document.getElementById('busy').appendChild(justDiv);

  var replacementElem = document.createElement('li');
  replacementElem.innerHTML = 'I\'m new replacement for old element';

  replaceElementBy(replaceMe, replacementElem);
}

function startChangeColor() {
  changeColor(document.getElementById('rainbow'));  
}

// ================

function getAttributes() {
  var a = document.getElementById('w3r');

  console.log('a.href ' + a.href);
  console.log('a.hreflang ' + a.hreflang);
  console.log('a.rel ' + a.rel);
  console.log('a.target ' + a.target);
  console.log('a.type ' + a.type);
}

function paintTableByDiagonal() {
  var rows = document.getElementsByTagName('tr');
  
  for (var i = 0; i < rows.length; i++) {
    var cells = rows[i].getElementsByTagName('td');
    cells[i].style.backgroundColor = getRandomColor();
  }
}

function createSpanInBlockByID(blockID) {
  var div = document.getElementById(blockID);
  if (div.getElementsByTagName('span').length === 0) {
    var span = document.createElement('span');
    span.innerHTML = 'Sergey was here!';
    div.appendChild(span);
  }
}

function createCloneNode(block) {
  var clone = block.cloneNode(true);
  document.body.appendChild(clone);
}

function addChildrenTo(block, count, type) {
  for (var i = 0; i < count; i++) {
    var elem = document.createElement(type);
    elem.innerHTML = 'I\'m new element ';
    block.appendChild(elem);
  }
}

function replaceElementBy(blockCurrent, blockToReplace) {
  blockCurrent.parentNode.insertBefore(blockToReplace, blockCurrent.nextSibling);
  blockCurrent.remove();
  console.log('replacement is done');
}

function getRandomInt(max) {
  return Math.round(Math.random() * max);
}

function getRandomColor(colorPast) {
  var letters = '0123456789ABCDEF';
  var color = '#';
  colorPast = colorPast || '#000000';
  for (var i = 0; i < 6; i++) {
    color += letters[getRandomInt(15)];
  }
  if (color === colorPast) {
    color = getRandomColor(colorPast);
  }
  return color;
}

function changeColor(elem) {
  var str = elem.innerHTML.split('');
  var colors = [];
  var newStr = '';

  if (elem.querySelector('span')) {
  // Если внутри элемента есть вложенные SPAN то это часть кода 
  // достает текст из них и формирует новую строку букв 
    var spanCollection = elem.getElementsByTagName('span');
    str = [];
    for (var i = 0; i < spanCollection.length; i++) {
      str.push(spanCollection[i].innerHTML);
    }  
  }     
  
  for (var i = 0; i < str.length; i++) {
    colors.push(getRandomColor(colors[i - 1]));
    newStr += '<span style="color: ' + colors[i] + '">'+ str[i] +'</span>';
  }
  elem.innerHTML = newStr;  
}
