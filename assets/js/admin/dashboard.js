'use strict';

/**
 * Admin Dashboard JavaScript
 * Handles charts, data loading, and interactions
 */

// Check admin access
document.addEventListener('DOMContentLoaded', () => {
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  // For demo, allow access. In production, redirect non-admins
  // if (!isAdmin) window.location.href = '../index.html';
  
  initSidebar();
  initCharts();
  loadDashboardData();
  initTimeframeSelector();
});

// Sidebar Toggle
function initSidebar() {
  const sidebar = document.getElementById('adminSidebar');
  const toggle = document.getElementById('sidebarToggle');
  
  if (toggle && sidebar) {
    toggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      
      // Create/toggle overlay
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
  window.location.href = '../index.html';
}
window.adminLogout = adminLogout;

// Store chart instances for updates
let revenueChartInstance = null;

// Initialize Charts
function initCharts() {
  initRevenueChart();
  initTrafficChart();
  initUserGrowthChart();
  initEngagementChart();
}

// Timeframe selector for revenue chart
function initTimeframeSelector() {
  const selector = document.getElementById('revenueTimeframe');
  if (selector) {
    selector.addEventListener('change', (e) => {
      updateRevenueChart(e.target.value);
    });
  }
}

// Revenue Chart Data by timeframe
const revenueData = {
  week: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    data: [1200, 1850, 1420, 2100, 1890, 2450, 2200]
  },
  month: {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    data: [8500, 12300, 10800, 13600]
  },
  year: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    data: [12000, 19000, 15000, 25000, 22000, 30000, 35000, 41000, 38000, 45000, 48000, 52000]
  }
};

// Revenue Chart
function initRevenueChart() {
  const ctx = document.getElementById('revenueChart');
  if (!ctx) return;
  
  const gradient = ctx.getContext('2d').createLinearGradient(0, 0, 0, 280);
  gradient.addColorStop(0, 'rgba(249, 115, 22, 0.4)');
  gradient.addColorStop(0.5, 'rgba(249, 115, 22, 0.1)');
  gradient.addColorStop(1, 'rgba(249, 115, 22, 0)');
  
  revenueChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: revenueData.month.labels,
      datasets: [{
        label: 'Revenue',
        data: revenueData.month.data,
        borderColor: '#f97316',
        backgroundColor: gradient,
        borderWidth: 3,
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointBackgroundColor: '#f97316',
        pointBorderColor: '#0a0a0f',
        pointBorderWidth: 2,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: '#f97316',
        pointHoverBorderColor: '#fff',
        pointHoverBorderWidth: 3
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: 'rgba(18, 18, 26, 0.95)',
          borderColor: '#f97316',
          borderWidth: 1,
          titleColor: '#fff',
          titleFont: { size: 14, weight: '600' },
          bodyColor: '#8b8b9a',
          bodyFont: { size: 13 },
          padding: 14,
          cornerRadius: 8,
          displayColors: false,
          callbacks: {
            title: function(context) {
              return context[0].label;
            },
            label: function(context) {
              return 'Revenue: $' + context.raw.toLocaleString();
            }
          }
        }
      },
      scales: {
        x: {
          grid: {
            display: false
          },
          ticks: {
            color: '#8b8b9a',
            font: { size: 12, weight: '500' }
          }
        },
        y: {
          beginAtZero: true,
          grid: {
            color: 'rgba(139, 139, 154, 0.1)',
            drawBorder: false
          },
          ticks: {
            color: '#8b8b9a',
            font: { size: 12 },
            padding: 10,
            callback: function(value) {
              if (value >= 1000) return '$' + (value / 1000) + 'k';
              return '$' + value;
            }
          }
        }
      },
      interaction: {
        intersect: false,
        mode: 'index'
      }
    }
  });
}

// Update Revenue Chart based on timeframe
function updateRevenueChart(timeframe) {
  if (!revenueChartInstance) return;
  
  const data = revenueData[timeframe];
  revenueChartInstance.data.labels = data.labels;
  revenueChartInstance.data.datasets[0].data = data.data;
  revenueChartInstance.update('active');
}

// Traffic Sources Chart (Doughnut)
function initTrafficChart() {
  const ctx = document.getElementById('trafficChart');
  if (!ctx) return;
  
  const data = {
    labels: ['Direct', 'Social Media', 'Search', 'Referral', 'Email'],
    values: [35, 25, 22, 12, 6],
    colors: ['#f97316', '#3b82f6', '#22c55e', '#a855f7', '#eab308']
  };
  
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: data.labels,
      datasets: [{
        data: data.values,
        backgroundColor: data.colors,
        borderWidth: 0,
        hoverOffset: 15,
        hoverBorderWidth: 3,
        hoverBorderColor: '#fff'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '68%',
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: 'rgba(18, 18, 26, 0.95)',
          borderColor: '#1e1e2d',
          borderWidth: 1,
          titleColor: '#fff',
          titleFont: { size: 14, weight: '600' },
          bodyColor: '#8b8b9a',
          bodyFont: { size: 13 },
          padding: 12,
          cornerRadius: 8,
          callbacks: {
            label: function(context) {
              return context.label + ': ' + context.raw + '%';
            }
          }
        }
      }
    }
  });
  
  // Create custom legend
  const legend = document.getElementById('trafficLegend');
  if (legend) {
    legend.innerHTML = data.labels.map((label, i) => `
      <div class="legend-item">
        <span class="legend-color" style="background: ${data.colors[i]}"></span>
        <span>${label}: ${data.values[i]}%</span>
      </div>
    `).join('');
  }
}

// User Growth Chart (Bar)
function initUserGrowthChart() {
  const ctx = document.getElementById('userGrowthChart');
  if (!ctx) return;
  
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          label: 'New Users',
          data: [145, 198, 167, 245, 312, 389, 356],
          backgroundColor: 'rgba(249, 115, 22, 0.85)',
          borderRadius: 6,
          borderSkipped: false,
          maxBarThickness: 35
        },
        {
          label: 'Active Users',
          data: [520, 680, 590, 820, 950, 1120, 980],
          backgroundColor: 'rgba(59, 130, 246, 0.85)',
          borderRadius: 6,
          borderSkipped: false,
          maxBarThickness: 35
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'top',
          align: 'end',
          labels: {
            color: '#8b8b9a',
            padding: 15,
            usePointStyle: true,
            pointStyle: 'rectRounded',
            font: { size: 11 }
          }
        },
        tooltip: {
          backgroundColor: 'rgba(18, 18, 26, 0.95)',
          borderColor: '#1e1e2d',
          borderWidth: 1,
          titleColor: '#fff',
          titleFont: { size: 14, weight: '600' },
          bodyColor: '#8b8b9a',
          padding: 12,
          cornerRadius: 8
        }
      },
      scales: {
        x: {
          grid: {
            display: false
          },
          ticks: {
            color: '#8b8b9a',
            font: { size: 12 }
          }
        },
        y: {
          beginAtZero: true,
          grid: {
            color: 'rgba(139, 139, 154, 0.1)',
            drawBorder: false
          },
          ticks: {
            color: '#8b8b9a',
            font: { size: 12 },
            stepSize: 250
          }
        }
      }
    }
  });
}

// Content Engagement Chart (Line with multiple datasets)
function initEngagementChart() {
  const ctx = document.getElementById('engagementChart');
  if (!ctx) return;
  
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      datasets: [
        {
          label: 'Views',
          data: [45200, 52800, 48500, 63400],
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          borderWidth: 3,
          tension: 0.4,
          fill: true,
          pointRadius: 5,
          pointBackgroundColor: '#3b82f6',
          pointBorderColor: '#0a0a0f',
          pointBorderWidth: 2
        },
        {
          label: 'Likes',
          data: [12400, 15800, 13900, 19200],
          borderColor: '#22c55e',
          backgroundColor: 'transparent',
          borderWidth: 3,
          tension: 0.4,
          pointRadius: 5,
          pointBackgroundColor: '#22c55e',
          pointBorderColor: '#0a0a0f',
          pointBorderWidth: 2
        },
        {
          label: 'Comments',
          data: [3200, 4800, 4100, 5900],
          borderColor: '#a855f7',
          backgroundColor: 'transparent',
          borderWidth: 3,
          tension: 0.4,
          pointRadius: 5,
          pointBackgroundColor: '#a855f7',
          pointBorderColor: '#0a0a0f',
          pointBorderWidth: 2
        },
        {
          label: 'Shares',
          data: [1500, 2200, 1800, 2800],
          borderColor: '#eab308',
          backgroundColor: 'transparent',
          borderWidth: 3,
          tension: 0.4,
          pointRadius: 5,
          pointBackgroundColor: '#eab308',
          pointBorderColor: '#0a0a0f',
          pointBorderWidth: 2
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            color: '#8b8b9a',
            padding: 15,
            usePointStyle: true,
            pointStyle: 'circle',
            font: { size: 11 }
          }
        },
        tooltip: {
          backgroundColor: 'rgba(18, 18, 26, 0.95)',
          borderColor: '#1e1e2d',
          borderWidth: 1,
          titleColor: '#fff',
          titleFont: { size: 14, weight: '600' },
          bodyColor: '#8b8b9a',
          padding: 12,
          cornerRadius: 8,
          callbacks: {
            label: function(context) {
              return context.dataset.label + ': ' + context.raw.toLocaleString();
            }
          }
        }
      },
      scales: {
        x: {
          grid: {
            display: false
          },
          ticks: {
            color: '#8b8b9a',
            font: { size: 12 }
          }
        },
        y: {
          beginAtZero: true,
          grid: {
            color: 'rgba(139, 139, 154, 0.1)',
            drawBorder: false
          },
          ticks: {
            color: '#8b8b9a',
            font: { size: 12 },
            callback: function(value) {
              if (value >= 1000) return (value / 1000) + 'k';
              return value;
            }
          }
        }
      },
      interaction: {
        intersect: false,
        mode: 'index'
      }
    }
  });
}

// Load Dashboard Data
function loadDashboardData() {
  loadRecentTransactions();
  loadTopMovies();
  loadActivityFeed();
}

// Recent Transactions
function loadRecentTransactions() {
  const container = document.getElementById('recentTransactions');
  if (!container) return;
  
  const transactions = [
    { user: 'John Doe', email: 'john@email.com', movie: 'Sonic the Hedgehog 2', amount: 4.99, status: 'success', time: '2 min ago' },
    { user: 'Sarah Smith', email: 'sarah@email.com', movie: 'The Batman', amount: 6.99, status: 'success', time: '5 min ago' },
    { user: 'Mike Johnson', email: 'mike@email.com', movie: 'Doctor Strange 2', amount: 6.99, status: 'pending', time: '12 min ago' },
    { user: 'Emily Davis', email: 'emily@email.com', movie: 'Free Guy', amount: 5.99, status: 'success', time: '25 min ago' },
    { user: 'James Wilson', email: 'james@email.com', movie: 'Uncharted', amount: 5.99, status: 'failed', time: '1 hour ago' }
  ];
  
  container.innerHTML = transactions.map(t => `
    <tr>
      <td>
        <div class="table-user">
          <div class="table-user-avatar">
            <ion-icon name="person"></ion-icon>
          </div>
          <div class="table-user-info">
            <span class="table-user-name">${t.user}</span>
            <span class="table-user-email">${t.email}</span>
          </div>
        </div>
      </td>
      <td>${t.movie}</td>
      <td><strong>$${t.amount.toFixed(2)}</strong></td>
      <td><span class="status-badge ${t.status}">${capitalizeFirst(t.status)}</span></td>
    </tr>
  `).join('');
}

// Top Movies
function loadTopMovies() {
  const container = document.getElementById('topMovies');
  if (!container) return;
  
  const movies = [
    { title: 'The Batman', poster: '../assets/images/movies/movie-5.png', views: '45.2K', revenue: '$12,450', rating: 7.9 },
    { title: 'Sonic the Hedgehog 2', poster: '../assets/images/movies/movie-1.png', views: '38.1K', revenue: '$9,820', rating: 7.8 },
    { title: 'Doctor Strange 2', poster: '../assets/images/movies/upcoming-2.png', views: '32.5K', revenue: '$15,200', rating: 7.5 },
    { title: 'Free Guy', poster: '../assets/images/movies/movie-4.png', views: '28.3K', revenue: '$8,340', rating: 7.7 },
    { title: 'Uncharted', poster: '../assets/images/movies/movie-6.png', views: '25.1K', revenue: '$7,890', rating: 7.0 }
  ];
  
  container.innerHTML = movies.map(m => `
    <tr>
      <td>
        <div class="table-movie">
          <img src="${m.poster}" alt="${m.title}" class="table-movie-poster" onerror="this.style.display='none'">
          <span>${m.title}</span>
        </div>
      </td>
      <td><strong>${m.views}</strong></td>
      <td class="revenue-cell">${m.revenue}</td>
      <td>
        <div class="table-rating">
          <ion-icon name="star"></ion-icon>
          <span>${m.rating}</span>
        </div>
      </td>
    </tr>
  `).join('');
}

// Activity Feed
function loadActivityFeed() {
  const container = document.getElementById('activityList');
  if (!container) return;
  
  const activities = [
    { type: 'user', icon: 'person-add', text: '<strong>munashe</strong> signed up', time: '2 minutes ago' },
    { type: 'payment', icon: 'cash', text: '<strong>Sarah Smith</strong> purchased "The Batman"', time: '5 minutes ago' },
    { type: 'movie', icon: 'film', text: 'New movie <strong>"The Northman"</strong> was added', time: '15 minutes ago' },
    { type: 'warning', icon: 'flag', text: 'Content reported by <strong>3 users</strong>', time: '30 minutes ago' },
    { type: 'user', icon: 'person-add', text: '<strong>Mike Johnson</strong> signed up', time: '1 hour ago' },
    { type: 'payment', icon: 'cash', text: '<strong>Emily Davis</strong> purchased "Doctor Strange 2"', time: '2 hours ago' },
    { type: 'movie', icon: 'play-circle', text: '<strong>1.2K views</strong> on "Sonic the Hedgehog 2" today', time: '3 hours ago' },
    { type: 'payment', icon: 'heart', text: '<strong>John Doe</strong> unlocked Dating Chat', time: '4 hours ago' },
    { type: 'user', icon: 'radio', text: '<strong>Creator_Mike</strong> started a live stream', time: '5 hours ago' }
  ];
  
  container.innerHTML = activities.map(a => `
    <div class="activity-item">
      <div class="activity-icon ${a.type}">
        <ion-icon name="${a.icon}"></ion-icon>
      </div>
      <div class="activity-content">
        <p class="activity-text">${a.text}</p>
        <span class="activity-time">${a.time}</span>
      </div>
    </div>
  `).join('');
}

// Helper function
function capitalizeFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
