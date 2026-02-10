'use strict';

/**
 * navbar variables
 */

const navOpenBtn = document.querySelector("[data-menu-open-btn]");
const navCloseBtn = document.querySelector("[data-menu-close-btn]");
const navbar = document.querySelector("[data-navbar]");
const overlay = document.querySelector("[data-overlay]");

const navElemArr = [navOpenBtn, navCloseBtn, overlay];

for (let i = 0; i < navElemArr.length; i++) {

  navElemArr[i].addEventListener("click", function () {

    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.classList.toggle("active");

  });

}



/**
 * header sticky
 */

const header = document.querySelector("[data-header]");

window.addEventListener("scroll", function () {

  window.scrollY >= 10 ? header.classList.add("active") : header.classList.remove("active");

});



/**
 * go top
 */

const goTopBtn = document.querySelector("[data-go-top]");

if (goTopBtn) {
  window.addEventListener("scroll", function () {
    window.scrollY >= 500 ? goTopBtn.classList.add("active") : goTopBtn.classList.remove("active");
  });
}

/**
 * Search functionality
 */
const searchBtn = document.querySelector("[data-search-btn]");
const searchOverlay = document.getElementById("searchOverlay");
const searchCloseBtn = document.querySelector("[data-search-close-btn]");

if (searchBtn && searchOverlay) {
  searchBtn.addEventListener("click", () => {
    searchOverlay.style.display = "flex";
    document.getElementById("searchInput")?.focus();
  });
}

if (searchCloseBtn && searchOverlay) {
  searchCloseBtn.addEventListener("click", () => {
    searchOverlay.style.display = "none";
  });
}

// Close search on overlay click
if (searchOverlay) {
  searchOverlay.addEventListener("click", (e) => {
    if (e.target === searchOverlay) {
      searchOverlay.style.display = "none";
    }
  });
}

/**
 * Category Button Active State - Set based on current page
 */
function setActiveCategory() {
  const categoryButtons = document.querySelectorAll(".category-btn");
  const currentPath = window.location.pathname;
  const currentPage = currentPath.split('/').pop() || 'index.html';
  
  categoryButtons.forEach(btn => {
    btn.classList.remove("active");
    
    // Set active based on current page
    if (currentPage === 'index.html' && btn.getAttribute('data-category') === 'reels') {
      btn.classList.add("active");
    } else if (currentPage === 'blockbuster.html' && btn.getAttribute('data-category') === 'blockbuster') {
      btn.classList.add("active");
    } else if (currentPage === 'live.html' && btn.getAttribute('data-category') === 'live') {
      btn.classList.add("active");
    } else if (currentPage === 'chat.html' && btn.getAttribute('data-category') === 'chat') {
      btn.classList.add("active");
    }
  });
}

// Set active category on page load
document.addEventListener('DOMContentLoaded', setActiveCategory);

/**
 * Account Dropdown Toggle
 */
const accountBtn = document.getElementById("accountBtn");
const accountDropdown = document.getElementById("accountDropdown");

function positionDropdown() {
  if (!accountBtn || !accountDropdown) return;
  const rect = accountBtn.getBoundingClientRect();
  const isMobile = window.innerWidth <= 480;
  
  if (isMobile) {
    // Bottom sheet on mobile
    accountDropdown.style.top = "auto";
    accountDropdown.style.right = "0";
    accountDropdown.style.left = "0";
    accountDropdown.style.bottom = "0";
  } else {
    accountDropdown.style.top = (rect.bottom + 8) + "px";
    accountDropdown.style.right = (window.innerWidth - rect.right) + "px";
    accountDropdown.style.left = "auto";
    accountDropdown.style.bottom = "auto";
  }
}

function openDropdown() {
  positionDropdown();
  accountDropdown.style.display = "block";
  accountBtn.classList.add("active");
}

function closeDropdown() {
  accountDropdown.style.display = "none";
  accountBtn.classList.remove("active");
}

if (accountBtn && accountDropdown) {
  accountBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const isHidden = accountDropdown.style.display === "none" || accountDropdown.style.display === "";
    isHidden ? openDropdown() : closeDropdown();
  });

  // Close dropdown when clicking outside
  document.addEventListener("click", (e) => {
    if (!accountBtn.contains(e.target) && !accountDropdown.contains(e.target)) {
      closeDropdown();
    }
  });

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeDropdown();
  });

  // Reposition on resize
  window.addEventListener("resize", () => {
    if (accountDropdown.style.display === "block") positionDropdown();
  });
}

/**
 * Header Search Form Submission
 */
const headerSearchForm = document.getElementById("headerSearchForm");
const headerSearchInput = document.getElementById("headerSearchInput");

if (headerSearchForm && headerSearchInput) {
  headerSearchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchQuery = headerSearchInput.value.trim();
    if (searchQuery) {
      // Handle search - can be customized based on your needs
      console.log("Searching for:", searchQuery);
      // You can redirect to a search results page or filter content
    }
  });
}