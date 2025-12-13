/**
 * Active Link Detector
 * Highlights the current page's navigation link
 */

(function() {
  'use strict';

  function setActiveLink() {
    // Get current page filename
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Remove active class from all links
    navLinks.forEach(link => {
      link.classList.remove('active');
    });
    
    // Add active class to matching link
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      const linkPage = href.split('/').pop();
      
      // Handle index.html and empty cases
      const normalizedLink = linkPage === 'index.html' ? 'index.html' : linkPage;
      const normalizedCurrent = currentPage === '' || currentPage === '/' ? 'index.html' : currentPage;
      
      if (normalizedLink === normalizedCurrent) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }

  // Set active link on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setActiveLink);
  } else {
    setActiveLink();
  }

  // Re-check when navigation includes load (for dynamic pages)
  window.addEventListener('includeLoaded', setActiveLink);

  // Expose function globally
  window.setActiveLink = setActiveLink;
})();
