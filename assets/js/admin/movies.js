'use strict';

/**
 * Admin Movies Management
 */

// Sample movie data
const movies = [
  { id: 1, title: 'Inception', year: 2010, genre: 'Sci-Fi', price: 4.99, views: 45200, revenue: 12450, rating: 4.8, status: 'featured', quality: '4K', duration: 148 },
  { id: 2, title: 'The Matrix', year: 1999, genre: 'Sci-Fi', price: 3.99, views: 38100, revenue: 9820, rating: 4.7, status: 'active', quality: '1080p', duration: 136 },
  { id: 3, title: 'Avatar 2', year: 2022, genre: 'Action', price: 5.99, views: 32500, revenue: 15200, rating: 4.6, status: 'featured', quality: '4K', duration: 192 },
  { id: 4, title: 'Dune', year: 2021, genre: 'Sci-Fi', price: 4.99, views: 28300, revenue: 8340, rating: 4.5, status: 'active', quality: '4K', duration: 155 },
  { id: 5, title: 'Interstellar', year: 2014, genre: 'Sci-Fi', price: 3.99, views: 25100, revenue: 7890, rating: 4.9, status: 'active', quality: '4K', duration: 169 },
  { id: 6, title: 'The Dark Knight', year: 2008, genre: 'Action', price: 3.99, views: 42300, revenue: 11200, rating: 4.9, status: 'active', quality: '1080p', duration: 152 },
  { id: 7, title: 'Oppenheimer', year: 2023, genre: 'Drama', price: 5.99, views: 21000, revenue: 9500, rating: 4.7, status: 'featured', quality: '4K', duration: 180 },
  { id: 8, title: 'Barbie', year: 2023, genre: 'Comedy', price: 4.99, views: 35600, revenue: 13200, rating: 4.3, status: 'active', quality: '4K', duration: 114 },
  { id: 9, title: 'Spider-Man: No Way Home', year: 2021, genre: 'Action', price: 4.99, views: 52000, revenue: 18900, rating: 4.6, status: 'active', quality: '4K', duration: 148 },
  { id: 10, title: 'Top Gun: Maverick', year: 2022, genre: 'Action', price: 4.99, views: 48000, revenue: 16500, rating: 4.8, status: 'active', quality: '4K', duration: 130 }
];

let currentMovieId = null;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  initSidebar();
  loadMovies();
  setupEventListeners();
});

// Sidebar Toggle
function initSidebar() {
  const sidebar = document.getElementById('adminSidebar');
  const toggle = document.getElementById('sidebarToggle');
  
  if (toggle && sidebar) {
    toggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      
      let overlay = document.querySelector('.sidebar-overlay');
      if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'sidebar-overlay';
        document.body.appendChild(overlay);
        overlay.addEventListener('click', () => {
          sidebar.classList.remove('open');
          overlay.classList.remove('active');
        });
      }
      overlay.classList.toggle('active');
    });
  }
}

// Admin Logout
function adminLogout() {
  localStorage.removeItem('user');
  localStorage.removeItem('isAdmin');
  window.location.href = './index.html';
}
window.adminLogout = adminLogout;

// Load Movies
function loadMovies() {
  const container = document.getElementById('moviesTableBody');
  if (!container) return;
  
  container.innerHTML = movies.map(movie => `
    <tr data-id="${movie.id}">
      <td>
        <label class="checkbox-label">
          <input type="checkbox" class="movie-checkbox" value="${movie.id}">
          <span class="checkmark"></span>
        </label>
      </td>
      <td>
        <div class="table-movie">
          <div class="table-movie-poster">
            <ion-icon name="film"></ion-icon>
          </div>
          <div>
            <span class="table-user-name">${movie.title}</span>
            <span class="table-user-email">${movie.year} • ${movie.duration} min • ${movie.quality}</span>
          </div>
        </div>
      </td>
      <td><span class="genre-badge">${movie.genre}</span></td>
      <td>$${movie.price.toFixed(2)}</td>
      <td>${formatNumber(movie.views)}</td>
      <td>$${formatNumber(movie.revenue)}</td>
      <td>
        <div class="table-rating">
          <ion-icon name="star"></ion-icon>
          <span>${movie.rating}</span>
        </div>
      </td>
      <td><span class="status-badge ${movie.status}">${movie.status}</span></td>
      <td>
        <div class="table-actions">
          <button class="table-action-btn" onclick="editMovie(${movie.id})" title="Edit">
            <ion-icon name="create-outline"></ion-icon>
          </button>
          <button class="table-action-btn" onclick="viewMovie(${movie.id})" title="View">
            <ion-icon name="eye-outline"></ion-icon>
          </button>
          <button class="table-action-btn danger" onclick="deleteMovie(${movie.id})" title="Delete">
            <ion-icon name="trash-outline"></ion-icon>
          </button>
        </div>
      </td>
    </tr>
  `).join('');
}

// Format number
function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

// Setup Event Listeners
function setupEventListeners() {
  // File upload areas
  const thumbnailUpload = document.getElementById('thumbnailUpload');
  const videoUpload = document.getElementById('videoUpload');
  const thumbnailInput = document.getElementById('movieThumbnail');
  const videoInput = document.getElementById('movieVideo');
  
  if (thumbnailUpload && thumbnailInput) {
    thumbnailUpload.addEventListener('click', () => thumbnailInput.click());
    thumbnailInput.addEventListener('change', (e) => {
      if (e.target.files.length) {
        thumbnailUpload.innerHTML = `
          <ion-icon name="checkmark-circle"></ion-icon>
          <p>${e.target.files[0].name}</p>
        `;
      }
    });
  }
  
  if (videoUpload && videoInput) {
    videoUpload.addEventListener('click', () => videoInput.click());
    videoInput.addEventListener('change', (e) => {
      if (e.target.files.length) {
        videoUpload.innerHTML = `
          <ion-icon name="checkmark-circle"></ion-icon>
          <p>${e.target.files[0].name}</p>
        `;
      }
    });
  }
  
  // Movie form submission
  const movieForm = document.getElementById('movieForm');
  if (movieForm) {
    movieForm.addEventListener('submit', (e) => {
      e.preventDefault();
      saveMovie();
    });
  }
  
  // Search
  const searchInput = document.getElementById('movieSearch');
  if (searchInput) {
    searchInput.addEventListener('input', filterMovies);
  }
  
  // Filters
  const genreFilter = document.getElementById('genreFilter');
  const statusFilter = document.getElementById('statusFilter');
  const sortFilter = document.getElementById('sortFilter');
  
  if (genreFilter) genreFilter.addEventListener('change', filterMovies);
  if (statusFilter) statusFilter.addEventListener('change', filterMovies);
  if (sortFilter) sortFilter.addEventListener('change', filterMovies);
  
  // Select all checkbox
  const selectAll = document.getElementById('selectAll');
  if (selectAll) {
    selectAll.addEventListener('change', (e) => {
      const checkboxes = document.querySelectorAll('.movie-checkbox');
      checkboxes.forEach(cb => cb.checked = e.target.checked);
    });
  }
}

// Show Add Movie Modal
function showAddMovieModal() {
  currentMovieId = null;
  document.getElementById('movieModalTitle').textContent = 'Add New Movie';
  document.getElementById('movieForm').reset();
  document.getElementById('movieModal').style.display = 'flex';
  
  // Reset upload areas
  document.getElementById('thumbnailUpload').innerHTML = `
    <ion-icon name="image-outline"></ion-icon>
    <p>Drag and drop or <span>browse</span></p>
    <p class="form-hint">Recommended: 1280x720 (16:9)</p>
  `;
  document.getElementById('videoUpload').innerHTML = `
    <ion-icon name="videocam-outline"></ion-icon>
    <p>Drag and drop or <span>browse</span></p>
    <p class="form-hint">Supported: MP4, MKV, AVI (Max 10GB)</p>
  `;
}
window.showAddMovieModal = showAddMovieModal;

// Close Movie Modal
function closeMovieModal() {
  document.getElementById('movieModal').style.display = 'none';
}
window.closeMovieModal = closeMovieModal;

// Edit Movie
function editMovie(id) {
  const movie = movies.find(m => m.id === id);
  if (!movie) return;
  
  currentMovieId = id;
  document.getElementById('movieModalTitle').textContent = 'Edit Movie';
  document.getElementById('movieTitle').value = movie.title;
  document.getElementById('movieYear').value = movie.year;
  document.getElementById('movieGenre').value = movie.genre.toLowerCase();
  document.getElementById('movieDuration').value = movie.duration;
  document.getElementById('moviePrice').value = movie.price;
  document.getElementById('movieStatus').value = movie.status;
  document.getElementById('movieQuality').value = movie.quality;
  
  document.getElementById('movieModal').style.display = 'flex';
}
window.editMovie = editMovie;

// View Movie
function viewMovie(id) {
  const movie = movies.find(m => m.id === id);
  if (movie) {
    alert(`Viewing: ${movie.title}\n\nYear: ${movie.year}\nGenre: ${movie.genre}\nPrice: $${movie.price}\nViews: ${movie.views}\nRevenue: $${movie.revenue}`);
  }
}
window.viewMovie = viewMovie;

// Delete Movie
function deleteMovie(id) {
  currentMovieId = id;
  document.getElementById('deleteModal').style.display = 'flex';
}
window.deleteMovie = deleteMovie;

// Close Delete Modal
function closeDeleteModal() {
  document.getElementById('deleteModal').style.display = 'none';
  currentMovieId = null;
}
window.closeDeleteModal = closeDeleteModal;

// Confirm Delete
function confirmDelete() {
  if (currentMovieId) {
    const index = movies.findIndex(m => m.id === currentMovieId);
    if (index > -1) {
      movies.splice(index, 1);
      loadMovies();
    }
  }
  closeDeleteModal();
}
window.confirmDelete = confirmDelete;

// Save Movie
function saveMovie() {
  const movieData = {
    title: document.getElementById('movieTitle').value,
    year: parseInt(document.getElementById('movieYear').value),
    genre: document.getElementById('movieGenre').value,
    duration: parseInt(document.getElementById('movieDuration').value),
    price: parseFloat(document.getElementById('moviePrice').value),
    status: document.getElementById('movieStatus').value,
    quality: document.getElementById('movieQuality').value,
    views: 0,
    revenue: 0,
    rating: 0
  };
  
  if (currentMovieId) {
    // Update existing
    const index = movies.findIndex(m => m.id === currentMovieId);
    if (index > -1) {
      movies[index] = { ...movies[index], ...movieData };
    }
  } else {
    // Add new
    movieData.id = movies.length + 1;
    movies.push(movieData);
  }
  
  loadMovies();
  closeMovieModal();
}

// Filter Movies
function filterMovies() {
  const search = document.getElementById('movieSearch').value.toLowerCase();
  const genre = document.getElementById('genreFilter').value;
  const status = document.getElementById('statusFilter').value;
  
  const rows = document.querySelectorAll('#moviesTableBody tr');
  
  rows.forEach(row => {
    const title = row.querySelector('.table-user-name').textContent.toLowerCase();
    const movieGenre = row.querySelector('.genre-badge').textContent.toLowerCase();
    const movieStatus = row.querySelector('.status-badge').textContent.toLowerCase();
    
    const matchSearch = title.includes(search);
    const matchGenre = !genre || movieGenre === genre;
    const matchStatus = !status || movieStatus === status;
    
    row.style.display = matchSearch && matchGenre && matchStatus ? '' : 'none';
  });
}

// Export Movies
function exportMovies() {
  alert('Exporting movies to CSV...');
  // In production, generate and download CSV
}
window.exportMovies = exportMovies;

