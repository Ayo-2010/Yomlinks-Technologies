/**
 * Lazy Loading Implementation
 * Automatically loads images as they enter viewport
 * Supports IntersectionObserver with graceful fallback
 */

(function() {
  'use strict';

  // Fallback for browsers without IntersectionObserver
  if (!('IntersectionObserver' in window)) {
    // Load all images immediately if not supported
    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
      img.loading = 'eager';
    });
    document.querySelectorAll('picture source').forEach(source => {
      if (source.dataset.srcset) {
        source.srcset = source.dataset.srcset;
        source.removeAttribute('data-srcset');
      }
    });
    return;
  }

  // Create IntersectionObserver for lazy loading
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const img = entry.target;
      
      // Handle picture elements with source tags
      if (img.parentElement && img.parentElement.tagName === 'PICTURE') {
        const picture = img.parentElement;
        picture.querySelectorAll('source').forEach(source => {
          if (source.dataset.srcset) {
            source.srcset = source.dataset.srcset;
            source.removeAttribute('data-srcset');
          }
        });
      }

      // Load main image
      if (img.dataset.src) {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
      } else if (img.loading === 'lazy') {
        img.loading = 'eager';
      }

      // Add loaded state for CSS animations
      img.classList.add('image-loaded');
      
      // Stop observing this image
      observer.unobserve(img);
    });
  }, {
    // Start loading 50px before entering viewport
    rootMargin: '50px'
  });

  // Function to observe images
  function observeImages() {
    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
      if (!img.hasAttribute('data-observed')) {
        img.setAttribute('data-observed', 'true');
        imageObserver.observe(img);
      }
    });
  }

  // Observe images on initial load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', observeImages);
  } else {
    observeImages();
  }

  // Re-observe on dynamic content load
  window.addEventListener('includeLoaded', observeImages);
  window.addEventListener('dynamicContentLoaded', observeImages);

  // Cleanup function
  window.stopLazyLoad = function() {
    imageObserver.disconnect();
  };

  // Public API
  window.lazyLoadImages = observeImages;
})();
