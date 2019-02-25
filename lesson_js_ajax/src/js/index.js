;(function() {
  'use strict';

  let xhr = new XMLHttpRequest();

  xhr.open('GET', 'https://mate-academy.github.io/phone-catalogue-static/phones/phones.json', false);

  xhr.send();

  if (xhr.status !== 200) {
    alert(xhr.status + ': ' + xhr.statusText);
  } else {
    console.log(xhr.responseText);
  }
}{}());