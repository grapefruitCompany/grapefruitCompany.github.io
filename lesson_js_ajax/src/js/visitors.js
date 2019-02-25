;(function() {
  'use strict';

  let table = document.createElement('table'),
      firstRow = document.createElement('tr'),
      headerNames = ['Visitor id', 'Registration date', 'Name', 'Email', 'Description'];
  const isSorted = {
    'Visitor id': false,
    'Registration date': false,
    'Name': false,
    'Email': false,
    'Description': false,
    setAllFalse() {
      for (let key in this) {
        if (key === 'setAllFalse') break;
        this[key] = false;
      }
      
    }
  }

  document.body.appendChild(table);
  table.appendChild(firstRow);
  
  headerNames.forEach(function(item) {
    let headerCell = document.createElement('th');
    headerCell.innerHTML = item;
    firstRow.appendChild(headerCell);
  });

  let xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://tanuhaua.github.io/datas-file-json/visitors.json', true);
  xhr.send();
  xhr.onreadystatechange = function() {
    if (xhr.readyState != 4) return;

    if (xhr.status !== 200) {
      alert(xhr.status + ': ' + xhr.statusText);
    } else {
      let VISITORS = JSON.parse(xhr.responseText, function(key, value) {
        if (key === 'createdAt') return new Date(value);
        return value;
      });

      isSorted['Visitor id'] = true;
      VISITORS.sort(compareNumeric);
      for (let i = 0; i < VISITORS.length; i++) {
        setRow(VISITORS[i], i + 1, table);  
      }
      
      for (let i = 0; i < table.rows[0].cells.length; i++) {
        table.rows[0].cells[i].addEventListener('click', function (e) {
          if (this.innerHTML === 'Visitor id' && !isSorted[this.innerHTML]) {
            isSorted.setAllFalse();
            isSorted[this.innerHTML] = true;
            VISITORS.sort(compareNumeric);
            destroyAllRows();
            for (let i = 0; i < VISITORS.length; i++) {
              setRow(VISITORS[i], i + 1, table);  
            }
          } else if (this.innerHTML === 'Registration date' && !isSorted[this.innerHTML]) {
            isSorted.setAllFalse();
            isSorted[this.innerHTML] = true;
            VISITORS.sort(compareDates);
            destroyAllRows();
            for (let i = 0; i < VISITORS.length; i++) {
              setRow(VISITORS[i], i + 1, table);  
            }
          } else if (this.innerHTML !== 'Visitor id' && this.innerHTML !== 'Registration date' && !isSorted[this.innerHTML]) {
            isSorted.setAllFalse();
            isSorted[this.innerHTML] = true;
            VISITORS.sort(compare(this.innerHTML));
            destroyAllRows();
            for (let i = 0; i < VISITORS.length; i++) {
              setRow(VISITORS[i], i + 1, table);  
            }
           } else if (isSorted[this.innerHTML]) {
            VISITORS.reverse();
            destroyAllRows();
            for (let i = 0; i < VISITORS.length; i++) {
              setRow(VISITORS[i], i + 1, table);  
            }
           }
        });
      }

    }    
  }

  function destroyAllRows() {
    for (let i = 1; i < table.rows.length;) {
      table.removeChild(table.childNodes[i]);
    }
  }

  function setRow(obj, index, table) {
    let currentRow = document.createElement('tr'),
        {id, createdAt, name, email, description} = obj,
        rowContent = [id, createdAt, name, email, description];
    table.appendChild(currentRow);
    for (let i = 0; i < rowContent.length; i++) {
      let currentCell = document.createElement('td');
      currentRow.appendChild(currentCell);
      currentCell.innerHTML = rowContent[i];  
    }
  }

  function compareNumeric(a, b) {
    let num1 = parseInt(a.id),
        num2 = parseInt(b.id);
    if (num1 > num2) return 1;
    if (num1 < num2) return -1;
  }

  function compareDates(a, b) {
    let date1 = new Date(a.createdAt),
        date2 = new Date(b.createdAt);
    if (date1 > date2) return 1;
    if (date1 < date2) return -1;
  }

  function compare(key) {
    key = key.toLowerCase();
    return (function (a,b) {
      let str1 = a[key],
          str2 = b[key];
      if (str1 > str2) return 1;
      if (str1 < str2) return -1;
    });
  }

}());

