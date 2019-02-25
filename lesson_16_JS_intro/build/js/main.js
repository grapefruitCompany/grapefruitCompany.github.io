var str = 'Life gets Sometimes pretty !Hard';
console.log(capitalsFirst(str));

function capitalsFirst(str){
  var arr = str.split(' ');
  var alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];  
  var alphabetLow = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  var capitalWords;
  
  function cleaningArray(arr) {
    for (var i = 0; i < arr.length; i++) {
      var isInAlphabet = false;
      var symbol = arr[i][0];
      for (var j = 0; j < alphabet.length; j++) {
        if ((symbol === alphabet[j]) || (symbol === alphabetLow[j])) {
          isInAlphabet = true;
          break;
        }
      }
  
      if (isInAlphabet === false) {
        arr.splice(i, 1);
        i--;
      }
    }
  
    return arr;
  }
  
  function searchWords(arr) {
    var result = [];
    for (var i = 0; i < arr.length; i++) {
      var symbol = arr[i][0];
      for (var j = 0; j < alphabet.length; j++) {
        if (alphabet[j] === symbol) {
          result.push(arr[i]);
          arr.splice(i, 1);
          i--;
        }
      } 
    }
  return result;
  }
  
  arr = cleaningArray(arr);
  capitalWords = searchWords(arr);
  var result = capitalWords.concat(arr);
  return result.join(' ');
}




//

var btnAlerts = document.querySelector('.btn--alerts');

function menuAlerts() {
  var moneyAmount = prompt('Скільки у вас є грошей?', '');

  if (moneyAmount >= 100) {
    confirm('Ви можете купити БігМакМеню. Бажаєте?') ? alert ('Ви замовили "БігМакМеню" ') : alert ('Ви нічого не замовили');
  } else if (moneyAmount >= 50) {
    confirm('Ви можете купити Чізбургер і картоплю. Бажаєте?') ? alert ('Ви замовили "Чізбургер і картоплю"') : alert ('Ви нічого не замовили');
  } else if (moneyAmount >= 20) { 
    confirm('Ви можете купити колу. Бажаєте?') ? alert ('Ви замовили "Колу"') : alert ('Ви нічого не замовили');
  } else {
    confirm('Пробачте, в нашому закладі немає страв для вас :(' );  
  }  
}

btnAlerts.addEventListener('click', menuAlerts);

var btnConsole = document.querySelector('.btn--console');

function menuConsole() {
  var moneyAmount = prompt('Скільки у вас є грошей?', '');

  if (moneyAmount >= 100) {
    confirm('Ви можете купити БігМакМеню. Бажаєте?') ? console.log('Ви замовили "БігМакМеню" ') : console.log('Ви нічого не замовили');
  } else if (moneyAmount >= 50) {
    confirm('Ви можете купити Чізбургер і картоплю. Бажаєте?') ? console.log('Ви замовили "Чізбургер і картоплю"') : console.log('Ви нічого не замовили');
  } else if (moneyAmount >= 20) { 
    confirm('Ви можете купити колу. Бажаєте?') ? console.log('Ви замовили "Колу" ') : console.log('Ви нічого не замовили');
  } else {
    console.log('Пробачте, в нашому закладі немає страв для вас :(' );  
  }  
}

btnConsole.addEventListener('click', menuConsole);

var btnMaria = document.querySelector('.btn--maria');

function mariaMood() {
  var isPresentAngela = confirm('Чи прийшов(ла) Анжела?');
  var isPresentStepan = confirm('Чи прийшов(ла) Степан?');
  var isPresentNicholas = confirm('Чи прийшов(ла) Микола?');

  if (isPresentStepan && !isPresentAngela && isPresentNicholas) {
    alert('хлопці будуть спілкуватись з Сашою, а Маша зможе спокійно піти дивитись Новорічний вогник - Маша була рада');
  } else if (!isPresentStepan && isPresentAngela && !isPresentNicholas) {
    alert('Маша з Анжелою подруги - Маша була рада');
  } else if ((!isPresentStepan && isPresentAngela && isPresentNicholas) || (isPresentStepan && isPresentAngela && !isPresentNicholas)) {
    alert('хлопець переключиться на Анжелу і Маша буде рада');
  } else {
    alert('Маша була засмучена');
  }
}

btnMaria.addEventListener('click', mariaMood);

var btnSale = document.querySelector('.btn--sale');

function shopSale() {
  var timeStartSale = +prompt('Час дії знижки. Від:', '9');
  var timeEndSale = +prompt('Час дії знижки. До:', '18');
  var timeNow = +prompt('Теперішній час', '');

  if ((24 < timeStartSale || timeStartSale < 0) || (24 < timeEndSale || timeEndSale < 0) || (24 < timeNow || timeNow < 0)) {
    console.log('Кожне значення має бути від 0 до 24');
  } else if (timeStartSale === timeEndSale) {
    console.log('Час початку та кінця знижки не може дорівнювати одне одному');
  } else if ((timeStartSale < timeEndSale) && (timeStartSale <= timeNow) && (timeNow <= timeEndSale)) {
    console.log('Ви встигаєте на розпродаж!');
  } else if ((timeStartSale > timeEndSale) && ((timeStartSale <= timeNow) || (timeNow <= timeEndSale)) ) {
    console.log('Ви встигаєте на розпродаж!');
  } else {
    console.log('Ви НЕ встигаєте на розпродаж!');
  }
}

btnSale.addEventListener('click', shopSale);