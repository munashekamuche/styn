'use strict';

const content = [
  { id: 1, title: 'Epic Dance Moves 🔥', author: 'dancequeen', type: 'reel', reports: 0, status: 'pending', date: '2024-07-15' },
  { id: 2, title: 'Cooking Tutorial', author: 'chefmike', type: 'reel', reports: 3, status: 'reported', date: '2024-07-14', reasons: ['Spam', 'Misleading'] },
  { id: 3, title: 'Sunset Timelapse', author: 'naturelover', type: 'reel', reports: 0, status: 'pending', date: '2024-07-15' },
  { id: 4, title: 'Gaming Highlights', author: 'progamer99', type: 'reel', reports: 5, status: 'reported', date: '2024-07-13', reasons: ['Inappropriate', 'Violence'] },
  { id: 5, title: 'Workout Routine', author: 'fitnessguru', type: 'reel', reports: 0, status: 'pending', date: '2024-07-15' },
  { id: 6, title: 'Music Cover Song', author: 'singerstar', type: 'reel', reports: 2, status: 'reported', date: '2024-07-14', reasons: ['Copyright'] },
  { id: 7, title: 'Comedy Sketch', author: 'funnyguy', type: 'reel', reports: 0, status: 'approved', date: '2024-07-12' },
  { id: 8, title: 'Travel Vlog', author: 'wanderlust', type: 'reel', reports: 0, status: 'approved', date: '2024-07-11' }
];

let currentTab = 'pending';

document.addEventListener('DOMContentLoaded', () => {
  initSidebar();
  loadContent();
  setupTabs();
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

function setupTabs() {
  const tabs = document.querySelectorAll('.admin-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentTab = tab.dataset.tab;
      loadContent();
    });
  });
}

function loadContent() {
  const container = document.getElementById('contentGrid');
  if (!container) return;
  
  let filtered = content;
  if (currentTab === 'pending') filtered = content.filter(c => c.status === 'pending');
  else if (currentTab === 'reported') filtered = content.filter(c => c.status === 'reported');
  else if (currentTab === 'approved') filtered = content.filter(c => c.status === 'approved');
  else if (currentTab === 'removed') filtered = content.filter(c => c.status === 'removed');
  
  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1;">
        <ion-icon name="checkmark-circle-outline" class="empty-state-icon"></ion-icon>
        <h3>All Clear!</h3>
        <p>No content in this category.</p>
      </div>
    `;
    return;
  }
  
  container.innerHTML = filtered.map(item => `
    <div class="content-card">
      <div class="content-card-media">
        <div style="display: flex; align-items: center; justify-content: center; height: 100%; background: var(--admin-bg);">
          <ion-icon name="play-circle" style="font-size: 48px; color: var(--admin-text-muted);"></ion-icon>
        </div>
        ${item.reports > 0 ? `<span class="status-badge" style="position: absolute; top: 12px; right: 12px; background: rgba(239, 68, 68, 0.9); color: white;">${item.reports} reports</span>` : ''}
      </div>
      <div class="content-card-body">
        <h4 class="content-card-title">${item.title}</h4>
        <div class="content-card-meta">
          <span><ion-icon name="person-outline"></ion-icon> @${item.author}</span>
          <span><ion-icon name="time-outline"></ion-icon> ${formatDate(item.date)}</span>
        </div>
        <div class="content-card-actions">
          <button class="btn-admin success" style="flex: 1; padding: 10px;" onclick="approveItem(${item.id})"><ion-icon name="checkmark-outline"></ion-icon></button>
          <button class="btn-admin secondary" style="flex: 1; padding: 10px;" onclick="reviewItem(${item.id})"><ion-icon name="eye-outline"></ion-icon></button>
          <button class="btn-admin danger" style="flex: 1; padding: 10px;" onclick="removeItem(${item.id})"><ion-icon name="trash-outline"></ion-icon></button>
        </div>
      </div>
    </div>
  `).join('');
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function reviewItem(id) {
  const item = content.find(c => c.id === id);
  if (!item) return;
  
  document.getElementById('reviewTitle').textContent = item.title;
  document.getElementById('reviewAuthor').textContent = '@' + item.author;
  document.getElementById('reviewDate').textContent = formatDate(item.date);
  document.getElementById('reviewReports').textContent = item.reports + ' reports';
  
  const reasonsList = document.getElementById('reportReasons');
  if (item.reasons && item.reasons.length) {
    reasonsList.innerHTML = item.reasons.map(r => `<li>${r}</li>`).join('');
  } else {
    reasonsList.innerHTML = '<li>No specific reasons provided</li>';
  }
  
  document.getElementById('reviewModal').style.display = 'flex';
}
window.reviewItem = reviewItem;

function closeReviewModal() {
  document.getElementById('reviewModal').style.display = 'none';
}
window.closeReviewModal = closeReviewModal;

function approveItem(id) {
  const item = content.find(c => c.id === id);
  if (item) {
    item.status = 'approved';
    loadContent();
  }
}
window.approveItem = approveItem;

function approveContent() {
  closeReviewModal();
  loadContent();
}
window.approveContent = approveContent;

async function removeItem(id) {
  const yes = await stynConfirm('Remove this content?', 'Remove Content');
  if (yes) {
    const item = content.find(c => c.id === id);
    if (item) {
      item.status = 'removed';
      loadContent();
      stynToast('Content removed.', 'success');
    }
  }
}
window.removeItem = removeItem;

function removeContent() {
  closeReviewModal();
  loadContent();
}
window.removeContent = removeContent;

