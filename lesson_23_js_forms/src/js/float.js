;(function() {
  var input = document.querySelectorAll('.js__float-input'),
      lbl = document.querySelectorAll('.js__float-lbl');

  input.forEach(function(item, i) {
    item.addEventListener('focus', function() {
      lbl[i].classList.add('js__float-lbl--up');
    });

    item.addEventListener('blur', function(e) {
      if (e.target.value.length === 0) {
        lbl[i].classList.remove('js__float-lbl--up');
      }
    });    
  });
  
}());