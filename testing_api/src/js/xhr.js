let parrentDiv = document.createElement('div');
parrentDiv.classList.add('movies');
parrentDiv.id = 'list';
document.body.appendChild(parrentDiv);

getMoviesList('spider man', 1, 1);

function getMoviesList(search, pageNumber) {
  search.replace(' ', '%20');
  let xhr = new XMLHttpRequest();
  xhr.open('GET', `http://www.omdbapi.com/?apikey=7da5f9a4&s=${search}&page=${pageNumber}`, true);
  xhr.send();
  xhr.onreadystatechange = function() {
    if (this.readyState != 4) return;
    if (this.status != 200) {
      console.log('Error: ' + (this.status ? this.statusText : 'request is failed'));
    }
    let {Search, totalResults} = JSON.parse(this.responseText);
    Search.forEach(function(item) {
      addItem(item, 'list')
    });
    if (pageNumber < Math.ceil(totalResults/10)) {
      getMoviesList(search, ++pageNumber);
    }
  }  
};

function addItem(item, id) {
  let {Title, Year, Type, Poster} = item;
  let mainDiv = document.getElementById(id),
      parrentDiv = document.createElement('div'),
      imgPoster = document.createElement('img'),
      title = document.createElement('h2'),
      itemType = document.createElement('h3');
  
  let xhr = new XMLHttpRequest();
  xhr.open('GET', Poster, true);
  xhr.send();
  xhr.onreadystatechange = function() {
    if (this.readyState != 4) return;

    if (this.status === 200) {
      mainDiv.appendChild(parrentDiv);
      parrentDiv.classList.add('movies__item');
      parrentDiv.appendChild(title);
      parrentDiv.appendChild(itemType);
      title.innerHTML = Title;
      itemType.innerHTML = Type;
      parrentDiv.appendChild(imgPoster);
      imgPoster.setAttribute('src', Poster);
      imgPoster.setAttribute('alt', Title);
    }
  }
}