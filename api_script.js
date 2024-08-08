const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query=';

const main = document.getElementById('main');
const searchText = document.getElementById('search-text');
const searchButton = document.getElementById('search-button');

// Fetch initial movies
getMovies(API_URL);

// Function to fetch movies from a given URL
async function getMovies(url) {
    const res = await fetch(url);
    const data = await res.json();
    showMovies(data.results);
}

// Function to display movies
function showMovies(movies) {
    main.innerHTML = '';
    movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview } = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>
        `;
        main.appendChild(movieEl);
    });
}

// Function to get rating class
function getClassByRate(vote) {
    if (vote >= 8) {
        return 'green';
    } else if (vote >= 5) {
        return 'orange';
    } else {
        return 'red';
    }
}

// Search functionality
searchButton.addEventListener('click', () => {
    const query = searchText.value;
    if (query) {
        getMovies(SEARCH_API + encodeURIComponent(query));
    } else {
        getMovies(API_URL); // If search query is empty, show popular movies
    }
});

// Optional: Implement search on Enter key press
searchText.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchButton.click();
    }
});
