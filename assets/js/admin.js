'use strict';

/**
 * Admin Dashboard System
 * Handles admin panel functionality
 */

// Check admin access
document.addEventListener('DOMContentLoaded', () => {
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  if (!isAdmin) {
    alert('Access denied. Admin only.');
    window.location.href = './index.html';
    return;
  }
  
  initializeAdmin();
});

function initializeAdmin() {
  // Navigation
  const navLinks = document.querySelectorAll('.admin-nav-link[data-section]');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const section = link.dataset.section;
      showSection(section);
      
      // Update active state
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });
  
  // Moderation tabs
  const moderationTabs = document.querySelectorAll('.tab-btn[data-tab]');
  moderationTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      moderationTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      const tabName = tab.dataset.tab;
      loadModerationContent(tabName);
    });
  });
  
  // Form handlers
  setupFormHandlers();
  
  // Load initial data
  loadDashboardData();
}

function showSection(section) {
  // Hide all sections
  document.querySelectorAll('.admin-section').forEach(sec => {
    sec.classList.remove('active');
  });
  
  // Show selected section
  const targetSection = document.getElementById(section);
  if (targetSection) {
    targetSection.classList.add('active');
    
    // Update page title
    const pageTitle = document.getElementById('adminPageTitle');
    if (pageTitle) {
      const titles = {
        overview: 'Dashboard Overview',
        blockbuster: 'Blockbuster Management',
        ads: 'Advertisement Management',
        content: 'Content Moderation',
        users: 'User Management'
      };
      pageTitle.textContent = titles[section] || 'Admin Dashboard';
    }
  }
}

function setupFormHandlers() {
  // Add movie form
  const addMovieForm = document.getElementById('addMovieForm');
  if (addMovieForm) {
    addMovieForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Movie added successfully! (Demo mode)');
      document.getElementById('addMovieModal').style.display = 'none';
      addMovieForm.reset();
      // In real app, send to API and refresh list
    });
  }
  
  // Add ad form
  const addAdForm = document.getElementById('addAdForm');
  if (addAdForm) {
    addAdForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Advertisement added successfully! (Demo mode)');
      document.getElementById('addAdModal').style.display = 'none';
      addAdForm.reset();
      // In real app, send to API and refresh list
    });
  }
}

function loadDashboardData() {
  // Load movies table
  loadMoviesTable();
  
  // Load ads
  loadAds();
  
  // Load users table
  loadUsersTable();
}

function loadMoviesTable() {
  const tbody = document.getElementById('moviesTableBody');
  if (!tbody) return;
  
  // Demo data
  const movies = [
    { title: 'Movie 1', price: 4.99, views: 12500, revenue: 62375, status: 'Active' },
    { title: 'Movie 2', price: 5.99, views: 8900, revenue: 53311, status: 'Active' },
    // Add more...
  ];
  
  tbody.innerHTML = movies.map(movie => `
    <tr>
      <td>${movie.title}</td>
      <td>$${movie.price.toFixed(2)}</td>
      <td>${movie.views.toLocaleString()}</td>
      <td>$${movie.revenue.toLocaleString()}</td>
      <td><span class="status-badge">${movie.status}</span></td>
      <td>
        <button class="btn-icon" title="Edit">
          <ion-icon name="create-outline"></ion-icon>
        </button>
        <button class="btn-icon" title="Delete">
          <ion-icon name="trash-outline"></ion-icon>
        </button>
      </td>
    </tr>
  `).join('');
}

function loadAds() {
  const adsGrid = document.getElementById('adsGrid');
  if (!adsGrid) return;
  
  // Demo data
  const ads = [
    { id: 1, type: 'Banner', placement: 'Main Page', status: 'Active' },
    // Add more...
  ];
  
  adsGrid.innerHTML = ads.map(ad => `
    <div class="ad-card">
      <div class="ad-preview">Ad Preview</div>
      <div class="ad-info">
        <h4>${ad.type}</h4>
        <p>${ad.placement}</p>
        <span class="status-badge">${ad.status}</span>
      </div>
      <div class="ad-actions">
        <button class="btn-icon">
          <ion-icon name="create-outline"></ion-icon>
        </button>
        <button class="btn-icon">
          <ion-icon name="trash-outline"></ion-icon>
        </button>
      </div>
    </div>
  `).join('');
}

function loadUsersTable() {
  const tbody = document.getElementById('usersTableBody');
  if (!tbody) return;
  
  // Demo data
  const users = [
    { username: 'user1', identifier: 'user1@example.com', role: 'User', status: 'Active' },
    // Add more...
  ];
  
  tbody.innerHTML = users.map(user => `
    <tr>
      <td>${user.username}</td>
      <td>${user.identifier}</td>
      <td>${user.role}</td>
      <td><span class="status-badge">${user.status}</span></td>
      <td>
        <button class="btn-icon" title="Edit">
          <ion-icon name="create-outline"></ion-icon>
        </button>
        <button class="btn-icon" title="Delete">
          <ion-icon name="trash-outline"></ion-icon>
        </button>
      </td>
    </tr>
  `).join('');
}

function loadModerationContent(tab) {
  const contentList = document.getElementById('contentList');
  if (!contentList) return;
  
  // Demo content based on tab
  const content = {
    pending: [{ id: 1, title: 'Pending Video 1', author: '@user1', type: 'Reel' }],
    reported: [{ id: 2, title: 'Reported Video 1', author: '@user2', type: 'Reel', reason: 'Inappropriate content' }],
    removed: [{ id: 3, title: 'Removed Video 1', author: '@user3', type: 'Reel' }]
  };
  
  const items = content[tab] || [];
  
  contentList.innerHTML = items.map(item => `
    <div class="content-item">
      <div class="content-info">
        <h4>${item.title}</h4>
        <p>By ${item.author} • ${item.type}</p>
        ${item.reason ? `<p class="report-reason">Reason: ${item.reason}</p>` : ''}
      </div>
      <div class="content-actions">
        ${tab === 'pending' ? `
          <button class="btn btn-primary btn-sm">Approve</button>
          <button class="btn btn-secondary btn-sm">Reject</button>
        ` : ''}
        ${tab === 'reported' ? `
          <button class="btn btn-primary btn-sm">Review</button>
          <button class="btn btn-danger btn-sm">Remove</button>
        ` : ''}
      </div>
    </div>
  `).join('');
}

