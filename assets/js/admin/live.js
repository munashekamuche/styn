'use strict';

const liveStreams = [
  { id: 1, title: 'Gaming Marathon', streamer: 'progamer99', viewers: 2450, duration: '2h 15m', status: 'live', category: 'Gaming' },
  { id: 2, title: 'Music Session', streamer: 'singerstar', viewers: 1890, duration: '1h 30m', status: 'live', category: 'Music' },
  { id: 3, title: 'Cooking Show', streamer: 'chefmike', viewers: 3200, duration: '45m', status: 'live', category: 'Lifestyle' },
  { id: 4, title: 'Tech Talk Podcast', streamer: 'techenthusiast', viewers: 890, duration: '1h 10m', status: 'live', category: 'Podcast' },
  { id: 5, title: 'Fitness Class', streamer: 'fitnessguru', viewers: 1560, duration: '55m', status: 'live', category: 'Fitness' },
  { id: 6, title: 'Art Stream', streamer: 'creativemind', viewers: 780, duration: '2h 45m', status: 'live', category: 'Art' },
  { id: 7, title: 'Q&A Session', streamer: 'influencer101', viewers: 4200, duration: '30m', status: 'live', category: 'Talk' },
  { id: 8, title: 'Travel Vlog Live', streamer: 'wanderlust', viewers: 1120, duration: '1h 20m', status: 'live', category: 'Travel' }
];

document.addEventListener('DOMContentLoaded', () => {
  initSidebar();
  loadLiveStreams();
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

function loadLiveStreams() {
  const container = document.getElementById('liveGrid');
  if (!container) return;
  
  container.innerHTML = liveStreams.map(stream => `
    <div class="content-card">
      <div class="content-card-media">
        <div style="display: flex; align-items: center; justify-content: center; height: 100%; background: linear-gradient(135deg, #ef4444, #dc2626);">
          <ion-icon name="radio" style="font-size: 48px; color: white;"></ion-icon>
        </div>
        <span class="status-badge" style="position: absolute; top: 12px; left: 12px; background: #ef4444; color: white; display: flex; align-items: center; gap: 4px;">
          <span style="width: 8px; height: 8px; background: white; border-radius: 50%; animation: pulse 1s infinite;"></span>
          LIVE
        </span>
        <span style="position: absolute; top: 12px; right: 12px; background: rgba(0,0,0,0.7); color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px;">
          <ion-icon name="eye-outline"></ion-icon> ${formatNumber(stream.viewers)}
        </span>
      </div>
      <div class="content-card-body">
        <h4 class="content-card-title">${stream.title}</h4>
        <div class="content-card-meta">
          <span><ion-icon name="person-outline"></ion-icon> @${stream.streamer}</span>
          <span><ion-icon name="time-outline"></ion-icon> ${stream.duration}</span>
        </div>
        <div style="margin-bottom: 12px;">
          <span class="genre-badge">${stream.category}</span>
        </div>
        <div class="content-card-actions">
          <button class="btn-admin secondary" style="flex: 1; padding: 10px;" onclick="viewStream(${stream.id})">
            <ion-icon name="eye-outline"></ion-icon> Watch
          </button>
          <button class="btn-admin danger" style="flex: 1; padding: 10px;" onclick="endStream(${stream.id})">
            <ion-icon name="stop-outline"></ion-icon> End
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

function formatNumber(num) {
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
}

function viewStream(id) {
  stynToast('Opening stream viewer...', 'info');
}
window.viewStream = viewStream;

async function endStream(id) {
  const yes = await stynConfirm('Are you sure you want to end this stream?', 'End Stream');
  if (yes) {
    const index = liveStreams.findIndex(s => s.id === id);
    if (index > -1) {
      liveStreams.splice(index, 1);
      loadLiveStreams();
      stynToast('Stream ended successfully.', 'success');
    }
  }
}
window.endStream = endStream;

