'use strict';

const ads = [
  { id: 1, name: 'Summer Movie Sale', type: 'banner', placement: 'Home Page', impressions: 245000, clicks: 12300, ctr: 5.02, status: 'active', startDate: '2024-06-01', endDate: '2024-08-31' },
  { id: 2, name: 'New Release Promo', type: 'video', placement: 'Reels Feed', impressions: 180000, clicks: 9500, ctr: 5.28, status: 'active', startDate: '2024-07-01', endDate: '2024-07-31' },
  { id: 3, name: 'Dating Premium', type: 'banner', placement: 'Dating Page', impressions: 95000, clicks: 4200, ctr: 4.42, status: 'active', startDate: '2024-06-15', endDate: '2024-12-31' },
  { id: 4, name: 'Live Events Special', type: 'sponsored', placement: 'Live Section', impressions: 120000, clicks: 6800, ctr: 5.67, status: 'paused', startDate: '2024-05-01', endDate: '2024-07-31' },
  { id: 5, name: 'Creator Spotlight', type: 'video', placement: 'Home Page', impressions: 320000, clicks: 18900, ctr: 5.91, status: 'active', startDate: '2024-01-01', endDate: '2024-12-31' },
  { id: 6, name: 'Weekend Special', type: 'banner', placement: 'Reels Feed', impressions: 78000, clicks: 3200, ctr: 4.10, status: 'ended', startDate: '2024-03-01', endDate: '2024-03-31' }
];

document.addEventListener('DOMContentLoaded', () => {
  initSidebar();
  loadAds();
});

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
  window.location.href = './index.html';
}
window.adminLogout = adminLogout;

function loadAds() {
  const container = document.getElementById('adsGrid');
  if (!container) return;
  
  container.innerHTML = ads.map(ad => `
    <div class="content-card">
      <div class="content-card-media">
        <div style="display: flex; align-items: center; justify-content: center; height: 100%; background: linear-gradient(135deg, var(--admin-primary), var(--admin-primary-light));">
          <ion-icon name="${ad.type === 'video' ? 'videocam' : ad.type === 'banner' ? 'image' : 'newspaper'}" style="font-size: 48px; color: white;"></ion-icon>
        </div>
        <span class="status-badge ${ad.status}" style="position: absolute; top: 12px; right: 12px;">${ad.status}</span>
      </div>
      <div class="content-card-body">
        <h4 class="content-card-title">${ad.name}</h4>
        <div class="content-card-meta">
          <span><ion-icon name="pricetag-outline"></ion-icon> ${ad.type}</span>
          <span><ion-icon name="location-outline"></ion-icon> ${ad.placement}</span>
        </div>
        <div class="ad-stats">
          <div class="ad-stat"><span class="ad-stat-value">${formatNumber(ad.impressions)}</span><span class="ad-stat-label">Impressions</span></div>
          <div class="ad-stat"><span class="ad-stat-value">${formatNumber(ad.clicks)}</span><span class="ad-stat-label">Clicks</span></div>
          <div class="ad-stat"><span class="ad-stat-value">${ad.ctr}%</span><span class="ad-stat-label">CTR</span></div>
        </div>
        <div class="content-card-actions">
          <button class="btn-admin secondary" style="flex: 1; padding: 10px;" onclick="editAd(${ad.id})"><ion-icon name="create-outline"></ion-icon> Edit</button>
          <button class="btn-admin ${ad.status === 'active' ? 'secondary' : 'primary'}" style="flex: 1; padding: 10px;" onclick="toggleAd(${ad.id})">${ad.status === 'active' ? 'Pause' : 'Resume'}</button>
        </div>
      </div>
    </div>
  `).join('');
}

function formatNumber(num) {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
}

function showCreateAdModal() {
  document.getElementById('adModal').style.display = 'flex';
}
window.showCreateAdModal = showCreateAdModal;

function closeAdModal() {
  document.getElementById('adModal').style.display = 'none';
}
window.closeAdModal = closeAdModal;

function editAd(id) {
  showCreateAdModal();
}
window.editAd = editAd;

function toggleAd(id) {
  const ad = ads.find(a => a.id === id);
  if (ad) {
    ad.status = ad.status === 'active' ? 'paused' : 'active';
    loadAds();
  }
}
window.toggleAd = toggleAd;

