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