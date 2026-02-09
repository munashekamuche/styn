'use strict';

/**
 * Admin Analytics Page
 */

document.addEventListener('DOMContentLoaded', () => {
  initSidebar();
  initCharts();
  loadTableData();
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

function adminLogout() {
  localStorage.removeItem('user');
  localStorage.removeItem('isAdmin');
  window.location.href = '../index.html';
}
window.adminLogout = adminLogout;

// Initialize all charts
function initCharts() {
  initRevenueAnalyticsChart();
  initCategoryChart();
  initAcquisitionChart();
  initActivityChart();
  initDeviceChart();
  initContentTypeChart();
}

// Revenue Analytics Chart (Area + Bar combo)
function initRevenueAnalyticsChart() {
  const ctx = document.getElementById('revenueAnalyticsChart');
  if (!ctx) return;

  const gradient = ctx.getContext('2d').createLinearGradient(0, 0, 0, 350);
  gradient.addColorStop(0, 'rgba(249, 115, 22, 0.4)');
  gradient.addColorStop(1, 'rgba(249, 115, 22, 0)');

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
          label: 'Revenue',
          data: [8500, 12300, 10800, 15600, 14200, 18500, 22000, 25600, 23800, 28400, 31200, 35800],
          borderColor: '#f97316',
          backgroundColor: gradient,
          borderWidth: 3,
          tension: 0.4,
          fill: true,
          pointRadius: 4,
          pointBackgroundColor: '#f97316',
          pointBorderColor: '#0a0a0f',
          pointBorderWidth: 2,
          yAxisID: 'y'
        },
        {
          label: 'Transactions',
          data: [420, 580, 520, 720, 680, 850, 980, 1120, 1050, 1240, 1380, 1520],
          type: 'bar',
          backgroundColor: 'rgba(59, 130, 246, 0.6)',
          borderRadius: 4,
          maxBarThickness: 30,
          yAxisID: 'y1'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index',
        intersect: false
      },
      plugins: {
        legend: {
          display: true,
          position: 'top',
          align: 'end',
          labels: {
            color: '#8b8b9a',
            padding: 20,
            usePointStyle: true
          }
        },
        tooltip: {
          backgroundColor: 'rgba(18, 18, 26, 0.95)',
          borderColor: '#f97316',
          borderWidth: 1,
          padding: 12,
          cornerRadius: 8,
          callbacks: {
            label: function(context) {
              if (context.dataset.label === 'Revenue') {
                return 'Revenue: $' + context.raw.toLocaleString();
              }
              return 'Transactions: ' + context.raw.toLocaleString();
            }
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: '#8b8b9a' }
        },
        y: {
          type: 'linear',
          display: true,
          position: 'left',
          grid: { color: 'rgba(139, 139, 154, 0.1)' },
          ticks: {
            color: '#8b8b9a',
            callback: (value) => '$' + (value / 1000) + 'k'
          }
        },
        y1: {
          type: 'linear',
          display: true,
          position: 'right',
          grid: { drawOnChartArea: false },
          ticks: { color: '#8b8b9a' }
        }
      }
    }
  });
}

// Category Revenue Chart (Doughnut)
function initCategoryChart() {
  const ctx = document.getElementById('categoryChart');
  if (!ctx) return;

  const data = {
    labels: ['Blockbuster Movies', 'My Reel Videos', 'Dating Subscriptions', 'Live Streams', 'Advertisements'],
    values: [45, 22, 15, 10, 8],
    colors: ['#f97316', '#3b82f6', '#ec4899', '#22c55e', '#eab308']
  };

  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: data.labels,
      datasets: [{
        data: data.values,
        backgroundColor: data.colors,
        borderWidth: 0,
        hoverOffset: 12
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '65%',
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: 'rgba(18, 18, 26, 0.95)',
          padding: 12,
          cornerRadius: 8,
          callbacks: {
            label: (ctx) => ctx.label + ': ' + ctx.raw + '%'
          }
        }
      }
    }
  });

  // Custom legend
  const legend = document.getElementById('categoryLegend');
  if (legend) {
    legend.innerHTML = data.labels.map((label, i) => `
      <div class="legend-item">
        <span class="legend-color" style="background: ${data.colors[i]}"></span>
        <span>${label}: ${data.values[i]}%</span>
      </div>
    `).join('');
  }
}

// User Acquisition Chart (Stacked Area)
function initAcquisitionChart() {
  const ctx = document.getElementById('acquisitionChart');
  if (!ctx) return;

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      datasets: [
        {
          label: 'Organic',
          data: [420, 580, 650, 780],
          borderColor: '#22c55e',
          backgroundColor: 'rgba(34, 197, 94, 0.3)',
          fill: true,
          tension: 0.4
        },
        {
          label: 'Social',
          data: [280, 350, 420, 520],
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59, 130, 246, 0.3)',
          fill: true,
          tension: 0.4
        },
        {
          label: 'Referral',
          data: [150, 200, 180, 250],
          borderColor: '#a855f7',
          backgroundColor: 'rgba(168, 85, 247, 0.3)',
          fill: true,
          tension: 0.4
        },
        {
          label: 'Paid',
          data: [80, 120, 150, 190],
          borderColor: '#f97316',
          backgroundColor: 'rgba(249, 115, 22, 0.3)',
          fill: true,
          tension: 0.4
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
          labels: { color: '#8b8b9a', padding: 15, usePointStyle: true }
        },
        tooltip: {
          backgroundColor: 'rgba(18, 18, 26, 0.95)',
          padding: 12,
          cornerRadius: 8
        }
      },
      scales: {
        x: { grid: { display: false }, ticks: { color: '#8b8b9a' } },
        y: {
          stacked: true,
          grid: { color: 'rgba(139, 139, 154, 0.1)' },
          ticks: { color: '#8b8b9a' }
        }
      }
    }
  });
}

// Activity by Hour Chart (Bar)
function initActivityChart() {
  const ctx = document.getElementById('activityChart');
  if (!ctx) return;

  const hours = Array.from({ length: 24 }, (_, i) => i + ':00');
  const data = [120, 80, 45, 30, 25, 40, 85, 180, 320, 450, 520, 580, 620, 590, 540, 480, 520, 680, 820, 750, 620, 450, 280, 180];

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: hours,
      datasets: [{
        label: 'Active Users',
        data: data,
        backgroundColor: data.map(v => v > 500 ? '#f97316' : 'rgba(249, 115, 22, 0.5)'),
        borderRadius: 2,
        maxBarThickness: 12
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: 'rgba(18, 18, 26, 0.95)',
          padding: 12,
          cornerRadius: 8,
          callbacks: {
            title: (ctx) => 'Time: ' + ctx[0].label,
            label: (ctx) => 'Active Users: ' + ctx.raw.toLocaleString()
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: {
            color: '#8b8b9a',
            maxRotation: 0,
            callback: (val, i) => i % 4 === 0 ? hours[i] : ''
          }
        },
        y: {
          grid: { color: 'rgba(139, 139, 154, 0.1)' },
          ticks: { color: '#8b8b9a' }
        }
      }
    }
  });
}

// Device Distribution Chart (Polar Area)
function initDeviceChart() {
  const ctx = document.getElementById('deviceChart');
  if (!ctx) return;

  new Chart(ctx, {
    type: 'polarArea',
    data: {
      labels: ['Mobile', 'Desktop', 'Tablet', 'Smart TV'],
      datasets: [{
        data: [55, 28, 12, 5],
        backgroundColor: [
          'rgba(249, 115, 22, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(168, 85, 247, 0.8)'
        ],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'right',
          labels: { color: '#8b8b9a', padding: 10 }
        },
        tooltip: {
          backgroundColor: 'rgba(18, 18, 26, 0.95)',
          padding: 12,
          cornerRadius: 8,
          callbacks: {
            label: (ctx) => ctx.label + ': ' + ctx.raw + '%'
          }
        }
      },
      scales: {
        r: {
          grid: { color: 'rgba(139, 139, 154, 0.1)' },
          ticks: { display: false }
        }
      }
    }
  });
}

// Content Type Performance Chart (Horizontal Bar)
function initContentTypeChart() {
  const ctx = document.getElementById('contentTypeChart');
  if (!ctx) return;

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Blockbuster Movies', 'My Reel Videos', 'Live Streams', 'Podcasts', 'Dating Profiles'],
      datasets: [
        {
          label: 'Views (K)',
          data: [850, 1200, 320, 180, 95],
          backgroundColor: 'rgba(249, 115, 22, 0.8)',
          borderRadius: 4
        },
        {
          label: 'Engagement Rate (%)',
          data: [68, 82, 75, 65, 88],
          backgroundColor: 'rgba(34, 197, 94, 0.8)',
          borderRadius: 4
        }
      ]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'top',
          labels: { color: '#8b8b9a', padding: 15 }
        },
        tooltip: {
          backgroundColor: 'rgba(18, 18, 26, 0.95)',
          padding: 12,
          cornerRadius: 8
        }
      },
      scales: {
        x: {
          grid: { color: 'rgba(139, 139, 154, 0.1)' },
          ticks: { color: '#8b8b9a' }
        },
        y: {
          grid: { display: false },
          ticks: { color: '#8b8b9a' }
        }
      }
    }
  });
}

// Load Table Data
function loadTableData() {
  loadTopContent();
  loadGeoData();
}

// Top Content Table
function loadTopContent() {
  const container = document.getElementById('topContentTable');
  if (!container) return;

  const content = [
    { title: 'The Batman', type: 'Movie', views: '45.2K', engagement: '78%' },
    { title: 'Viral Dance Challenge', type: 'Reel', views: '128K', engagement: '92%' },
    { title: 'Tech Talk Live', type: 'Stream', views: '8.5K', engagement: '65%' },
    { title: 'Sonic the Hedgehog 2', type: 'Movie', views: '38.1K', engagement: '72%' },
    { title: 'Cooking Tutorial', type: 'Reel', views: '95K', engagement: '85%' }
  ];

  const typeColors = { Movie: '#f97316', Reel: '#3b82f6', Stream: '#22c55e' };

  container.innerHTML = content.map(c => `
    <tr>
      <td><strong>${c.title}</strong></td>
      <td><span class="status-badge" style="background: ${typeColors[c.type]}20; color: ${typeColors[c.type]}">${c.type}</span></td>
      <td>${c.views}</td>
      <td><strong>${c.engagement}</strong></td>
    </tr>
  `).join('');
}

// Geographic Data Table
function loadGeoData() {
  const container = document.getElementById('geoTable');
  if (!container) return;

  const data = [
    { country: 'United States', flag: '🇺🇸', users: '4,521', revenue: '$18,450', percent: '35%' },
    { country: 'United Kingdom', flag: '🇬🇧', users: '2,180', revenue: '$8,920', percent: '18%' },
    { country: 'Canada', flag: '🇨🇦', users: '1,650', revenue: '$6,340', percent: '12%' },
    { country: 'Australia', flag: '🇦🇺', users: '1,280', revenue: '$4,890', percent: '9%' },
    { country: 'Germany', flag: '🇩🇪', users: '980', revenue: '$3,650', percent: '7%' }
  ];

  container.innerHTML = data.map(d => `
    <tr>
      <td><span style="margin-right: 8px;">${d.flag}</span>${d.country}</td>
      <td>${d.users}</td>
      <td class="revenue-cell">${d.revenue}</td>
      <td><strong>${d.percent}</strong></td>
    </tr>
  `).join('');
}
