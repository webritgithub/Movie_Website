document.addEventListener('DOMContentLoaded', () => {
    let moviesData = [];
    let seriesData = [];
    let kidsData = [];
    let currentData = 'movies';

    fetch('mov.json')
        .then(response => response.json())
        .then(data => {
            moviesData = data;
            if (currentData === 'movies') {
                displayMovies(data);
            }
        })
        .catch(error => console.error('Error fetching movie data:', error));

    fetch('series.json')
        .then(response => response.json())
        .then(data => {
            seriesData = data;
        })
        .catch(error => console.error('Error fetching series data:', error));

    fetch('kids.json')
        .then(response => response.json())
        .then(data => {
            kidsData = data;
        })
        .catch(error => console.error('Error fetching kids data:', error));

    function displayMovies(data) {
        const cardsContainer = document.querySelector('.cards');
        cardsContainer.innerHTML = ''; // Clear previous cards
        data.forEach(item => {
            const card = document.createElement('div');
            card.classList.add('card');

            const poster = document.createElement('div');
            poster.classList.add('poster');
            poster.style.backgroundImage = `url(${item.image})`;
            poster.dataset.video = item.video; // Assuming your data contains video URLs

            const title = document.createElement('h5');
            title.textContent = item.title;

            card.appendChild(poster);
            card.appendChild(title);
            cardsContainer.appendChild(card);

            // Add click event to play video
            card.addEventListener('click', () => {
                const backgroundVideo = document.getElementById('background-video');
                backgroundVideo.src = poster.dataset.video;
                backgroundVideo.play();
            });
        });
    }

    const searchText = document.getElementById('search-text');
    const searchButton = document.getElementById('search-button');
    const seriesLink = document.getElementById('series-link');
    const moviesLink = document.getElementById('movies-link');
    const kidsLink = document.getElementById('kids-link');
    const homeLink = document.getElementById('home-link');
    const backgroundVideo = document.getElementById('background-video');

    searchText.addEventListener('input', () => {
        const query = searchText.value.toLowerCase();
        const filteredData = (currentData === 'movies' ? moviesData : currentData === 'series' ? seriesData : kidsData).filter(item => item.title.toLowerCase().startsWith(query));
        displayMovies(filteredData);
    });

    searchButton.addEventListener('click', () => {
        const query = searchText.value.toLowerCase();
        const filteredData = (currentData === 'movies' ? moviesData : currentData === 'series' ? seriesData : kidsData).filter(item => item.title.toLowerCase() === query);
        displayMovies(filteredData);
    });

    seriesLink.addEventListener('click', () => {
        currentData = 'series';
        displayMovies(seriesData);
        document.getElementById('section-title').textContent = 'Popular Series';
    });

    homeLink.addEventListener('click', () => {
        window.location.reload();
    });

    moviesLink.addEventListener('click', () => {
        currentData = 'movies';
        displayMovies(moviesData);
        document.getElementById('section-title').textContent = 'Popular Movies';
    });

    kidsLink.addEventListener('click', () => {
        currentData = 'kids';
        displayMovies(kidsData);
        document.getElementById('section-title').textContent = 'Popular Kids Movies';
    });

    document.addEventListener("DOMContentLoaded", function () {
        const leftArrow = document.querySelector(".bi-chevron-left");
        const rightArrow = document.querySelector(".bi-chevron-right");

        // Function to handle sliding to the left
        leftArrow.addEventListener("click", function () {
            document.querySelector('.cards').scrollLeft -= 300; // Adjust scroll distance as needed
        });

        // Function to handle sliding to the right
        rightArrow.addEventListener("click", function () {
            document.querySelector('.cards').scrollLeft += 300; // Adjust scroll distance as needed
        });
    });
});
