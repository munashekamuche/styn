'use strict';

/**
 * Enhanced Reel Interactions
 * Handles play/pause, likes, comments, shares, and scrolling
 */

// Make functions globally available immediately
window.togglePlayPause = function(btn) {
  const reelItem = btn.closest('.reel-item');
  const video = reelItem.querySelector('.reel-video-player');
  const playIcon = btn.querySelector('.play-icon');
  
  if (video.paused) {
    video.play();
    btn.style.display = 'none';
  } else {
    video.pause();
    btn.style.display = 'flex';
    playIcon.name = 'play-circle';
  }
};

window.handleLike = function(btn) {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  if (!user) {
    alert('Please sign in to like reels');
    window.location.href = './login.html';
    return;
  }
  
  const outlineIcon = btn.querySelector('.icon-outline');
  const filledIcon = btn.querySelector('.icon-filled');
  const countSpan = btn.querySelector('.interaction-count');
  
  const isLiked = filledIcon.style.display !== 'none';
  
  if (isLiked) {
    outlineIcon.style.display = 'block';
    filledIcon.style.display = 'none';
    outlineIcon.style.color = 'var(--white)';
    
    // Decrease count
    let count = parseInt(countSpan.textContent.replace(/[^\d]/g, ''));
    count = Math.max(0, count - 1);
    countSpan.textContent = formatCount(count);
  } else {
    outlineIcon.style.display = 'none';
    filledIcon.style.display = 'block';
    filledIcon.style.color = 'var(--primary-orange)';
    
    // Animate like
    filledIcon.style.animation = 'likeAnimation 0.5s ease';
    
    // Increase count
    let count = parseInt(countSpan.textContent.replace(/[^\d]/g, ''));
    count = count + 1;
    countSpan.textContent = formatCount(count);
  }
};

window.bookmarkReel = function(btn) {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  if (!user) {
    alert('Please sign in to bookmark reels');
    window.location.href = './login.html';
    return;
  }
  
  const outlineIcon = btn.querySelector('.icon-outline');
  const filledIcon = btn.querySelector('.icon-filled');
  
  const isBookmarked = filledIcon.style.display !== 'none';
  
  if (isBookmarked) {
    outlineIcon.style.display = 'block';
    filledIcon.style.display = 'none';
  } else {
    outlineIcon.style.display = 'none';
    filledIcon.style.display = 'block';
    filledIcon.style.color = 'var(--primary-yellow)';
  }
};

window.followUser = function(btn) {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  if (!user) {
    alert('Please sign in to follow users');
    window.location.href = './login.html';
    return;
  }
  
  const icon = btn.querySelector('ion-icon');
  const isFollowing = icon.name === 'checkmark';
  
  if (isFollowing) {
    icon.name = 'add';
    btn.style.background = 'var(--primary-orange)';
  } else {
    icon.name = 'checkmark';
    btn.style.background = 'var(--gray-dark)';
  }
};

window.openComments = function(reelId) {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  if (!user) {
    alert('Please sign in to comment');
    window.location.href = './login.html';
    return;
  }
  
  document.getElementById('commentModal').style.display = 'flex';
  
  // Load comments for this reel (demo)
  const commentsList = document.getElementById('commentsList');
  if (commentsList) {
    commentsList.innerHTML = `
      <div class="comment-item">
        <div class="comment-avatar">
          <ion-icon name="person"></ion-icon>
        </div>
        <div class="comment-content">
          <strong>@user1</strong>
          <p>This is amazing! 🔥</p>
        </div>
      </div>
      <div class="comment-item">
        <div class="comment-avatar">
          <ion-icon name="person"></ion-icon>
        </div>
        <div class="comment-content">
          <strong>@user2</strong>
          <p>Love this content!</p>
        </div>
      </div>
    `;
  }
};

window.shareReel = function(reelId) {
  if (navigator.share) {
    navigator.share({
      title: 'Check out this reel on Styn!',
      url: window.location.href + '?reel=' + reelId
    }).catch(() => {
      copyToClipboard();
    });
  } else {
    copyToClipboard();
  }
};

function copyToClipboard() {
  navigator.clipboard.writeText(window.location.href);
  alert('Link copied to clipboard!');
}

function formatCount(count) {
  if (count >= 1000000) {
    return (count / 1000000).toFixed(1) + 'M';
  } else if (count >= 1000) {
    return (count / 1000).toFixed(1) + 'K';
  }
  return count.toString();
}

// Auto-play videos on scroll
let reelItems, reelVideoPlayers;

document.addEventListener('DOMContentLoaded', () => {
  reelItems = document.querySelectorAll('.reel-item');
  reelVideoPlayers = document.querySelectorAll('.reel-video-player');

  // Intersection Observer for auto-play
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.6
  };

  const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const video = entry.target;
      const playPauseBtn = entry.target.closest('.reel-item').querySelector('.reel-play-pause');
      
      if (entry.isIntersecting) {
        video.play().catch(() => {
          // Autoplay blocked - show play button
          if (playPauseBtn) playPauseBtn.style.display = 'flex';
        });
        if (playPauseBtn) playPauseBtn.style.display = 'none';
      } else {
        video.pause();
        if (playPauseBtn) playPauseBtn.style.display = 'flex';
      }
    });
  }, observerOptions);

  // Observe all videos
  reelVideoPlayers.forEach(video => {
    videoObserver.observe(video);
    
    // Handle video end
    video.addEventListener('ended', () => {
      video.currentTime = 0;
      video.play();
    });
  });

  // Smooth scroll behavior
  let isScrolling = false;
  let scrollTimeout;

  window.addEventListener('scroll', () => {
    if (!isScrolling) {
      isScrolling = true;
    }
    
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      isScrolling = false;
    }, 150);
  });
});

