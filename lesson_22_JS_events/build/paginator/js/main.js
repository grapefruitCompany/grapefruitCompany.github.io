
;(function () {

  var table = document.getElementsByTagName('table')[0],
      rows = table.getElementsByTagName('tr'),
      inputRowsOnPage = document.querySelectorAll('.show__input')[0],
      controls = document.querySelectorAll('.pager__controls')[0],
      btnNext = controls.querySelectorAll('.pager__next')[0],
      btnPrev = controls.querySelectorAll('.pager__prev')[0],
      controlsList = controls.getElementsByTagName('ul')[0],
      pagerInfo = document.querySelectorAll('.pager__info')[0],
      counter = document.getElementById('medals-table'),
      currentIndex = 1, //всегда номер первой строки
      currentPage = 1,
      rowsOnPage = rows.length - 1,
      quantityOfPages = Math.round((rows.length - 1) / rowsOnPage);


  showPagesNumbers(currentIndex, quantityOfPages);

  controls.addEventListener('click', function(e) {
    e.preventDefault();
    var innerContent = e.target.innerHTML.toLowerCase();

    // Далее мы осуществляем пропверку на то, 
    // какой элемент был нажат на Controls 
    // В зависимости от этого меняем значение currentIndex
    // и запускаем функцию showCurrentPage 
    if (innerContent.indexOf('next') > 0) {
      //проверяем, что бы при переключении на следующую страницу
      //верхняястрока была меньеше количества строк в таблице
      //тоесть чтобы не переключаться на не существующую страницу
      if ((currentIndex + rowsOnPage) < rows.length) {
        currentIndex = currentIndex + rowsOnPage;
        currentPage++;  
      } 
      showCurrentPage(currentIndex, currentPage);
    } else if (innerContent.indexOf('prev') > 0) {
      //проверяем, что бы при переключении на предыдущую страницу
      //верхняястрока была больше 0
      //тоесть чтобы не переключаться на не существующую страницу
      if ((currentIndex - rowsOnPage) > 0) {
        currentIndex = currentIndex - rowsOnPage;
        currentPage--;  
      } 
      showCurrentPage(currentIndex, currentPage);
    } else if (parseInt(innerContent)) {
      //если же клик был по одному из номеров,
      //то берем это значение как Текущая страница и
      //расчитываем index верхней строки на новоц странице
      //если же нажать на троеточие, то мы не получим цифру
      //и код выполнен не будет
      currentPage = parseInt(innerContent);
      currentIndex = (currentPage - 1) * rowsOnPage + 1;
      showCurrentPage(currentIndex, currentPage);
    }
  });

  inputRowsOnPage.addEventListener('keyup', function () {
    launchOfInputRowsOnPage(this.value);
  });

  inputRowsOnPage.addEventListener('change', function () {
    launchOfInputRowsOnPage(this.value);
  });

  function launchOfInputRowsOnPage(value) {
    //эта функция запускается при изменении значения в инпуте
    //через нажатия клавиши на клавиатуре (включая пробел и backspace)
    //и при изменении значения другим путем (кликом мыши по стрелкам)
    rowsOnPage = Number(value) || (rows.length - 1);
    currentIndex = 1;
    quantityOfPages = Math.round((rows.length - 1) / rowsOnPage);
    currentPage = 1;
    showCurrentPage(currentIndex, currentPage);
  }

  function hideAll() {
    //спратать все строки
    for (var i = 1; i < rows.length; i++) {
      rows[i].classList.add('js-hide');
    }
  }

  function showCurrentPage(currentIndex, currentPage) {
    checkNextPrevBtn();//Функция меняет отображение кнопок Prev & Next
    showPagesNumbers(currentIndex, quantityOfPages, currentPage);//Функция показывает переключатели страниц
    hideAll();//прячем все строки
    var length = (currentIndex + rowsOnPage) > rows.length ? rows.length : currentIndex + rowsOnPage;
    for (var i = currentIndex; i < length; i++) {
      //показываем строки которые идут после CurrentIndex
      rows[i].classList.remove('js-hide');
    }      
    //порядковый номер каждой строки задается через CSS свойство
    counter.style.counterReset = 'overall-position ' + (currentIndex - 1);
  }

  function showPagesNumbers(currentIndex, quantityOfPages, currentPage) {
    //убираем абсолютно все номера страниц
    while (controlsList.hasChildNodes()) {
      controlsList.removeChild(controlsList.firstChild);
    }
    //проходимся по циклу и создаем номера страниц
    for (var i = 1; i <= quantityOfPages; i++) {
      var controlsItem = document.createElement('li'),
          controlsLink = document.createElement('a');
      controlsItem.className = 'pager__list-item';
      controlsLink.className = 'pager__page';
      switch (true) {
        case (i === currentPage):
          //Номер текущей страницы имеет свой класс
          //мы его добавляем и вставляем номер в контролер
          controlsLink.classList.add('pager__page--current');
          controlsLink.setAttribute('href', '');
          controlsLink.innerHTML = i;
          controlsItem.appendChild(controlsLink);
          break;
        case (i === 1):
          //Номер первой страницы всегда отображается
          controlsLink.setAttribute('href', '');
          controlsLink.innerHTML = i;
          controlsItem.appendChild(controlsLink);
          break;
        case (i === quantityOfPages):
          //Номер последней страницы всегда отображается
          controlsLink.setAttribute('href', '');
          controlsLink.innerHTML = i;
          controlsItem.appendChild(controlsLink);
          break;
        case (Math.abs(i - currentPage) === 2):
          //Если от Текущей старницы номер на 2 больше, 
          //то отображается троеточие
          controlsItem.innerHTML = '...';
          break;
        case (Math.abs(i - currentPage) > 2):
          //А если больше чем 2 то display none
          controlsItem.classList.add('js-hide');
          break;
        default:
          //а здесь задаем ближайших соседей текущей страницы 
          controlsLink.setAttribute('href', '');
          controlsLink.innerHTML = i;
          controlsItem.appendChild(controlsLink);
      }
      controlsList.appendChild(controlsItem);
    }
    //при пересивоке номеров страниц обновлением PagerInfo
    var showToPage = (currentIndex + rowsOnPage) > (rows.length) ? (rows.length - 1) : (currentIndex + rowsOnPage - 1); 
    pagerInfo.innerHTML = 'Show ' + currentIndex + ' to ' + showToPage + ' of ' + (rows.length - 1) +' rows';
  }

  function checkNextPrevBtn() {
    //Если при нажатии на Следующую или предыдущую страницу
    //будет выход из диапазона количества строк, то убираем
    //атрибут href - делаем ссылку не активной
    if ((currentIndex + rowsOnPage) >= rows.length) {
      btnNext.removeAttribute('href', '');
    } else {
      btnNext.setAttribute('href', '');
    }

    if (currentIndex > rowsOnPage) {
      btnPrev.setAttribute('href', '');
    } else {
      btnPrev.removeAttribute('href', '');
    }
  }
}());