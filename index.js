/* 
this is main function for searchMovies
 */
function searchMovies() {
  $('.search-button').on('click', function () {
    const inputValue = $('.input-keyword').val();
    getMovies(inputValue);
    console.log(inputValue);
  });
}

/*
get movies using title
*/
const getMovies = function (keyword) {
  $.ajax({
    type: 'get',
    url: 'http://www.omdbapi.com/?apikey=8b02c26&s=' + keyword,
    success: successGetListMovies,
    error: (e) => console.log(e.responseText),
  });
};

/* 
when getMovies success
 */
const successGetListMovies = (res) => {
  const movies = res.Search;
  let cards = '';
  movies.forEach((m) => {
    cards += showCards(m);
  });
  $('.movie-container').html(cards);

  $('.modal-detail-button').on('click', function () {
    let imdbId = $(this).data('imdbid');
    getDetailMovies(imdbId);
  });
};

/* 
getDetailMovies using imdbId
*/
const getDetailMovies = function (imdbId) {
  $.ajax({
    type: 'get',
    url: `http://www.omdbapi.com/?apikey=8b02c26&i=${imdbId}`,
    success: successGetDetailMovies,
    error: (e) => console.log(e.responseText),
  });
};

const successGetDetailMovies = function (res) {
  // console.log(res);
  const movieDetail = showMovieDetail(res);
  $('.modal-body').html(movieDetail);
};

/* 
html tag cards
 */
function showCards(m) {
  return `<div class="col-md-4 my-3"> 
  <div class="card">
    <img src=${m.Poster} class="card-img-top" />
    <div class="card-body">
      <h5 class="card-title">${m.Title}</h5>
      <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
      <a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal"
      data-bs-target="#movieDetailModal" data-imdbid="${m.imdbID}">Show Details</a>
    </div>
  </div>
</div>`;
}

/* 
html tag movieDetail
 */
function showMovieDetail(res) {
  return `<div class="container-fluid">
            <div class="row">
              <div class="col-md-3">
                <img src="${res.Poster}" alt="test" class="img-fluid" />
              </div>
              <div class="col-md">
                <ul class="list-group">
                  <li class="list-group-item"><h4>${res.Title} (${res.Year})</h4></li>
                  <li class="list-group-item">
                    <strong>Director : </strong>${res.Director}
                  </li>
                  <li class="list-group-item">
                    <strong>Actors : </strong>${res.Actors}
                  </li>
                  <li class="list-group-item">
                    <strong>Writer : </strong>${res.Writer}
                  </li>
                  <li class="list-group-item">
                    <strong>Plot : </strong> <br />${res.Plot}
                  </li>
                </ul>
              </div>
            </div>
          </div>`;
}

// run main function
// getMovies();
searchMovies();
