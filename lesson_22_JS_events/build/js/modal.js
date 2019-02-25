;(function (){
  var modalShow = document.getElementById('modalShow'),
      modalClose = document.getElementById('modalClose'),
      modalWindow = document.getElementById('modalWindow'),
      modalContent = document.getElementById('modalContent');

  modalShow.addEventListener('click', function (){
    modalWindow.classList.add('js__modal--show');
    modalContent.classList.add('js__modal__content--show');
  });

  modalClose.addEventListener('click', function (){
    modalWindow.classList.remove('js__modal--show');
    modalContent.classList.remove('js__modal__content--show');
  });

  modalWindow.addEventListener('click', function (){
    modalWindow.classList.remove('js__modal--show');
    modalContent.classList.remove('js__modal__content--show');
  });

}());