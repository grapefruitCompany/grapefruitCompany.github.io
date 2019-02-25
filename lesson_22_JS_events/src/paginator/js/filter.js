;(function () {
  var filterInput = document.querySelector('.filter__input'),
      table = document.getElementsByTagName('table')[0],
      pagerInfo = document.querySelectorAll('.pager__info')[0],
      countRows = 0;

  filterInput.addEventListener('keyup', function(e){
    countRows = 0;
    var filterValue = this.value.toLowerCase();
    for (var i = 1; i < table.rows.length; i++) {
      table.rows[i].className = '';
      if (table.rows[i].cells[2].innerHTML.toLowerCase().indexOf(filterValue) == -1) {
        table.rows[i].className = 'js-hide';
        countRows++;
      }
    }
    pagerInfo.innerHTML = 'Show ' + (table.rows.length - countRows - 1) + ' from ' + (table.rows.length - 1) +' rows';  
  });
}());

