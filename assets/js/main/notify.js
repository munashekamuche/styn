'use strict';

/**
 * Styn Notification System
 * Beautiful custom modals & toasts to replace browser alert() dialogs
 */

(function () {
  // Inject notification HTML into the page
  const notifContainer = document.createElement('div');
  notifContainer.id = 'stynNotifications';
  notifContainer.innerHTML = `
    <!-- Toast Container (top-right corner) -->
    <div class="styn-toast-container" id="stynToastContainer"></div>

    <!-- Modal Overlay -->
    <div class="styn-modal-overlay" id="stynModalOverlay" style="display:none;">
      <div class="styn-modal">
        <div class="styn-modal-icon" id="stynModalIcon"></div>
        <h3 class="styn-modal-title" id="stynModalTitle"></h3>
        <div class="styn-modal-body" id="stynModalBody"></div>
        <div class="styn-modal-actions" id="stynModalActions"></div>
      </div>
    </div>
  `;
  document.addEventListener('DOMContentLoaded', () => {
    document.body.appendChild(notifContainer);
  });

  // ─── ICONS ──────────────────────────────────────────────
  const ICONS = {
    success: `<svg viewBox="0 0 52 52" class="styn-svg-icon success"><circle cx="26" cy="26" r="25" fill="none"/><path fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/></svg>`,
    error: `<svg viewBox="0 0 52 52" class="styn-svg-icon error"><circle cx="26" cy="26" r="25" fill="none"/><path fill="none" d="M17 17l18 18M35 17L17 35"/></svg>`,
    warning: `<svg viewBox="0 0 52 52" class="styn-svg-icon warning"><circle cx="26" cy="26" r="25" fill="none"/><line x1="26" y1="15" x2="26" y2="30" fill="none"/><circle cx="26" cy="36" r="2" class="styn-svg-dot"/></svg>`,
    info: `<svg viewBox="0 0 52 52" class="styn-svg-icon info"><circle cx="26" cy="26" r="25" fill="none"/><circle cx="26" cy="16" r="2" class="styn-svg-dot"/><line x1="26" y1="23" x2="26" y2="38" fill="none"/></svg>`
  };

  // ─── TOAST ──────────────────────────────────────────────
  /**
   * Show a small toast notification
   * @param {string} message - The message to display
   * @param {'success'|'error'|'warning'|'info'} type - Toast type
   * @param {number} duration - Auto-dismiss in ms (default 3500)
   */
  function showToast(message, type = 'info', duration = 3500) {
    const container = document.getElementById('stynToastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `styn-toast styn-toast-${type}`;
    toast.innerHTML = `
      <div class="styn-toast-icon">${ICONS[type] || ICONS.info}</div>
      <div class="styn-toast-msg">${escapeHtml(message)}</div>
      <button class="styn-toast-close" onclick="this.parentElement.classList.add('styn-toast-exit')">&times;</button>
    `;

    container.appendChild(toast);

    // Trigger entrance animation
    requestAnimationFrame(() => toast.classList.add('styn-toast-enter'));

    // Auto-dismiss
    const timer = setTimeout(() => dismissToast(toast), duration);
    toast.addEventListener('mouseenter', () => clearTimeout(timer));
    toast.addEventListener('mouseleave', () => setTimeout(() => dismissToast(toast), 1500));

    // Remove after exit animation
    toast.addEventListener('animationend', (e) => {
      if (e.animationName === 'stynToastExit') toast.remove();
    });
  }

  function dismissToast(toast) {
    if (toast && toast.parentElement) {
      toast.classList.add('styn-toast-exit');
    }
  }

  // ─── MODAL ──────────────────────────────────────────────
  /**
   * Show a centered modal notification
   * @param {Object} opts
   * @param {'success'|'error'|'warning'|'info'} opts.type
   * @param {string} opts.title
   * @param {string} opts.message - Plain text or HTML
   * @param {string} [opts.confirmText='OK']
   * @param {Function} [opts.onConfirm]
   * @param {string} [opts.cancelText] - If provided, shows a cancel button
   * @param {Function} [opts.onCancel]
   * @param {boolean} [opts.html=false] - If true, message is rendered as HTML
   */
  function showModal(opts = {}) {
    const overlay = document.getElementById('stynModalOverlay');
    if (!overlay) return;

    const type = opts.type || 'info';
    const title = opts.title || capitalize(type);
    const message = opts.message || '';
    const confirmText = opts.confirmText || 'OK';

    // Icon
    document.getElementById('stynModalIcon').innerHTML = ICONS[type] || ICONS.info;
    document.getElementById('stynModalIcon').className = `styn-modal-icon styn-modal-icon-${type}`;

    // Title
    document.getElementById('stynModalTitle').textContent = title;

    // Body
    const body = document.getElementById('stynModalBody');
    if (opts.html) {
      body.innerHTML = message;
    } else {
      body.innerHTML = escapeHtml(message).replace(/\n/g, '<br>');
    }

    // Actions
    const actions = document.getElementById('stynModalActions');
    actions.innerHTML = '';

    if (opts.cancelText) {
      const cancelBtn = document.createElement('button');
      cancelBtn.className = 'styn-modal-btn styn-modal-btn-cancel';
      cancelBtn.textContent = opts.cancelText;
      cancelBtn.onclick = () => {
        closeModal();
        if (opts.onCancel) opts.onCancel();
      };
      actions.appendChild(cancelBtn);
    }

    const confirmBtn = document.createElement('button');
    confirmBtn.className = `styn-modal-btn styn-modal-btn-${type}`;
    confirmBtn.textContent = confirmText;
    confirmBtn.onclick = () => {
      closeModal();
      if (opts.onConfirm) opts.onConfirm();
    };
    actions.appendChild(confirmBtn);

    // Show
    overlay.style.display = 'flex';
    requestAnimationFrame(() => overlay.classList.add('styn-modal-active'));

    // Focus confirm button
    setTimeout(() => confirmBtn.focus(), 100);

    // Close on overlay click
    overlay.onclick = (e) => {
      if (e.target === overlay) {
        closeModal();
        if (opts.onCancel) opts.onCancel();
      }
    };

    // Close on Escape
    const escHandler = (e) => {
      if (e.key === 'Escape') {
        closeModal();
        if (opts.onCancel) opts.onCancel();
        document.removeEventListener('keydown', escHandler);
      }
    };
    document.addEventListener('keydown', escHandler);
  }

  function closeModal() {
    const overlay = document.getElementById('stynModalOverlay');
    if (!overlay) return;
    overlay.classList.remove('styn-modal-active');
    setTimeout(() => { overlay.style.display = 'none'; }, 250);
  }

  // ─── CONFIRM DIALOG ────────────────────────────────────
  /**
   * Show a confirm dialog (returns a Promise)
   * @param {string} message
   * @param {string} [title='Confirm']
   * @returns {Promise<boolean>}
   */
  function showConfirm(message, title = 'Confirm') {
    return new Promise((resolve) => {
      showModal({
        type: 'warning',
        title,
        message,
        confirmText: 'Yes',
        cancelText: 'Cancel',
        onConfirm: () => resolve(true),
        onCancel: () => resolve(false)
      });
    });
  }

  // ─── HELPERS ────────────────────────────────────────────
  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  // ─── EXPOSE GLOBALLY ───────────────────────────────────
  window.stynToast = showToast;
  window.stynModal = showModal;
  window.stynConfirm = showConfirm;
})();

