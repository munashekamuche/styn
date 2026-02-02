'use strict';

/**
 * Chat System
 * WhatsApp-style messaging with mobile navigation
 */

// Chat data (Replace with real-time API)
const chats = [
  {
    id: 1,
    name: 'John Doe',
    lastMessage: 'Hey, how are you?',
    time: '10:30 AM',
    unread: 2,
    messages: [
      { text: 'Hey, how are you doing?', time: '10:30 AM', sent: false },
      { text: "I'm doing great, thanks for asking!", time: '10:32 AM', sent: true }
    ]
  },
  {
    id: 2,
    name: 'Sarah Smith',
    lastMessage: 'See you tomorrow!',
    time: '9:15 AM',
    unread: 0,
    messages: [
      { text: 'Are we still meeting tomorrow?', time: '9:15 AM', sent: false },
      { text: 'Yes, see you at 3pm!', time: '9:20 AM', sent: true },
      { text: 'Perfect! See you tomorrow!', time: '9:21 AM', sent: false }
    ]
  },
  {
    id: 3,
    name: 'Mike Johnson',
    lastMessage: 'Thanks for the help!',
    time: 'Yesterday',
    unread: 1,
    messages: [
      { text: 'Thanks for helping me with the project!', time: 'Yesterday', sent: false },
      { text: 'No problem, happy to help!', time: 'Yesterday', sent: true }
    ]
  },
  {
    id: 4,
    name: 'Emily Davis',
    lastMessage: 'The movie was amazing!',
    time: '2 days ago',
    unread: 0,
    messages: [
      { text: 'Did you watch the new movie?', time: '2 days ago', sent: false },
      { text: 'Yes! It was amazing!', time: '2 days ago', sent: true },
      { text: 'The movie was amazing!', time: '2 days ago', sent: false }
    ]
  },
];

// Initialize chat
document.addEventListener('DOMContentLoaded', () => {
  loadChatList();
  setupMobileNavigation();
  
  // Don't auto-select on mobile
  if (window.innerWidth > 768) {
    if (chats.length > 0) {
      selectChat(chats[0].id);
    }
  }
});

// Setup mobile navigation
function setupMobileNavigation() {
  const backBtn = document.getElementById('backToListBtn');
  const chatSidebar = document.getElementById('chatSidebar');
  const chatMain = document.getElementById('chatMain');
  
  if (!backBtn || !chatSidebar || !chatMain) return;
  
  // Back button - show list, hide chat
  backBtn.addEventListener('click', () => {
    showChatList();
  });
  
  // On mobile, show list by default
  if (window.innerWidth <= 768) {
    showChatList();
  }
  
  // Handle window resize
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      chatSidebar.style.display = 'flex';
      chatMain.style.display = 'flex';
    } else {
      // On mobile, check if chat is selected
      const activeChat = document.querySelector('.chat-item.active');
      if (activeChat) {
        showChatView();
      } else {
        showChatList();
      }
    }
  });
}

// Show chat list (mobile)
function showChatList() {
  const chatSidebar = document.getElementById('chatSidebar');
  const chatMain = document.getElementById('chatMain');
  
  if (chatSidebar && chatMain) {
    if (window.innerWidth <= 768) {
      chatSidebar.style.display = 'flex';
      chatMain.style.display = 'none';
    }
  }
}

// Show chat view (mobile)
function showChatView() {
  const chatSidebar = document.getElementById('chatSidebar');
  const chatMain = document.getElementById('chatMain');
  
  if (chatSidebar && chatMain) {
    if (window.innerWidth <= 768) {
      chatSidebar.style.display = 'none';
      chatMain.style.display = 'flex';
    }
  }
}

// Load chat list
function loadChatList() {
  const chatList = document.getElementById('chatList');
  if (!chatList) return;
  
  chatList.innerHTML = chats.map(chat => `
    <div class="chat-item" data-chat-id="${chat.id}" onclick="selectChat(${chat.id})">
      <div class="chat-avatar">
        <ion-icon name="person"></ion-icon>
      </div>
      <div class="chat-info">
        <h3 class="chat-name">${chat.name}</h3>
        <p class="chat-preview">${chat.lastMessage}</p>
      </div>
      <div class="chat-meta">
        <span class="chat-time">${chat.time}</span>
        ${chat.unread > 0 ? `<span class="chat-unread">${chat.unread}</span>` : ''}
      </div>
    </div>
  `).join('');
}

// Select chat
function selectChat(chatId) {
  const chat = chats.find(c => c.id === chatId);
  if (!chat) return;
  
  // Update active state
  document.querySelectorAll('.chat-item').forEach(item => {
    item.classList.remove('active');
    if (item.dataset.chatId == chatId) {
      item.classList.add('active');
    }
  });
  
  // Update chat header
  const chatUserName = document.getElementById('chatUserName');
  const chatUserAvatar = document.querySelector('.chat-user-avatar');
  
  if (chatUserName) {
    chatUserName.textContent = chat.name;
  }
  
  if (chatUserAvatar) {
    // Avatar already uses icon, no need to change
  }
  
  // Load messages
  loadMessages(chat.messages);
  
  // Enable input
  const chatInput = document.getElementById('chatInput');
  const chatSendBtn = document.getElementById('chatSendBtn');
  if (chatInput) chatInput.disabled = false;
  if (chatSendBtn) chatSendBtn.disabled = false;
  
  // On mobile, show chat view
  showChatView();
}

// Load messages
function loadMessages(messages) {
  const chatMessages = document.getElementById('chatMessages');
  if (!chatMessages) return;
  
  if (messages.length === 0) {
    chatMessages.innerHTML = `
      <div class="chat-empty-state">
        <ion-icon name="chatbubbles-outline"></ion-icon>
        <p>No messages yet. Start the conversation!</p>
      </div>
    `;
    return;
  }
  
  // Group messages by date
  let currentDate = '';
  let html = '';
  
  messages.forEach((msg, index) => {
    const msgDate = msg.time.includes('Today') ? 'Today' : 
                   msg.time.includes('Yesterday') ? 'Yesterday' : 
                   msg.time;
    
    // Add date separator if date changed
    if (msgDate !== currentDate) {
      if (currentDate !== '') {
        html += '</div>';
      }
      html += `<div class="message-date">${msgDate}</div>`;
      currentDate = msgDate;
    }
    
    html += `
      <div class="message ${msg.sent ? 'sent' : 'received'}">
        ${!msg.sent ? `
          <div class="message-avatar">
            <ion-icon name="person"></ion-icon>
          </div>
        ` : ''}
        <div class="message-content">
          <p>${msg.text}</p>
          <span class="message-time">${msg.time}</span>
        </div>
      </div>
    `;
  });
  
  chatMessages.innerHTML = html;
  
  // Scroll to bottom
  setTimeout(() => {
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }, 100);
}

// Send message
const chatInput = document.getElementById('chatInput');
const chatSendBtn = document.getElementById('chatSendBtn');

if (chatInput && chatSendBtn) {
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });
  
  chatSendBtn.addEventListener('click', sendMessage);
  
  chatInput.addEventListener('input', () => {
    chatSendBtn.disabled = !chatInput.value.trim();
  });
}

function sendMessage() {
  const input = document.getElementById('chatInput');
  const message = input.value.trim();
  
  if (!message) return;
  
  // Check if user is logged in
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  if (!user) {
    alert('Please sign in to send messages');
    window.location.href = './login.html';
    return;
  }
  
  // Get current chat
  const activeChat = document.querySelector('.chat-item.active');
  if (!activeChat) return;
  
  const chatId = parseInt(activeChat.dataset.chatId);
  const chat = chats.find(c => c.id === chatId);
  
  if (!chat) return;
  
  // Add message
  const newMessage = {
    text: message,
    time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    sent: true
  };
  
  chat.messages.push(newMessage);
  chat.lastMessage = message;
  chat.time = newMessage.time;
  
  // Update UI
  loadMessages(chat.messages);
  loadChatList();
  
  // Clear input
  input.value = '';
  chatSendBtn.disabled = true;
  
  // Simulate response (in real app, use WebSocket)
  setTimeout(() => {
    const response = {
      text: 'Thanks for your message!',
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      sent: false
    };
    chat.messages.push(response);
    chat.lastMessage = response.text;
    chat.time = response.time;
    loadMessages(chat.messages);
    loadChatList();
  }, 1000);
}

// New chat
const newChatBtn = document.getElementById('newChatBtn');
if (newChatBtn) {
  newChatBtn.addEventListener('click', () => {
    document.getElementById('newChatModal').style.display = 'flex';
  });
}

// Search chats
const chatSearch = document.getElementById('chatSearch');
if (chatSearch) {
  chatSearch.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const chatItems = document.querySelectorAll('.chat-item');
    
    chatItems.forEach(item => {
      const name = item.querySelector('.chat-name').textContent.toLowerCase();
      item.style.display = name.includes(query) ? 'flex' : 'none';
    });
  });
}

// Make selectChat available globally
window.selectChat = selectChat;
