'use strict';

document.addEventListener('DOMContentLoaded', () => {
  initSidebar();
  setupTabs();
  setupForms();
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
  const sections = {
    general: document.getElementById('generalSettings'),
    payments: document.getElementById('paymentSettings'),
    security: document.getElementById('securitySettings'),
    notifications: document.getElementById('notificationSettings'),
    api: document.getElementById('apiSettings')
  };
  
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      const tabName = tab.dataset.tab;
      Object.keys(sections).forEach(key => {
        if (sections[key]) {
          sections[key].style.display = key === tabName ? 'block' : 'none';
        }
      });
    });
  });
}

function setupForms() {
  const forms = document.querySelectorAll('.admin-form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Show success message
      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;
      btn.innerHTML = '<ion-icon name="checkmark-outline"></ion-icon> Saved!';
      btn.style.background = 'var(--admin-success)';
      
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '';
      }, 2000);
    });
  });
}

