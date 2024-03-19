// create the initial connection links to the movie database
// Please ensre that you use your own API Key to test this app
const APILINK = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=f52fc526138371fc321eaacd5fa7f198&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCHAPI = 'https://api.themoviedb.org/3/search/movie?api_key=f52fc526138371fc321eaacd5fa7f198&query=';

const main = document.getElementById("section");
const form = document.getElementById("form");
const input = document.getElementById("query");

returnMovies(APILINK);

function returnMovies(url) {
  fetch(url).then(response => response.json())
    .then(function(data) {
      //console.log(data.results);
      data.results.map(item => {
        //console.log(item);
        createDivCard(item);
      })

    });
}

function createDivCard(data) {
  const div_row = document.createElement('div');
  div_row.setAttribute('class', 'row');

  const div_column = document.createElement('div');
  div_column.setAttribute('class', 'column');

  const div_card = document.createElement('div');
  div_card.setAttribute('class', 'card');

  const image = document.createElement('img');
  image.setAttribute('class', 'thumbnail');
  image.setAttribute('id', 'image');

  const title = document.createElement('h3');
  title.setAttribute('id', 'title');

  const center = document.createElement('center');


  title.innerHTML = `${data.title}`;
  image.src = IMG_PATH + data.poster_path;

  center.appendChild(image);
  div_card.appendChild(center);
  div_card.appendChild(title);
  div_column.appendChild(div_card);
  div_row.appendChild(div_column);

  main.appendChild(div_row);
}

//add an event listed to get the user search and display in the content
form.addEventListener("submit", (e) => {
  e.preventDefault();
  main.innerHTML = '';

  const searchItem = input.value;

  if (searchItem) {
    returnMovies(SEARCHAPI + searchItem);
    input.value = '';
  }
});
// 