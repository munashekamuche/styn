'use strict';

/**
 * My Reel System
 * Handles TikTok-style video feed and uploads
 */

// Reel videos data (Replace with API)
const reelVideos = [
  {
    id: 1,
    title: 'Reel Video Title',
    description: 'Video description goes here...',
    author: '@username',
    authorAvatar: './assets/images/default-avatar.png',
    videoUrl: '#',
    likes: 12000,
    comments: 1200,
    shares: 890,
    views: 850000
  },
  // Add more videos...
];

// Upload form handler
const uploadForm = document.getElementById('uploadForm');
if (uploadForm) {
  uploadForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const videoFile = document.getElementById('videoFile').files[0];
    const title = uploadForm.querySelector('input[type="text"]').value;
    const description = uploadForm.querySelector('textarea').value;
    const thumbnail = document.getElementById('thumbnailFile').files[0];
    
    if (!videoFile) {
      alert('Please select a video file');
      return;
    }
    
    // Check video duration (max 10 minutes)
    // In real app, validate video duration
    
    // Simulate upload
    alert('Video uploaded successfully! (Demo mode)');
    document.getElementById('uploadModal').style.display = 'none';
    uploadForm.reset();
    
    // In real app, upload to server and refresh feed
  });
}

// Video file input handler
const videoFileInput = document.getElementById('videoFile');
if (videoFileInput) {
  videoFileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type and size
      const maxSize = 500 * 1024 * 1024; // 500MB
      if (file.size > maxSize) {
        alert('File size too large. Maximum 500MB.');
        e.target.value = '';
        return;
      }
      
      // Show preview or file name
      const uploadArea = document.getElementById('uploadArea');
      if (uploadArea) {
        uploadArea.querySelector('p').textContent = `Selected: ${file.name}`;
      }
    }
  });
}

// Like/Comment/Share handlers
document.addEventListener('click', (e) => {
  const actionBtn = e.target.closest('.reel-action-btn');
  if (!actionBtn) return;
  
  const action = actionBtn.dataset.action;
  const countSpan = actionBtn.querySelector('.action-count');
  
  if (action === 'like') {
    // Toggle like
    const icon = actionBtn.querySelector('ion-icon');
    const isLiked = icon.name === 'heart';
    
    icon.name = isLiked ? 'heart-outline' : 'heart';
    icon.style.color = isLiked ? 'var(--white)' : 'var(--primary-orange)';
    
    if (countSpan) {
      let count = parseInt(countSpan.textContent.replace(/[^\d]/g, ''));
      count = isLiked ? count - 1 : count + 1;
      countSpan.textContent = formatCount(count);
    }
  } else if (action === 'comment') {
    // Open comment modal
    document.getElementById('commentModal').style.display = 'flex';
  } else if (action === 'share') {
    // Share functionality
    if (navigator.share) {
      navigator.share({
        title: 'Check out this reel!',
        url: window.location.href
      });
    } else {
      // Fallback: copy link
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  }
});

// Comment form handler
const commentForm = document.getElementById('commentForm');
if (commentForm) {
  commentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const input = commentForm.querySelector('input[type="text"]');
    const comment = input.value.trim();
    
    if (!comment) return;
    
    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (!user) {
      alert('Please sign in to comment');
      window.location.href = './login.html';
      return;
    }
    
    // Add comment to list
    const commentsList = document.getElementById('commentsList');
    if (commentsList) {
      const commentEl = document.createElement('div');
      commentEl.className = 'comment-item';
      commentEl.innerHTML = `
        <img src="${user.profilePicture || './assets/images/default-avatar.png'}" alt="${user.username}" class="comment-avatar">
        <div class="comment-content">
          <strong>${user.username}</strong>
          <p>${comment}</p>
        </div>
      `;
      commentsList.appendChild(commentEl);
    }
    
    input.value = '';
  });
}

// Format count (e.g., 12000 -> 12K)
function formatCount(count) {
  if (count >= 1000000) {
    return (count / 1000000).toFixed(1) + 'M';
  } else if (count >= 1000) {
    return (count / 1000).toFixed(1) + 'K';
  }
  return count.toString();
}

// Scroll detection for auto-play (simplified)
let currentVideoIndex = 0;
const reelVideoElements = document.querySelectorAll('.reel-video');

if (reelVideos.length > 0) {
  // Intersection Observer for auto-play
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const video = entry.target.querySelector('.reel-player');
        if (video) {
          video.play().catch(() => {
            // Autoplay blocked
          });
        }
      } else {
        const video = entry.target.querySelector('.reel-player');
        if (video) {
          video.pause();
        }
      }
    });
  }, { threshold: 0.5 });
  
  reelVideoElements.forEach(video => observer.observe(video));
}

