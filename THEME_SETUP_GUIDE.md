# Professional Theme Manager - Setup Guide

## Overview

The theme system has been completely rewritten with modern JavaScript practices, proper class-based architecture, and robust error handling.

## Key Features

### 1. **Modern Class-Based Architecture**
- `ThemeManager` class handles all theme logic
- Singleton pattern ensures single instance across the app
- Proper method binding preserves context

### 2. **Robust Event Handling**
- Click event listeners on theme toggle button
- Keyboard support (Enter/Space keys)
- Event delegation for dynamically injected headers
- Duplicate listener prevention

### 3. **Smart Logo Switching**
- Automatically detects page location (root vs. nested)
- Updates all logo images on the page
- Supports both dark and light theme logos:
  - Dark: `./images/YomlinksLogo.jpg` (root) / `../images/YomlinksLogo.jpg` (nested)
  - Light: `./images/YomlinksLogoLight.jpg` (root) / `../images/YomlinksLogoLight.jpg` (nested)

### 4. **Persistent Theme Preference**
- Uses localStorage to save user preference
- Applies theme immediately to avoid flash of unstyled content (FOUC)
- Default theme: Dark

### 5. **Custom Events**
- Dispatches `themeChanged` event when theme switches
- External code can listen: `window.addEventListener('themeChanged', (e) => { ... })`

### 6. **Accessibility (a11y)**
- Proper ARIA attributes on toggle button
- `role="switch"` for semantic HTML
- `aria-checked` reflects current state
- Keyboard navigation support
- `aria-label` for screen readers

## File Structure

### JavaScript Files

**js/theme.js** - ThemeManager Class
```javascript
// Exposed global functions:
window.toggleTheme()     // Toggle between light and dark
window.setTheme(theme)   // Set specific theme
window.getTheme()        // Get current theme
window.themeManager      // Access to manager instance
```

**js/include.js** - Dynamic HTML Loader
```javascript
// Automatically loads includes with [data-include] attribute
// Calls themeManager.reinitialize() after header injection
```

### HTML Files

**includes/header.html** - Main Navigation Header
- Contains theme toggle button with proper ARIA attributes
- Logo image with "Yomlinks logo" alt text
- Navigation links with relative paths
- Shopping cart icon

### CSS Enhancements

**style.css** - Modern theme toggle styles
- Gradient background on toggle button
- Smooth animations with cubic-bezier easing
- Glow effects on hover
- Icon opacity transitions
- Shadow effects with proper color contrast

## How It Works

### Initialization Sequence

1. **Page Load**
   - `theme.js` loads in `<head>` (before DOM rendering)
   - `ThemeManager` instance created
   - Preferred theme read from localStorage
   - Theme applied immediately (prevents flash)

2. **DOM Ready**
   - `include.js` runs on DOMContentLoaded
   - Fetches and injects `header.html` 
   - Calls `themeManager.reinitialize()`

3. **Post-Injection**
   - Event listeners attached to toggle button
   - Logo updated to match current theme
   - Toggle button state synchronized

### Theme Toggle Flow

```
User clicks toggle button
    ↓
handleToggleClick() called
    ↓
toggleTheme() invoked
    ↓
setTheme(newTheme) executes
    ↓
Updates DOM classes, localStorage, UI elements
    ↓
Dispatches 'themeChanged' event
```

## Usage Examples

### Switch Theme Programmatically
```javascript
// Toggle to opposite theme
window.toggleTheme();

// Set specific theme
window.setTheme('light-theme');
window.setTheme('dark-theme');

// Get current theme
const theme = window.getTheme();
console.log(theme); // 'light-theme' or 'dark-theme'
```

### Listen for Theme Changes
```javascript
window.addEventListener('themeChanged', (event) => {
  const newTheme = event.detail.theme;
  console.log('Theme changed to:', newTheme);
  // Update any external components
});
```

### Access Manager Instance
```javascript
window.themeManager.isLightTheme()  // boolean
window.themeManager.isNestedPage()  // boolean
window.themeManager.getLogoPaths()  // { light, dark }
```

## CSS Variables Used

```css
--primary-bg          /* Main background */
--secondary-bg        /* Secondary background */
--tertiary-bg         /* Tertiary background */
--accent-color        /* Primary accent/highlight */
--border-color        /* Border color */
--text-muted          /* Muted text color */
```

## Theme Classes Applied

- **Light Theme**: `light-theme` class on `<html>` and `<body>`
- **Dark Theme**: `dark-theme` class on `<html>` and `<body>`
- **Data Attribute**: `data-theme` on `<html>` (value: "light" or "dark")

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES6+ JavaScript features
- CSS Grid and Flexbox
- CSS Variables (custom properties)

## Troubleshooting

### Toggle Button Not Working

1. Check browser console for errors
2. Verify `id="themeToggle"` exists in header
3. Confirm `theme.js` loads in `<head>`
4. Clear localStorage and refresh

**Console Check:**
```javascript
window.themeManager.findToggleButton()  // Should return button element
window.toggleTheme()                     // Should toggle theme
```

### Logo Not Changing

1. Verify logo files exist:
   - `images/YomlinksLogo.jpg` (dark)
   - `images/YomlinksLogoLight.jpg` (light)

2. Check logo element has `alt="Yomlinks logo"`

3. Verify theme class is applied:
```javascript
document.body.className  // Should contain 'light-theme' or 'dark-theme'
```

### Styling Issues

1. Clear browser cache
2. Verify CSS variables are defined
3. Check for competing styles
4. Inspect with browser dev tools

## Performance Optimization

- **localStorage Caching**: Theme preference persists
- **Single Instance Pattern**: One ThemeManager per page
- **Debounced Updates**: Prevents rapid theme changes
- **Minimal Repaints**: Only necessary DOM updates
- **Cached HTML Includes**: Fetched includes stored in memory

## Maintenance Notes

- All theme logic centralized in `ThemeManager` class
- Easy to extend with new theme variants
- Proper error handling with console warnings
- Accessibility compliant (WCAG 2.1 AA)
- Mobile-friendly toggle interaction

## Future Enhancements

- [ ] Add auto theme detection (system preference)
- [ ] Implement theme transition animations
- [ ] Add analytics for theme preference tracking
- [ ] Support for additional theme variants (auto, system)
- [ ] Smooth page transition animations on theme change
