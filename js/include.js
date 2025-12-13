/**
 * Hybrid Dynamic Include Loader v4.0
 * 
 * Smart fallback system:
 * 1. Tries to load from external file (online mode)
 * 2. Falls back to embedded template (offline mode)
 * 3. Works without server (file://) with fallback
 * 
 * No configuration needed - auto-detects both modes
 */

async function loadIncludeHybrid(url, elementId) {
  // Step 1: Try to load from external file
  try {
    const response = await fetch(url, { cache: 'no-store' });
    if (response.ok) {
      return {
        html: await response.text(),
        source: 'external'
      };
    }
  } catch (fetchError) {
    // Fetch failed, will try XMLHttpRequest next
  }

  // Step 2: Fallback to XMLHttpRequest (for file:// protocol)
  try {
    return await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      
      xhr.onload = () => {
        if (xhr.status === 0 || xhr.status === 200) {
          resolve({
            html: xhr.responseText,
            source: 'xhr'
          });
        } else {
          reject(new Error(`HTTP ${xhr.status}`));
        }
      };
      
      xhr.onerror = () => reject(new Error('XHR failed'));
      xhr.onabort = () => reject(new Error('XHR aborted'));
      xhr.timeout = 3000;
      xhr.ontimeout = () => reject(new Error('XHR timeout'));
      
      xhr.open('GET', url, true);
      xhr.send();
    });
  } catch (xhrError) {
    // Both fetch and XHR failed, will try embedded template next
  }

  // Step 3: Fallback to embedded template in HTML
  const templateId = `include-template-${elementId}`;
  const templateEl = document.getElementById(templateId);
  
  if (templateEl) {
    return {
      html: templateEl.innerHTML,
      source: 'embedded'
    };
  }

  // All methods failed
  throw new Error(`Could not load from: external file, XHR, or embedded template (id: ${templateId})`);
}

document.addEventListener('DOMContentLoaded', async () => {
  const includes = document.querySelectorAll('[data-include]');
  
  if (includes.length === 0) return;

  // Process includes sequentially to avoid race conditions
  for (const el of includes) {
    const url = el.getAttribute('data-include');
    const elementId = el.getAttribute('data-include-id') || url.replace(/[^a-zA-Z0-9]/g, '-');
    
    if (!url) continue;

    try {
      const result = await loadIncludeHybrid(url, elementId);
      
      // Create temporary container to parse HTML safely
      const temp = document.createElement('div');
      temp.innerHTML = result.html;
      
      // Clear element and append loaded content
      el.innerHTML = '';
      while (temp.firstChild) {
        el.appendChild(temp.firstChild);
      }
      
      // Mark as loaded with source info
      el.setAttribute('data-include-loaded', 'true');
      el.setAttribute('data-include-source', result.source);
      
      // Update year in footer (works on all pages)
      const yearEl = document.getElementById('year');
      if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
      }
      
      // Re-initialize theme after includes load
      if (window.reinitTheme) {
        requestAnimationFrame(() => {
          window.reinitTheme();
        });
      }
      
      // Dispatch event for other scripts to listen
      window.dispatchEvent(new CustomEvent('includeLoaded', { 
        detail: { 
          url, 
          element: el,
          source: result.source
        }
      }));

      console.log(`[Include] Loaded from ${result.source}: ${url}`);
      
    } catch (error) {
      console.error(`[Include] Failed to load ${url}:`, error.message);
      
      // Show contextual error message
      let message = `Failed to load ${url}`;
      if (window.location.protocol === 'file:') {
        message += '<br><small>Tip: Use a server (python -m http.server) or add embedded template with id="include-template-' + 
                  url.replace(/[^a-zA-Z0-9]/g, '-') + '"</small>';
      }
      
      el.innerHTML = `<div style="color: #f59e0b; padding: 1rem; text-align: center; font-size: 0.9rem;">${message}</div>`;
      el.setAttribute('data-include-loaded', 'false');
    }
  }
  
  // Final theme check after all includes are loaded
  if (window.reinitTheme) {
    setTimeout(() => {
      window.reinitTheme();
    }, 100);
  }
});
