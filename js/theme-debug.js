/**
 * Theme System Debug Utilities
 * Use in browser console: ThemeDebug.healthCheck()
 */

const ThemeDebug = {
  /**
   * Check system health
   */
  healthCheck() {
    console.log('%c🔍 Theme System Health Check', 'color: #00d9ff; font-weight: bold; font-size: 14px;');
    console.log('');
    
    // 1. Theme applied
    const hasLight = document.body.classList.contains('light-theme');
    const hasDark = document.body.classList.contains('dark-theme');
    console.log(hasLight || hasDark ? '✓ Theme class applied' : '✗ No theme class');
    
    // 2. Toggle button found
    const btn = document.getElementById('themeToggle');
    console.log(btn ? '✓ Toggle button found' : '✗ Toggle button missing');
    
    // 3. Button event listeners
    if (btn) {
      console.log('✓ Button aria-checked: ' + btn.getAttribute('aria-checked'));
    }
    
    // 4. Logo elements
    const logos = document.querySelectorAll('img[alt="Yomlinks logo"]');
    console.log(logos.length > 0 ? `✓ Logo elements found: ${logos.length}` : '✗ No logo elements');
    
    // 5. localStorage
    const stored = localStorage.getItem('yomlinks-theme');
    console.log(stored ? `✓ Theme stored: ${stored}` : '✗ No stored theme');
    
    // 6. Global functions
    console.log(window.toggleTheme ? '✓ toggleTheme() available' : '✗ toggleTheme() missing');
    console.log(window.setTheme ? '✓ setTheme() available' : '✗ setTheme() missing');
    console.log(window.getTheme ? '✓ getTheme() available' : '✗ getTheme() missing');
    
    console.log('');
    console.log('%cCurrent State:', 'font-weight: bold;');
    console.log('Theme:', window.getTheme());
    console.log('Body class:', document.body.className);
    console.log('');
  },

  /**
   * Test theme toggle
   */
  testSwitch() {
    console.log('%c🧪 Testing Theme Toggle', 'color: #00d9ff; font-weight: bold; font-size: 14px;');
    
    const before = window.getTheme();
    console.log('Before:', before);
    
    window.toggleTheme();
    
    setTimeout(() => {
      const after = window.getTheme();
      console.log('After:', after);
      console.log(before !== after ? '✓ Toggle successful' : '✗ Toggle failed');
      
      // Switch back
      window.toggleTheme();
      console.log('Reverted to:', window.getTheme());
    }, 300);
  },

  /**
   * Check logo elements
   */
  testLogo() {
    console.log('%c🖼️  Logo Elements Check', 'color: #00d9ff; font-weight: bold; font-size: 14px;');
    
    const logos = document.querySelectorAll('img[alt="Yomlinks logo"]');
    console.log(`Found ${logos.length} logo element(s)`);
    
    logos.forEach((logo, i) => {
      console.log(`Logo ${i + 1}:`, logo.src);
    });
  },

  /**
   * Get current state
   */
  getState() {
    return {
      theme: window.getTheme(),
      isLight: document.body.classList.contains('light-theme'),
      isDark: document.body.classList.contains('dark-theme'),
      buttonExists: !!document.getElementById('themeToggle'),
      logosCount: document.querySelectorAll('img[alt="Yomlinks logo"]').length,
      storedTheme: localStorage.getItem('yomlinks-theme'),
      bodyClass: document.body.className
    };
  },

  /**
   * Set specific theme
   */
  setTheme(theme) {
    if (!['light-theme', 'dark-theme'].includes(theme)) {
      console.error('Invalid theme. Use: "light-theme" or "dark-theme"');
      return;
    }
    console.log(`Setting theme to: ${theme}`);
    window.setTheme(theme);
    console.log('✓ Theme set to:', window.getTheme());
  },

  /**
   * Reset theme
   */
  reset() {
    console.log('🔄 Resetting theme...');
    localStorage.removeItem('yomlinks-theme');
    window.setTheme('dark-theme');
    console.log('✓ Theme reset to default (dark)');
  },

  /**
   * Help menu
   */
  info() {
    console.log(`
%c╔══════════════════════════════════════════════════╗
║       Theme System - Debug Commands              ║
╚══════════════════════════════════════════════════╝

%c📊 Information:
%c  ThemeDebug.healthCheck()     - Run full system check
%c  ThemeDebug.getState()        - Get current state
%c  ThemeDebug.info()            - Show this menu

%c🧪 Testing:
%c  ThemeDebug.testSwitch()      - Test theme toggle
%c  ThemeDebug.testLogo()        - Check logo elements

%c⚙️  Control:
%c  ThemeDebug.setTheme('light-theme')   - Set light theme
%c  ThemeDebug.setTheme('dark-theme')    - Set dark theme
%c  ThemeDebug.reset()           - Reset to defaults

%c📝 Global Functions:
%c  window.toggleTheme()         - Toggle theme
%c  window.setTheme(theme)       - Set specific theme
%c  window.getTheme()            - Get current theme
    `, 
    'color: #00d9ff; font-weight: bold; font-size: 13px;',
    '',
    'color: #00d9ff; font-size: 12px;',
    'color: #00d9ff; font-size: 12px;',
    'color: #00d9ff; font-size: 12px;',
    'color: #00d9ff; font-size: 12px;',
    '',
    'color: #00d9ff; font-size: 12px;',
    'color: #00d9ff; font-size: 12px;',
    'color: #00d9ff; font-size: 12px;',
    '',
    'color: #00d9ff; font-size: 12px;',
    'color: #00d9ff; font-size: 12px;',
    'color: #00d9ff; font-size: 12px;',
    'color: #00d9ff; font-size: 12px;',
    '',
    'color: #00d9ff; font-size: 12px;',
    'color: #00d9ff; font-size: 12px;',
    'color: #00d9ff; font-size: 12px;',
    'color: #00d9ff; font-size: 12px;'
    );
  }
};

// Show welcome message
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    console.log('%c🎨 Theme System Ready', 'color: #00d9ff; font-weight: bold; font-size: 14px;');
    console.log('Type: ThemeDebug.info() for help');
  });
} else {
  console.log('%c🎨 Theme System Ready', 'color: #00d9ff; font-weight: bold; font-size: 14px;');
  console.log('Type: ThemeDebug.info() for help');
}

// Expose globally
window.ThemeDebug = ThemeDebug;
