/**
 * Self-Contained Offline Include System
 * Embed HTML directly in data attributes for zero-dependency loading
 * 
 * USAGE: Replace data-include with data-include-offline="key"
 * Define content in <script type="text/include"> tags with id="include-key"
 * 
 * Example:
 * <script type="text/include" id="include-header">
 *   <header>...</header>
 * </script>
 * 
 * <div data-include-offline="header"></div>
 */

document.addEventListener('DOMContentLoaded', () => {
  const offlineIncludes = document.querySelectorAll('[data-include-offline]');
  
  offlineIncludes.forEach(el => {
    const key = el.getAttribute('data-include-offline');
    const sourceEl = document.getElementById(`include-${key}`);
    
    if (sourceEl && sourceEl.type === 'text/include') {
      el.innerHTML = sourceEl.innerHTML;
      el.setAttribute('data-include-loaded', 'true');
      
      // Update year in footer
      const yearEl = document.getElementById('year');
      if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
      }
      
      // Re-initialize theme
      if (window.reinitTheme) {
        requestAnimationFrame(() => {
          window.reinitTheme();
        });
      }
      
      // Dispatch event for other scripts
      window.dispatchEvent(new CustomEvent('includeLoaded', { 
        detail: { key, element: el }
      }));
    } else {
      console.warn(`[Include] Missing template for key: ${key}`);
      el.innerHTML = `<div style="color: #ef4444; padding: 1rem;">Template "${key}" not found</div>`;
    }
  });
  
  // Final theme check
  if (window.reinitTheme) {
    setTimeout(() => {
      window.reinitTheme();
    }, 100);
  }
});
