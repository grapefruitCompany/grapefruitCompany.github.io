;(function () {
  var btn = document.querySelectorAll('.slider__btn'), 
    slides = document.querySelector('.slider__slides'),
    btnQuantity = btn.length;

  for(var i = 0; i < btnQuantity; i++) {
    var some = (function(x) {
      btn[x].addEventListener('click', function () {
        clear();
        var classSlide = 'js__slide--' + x;
        slides.classList.add(classSlide);
        this.classList.add('js__btn--checked');   
      });  
    })(i);
  }

  function clear() {
    var classNames = [];
    for (var i = 0; i < btnQuantity; i++) {
      btn[i].classList.remove('js__btn--checked');
      slides.classList.remove('js__slide--' + i);
    }
  }
})();
