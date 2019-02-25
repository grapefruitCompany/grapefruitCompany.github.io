;(function () {
  var button = document.getElementById('menuOpen');
  var menu = document.getElementById('menu');
  var menuClose = document.getElementById('menuClose');


  button.addEventListener('click', function (){
    this.classList.remove('js__aside--show');
    menu.classList.remove('js__menu--hide');

    this.classList.add('js__aside--hide');
    menu.classList.add('js__menu--show');
  });

  menuClose.addEventListener('click', function (){
    menu.classList.remove('js__menu--show');
    button.classList.remove('js__aside--hide');

    menu.classList.add('js__menu--hide');
    button.classList.add('js__aside--show');
  });

}());