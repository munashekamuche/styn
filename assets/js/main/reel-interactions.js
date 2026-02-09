'use strict';

/**
 * Enhanced Reel Interactions
 * Handles play/pause, likes, comments, shares, and scrolling
 * Full-screen reel experience
 */

// Make functions globally available immediately
window.togglePlayPause = function(btn) {
  const reelItem = btn.closest('.reel-item');
  const video = reelItem.querySelector('.reel-video-player');
  
  if (video.paused) {
    video.play();
    btn.classList.remove('paused');
  } else {
    video.pause();
    btn.classList.add('paused');
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
    
    let count = parseInt(countSpan.textContent.replace(/[^\d]/g, ''));
    count = Math.max(0, count - 1);
    countSpan.textContent = formatCount(count);
  } else {
    outlineIcon.style.display = 'none';
    filledIcon.style.display = 'block';
    filledIcon.style.color = 'var(--primary-orange)';
    filledIcon.style.animation = 'likeAnimation 0.5s ease';
    
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

// Auto-play videos on scroll with proper fullscreen support
document.addEventListener('DOMContentLoaded', () => {
  const reelFeed = document.getElementById('reelFeed');
  if (!reelFeed) return;

  const reelVideoPlayers = document.querySelectorAll('.reel-video-player');

  // Use reelFeed as the scroll root for IntersectionObserver
  const observerOptions = {
    root: reelFeed,
    rootMargin: '0px',
    threshold: 0.6
  };

  const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const video = entry.target;
      const reelItem = video.closest('.reel-item');
      if (!reelItem) return;
      const playPauseBtn = reelItem.querySelector('.reel-play-pause');
      
      if (entry.isIntersecting) {
        // Pause all other videos first
        reelVideoPlayers.forEach(v => {
          if (v !== video) {
            v.pause();
            const otherBtn = v.closest('.reel-item')?.querySelector('.reel-play-pause');
            if (otherBtn) otherBtn.classList.add('paused');
          }
        });
        
        video.play().then(() => {
          if (playPauseBtn) playPauseBtn.classList.remove('paused');
        }).catch(() => {
          // Autoplay blocked - show play button
          if (playPauseBtn) playPauseBtn.classList.add('paused');
        });
      } else {
        video.pause();
        if (playPauseBtn) playPauseBtn.classList.add('paused');
      }
    });
  }, observerOptions);

  // Observe all videos
  reelVideoPlayers.forEach(video => {
    videoObserver.observe(video);
    
    // Loop video
    video.addEventListener('ended', () => {
      video.currentTime = 0;
      video.play();
    });
  });

  // Keyboard navigation: arrow keys to scroll between reels
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      const reelItems = document.querySelectorAll('.reel-item');
      const feedRect = reelFeed.getBoundingClientRect();
      let currentIdx = 0;
      
      reelItems.forEach((item, idx) => {
        const rect = item.getBoundingClientRect();
        if (Math.abs(rect.top - feedRect.top) < 50) {
          currentIdx = idx;
        }
      });
      
      const nextIdx = e.key === 'ArrowDown' 
        ? Math.min(currentIdx + 1, reelItems.length - 1)
        : Math.max(currentIdx - 1, 0);
      
      reelItems[nextIdx].scrollIntoView({ behavior: 'smooth' });
    }
    
    // Space to play/pause current reel
    if (e.key === ' ' && document.activeElement.tagName !== 'INPUT') {
      e.preventDefault();
      const reelItems = document.querySelectorAll('.reel-item');
      const feedRect = reelFeed.getBoundingClientRect();
      
      reelItems.forEach(item => {
        const rect = item.getBoundingClientRect();
        if (Math.abs(rect.top - feedRect.top) < 50) {
          const btn = item.querySelector('.reel-play-pause');
          if (btn) togglePlayPause(btn);
        }
      });
    }
  });
});
