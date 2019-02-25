;(function () {
  var buttons = document.querySelectorAll('[href^="#"]');

  buttons.forEach( function callback(currentValue) {
    currentValue.addEventListener('click', function(e) {
      e.preventDefault();
      var link = this.getAttribute('href').match(/\w+/),
          targetDistance = document.getElementById(link).getBoundingClientRect().top,
          fps = 60,
          step = targetDistance / fps,
          counter = 0,
          animation = setInterval(move, 5);

      function move() {
        if (counter === fps) {
          clearInterval(animation);
        } else {
          counter++;
          window.scrollBy(0, step);
        }
      }
    });
  });

}());