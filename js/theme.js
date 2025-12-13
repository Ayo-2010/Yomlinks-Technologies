/**
 * Professional Theme Manager v2.2
 * Robust dark/light theme switching with page navigation support
 */

(function() {
  'use strict';

  const STORAGE_KEY = 'yomlinks-theme';
  const LIGHT_CLASS = 'light-theme';
  const DARK_CLASS = 'dark-theme';
  const DATA_THEME = 'data-theme';

  // Get preferred theme from storage or default to dark
  function getTheme() {
    // First check localStorage
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return stored;
    
    // Check data attribute (from page load)
    const fromDOM = document.documentElement.getAttribute(DATA_THEME);
    if (fromDOM) return fromDOM;
    
    // Default to dark theme
    return DARK_CLASS;
  }

  // Check if light theme is active
  function isLight() {
    return document.documentElement.classList.contains(LIGHT_CLASS) ||
           document.body.classList.contains(LIGHT_CLASS);
  }

  // Apply theme to all elements (handles navigation)
  function applyTheme(theme) {
    // Validate theme
    if (![LIGHT_CLASS, DARK_CLASS].includes(theme)) {
      console.warn('[Theme] Invalid theme:', theme);
      theme = DARK_CLASS;
    }

    // Remove both classes from documentElement
    document.documentElement.classList.remove(LIGHT_CLASS, DARK_CLASS);
    
    // Remove both classes from body
    document.body.classList.remove(LIGHT_CLASS, DARK_CLASS);
    
    // Add the correct class to both
    document.documentElement.classList.add(theme);
    document.body.classList.add(theme);
    
    // Set data attributes (for CSS selectors)
    document.documentElement.setAttribute(DATA_THEME, theme);
    document.documentElement.setAttribute('data-theme-ready', 'true');
    
    // Save preference to localStorage
    localStorage.setItem(STORAGE_KEY, theme);
    
    // Update all dynamic elements
    updateLogo(theme);
    updateButton(theme);
    updateAllIframes(theme);
    
    // Dispatch custom event for external listeners
    window.dispatchEvent(new CustomEvent('themeChanged', { 
      detail: { theme, timestamp: Date.now() }
    }));
  }

  // Update logo image based on theme
  function updateLogo(theme) {
    const logos = document.querySelectorAll('img[alt="Yomlinks logo"]');
    
    if (logos.length === 0) return;

    // Determine if nested page (products/, etc.)
    const pathDepth = window.location.pathname.split('/').filter(Boolean).length;
    const isNested = pathDepth > 1;
    
    // Get logo filename based on theme
    const filename = theme === LIGHT_CLASS ? 'YomlinksLogoLight.jpg' : 'YomlinksLogo.jpg';
    
    // Determine path based on page location
    let logoPath;
    if (isNested) {
      logoPath = `../images/${filename}`;
    } else {
      logoPath = `./images/${filename}`;
    }

    // Update all logos with fade effect
    logos.forEach(logo => {
      if (!logo.src.includes(filename)) {
        // Add opacity transition for smooth swap
        logo.style.opacity = '0.5';
        setTimeout(() => {
          logo.src = logoPath;
          logo.style.opacity = '1';
        }, 150);
      }
    });
  }

  // Update embedded iframes (if any use theme)
  function updateAllIframes(theme) {
    const iframes = document.querySelectorAll('iframe[data-theme-aware="true"]');
    if (!iframes.length) return;
    iframes.forEach(iframe => {
      iframe.contentWindow?.postMessage({ type: 'THEME_CHANGED', theme }, '*');
    });
  }

  // Update toggle button appearance
  function updateButton(theme) {
    const btn = document.getElementById('themeToggle');
    if (!btn) return;

    const isLight = theme === LIGHT_CLASS;
    btn.setAttribute('aria-checked', isLight ? 'true' : 'false');
    btn.setAttribute('data-theme', isLight ? 'light' : 'dark');
    btn.title = isLight ? 'Switch to dark mode' : 'Switch to light mode';
  }

  // Toggle between themes
  function toggleTheme() {
    const current = getTheme();
    const next = current === LIGHT_CLASS ? DARK_CLASS : LIGHT_CLASS;
    applyTheme(next);
  }

  // Handle button click
  function handleClick(e) {
    e.preventDefault();
    e.stopPropagation();
    toggleTheme();
  }

  // Handle keyboard (Space/Enter)
  function handleKeydown(e) {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      toggleTheme();
    }
  }

  // Setup button listeners (with duplicate prevention)
  function setupButton() {
    const btn = document.getElementById('themeToggle');
    if (!btn || btn.hasAttribute('data-theme-listeners')) return;
    
    btn.addEventListener('click', handleClick);
    btn.addEventListener('keydown', handleKeydown);
    btn.setAttribute('data-theme-listeners', 'true');
    updateButton(getTheme());
  }

  // Initialize theme system
  function init() {
    const theme = getTheme();
    
    // Apply immediately (prevents flash on page load)
    applyTheme(theme);
    
    // Mark DOM as theme-ready
    document.documentElement.setAttribute('data-theme-ready', 'true');
    document.body.style.opacity = '1'; // Ensure body is visible
    
    // Setup button when DOM ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', setupButton);
    } else {
      setupButton();
    }
    
    // Listen for page visibility changes
    document.addEventListener('visibilitychange', function() {
      if (!document.hidden) {
        // Page became visible - ensure theme is still applied
        const currentTheme = getTheme();
        applyTheme(currentTheme);
      }
    });
  }

  // Expose global functions (public API)
  window.toggleTheme = toggleTheme;
  window.setTheme = applyTheme;
  window.getTheme = getTheme;
  window.isLightTheme = isLight;
  
  // Re-init function (called by include.js after header loads)
  window.reinitTheme = function() {
    // Re-setup button with new DOM elements
    setupButton();
    
    // Update logo in case it changed
    updateLogo(getTheme());
    
    // Ensure theme is applied to new content
    applyTheme(getTheme());
  };

  // Start initialization immediately
  init();
})();
