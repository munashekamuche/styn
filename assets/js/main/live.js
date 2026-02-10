'use strict';

/**
 * Live & Podcast Broadcasting System
 * Handles live streams, replays, podcasts, and scheduled events
 */

// ==========================================
// SAMPLE DATA
// ==========================================

const liveStreams = [
  {
    id: 1,
    title: 'Friday Night Music Jam — Live Freestyle Session',
    streamer: 'DJ_VibeKing',
    category: 'music',
    thumbnail: './assets/images/movies/movie-4.png',
    viewers: 2340,
    duration: '1:23:45',
    isLive: true,
    featured: true,
    tags: ['music', 'freestyle', 'live'],
    description: 'Join me for an epic Friday night music session! Taking requests from chat 🎵'
  },
  {
    id: 2,
    title: 'Warzone Tournament — Final Round',
    streamer: 'ProGamer_X',
    category: 'gaming',
    thumbnail: './assets/images/movies/movie-1.png',
    viewers: 1580,
    duration: '0:45:12',
    isLive: true,
    tags: ['gaming', 'tournament', 'competitive']
  },
  {
    id: 3,
    title: 'Morning Talk: Crypto & Finance Updates',
    streamer: 'FinanceGuru',
    category: 'talk',
    thumbnail: './assets/images/movies/movie-3.png',
    viewers: 890,
    duration: '0:32:08',
    isLive: true,
    tags: ['finance', 'crypto', 'talk show']
  },
  {
    id: 4,
    title: 'Live Cooking — Jollof Rice Battle 🍚',
    streamer: 'ChefTaste',
    category: 'entertainment',
    thumbnail: './assets/images/movies/movie-7.png',
    viewers: 670,
    duration: '0:18:30',
    isLive: true,
    tags: ['cooking', 'food', 'entertainment']
  },
  {
    id: 5,
    title: 'Gym Session — Chest & Triceps Day',
    streamer: 'FitnessBeast',
    category: 'sports',
    thumbnail: './assets/images/movies/movie-8.png',
    viewers: 320,
    duration: '0:55:00',
    isLive: true,
    tags: ['fitness', 'gym', 'workout']
  }
];

const replayStreams = [
  {
    id: 101,
    title: 'Saturday Night Party Mix — 4 Hour Set',
    streamer: 'DJ_VibeKing',
    category: 'music',
    thumbnail: './assets/images/movies/movie-5.png',
    views: 45200,
    streamedAt: '2 hours ago',
    duration: '4:12:33'
  },
  {
    id: 102,
    title: 'Fortnite Season 8 — First Look',
    streamer: 'ProGamer_X',
    category: 'gaming',
    thumbnail: './assets/images/movies/movie-2.png',
    views: 32100,
    streamedAt: '5 hours ago',
    duration: '2:45:10'
  },
  {
    id: 103,
    title: 'Business Masterclass: Starting from Zero',
    streamer: 'FinanceGuru',
    category: 'talk',
    thumbnail: './assets/images/movies/movie-6.png',
    views: 18900,
    streamedAt: '1 day ago',
    duration: '1:30:00'
  },
  {
    id: 104,
    title: 'Draw With Me — Digital Art Session',
    streamer: 'ArtistSoul',
    category: 'entertainment',
    thumbnail: './assets/images/movies/series-1.png',
    views: 12400,
    streamedAt: '1 day ago',
    duration: '2:10:45'
  },
  {
    id: 105,
    title: 'Live Soccer Commentary — PSL Match',
    streamer: 'SportsCaster',
    category: 'sports',
    thumbnail: './assets/images/movies/series-2.png',
    views: 67800,
    streamedAt: '2 days ago',
    duration: '1:52:20'
  },
  {
    id: 106,
    title: 'Coding a Website in 2 Hours — Live Challenge',
    streamer: 'DevMaster',
    category: 'education',
    thumbnail: './assets/images/movies/series-3.png',
    views: 9300,
    streamedAt: '3 days ago',
    duration: '2:05:18'
  },
  {
    id: 107,
    title: 'Fashion Show — Spring Collection Preview',
    streamer: 'StyleQueen',
    category: 'entertainment',
    thumbnail: './assets/images/movies/series-4.png',
    views: 28700,
    streamedAt: '4 days ago',
    duration: '1:15:00'
  },
  {
    id: 108,
    title: 'Election Night Coverage — Live Updates',
    streamer: 'NewsDesk',
    category: 'news',
    thumbnail: './assets/images/movies/upcoming-1.png',
    views: 124000,
    streamedAt: '5 days ago',
    duration: '6:30:00'
  }
];

const podcasts = [
  {
    id: 201,
    title: 'The Hustle Hour',
    episode: 'Ep 45: Side Hustles That Actually Work',
    host: 'MoneyMoves',
    thumbnail: './assets/images/movies/upcoming-2.png',
    listens: 34500,
    publishedAt: '3 hours ago',
    duration: '48 min',
    episodes: 45
  },
  {
    id: 202,
    title: 'Love & Life Podcast',
    episode: 'Ep 12: Red Flags vs Green Flags in Dating',
    host: 'RelationshipCoach',
    thumbnail: './assets/images/movies/upcoming-3.png',
    listens: 22100,
    publishedAt: '1 day ago',
    duration: '35 min',
    episodes: 12
  },
  {
    id: 203,
    title: 'Tech Talk Daily',
    episode: 'Ep 89: AI is Taking Over — Should We Be Worried?',
    host: 'TechExplorer',
    thumbnail: './assets/images/movies/upcoming-4.png',
    listens: 18700,
    publishedAt: '2 days ago',
    duration: '52 min',
    episodes: 89
  },
  {
    id: 204,
    title: 'True Crime Files',
    episode: 'Ep 33: The Disappearance of Flight 370',
    host: 'CrimeInvestigator',
    thumbnail: './assets/images/movies/movie-5.png',
    listens: 56300,
    publishedAt: '3 days ago',
    duration: '1 hr 5 min',
    episodes: 33
  },
  {
    id: 205,
    title: 'African Vibes',
    episode: 'Ep 21: Amapiano — The Sound That Took Over the World',
    host: 'MusicCulture',
    thumbnail: './assets/images/movies/movie-7.png',
    listens: 41200,
    publishedAt: '4 days ago',
    duration: '40 min',
    episodes: 21
  },
  {
    id: 206,
    title: 'Mind & Wellness',
    episode: 'Ep 8: Managing Anxiety in a Chaotic World',
    host: 'WellnessGuru',
    thumbnail: './assets/images/movies/movie-8.png',
    listens: 15600,
    publishedAt: '5 days ago',
    duration: '30 min',
    episodes: 8
  }
];

const scheduledEvents = [
  {
    id: 301,
    title: 'New Year Countdown Party — DJ Set',
    host: 'DJ_VibeKing',
    thumbnail: './assets/images/movies/movie-4.png',
    scheduledAt: 'Feb 14, 2026 • 8:00 PM',
    category: 'music',
    interested: 2340
  },
  {
    id: 302,
    title: 'FIFA Tournament — Open Registration',
    host: 'ProGamer_X',
    thumbnail: './assets/images/movies/movie-1.png',
    scheduledAt: 'Feb 15, 2026 • 3:00 PM',
    category: 'gaming',
    interested: 890
  },
  {
    id: 303,
    title: 'Startup Pitch Night — Live from Harare',
    host: 'FinanceGuru',
    thumbnail: './assets/images/movies/movie-3.png',
    scheduledAt: 'Feb 16, 2026 • 6:00 PM',
    category: 'talk',
    interested: 1560
  },
  {
    id: 304,
    title: 'Valentine Special — Couples Q&A',
    host: 'RelationshipCoach',
    thumbnail: './assets/images/movies/upcoming-3.png',
    scheduledAt: 'Feb 14, 2026 • 7:00 PM',
    category: 'entertainment',
    interested: 3200
  }
];


// ==========================================
// FORMAT HELPERS
// ==========================================

function formatCount(count) {
  if (count >= 1000000) return (count / 1000000).toFixed(1) + 'M';
  if (count >= 1000) return (count / 1000).toFixed(1) + 'K';
  return count.toString();
}

function getCategoryColor(cat) {
  const colors = {
    music: '#e91e63',
    gaming: '#9c27b0',
    talk: '#2196f3',
    sports: '#4caf50',
    entertainment: '#ff9800',
    education: '#00bcd4',
    news: '#f44336',
    other: '#607d8b'
  };
  return colors[cat] || colors.other;
}

function getCategoryLabel(cat) {
  const labels = {
    music: 'Music',
    gaming: 'Gaming',
    talk: 'Talk Show',
    sports: 'Sports',
    entertainment: 'Entertainment',
    education: 'Education',
    news: 'News',
    other: 'Other'
  };
  return labels[cat] || 'Other';
}


// ==========================================
// RENDER FUNCTIONS
// ==========================================

function renderFeaturedStream() {
  const container = document.getElementById('featuredStream');
  if (!container) return;

  const featured = liveStreams.find(s => s.featured) || liveStreams[0];
  if (!featured) {
    document.getElementById('featuredSection').style.display = 'none';
    return;
  }

  container.innerHTML = `
    <div class="featured-stream-card">
      <div class="featured-stream-media">
        <img src="${featured.thumbnail}" alt="${featured.title}">
        <div class="featured-overlay">
          <div class="featured-live-badge">
            <span class="live-pulse-sm"></span>
            LIVE
          </div>
          <div class="featured-viewers">
            <ion-icon name="people"></ion-icon>
            ${formatCount(featured.viewers)} watching
          </div>
          <button class="featured-play-btn" onclick="watchStream(${featured.id})">
            <ion-icon name="play"></ion-icon>
          </button>
          <div class="featured-duration">${featured.duration}</div>
        </div>
      </div>
      <div class="featured-stream-info">
        <div class="featured-stream-top">
          <span class="featured-category" style="background: ${getCategoryColor(featured.category)}">${getCategoryLabel(featured.category)}</span>
          <span class="featured-label">FEATURED</span>
        </div>
        <h2 class="featured-stream-title">${featured.title}</h2>
        <p class="featured-stream-desc">${featured.description || ''}</p>
        <div class="featured-stream-meta">
          <div class="featured-streamer">
            <div class="streamer-avatar-circle">${featured.streamer.charAt(0).toUpperCase()}</div>
            <div>
              <span class="streamer-name">${featured.streamer}</span>
              <span class="streamer-status">Streaming now</span>
            </div>
          </div>
          <button class="watch-now-btn" onclick="watchStream(${featured.id})">
            <ion-icon name="play-circle"></ion-icon>
            Watch Now
          </button>
        </div>
        ${featured.tags ? `
        <div class="featured-tags">
          ${featured.tags.map(t => `<span class="stream-tag">#${t}</span>`).join('')}
        </div>
        ` : ''}
      </div>
    </div>
  `;
}

function renderLiveStreams(filter = 'all') {
  const grid = document.getElementById('liveStreamsGrid');
  const noMsg = document.getElementById('noLiveMessage');
  if (!grid) return;

  const filtered = filter === 'all'
    ? liveStreams
    : liveStreams.filter(s => s.category === filter);

  if (filtered.length === 0) {
    grid.innerHTML = '';
    if (noMsg) noMsg.style.display = 'flex';
    return;
  }

  if (noMsg) noMsg.style.display = 'none';

  grid.innerHTML = filtered.map(stream => `
    <div class="stream-card live-card" onclick="watchStream(${stream.id})">
      <div class="stream-card-media">
        <img src="${stream.thumbnail}" alt="${stream.title}">
        <div class="stream-card-overlay">
          <div class="stream-live-badge">
            <span class="live-pulse-sm"></span>
            LIVE
          </div>
          <div class="stream-viewer-count">
            <ion-icon name="eye"></ion-icon>
            ${formatCount(stream.viewers)}
          </div>
          <span class="stream-duration-badge">${stream.duration}</span>
          <div class="stream-play-hover">
            <ion-icon name="play"></ion-icon>
          </div>
        </div>
      </div>
      <div class="stream-card-info">
        <div class="stream-card-top">
          <span class="stream-category-pill" style="background: ${getCategoryColor(stream.category)}">${getCategoryLabel(stream.category)}</span>
        </div>
        <h3 class="stream-card-title">${stream.title}</h3>
        <div class="stream-card-meta">
          <div class="stream-card-author">
            <div class="author-avatar-sm">${stream.streamer.charAt(0).toUpperCase()}</div>
            <span>${stream.streamer}</span>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

function renderReplays() {
  const grid = document.getElementById('replayStreamsGrid');
  if (!grid) return;

  grid.innerHTML = replayStreams.map(replay => `
    <div class="stream-card replay-card" onclick="watchReplay(${replay.id})">
      <div class="stream-card-media">
        <img src="${replay.thumbnail}" alt="${replay.title}">
        <div class="stream-card-overlay replay-overlay">
          <span class="replay-badge-pill">REPLAY</span>
          <span class="stream-duration-badge">${replay.duration}</span>
          <div class="stream-play-hover">
            <ion-icon name="play"></ion-icon>
          </div>
        </div>
      </div>
      <div class="stream-card-info">
        <h3 class="stream-card-title">${replay.title}</h3>
        <div class="stream-card-meta">
          <div class="stream-card-author">
            <div class="author-avatar-sm">${replay.streamer.charAt(0).toUpperCase()}</div>
            <span>${replay.streamer}</span>
          </div>
        </div>
        <div class="stream-card-stats">
          <span><ion-icon name="eye-outline"></ion-icon> ${formatCount(replay.views)}</span>
          <span><ion-icon name="time-outline"></ion-icon> ${replay.streamedAt}</span>
        </div>
      </div>
    </div>
  `).join('');
}

function renderPodcasts() {
  const grid = document.getElementById('podcastsGrid');
  if (!grid) return;

  grid.innerHTML = podcasts.map(podcast => `
    <div class="podcast-card-item" onclick="playPodcast(${podcast.id})">
      <div class="podcast-card-cover">
        <img src="${podcast.thumbnail}" alt="${podcast.title}">
        <div class="podcast-play-overlay">
          <ion-icon name="play"></ion-icon>
        </div>
        <span class="podcast-duration-pill">${podcast.duration}</span>
      </div>
      <div class="podcast-card-info">
        <span class="podcast-show-name">${podcast.title}</span>
        <h3 class="podcast-episode-title">${podcast.episode}</h3>
        <div class="podcast-card-meta">
          <div class="podcast-host">
            <div class="author-avatar-sm">${podcast.host.charAt(0).toUpperCase()}</div>
            <span>${podcast.host}</span>
          </div>
        </div>
        <div class="podcast-card-stats">
          <span><ion-icon name="headset-outline"></ion-icon> ${formatCount(podcast.listens)} listens</span>
          <span><ion-icon name="time-outline"></ion-icon> ${podcast.publishedAt}</span>
        </div>
        <div class="podcast-card-footer">
          <span class="podcast-episodes-count">${podcast.episodes} episodes</span>
          <button class="podcast-listen-btn" onclick="event.stopPropagation(); playPodcast(${podcast.id})">
            <ion-icon name="play-circle"></ion-icon>
            Listen
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

function renderScheduled() {
  const grid = document.getElementById('scheduledGrid');
  if (!grid) return;

  grid.innerHTML = scheduledEvents.map(event => `
    <div class="scheduled-card">
      <div class="scheduled-card-media">
        <img src="${event.thumbnail}" alt="${event.title}">
        <div class="scheduled-card-overlay">
          <span class="scheduled-category" style="background: ${getCategoryColor(event.category)}">${getCategoryLabel(event.category)}</span>
        </div>
      </div>
      <div class="scheduled-card-info">
        <h3 class="scheduled-title">${event.title}</h3>
        <div class="scheduled-host">
          <div class="author-avatar-sm">${event.host.charAt(0).toUpperCase()}</div>
          <span>${event.host}</span>
        </div>
        <div class="scheduled-datetime">
          <ion-icon name="calendar-outline"></ion-icon>
          <span>${event.scheduledAt}</span>
        </div>
        <div class="scheduled-footer">
          <span class="interested-count">
            <ion-icon name="people-outline"></ion-icon>
            ${formatCount(event.interested)} interested
          </span>
          <button class="notify-btn" onclick="toggleNotify(this, ${event.id})">
            <ion-icon name="notifications-outline"></ion-icon>
            Notify Me
          </button>
        </div>
      </div>
    </div>
  `).join('');
}


// ==========================================
// TAB SWITCHING
// ==========================================

function switchTab(tabName, btn) {
  // Update tab buttons
  document.querySelectorAll('.live-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');

  // Show/hide tab content
  document.querySelectorAll('.live-content-section').forEach(s => s.style.display = 'none');
  const tab = document.getElementById(tabName + '-tab');
  if (tab) tab.style.display = 'block';

  // Show/hide featured section
  const featured = document.getElementById('featuredSection');
  if (featured) featured.style.display = tabName === 'live-now' ? 'block' : 'none';
}
window.switchTab = switchTab;


// ==========================================
// FILTER LIVE STREAMS
// ==========================================

function filterLive(filter, btn) {
  document.querySelectorAll('.live-section-filter .live-filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderLiveStreams(filter);
}
window.filterLive = filterLive;


// ==========================================
// MODAL CONTROLS
// ==========================================

function openGoLiveModal() {
  const user = localStorage.getItem('user');
  if (!user) {
    stynModal({ type: 'warning', title: 'Sign In Required', message: 'Please sign in to go live.', confirmText: 'Sign In', cancelText: 'Later', onConfirm: () => { window.location.href = './login.html'; } });
    return;
  }
  document.getElementById('goLiveModal').style.display = 'flex';
}

function closeGoLiveModal() {
  document.getElementById('goLiveModal').style.display = 'none';
}

function openPodcastModal() {
  const user = localStorage.getItem('user');
  if (!user) {
    stynModal({ type: 'warning', title: 'Sign In Required', message: 'Please sign in to start a podcast.', confirmText: 'Sign In', cancelText: 'Later', onConfirm: () => { window.location.href = './login.html'; } });
    return;
  }
  document.getElementById('podcastModal').style.display = 'flex';
}

function closePodcastModal() {
  document.getElementById('podcastModal').style.display = 'none';
}

window.openGoLiveModal = openGoLiveModal;
window.closeGoLiveModal = closeGoLiveModal;
window.openPodcastModal = openPodcastModal;
window.closePodcastModal = closePodcastModal;


// ==========================================
// ACTIONS
// ==========================================

function startLiveStream(e) {
  e.preventDefault();
  const title = document.getElementById('streamTitle').value;
  const category = document.getElementById('streamCategory').value;
  const type = document.querySelector('input[name="streamType"]:checked').value;
  
  stynModal({ type: 'success', title: 'You\'re LIVE! 🔴', message: `Broadcasting "${title}" in ${category} (${type}). Your audience can now watch you!` });
  closeGoLiveModal();
}

function startPodcast(e) {
  e.preventDefault();
  const title = document.getElementById('podcastTitle').value;
  stynModal({ type: 'success', title: 'Podcast Started! 🎙️', message: `Recording "${title}". You're now live on air!` });
  closePodcastModal();
}

function watchStream(id) {
  stynToast('Opening live stream... 🔴', 'info');
}

function watchReplay(id) {
  stynToast('Loading replay... ▶️', 'info');
}

function playPodcast(id) {
  stynToast('Playing podcast... 🎧', 'info');
}

function toggleNotify(btn, id) {
  const icon = btn.querySelector('ion-icon');
  if (btn.classList.contains('notified')) {
    btn.classList.remove('notified');
    btn.innerHTML = '<ion-icon name="notifications-outline"></ion-icon> Notify Me';
  } else {
    btn.classList.add('notified');
    btn.innerHTML = '<ion-icon name="notifications"></ion-icon> Notified';
  }
}

function previewThumb(e) {
  const file = e.target.files[0];
  if (!file) return;
  const preview = document.getElementById('thumbPreview');
  const placeholder = document.getElementById('thumbPlaceholder');
  preview.src = URL.createObjectURL(file);
  preview.style.display = 'block';
  placeholder.style.display = 'none';
}

window.startLiveStream = startLiveStream;
window.startPodcast = startPodcast;
window.watchStream = watchStream;
window.watchReplay = watchReplay;
window.playPodcast = playPodcast;
window.toggleNotify = toggleNotify;
window.previewThumb = previewThumb;


// ==========================================
// STREAM TYPE RADIO SELECTION
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  // Radio toggle styling
  document.querySelectorAll('.stream-type-option input').forEach(radio => {
    radio.addEventListener('change', () => {
      document.querySelectorAll('.stream-type-option').forEach(opt => opt.classList.remove('active'));
      radio.closest('.stream-type-option').classList.add('active');
    });
  });

  // Close modals on outside click
  document.querySelectorAll('.live-modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.style.display = 'none';
    });
  });

  // Render everything
  renderFeaturedStream();
  renderLiveStreams();
  renderReplays();
  renderPodcasts();
  renderScheduled();
});
