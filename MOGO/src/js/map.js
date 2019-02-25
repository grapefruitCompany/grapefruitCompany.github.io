document.addEventListener('click', function(e) {
	document.querySelector('.js-map').classList[e.target.closest('.js-map') ? 'add' : 'remove']('open');
});
