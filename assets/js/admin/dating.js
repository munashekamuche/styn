'use strict';

const datingProfiles = [
  { id: 1, name: 'Sarah Johnson', location: 'New York, USA', age: 25, subscribed: true, messages: 45, status: 'active' },
  { id: 2, name: 'Michael Chen', location: 'Los Angeles, USA', age: 28, subscribed: true, messages: 32, status: 'active' },
  { id: 3, name: 'Emily Davis', location: 'London, UK', age: 24, subscribed: false, messages: 0, status: 'active' },
  { id: 4, name: 'James Wilson', location: 'Sydney, Australia', age: 30, subscribed: true, messages: 67, status: 'active' },
  { id: 5, name: 'Sophia Martinez', location: 'Toronto, Canada', age: 26, subscribed: true, messages: 23, status: 'pending' },
  { id: 6, name: 'Oliver Brown', location: 'Berlin, Germany', age: 29, subscribed: false, messages: 0, status: 'active' },
  { id: 7, name: 'Isabella Garcia', location: 'Miami, USA', age: 23, subscribed: true, messages: 89, status: 'active' },
  { id: 8, name: 'William Taylor', location: 'Chicago, USA', age: 27, subscribed: false, messages: 0, status: 'suspended' },
  { id: 9, name: 'Olivia Anderson', location: 'Paris, France', age: 25, subscribed: true, messages: 56, status: 'active' },
  { id: 10, name: 'Benjamin Lee', location: 'Tokyo, Japan', age: 31, subscribed: true, messages: 41, status: 'active' }
];

document.addEventListener('DOMContentLoaded', () => {
  initSidebar();
  loadProfiles();
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

function loadProfiles() {
  const container = document.getElementById('datingTableBody');
  if (!container) return;
  
  container.innerHTML = datingProfiles.map(profile => `
    <tr>
      <td>
        <div class="table-user">
          <div class="table-user-avatar" style="background: linear-gradient(135deg, #ec4899, #f472b6);">
            <ion-icon name="person" style="color: white;"></ion-icon>
          </div>
          <div class="table-user-info">
            <span class="table-user-name">${profile.name}</span>
            <span class="table-user-email">ID: ${profile.id}</span>
          </div>
        </div>
      </td>
      <td>${profile.location}</td>
      <td>${profile.age}</td>
      <td>
        ${profile.subscribed 
          ? '<span class="status-badge success">Yes</span>' 
          : '<span class="status-badge inactive">No</span>'
        }
      </td>
      <td>${profile.messages}</td>
      <td><span class="status-badge ${profile.status}">${profile.status}</span></td>
      <td>
        <div class="table-actions">
          <button class="table-action-btn" onclick="viewProfile(${profile.id})" title="View">
            <ion-icon name="eye-outline"></ion-icon>
          </button>
          <button class="table-action-btn" onclick="editProfile(${profile.id})" title="Edit">
            <ion-icon name="create-outline"></ion-icon>
          </button>
          ${profile.status === 'suspended'
            ? `<button class="table-action-btn" onclick="unsuspendProfile(${profile.id})" title="Unsuspend"><ion-icon name="checkmark-circle-outline"></ion-icon></button>`
            : `<button class="table-action-btn danger" onclick="suspendProfile(${profile.id})" title="Suspend"><ion-icon name="ban-outline"></ion-icon></button>`
          }
        </div>
      </td>
    </tr>
  `).join('');
}

function viewProfile(id) {
  stynToast('Opening profile #' + id + '...', 'info');
}
window.viewProfile = viewProfile;

function editProfile(id) {
  stynToast('Editing profile #' + id + '...', 'info');
}
window.editProfile = editProfile;

async function suspendProfile(id) {
  const yes = await stynConfirm('Suspend this profile?', 'Suspend Profile');
  if (yes) {
    const profile = datingProfiles.find(p => p.id === id);
    if (profile) {
      profile.status = 'suspended';
      loadProfiles();
      stynToast('Profile suspended.', 'success');
    }
  }
}
window.suspendProfile = suspendProfile;

function unsuspendProfile(id) {
  const profile = datingProfiles.find(p => p.id === id);
  if (profile) {
    profile.status = 'active';
    loadProfiles();
  }
}
window.unsuspendProfile = unsuspendProfile;

