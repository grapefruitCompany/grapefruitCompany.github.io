;(function (){
  var tabberButtons = document.querySelectorAll('.tabber__btn'),
      tabberItems = document.querySelectorAll('.tabber__item');
  
  console.log(tabberItems);

  for(var i = 0; i < tabberButtons.length; i++) {

    var shooter = (function(i) {
      tabberButtons[i].addEventListener('click', function (){
        clear(tabberButtons, 'js__tabber__btn--current');
        clear(tabberItems, 'js__tabber__item--current');

        console.log(tabberItems[i]);
        this.classList.add('js__tabber__btn--current');
        tabberItems[i].classList.add('js__tabber__item--current');
      });        
    })(i);

  }

  

  function clear(nodeArr, className) {
    for (var i = 0; i < nodeArr.length; i++) {
      nodeArr[i].classList.remove(className);
    }
  };
}());