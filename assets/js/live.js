'use strict';

/**
 * Live Streaming System
 * Handles live streams, replays, and podcasts
 */

// Live streams data (Replace with API)
const liveStreams = [
  {
    id: 1,
    title: 'Live Stream Title',
    streamer: '@streamer_name',
    streamerAvatar: './assets/images/default-avatar.png',
    thumbnail: './assets/images/movie-4.png',
    viewers: 1200,
    isLive: true
  },
  // Add more streams...
];

const replayStreams = [
  {
    id: 1,
    title: 'Past Live Stream',
    streamer: '@streamer_name',
    thumbnail: './assets/images/movie-5.png',
    streamedAt: '2 hours ago',
    views: 12000
  },
  // Add more replays...
];

const podcasts = [
  {
    id: 1,
    title: 'Podcast Episode Title',
    description: 'Episode description...',
    thumbnail: './assets/images/movie-6.png',
    publishedAt: '1 day ago',
    duration: '45 min'
  },
  // Add more podcasts...
];

// Load live streams
function loadLiveStreams() {
  const liveStreamsList = document.getElementById('liveStreamsList');
  if (!liveStreamsList) return;
  
  if (liveStreams.length === 0) {
    liveStreamsList.innerHTML = '<p style="color: var(--gray-light); text-align: center; padding: 40px;">No live streams at the moment</p>';
    return;
  }
  
  liveStreamsList.innerHTML = liveStreams.map(stream => `
    <li>
      <div class="stream-card live-now">
        <a href="#" class="stream-link">
          <figure class="card-banner">
            <img src="${stream.thumbnail}" alt="${stream.title}">
            <div class="live-indicator">
              <span class="live-dot"></span>
              <span>LIVE</span>
            </div>
            <div class="viewer-count">
              <ion-icon name="people"></ion-icon>
              <span>${formatCount(stream.viewers)} watching</span>
            </div>
          </figure>
        </a>
        <div class="card-content">
          <h3 class="card-title">${stream.title}</h3>
          <div class="stream-author">
            <img src="${stream.streamerAvatar}" alt="${stream.streamer}" class="streamer-avatar">
            <span>${stream.streamer}</span>
          </div>
        </div>
      </div>
    </li>
  `).join('');
}

// Load replay streams
function loadReplayStreams() {
  const replayStreamsList = document.getElementById('replayStreamsList');
  if (!replayStreamsList) return;
  
  replayStreamsList.innerHTML = replayStreams.map(replay => `
    <li>
      <div class="stream-card">
        <a href="#" class="stream-link">
          <figure class="card-banner">
            <img src="${replay.thumbnail}" alt="${replay.title}">
            <div class="play-overlay">
              <ion-icon name="play-circle"></ion-icon>
            </div>
            <div class="replay-badge">REPLAY</div>
          </figure>
        </a>
        <div class="card-content">
          <h3 class="card-title">${replay.title}</h3>
          <div class="card-meta">
            <span class="stream-date">Streamed ${replay.streamedAt}</span>
            <span class="views">${formatCount(replay.views)} views</span>
          </div>
        </div>
      </div>
    </li>
  `).join('');
}

// Load podcasts
function loadPodcasts() {
  const podcastsList = document.getElementById('podcastsList');
  if (!podcastsList) return;
  
  podcastsList.innerHTML = podcasts.map(podcast => `
    <li>
      <div class="podcast-card">
        <a href="#" class="podcast-link">
          <figure class="card-banner">
            <img src="${podcast.thumbnail}" alt="${podcast.title}">
            <div class="play-overlay">
              <ion-icon name="play-circle"></ion-icon>
            </div>
          </figure>
        </a>
        <div class="card-content">
          <h3 class="card-title">${podcast.title}</h3>
          <p class="podcast-description">${podcast.description}</p>
          <div class="card-meta">
            <span class="podcast-date">Published ${podcast.publishedAt}</span>
            <span class="duration">${podcast.duration}</span>
          </div>
        </div>
      </div>
    </li>
  `).join('');
}

// Format count
function formatCount(count) {
  if (count >= 1000000) {
    return (count / 1000000).toFixed(1) + 'M';
  } else if (count >= 1000) {
    return (count / 1000).toFixed(1) + 'K';
  }
  return count.toString();
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  loadLiveStreams();
  loadReplayStreams();
  loadPodcasts();
  
  // Check if user can go live
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const goLiveBtn = document.getElementById('goLiveBtn');
  if (goLiveBtn && user) {
    goLiveBtn.style.display = 'block';
  }
});

