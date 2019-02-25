;(function() {

  let xhr = new XMLHttpRequest(),
      ANCESTRY_FILE = {};

  xhr.open('GET', 'https://tanuhaua.github.io/datas-file-json/data.json', false);

  xhr.send();

  if (xhr.status !== 200) {
    alert(xhr.status + ': ' + xhr.statusText);
  } else {
    ANCESTRY_FILE = JSON.parse(xhr.responseText);
    console.log(ANCESTRY_FILE);
  }

  ANCESTRY_FILE.unshift({
    'Average Age of Male': getAverageAge(getMale()),
    'Average Age of feemale': getAverageAge(getFeemale()),
    'Average Age Between Mom And Sibling': getAverageAgeBetweenMomAndSibling()  
  });

  showAllData();  
  
  function getAverageAgeBetweenMomAndSibling() {
    var list = [];
    for (var i = 0; i < ANCESTRY_FILE.length; i++) {
      var person = ANCESTRY_FILE[i];
      var personMom = getPersonByName(person.mother);
      if (personMom.born > 0 && person.born > 0) {
        list.push(person.born - personMom.born);  
      }
    }
    return Math.round(sumFromArr(list) / list.length);
  }

  function getPersonByName(str) {
    var result = 0;
    for (var i = 0; i < ANCESTRY_FILE.length; i++) {
      if (ANCESTRY_FILE[i].name === str) {
        result = ANCESTRY_FILE[i];
        break;
      }
    }
    return result;
  }

  function gerAgeByName(str) {
    var result = 0;
    for (var i = 0; i < ANCESTRY_FILE.length; i++) {
      if (ANCESTRY_FILE[i].name === str) {
        result = ANCESTRY_FILE[i].died - ANCESTRY_FILE[i].born;
      }
    }
    return result;
  }

  function getAverageAge(arr) {
    var list = [];
    for (var i = 0; i < arr.length; i++) {
      var age = arr[i].died - arr[i].born;
      list.push(age);
    }
    return Math.round(sumFromArr(list) / list.length);
  }

  function sumFromArr(arr) {
    var result = 0;
    for (var i = 0; i < arr.length; i++) {
      result += arr[i];
    }
    return result;
  }

  function getMale() {
    var result = [];
    for (var i = 0; i < ANCESTRY_FILE.length; i++) {
      if (ANCESTRY_FILE[i].sex === 'm') {
        result.push(ANCESTRY_FILE[i]);
      }
    }
    return result;
  }  

  function getFeemale() {
    var result = [];
    for (var i = 0; i < ANCESTRY_FILE.length; i++) {
      if (ANCESTRY_FILE[i].sex === 'f') {
        result.push(ANCESTRY_FILE[i]);
      }
    }
    return result;
  }

  function showAllData() {
    var parentElem = document.createElement('div');
    document.body.appendChild(parentElem);
    parentElem.classList.add('family');

    for (var i = 0; i < ANCESTRY_FILE.length; i++) {
      var itemElem = document.createElement('div');
      parentElem.appendChild(itemElem);
      itemElem.classList.add('family__item');
      var obj = ANCESTRY_FILE[i];
      var arrRows = [];

      for (var key in obj) {
        arrRows.push(key + ' ' + obj[key]);
      }
      addEachRow(itemElem, arrRows);    
    }
  }

  function addEachRow(element, arr) {
    for (var i = 0; i < arr.length; i++) {
      var rowElem = document.createElement('p');
      element.appendChild(rowElem);
      rowElem.innerHTML = arr[i];
    }
  }
}()); 
