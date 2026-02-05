'use strict';

/**
 * Authentication System
 * Handles login, signup, and user session management
 */

// Check if user is logged in
function checkAuth() {
  const user = localStorage.getItem('user');
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  
  if (user) {
    const userData = JSON.parse(user);
    updateUIForLoggedInUser(userData, isAdmin);
    return userData;
  } else {
    updateUIForGuest();
    return null;
  }
}

// Update UI for logged in user
function updateUIForLoggedInUser(userData, isAdmin) {
  // Update profile display
  const userProfile = document.getElementById('userProfile');
  const authButton = document.getElementById('authButton');
  const goLiveBtn = document.getElementById('goLiveBtn');
  const reelUploadBtn = document.getElementById('reelUploadBtn');
  const accountBtn = document.getElementById('accountBtn');
  const signInDropdownBtn = document.getElementById('signInDropdownBtn');
  const signOutBtn = document.getElementById('signOutBtn');
  const profileEmail = document.getElementById('profileEmail');
  
  if (userProfile) {
    userProfile.style.display = 'flex';
    const profileAvatar = document.getElementById('profileAvatar');
    const profileInitials = document.getElementById('profileInitials');
    const profileUsername = document.getElementById('profileUsername');
    const profileEmail = document.getElementById('profileEmail');
    const dropdownDivider = document.getElementById('dropdownDivider');
    const myProfileItem = document.getElementById('myProfileItem');
    const settingsItem = document.getElementById('settingsItem');
    
    if (userData.profilePicture) {
      if (profileAvatar) {
        profileAvatar.src = userData.profilePicture;
        profileAvatar.style.display = 'block';
      }
      if (profileInitials) profileInitials.style.display = 'none';
    } else {
      if (profileAvatar) profileAvatar.style.display = 'none';
      if (profileInitials) {
        profileInitials.style.display = 'flex';
        profileInitials.textContent = userData.username.charAt(0).toUpperCase();
      }
    }
    
    if (profileUsername) {
      profileUsername.textContent = userData.username;
    }
    
    if (profileEmail) {
      profileEmail.textContent = userData.email || userData.phone || '';
    }
    
    // Show dropdown items for logged in users
    if (dropdownDivider) dropdownDivider.style.display = 'block';
    if (myProfileItem) myProfileItem.style.display = 'flex';
    if (settingsItem) settingsItem.style.display = 'flex';
  }
  
  // Update account button text
  if (accountBtn) {
    const accountText = accountBtn.querySelector('span');
    if (accountText) {
      accountText.textContent = userData.username || 'My Account';
    }
  }
  
  // Show/hide dropdown items
  if (signInDropdownBtn) signInDropdownBtn.style.display = 'none';
  if (signOutBtn) signOutBtn.style.display = 'block';
  
  if (signOutBtn) {
    signOutBtn.onclick = () => {
      localStorage.removeItem('user');
      localStorage.removeItem('isAdmin');
      window.location.href = './index.html';
    };
  }
  
  if (authButton) {
    authButton.textContent = 'Sign Out';
    authButton.onclick = () => {
      localStorage.removeItem('user');
      localStorage.removeItem('isAdmin');
      window.location.href = './index.html';
    };
  }
  
  if (goLiveBtn) goLiveBtn.style.display = 'block';
  if (reelUploadBtn) reelUploadBtn.style.display = 'block';
}

// Update UI for guest
function updateUIForGuest() {
  const userProfile = document.getElementById('userProfile');
  const authButton = document.getElementById('authButton');
  const accountBtn = document.getElementById('accountBtn');
  const signInDropdownBtn = document.getElementById('signInDropdownBtn');
  const signOutBtn = document.getElementById('signOutBtn');
  
  if (userProfile) userProfile.style.display = 'none';
  
  // Update account button
  if (accountBtn) {
    const accountText = accountBtn.querySelector('span');
    if (accountText) {
      accountText.textContent = 'My Account';
    }
  }
  
  // Show/hide dropdown items
  if (signInDropdownBtn) signInDropdownBtn.style.display = 'block';
  if (signOutBtn) signOutBtn.style.display = 'none';
  
  if (authButton) {
    authButton.textContent = 'Sign In';
    authButton.onclick = () => window.location.href = './login.html';
  }
}

// Login form handler
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const identifier = document.getElementById('loginIdentifier').value;
    const password = document.getElementById('loginPassword').value;
    
    // Simulate API call - Replace with actual API
    const userData = {
      username: identifier.includes('@') ? identifier.split('@')[0] : 'munashe',
      email: identifier.includes('@') ? identifier : null,
      phone: identifier.includes('@') ? null : identifier,
      profilePicture: null
    };
    
    // Check if admin (demo)
    const isAdmin = identifier === 'admin@styn.com' && password === 'admin123';
    
    localStorage.setItem('user', JSON.stringify(userData));
    if (isAdmin) {
      localStorage.setItem('isAdmin', 'true');
    }
    
    // Redirect
    if (isAdmin) {
      window.location.href = './admin-dashboard.html';
    } else {
      window.location.href = './index.html';
    }
  });
}

// Signup form handler
const signupForm = document.getElementById('signupForm');
if (signupForm) {
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const username = document.getElementById('signupUsername').value;
    const identifier = document.getElementById('signupIdentifier').value;
    const password = document.getElementById('signupPassword').value;
    const profilePicture = document.getElementById('profilePicture').files[0];
    
    // Simulate profile picture upload
    let profilePictureUrl = null;
    if (profilePicture) {
      // In real app, upload to server and get URL
      profilePictureUrl = URL.createObjectURL(profilePicture);
    }
    
    // Simulate API call - Replace with actual API
    const userData = {
      username: username,
      email: identifier.includes('@') ? identifier : null,
      phone: identifier.includes('@') ? null : identifier,
      profilePicture: profilePictureUrl
    };
    
    localStorage.setItem('user', JSON.stringify(userData));
    
    // Redirect to home
    window.location.href = './index.html';
  });
}

// Check auth on page load
document.addEventListener('DOMContentLoaded', () => {
  checkAuth();
  
  // Prevent access to chat if not logged in
  if (window.location.pathname.includes('chat.html')) {
    const user = checkAuth();
    if (!user) {
      alert('Please sign in to access chat');
      window.location.href = './login.html';
    }
  }
  
  // Prevent access to admin if not admin
  if (window.location.pathname.includes('admin-dashboard.html')) {
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    if (!isAdmin) {
      alert('Access denied. Admin only.');
      window.location.href = './index.html';
    }
  }
});

