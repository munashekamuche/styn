'use strict';

/**
 * Admin Users Management
 */

const users = [
  { id: 1, username: 'johndoe', email: 'john@email.com', role: 'user', joined: '2024-01-15', purchases: 12, spent: 54.99, status: 'active' },
  { id: 2, username: 'sarahsmith', email: 'sarah@email.com', role: 'creator', joined: '2024-01-20', purchases: 8, spent: 35.99, status: 'active' },
  { id: 3, username: 'mikejohnson', email: 'mike@email.com', role: 'user', joined: '2024-02-01', purchases: 25, spent: 124.50, status: 'active' },
  { id: 4, username: 'emilydavis', email: 'emily@email.com', role: 'moderator', joined: '2024-02-10', purchases: 5, spent: 24.95, status: 'active' },
  { id: 5, username: 'jameswilson', email: 'james@email.com', role: 'user', joined: '2024-02-15', purchases: 0, spent: 0, status: 'suspended' },
  { id: 6, username: 'oliviabrown', email: 'olivia@email.com', role: 'creator', joined: '2024-03-01', purchases: 18, spent: 89.99, status: 'active' },
  { id: 7, username: 'williamlee', email: 'william@email.com', role: 'user', joined: '2024-03-05', purchases: 3, spent: 14.97, status: 'banned' },
  { id: 8, username: 'sophiamiller', email: 'sophia@email.com', role: 'user', joined: '2024-03-10', purchases: 7, spent: 34.93, status: 'active' },
  { id: 9, username: 'munashe', email: 'munashe@email.com', role: 'admin', joined: '2024-01-01', purchases: 50, spent: 249.50, status: 'active' },
  { id: 10, username: 'avawilliams', email: 'ava@email.com', role: 'user', joined: '2024-03-15', purchases: 2, spent: 9.98, status: 'active' }
];

document.addEventListener('DOMContentLoaded', () => {
  initSidebar();
  loadUsers();
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

function loadUsers(filter = 'all') {
  const container = document.getElementById('usersTableBody');
  if (!container) return;
  
  let filteredUsers = users;
  if (filter === 'active') filteredUsers = users.filter(u => u.status === 'active');
  else if (filter === 'banned') filteredUsers = users.filter(u => u.status === 'banned' || u.status === 'suspended');
  else if (filter === 'premium') filteredUsers = users.filter(u => u.purchases >= 10);
  
  container.innerHTML = filteredUsers.map(user => `
    <tr>
      <td><label class="checkbox-label"><input type="checkbox" value="${user.id}"><span class="checkmark"></span></label></td>
      <td>
        <div class="table-user">
          <div class="table-user-avatar"><ion-icon name="person"></ion-icon></div>
          <div class="table-user-info">
            <span class="table-user-name">${user.username}</span>
            <span class="table-user-email">ID: ${user.id}</span>
          </div>
        </div>
      </td>
      <td>${user.email}</td>
      <td><span class="role-badge ${user.role}">${user.role}</span></td>
      <td>${formatDate(user.joined)}</td>
      <td>${user.purchases} ($${user.spent.toFixed(2)})</td>
      <td><span class="status-badge ${user.status}">${user.status}</span></td>
      <td>
        <div class="table-actions">
          <button class="table-action-btn" onclick="viewUser(${user.id})" title="View"><ion-icon name="eye-outline"></ion-icon></button>
          <button class="table-action-btn" onclick="editUser(${user.id})" title="Edit"><ion-icon name="create-outline"></ion-icon></button>
          ${user.status === 'banned' 
            ? `<button class="table-action-btn" onclick="unbanUser(${user.id})" title="Unban"><ion-icon name="checkmark-circle-outline"></ion-icon></button>`
            : `<button class="table-action-btn danger" onclick="banUser(${user.id})" title="Ban"><ion-icon name="ban-outline"></ion-icon></button>`
          }
        </div>
      </td>
    </tr>
  `).join('');
}

function setupTabs() {
  const tabs = document.querySelectorAll('.admin-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      loadUsers(tab.dataset.tab);
    });
  });
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function viewUser(id) {
  const user = users.find(u => u.id === id);
  if (!user) return;
  
  document.getElementById('userModalTitle').textContent = 'User Details';
  document.getElementById('detailUserName').textContent = user.username;
  document.getElementById('detailUserEmail').textContent = user.email;
  document.getElementById('userUsername').value = user.username;
  document.getElementById('userEmail').value = user.email;
  document.getElementById('userRole').value = user.role;
  document.getElementById('userStatus').value = user.status;
  document.getElementById('userModal').style.display = 'flex';
}
window.viewUser = viewUser;

function editUser(id) {
  viewUser(id);
  document.getElementById('userModalTitle').textContent = 'Edit User';
}
window.editUser = editUser;

function closeUserModal() {
  document.getElementById('userModal').style.display = 'none';
}
window.closeUserModal = closeUserModal;

async function banUser(id) {
  const yes = await stynConfirm('Are you sure you want to ban this user?', 'Ban User');
  if (yes) {
    const user = users.find(u => u.id === id);
    if (user) {
      user.status = 'banned';
      loadUsers();
      stynToast('User has been banned.', 'success');
    }
  }
}
window.banUser = banUser;

function unbanUser(id) {
  const user = users.find(u => u.id === id);
  if (user) {
    user.status = 'active';
    loadUsers();
  }
}
window.unbanUser = unbanUser;

function showAddUserModal() {
  document.getElementById('userModalTitle').textContent = 'Add New User';
  document.getElementById('userForm').reset();
  document.getElementById('userModal').style.display = 'flex';
}
window.showAddUserModal = showAddUserModal;

