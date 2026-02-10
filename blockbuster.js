'use strict';

/**
 * Blockbuster Movie System
 * Handles movie browsing, filtering, and payment
 */

// Comprehensive movie data
const movies = [
  { id: 1, title: 'Sonic the Hedgehog 2', description: 'After settling in Green Hills, Sonic is eager to prove he has what it takes to be a true hero.', price: 4.99, duration: 122, rating: 7.8, quality: '2K', genre: 'action', year: 2022, thumbnail: './assets/images/movies/movie-1.png', featured: true },
  { id: 2, title: 'Morbius', description: 'Biochemist Michael Morbius tries to cure himself of a rare blood disease, but he inadvertently infects himself with a form of vampirism.', price: 5.99, duration: 104, rating: 5.9, quality: 'HD', genre: 'action', year: 2022, thumbnail: './assets/images/movies/movie-2.png' },
  { id: 3, title: 'The Adam Project', description: 'A time-traveling pilot teams up with his younger self and his late father to come to terms with his past while saving the future.', price: 4.99, duration: 106, rating: 7.0, quality: '4K', genre: 'sci-fi', year: 2022, thumbnail: './assets/images/movies/movie-3.png' },
  { id: 4, title: 'Free Guy', description: 'A bank teller discovers he is actually a background player in an open-world video game.', price: 5.99, duration: 115, rating: 7.7, quality: '4K', genre: 'comedy', year: 2021, thumbnail: './assets/images/movies/movie-4.png', topRated: true },
  { id: 5, title: 'The Batman', description: 'When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate the city\'s hidden corruption.', price: 6.99, duration: 176, rating: 7.9, quality: '4K', genre: 'action', year: 2022, thumbnail: './assets/images/movies/movie-5.png', topRated: true },
  { id: 6, title: 'Uncharted', description: 'Street-smart Nathan Drake is recruited by seasoned treasure hunter Victor "Sully" Sullivan to recover a fortune lost by Ferdinand Magellan.', price: 5.99, duration: 116, rating: 7.0, quality: 'HD', genre: 'adventure', year: 2022, thumbnail: './assets/images/movies/movie-6.png' },
  { id: 7, title: 'Death on the Nile', description: 'Belgian sleuth Hercule Poirot\'s Egyptian vacation aboard a glamorous river steamer turns into a terrifying search for a murderer.', price: 4.99, duration: 127, rating: 6.5, quality: '2K', genre: 'thriller', year: 2022, thumbnail: './assets/images/movies/movie-7.png' },
  { id: 8, title: 'The King\'s Man', description: 'In the early years of the 20th century, the Kingsman agency is formed to stand against a cabal plotting a war to wipe out millions.', price: 5.99, duration: 131, rating: 7.0, quality: 'HD', genre: 'action', year: 2021, thumbnail: './assets/images/movies/movie-8.png' },
  { id: 9, title: 'The Northman', description: 'A young Viking prince is on a quest to avenge his father\'s murder.', price: 5.99, duration: 137, rating: 8.5, quality: 'HD', genre: 'action', year: 2022, thumbnail: './assets/images/movies/upcoming-1.png', newRelease: true },
  { id: 10, title: 'Doctor Strange in the Multiverse of Madness', description: 'Dr. Stephen Strange casts a forbidden spell that opens the doorway to the multiverse.', price: 6.99, duration: 126, rating: 7.5, quality: '4K', genre: 'sci-fi', year: 2022, thumbnail: './assets/images/movies/upcoming-2.png', newRelease: true },
  { id: 11, title: 'Memory', description: 'An assassin-for-hire finds that he\'s become a target after he refuses to complete a job for a dangerous criminal organization.', price: 4.99, duration: 99, rating: 6.2, quality: '2K', genre: 'thriller', year: 2022, thumbnail: './assets/images/movies/upcoming-3.png', newRelease: true },
  { id: 12, title: 'The Unbearable Weight of Massive Talent', description: 'In this action-packed comedy, Nicolas Cage plays Nick Cage, channeling his iconic characters as he\'s caught between a superfan and a CIA agent.', price: 5.99, duration: 107, rating: 7.3, quality: 'HD', genre: 'comedy', year: 2022, thumbnail: './assets/images/movies/upcoming-4.png', newRelease: true },
];

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  renderMovies();
  setupFilters();
  setupSearch();
  setupSorting();
  setupLoadMore();
});

// Render all movies
function renderMovies() {
  renderNewReleases();
  renderTopRated();
  renderAllMovies();
}

// Render new releases
function renderNewReleases() {
  const container = document.getElementById('newReleases');
  if (!container) return;
  
  const newReleases = movies.filter(m => m.newRelease).slice(0, 4);
  container.innerHTML = newReleases.map(movie => createMovieCard(movie)).join('');
}

// Render top rated
function renderTopRated() {
  const container = document.getElementById('topRated');
  if (!container) return;
  
  const topRated = movies.filter(m => m.topRated || m.rating >= 7.5).slice(0, 4);
  container.innerHTML = topRated.map(movie => createMovieCard(movie)).join('');
}

// Render all movies
function renderAllMovies(limit = 12) {
  const container = document.getElementById('moviesList');
  if (!container) return;
  
  const allMovies = movies.slice(0, limit);
  container.innerHTML = allMovies.map(movie => createMovieCard(movie)).join('');
  
  // Attach event listeners
  attachMovieListeners();
}

// Create movie card HTML — minimal text, basic info visible
function createMovieCard(movie) {
  const genreLabel = movie.genre.charAt(0).toUpperCase() + movie.genre.slice(1);
  return `
    <li>
      <div class="movie-card blockbuster-card" data-movie-id="${movie.id}" data-genre="${movie.genre}">
        <a href="#" class="movie-link">
          <figure class="card-banner">
            <img src="${movie.thumbnail}" alt="${movie.title}" loading="lazy">
            <div class="premium-badge">PREMIUM</div>
            <div class="price-overlay">
              <span class="movie-price">$${movie.price.toFixed(2)}</span>
            </div>
            <div class="play-overlay">
              <ion-icon name="play-circle"></ion-icon>
            </div>
          </figure>
        </a>
        <div class="card-content">
          <h3 class="card-title">${movie.title}</h3>
          <div class="card-meta">
            <span class="meta-pill rating-pill"><ion-icon name="star"></ion-icon> ${movie.rating}</span>
            <span class="meta-pill"><ion-icon name="time-outline"></ion-icon> ${movie.duration} min</span>
            <span class="meta-pill">${movie.quality}</span>
            <span class="meta-pill genre-pill">${genreLabel}</span>
          </div>
          <div class="card-description-expandable" id="desc-${movie.id}" style="display: none;">
            <p class="card-description">${movie.description}</p>
          </div>
          <div class="card-actions">
            <button class="btn-view-more" onclick="toggleDescription(${movie.id}, this); event.stopPropagation();">
              View More
            </button>
            <button class="btn btn-primary btn-watch" data-movie-id="${movie.id}">
              <ion-icon name="play"></ion-icon>
              <span>$${movie.price.toFixed(2)}</span>
            </button>
          </div>
        </div>
      </div>
    </li>
  `;
}

// Toggle movie description
function toggleDescription(movieId, btn) {
  const descEl = document.getElementById('desc-' + movieId);
  if (!descEl) return;
  
  if (descEl.style.display === 'none') {
    descEl.style.display = 'block';
    btn.textContent = 'Show Less';
    btn.classList.add('expanded');
  } else {
    descEl.style.display = 'none';
    btn.textContent = 'View More';
    btn.classList.remove('expanded');
  }
}
window.toggleDescription = toggleDescription;

// Toggle featured movie description
function toggleFeaturedDesc(btn) {
  const desc = document.getElementById('featuredDesc');
  if (!desc) return;
  if (desc.style.display === 'none') {
    desc.style.display = 'block';
    btn.textContent = 'Show Less';
    btn.classList.add('expanded');
  } else {
    desc.style.display = 'none';
    btn.textContent = 'View More';
    btn.classList.remove('expanded');
  }
}
window.toggleFeaturedDesc = toggleFeaturedDesc;

// Attach event listeners to movie cards
function attachMovieListeners() {
  const watchButtons = document.querySelectorAll('.btn-watch');
  watchButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const movieId = parseInt(btn.dataset.movieId);
      const movie = movies.find(m => m.id === movieId);
      
      if (!movie) return;
      
      // Check if user is logged in
      const user = JSON.parse(localStorage.getItem('user') || 'null');
      if (!user) {
        alert('Please sign in to purchase movies');
        window.location.href = './login.html';
        return;
      }
      
      openPaymentModal(movie.id, movie.title, movie.price, movie.thumbnail);
    });
  });
}

// Setup filters
function setupFilters() {
  const filterButtons = document.querySelectorAll('[data-filter]');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const filter = btn.dataset.filter;
      filterMovies(filter);
    });
  });
}

// Filter movies
function filterMovies(filter) {
  const allCards = document.querySelectorAll('.blockbuster-card');
  const container = document.getElementById('moviesList');
  
  if (filter === 'all') {
    allCards.forEach(card => {
      card.style.display = 'block';
    });
  } else {
    allCards.forEach(card => {
      const genre = card.dataset.genre;
      card.style.display = genre === filter ? 'block' : 'none';
    });
  }
  
  // Scroll to movies section
  if (container) {
    container.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// Setup search
function setupSearch() {
  const searchInput = document.getElementById('movieSearch');
  if (!searchInput) return;
  
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    const allCards = document.querySelectorAll('.blockbuster-card');
    
    if (query === '') {
      allCards.forEach(card => card.style.display = 'block');
      return;
    }
    
    allCards.forEach(card => {
      const movieId = parseInt(card.dataset.movieId);
      const movie = movies.find(m => m.id === movieId);
      const title = card.querySelector('.card-title').textContent.toLowerCase();
      const genre = card.dataset.genre || '';
      const desc = movie ? movie.description.toLowerCase() : '';
      
      if (title.includes(query) || genre.includes(query) || desc.includes(query)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
}

// Setup sorting
function setupSorting() {
  const sortSelect = document.getElementById('sortMovies');
  if (!sortSelect) return;
  
  sortSelect.addEventListener('change', (e) => {
    const sortBy = e.target.value;
    const container = document.getElementById('moviesList');
    if (!container) return;
    
    let sortedMovies = [...movies];
    
    switch(sortBy) {
      case 'newest':
        sortedMovies.sort((a, b) => b.year - a.year);
        break;
      case 'oldest':
        sortedMovies.sort((a, b) => a.year - b.year);
        break;
      case 'rating':
        sortedMovies.sort((a, b) => b.rating - a.rating);
        break;
      case 'price-low':
        sortedMovies.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        sortedMovies.sort((a, b) => b.price - a.price);
        break;
    }
    
    container.innerHTML = sortedMovies.map(movie => createMovieCard(movie)).join('');
    attachMovieListeners();
  });
}

// Setup load more
function setupLoadMore() {
  const loadMoreBtn = document.getElementById('loadMoreBtn');
  if (!loadMoreBtn) return;
  
  let currentLimit = 12;
  
  loadMoreBtn.addEventListener('click', () => {
    currentLimit += 8;
    renderAllMovies(currentLimit);
    
    if (currentLimit >= movies.length) {
      loadMoreBtn.style.display = 'none';
    }
  });
}

// Open payment modal
function openPaymentModal(movieId, title, price, thumbnail) {
  const paymentModal = document.getElementById('paymentModal');
  if (!paymentModal) return;
  
  document.getElementById('purchasePoster').src = thumbnail;
  document.getElementById('purchaseTitle').textContent = title;
  document.getElementById('purchasePrice').textContent = `$${price.toFixed(2)}`;
  
  paymentModal.style.display = 'flex';
}

// Make function globally available
window.openPaymentModal = openPaymentModal;

// Payment method selection
let currentPaymentMethod = 'visa';

function selectPaymentMethod(method, btn) {
  currentPaymentMethod = method;
  
  // Update active button
  document.querySelectorAll('.payment-method-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  
  // Show/hide relevant fields
  document.querySelectorAll('.payment-fields').forEach(f => f.style.display = 'none');
  const fields = document.getElementById(method + '-fields');
  if (fields) fields.style.display = 'block';
}
window.selectPaymentMethod = selectPaymentMethod;

// Close modal
const modalCloseButtons = document.querySelectorAll('[data-modal-close]');
modalCloseButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const paymentModal = document.getElementById('paymentModal');
    if (paymentModal) paymentModal.style.display = 'none';
  });
});

// Payment form submission
const paymentForm = document.getElementById('paymentForm');
if (paymentForm) {
  paymentForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const payBtn = paymentForm.querySelector('.btn-pay span');
    const originalText = payBtn.textContent;
    payBtn.textContent = 'Processing...';
    
    // Simulate payment processing delay
    setTimeout(() => {
      const methodLabels = {
        'visa': 'Visa/Card',
        'paypal': 'PayPal',
        'ecocash': 'EcoCash',
        'sa-account': 'SA Bank Account'
      };
      
      alert(`✅ Payment successful via ${methodLabels[currentPaymentMethod]}! You now have access to this movie.`);
      document.getElementById('paymentModal').style.display = 'none';
      
      // Grant access (store in localStorage for demo)
      const purchasedMovies = JSON.parse(localStorage.getItem('purchasedMovies') || '[]');
      const movieTitle = document.getElementById('purchaseTitle').textContent;
      if (!purchasedMovies.includes(movieTitle)) {
        purchasedMovies.push(movieTitle);
        localStorage.setItem('purchasedMovies', JSON.stringify(purchasedMovies));
      }
      
      payBtn.textContent = originalText;
    }, 1500);
  });
}
