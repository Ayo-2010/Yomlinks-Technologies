# Theme System - Best Practices & Developer Guide

## Overview
Yomlinks implements a CSS variable-based theme system supporting light and dark modes with smooth transitions.

## Current Theme Variables

### Core Colors
```css
/* Dark Theme (Default) */
--primary-bg: #0a0e27
--secondary-bg: #111629
--tertiary-bg: #1a1f3a
--accent-color: #00d9ff (cyan)
--accent-dark: #00a8cc
--text-primary: #ffffff
--text-secondary: #a8b5d1
--text-muted: #6b7493
--border-color: #2a2f4a

/* Light Theme */
--primary-bg: #f5f7fa
--secondary-bg: #ffffff
--tertiary-bg: #eff2f5
--accent-color: #0066ff (blue)
--accent-dark: #0052cc
--text-primary: #0f1419
--text-secondary: #57606a
--text-muted: #8590a2
--border-color: #d0d7de
```

### Spacing
```css
--spacing-xs: 0.5rem
--spacing-sm: 1rem
--spacing-md: 1.5rem
--spacing-lg: 2rem
--spacing-xl: 3rem
--spacing-2xl: 4rem
```

### Typography
```css
--font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
--font-heading: 'Poppins', 'Inter', sans-serif
```

### Transitions
```css
--transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)
--transition-fast: all 0.15s ease-out
```

### Shadows
```css
/* Dark Theme */
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05)
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1)
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.2)
--shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.3)

/* Light Theme */
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.06)
--shadow-md: 0 4px 8px rgba(0, 0, 0, 0.1)
--shadow-lg: 0 10px 20px rgba(0, 0, 0, 0.12)
--shadow-xl: 0 20px 30px rgba(0, 0, 0, 0.15)
```

## JavaScript API

### Global Functions Available
```javascript
// Toggle between light and dark themes
window.toggleTheme()

// Set specific theme
window.setTheme('light-theme')
window.setTheme('dark-theme')

// Get current theme
window.getTheme() // Returns: 'light-theme' or 'dark-theme'

// Check if light theme is active
window.isLightTheme() // Returns: true or false
```

### Debug Utilities
```javascript
// Run system health check
ThemeDebug.healthCheck()

// Get current state
ThemeDebug.getState()

// Test theme toggle
ThemeDebug.testSwitch()

// Set specific theme
ThemeDebug.setTheme('light-theme')

// Reset to defaults
ThemeDebug.reset()
```

## How to Style New Elements

### Rule 1: Always Use CSS Variables
❌ BAD:
```css
.my-element {
    background-color: #111629;
    color: #ffffff;
    border: 1px solid #2a2f4a;
}
```

✓ GOOD:
```css
.my-element {
    background-color: var(--secondary-bg);
    color: var(--text-primary);
    border: 1px solid var(--border-color);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Rule 2: Add Smooth Transitions
```css
.my-element {
    background-color: var(--primary-bg);
    color: var(--text-primary);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Rule 3: No Theme-Specific Rules Needed
The CSS variables automatically handle light/dark themes:
```css
/* This automatically works for both themes */
.button {
    background-color: var(--accent-color);
    color: var(--primary-bg);
}
```

### Rule 4: For Special Cases, Use body.light-theme
```css
/* Only when you need completely different styling */
.special-element {
    background: linear-gradient(135deg, var(--primary-bg), var(--secondary-bg));
}

body.light-theme .special-element {
    background: linear-gradient(135deg, var(--secondary-bg), var(--tertiary-bg));
}
```

## Color Selection Guide

| Element Type | Use Variable |
|---|---|
| Main backgrounds | `--primary-bg` |
| Cards, containers | `--secondary-bg` |
| Subtle backgrounds | `--tertiary-bg` |
| Primary text | `--text-primary` |
| Secondary text | `--text-secondary` |
| Muted/disabled text | `--text-muted` |
| Interactive elements | `--accent-color` |
| Hover states | `--accent-dark` |
| Borders | `--border-color` |
| Success messages | `--success-color` |
| Warnings | `--warning-color` |
| Errors | `--danger-color` |

## Common Patterns

### Hover Effects
```css
.button {
    background-color: var(--accent-color);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.button:hover {
    background-color: var(--accent-dark);
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
}
```

### Cards
```css
.card {
    background-color: var(--secondary-bg);
    border: 1px solid var(--border-color);
    border-radius: 0.75rem;
    padding: var(--spacing-lg);
    box-shadow: var(--shadow-md);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.card:hover {
    border-color: var(--accent-color);
    box-shadow: var(--shadow-lg);
}
```

### Forms
```css
.form-input {
    background-color: var(--primary-bg);
    border: 1px solid var(--border-color);
    color: var(--text-primary);
    transition: all 0.3s ease;
}

.form-input:focus {
    outline: none;
    border-color: var(--accent-color);
    box-shadow: 0 0 10px rgba(0, 102, 255, 0.3);
}

body.dark-theme .form-input:focus {
    box-shadow: 0 0 10px rgba(0, 217, 255, 0.3);
}
```

## Adding New Pages

1. **Link the theme script** in `<head>`:
```html
<script src="./js/theme.js"></script>
```

2. **Use CSS variables** for all colors:
```css
body {
    background-color: var(--primary-bg);
    color: var(--text-primary);
}
```

3. **Add transitions**:
```css
* {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```

4. **Include header**:
```html
<div data-include="includes/header.html"></div>
```

## Testing Checklist

- [ ] Toggle theme multiple times - no flashing
- [ ] All text is readable in both themes
- [ ] All buttons are clickable and visible
- [ ] Forms have proper contrast
- [ ] Images aren't affected by theme (unless intentional)
- [ ] Hover states work in both themes
- [ ] Mobile view works in both themes
- [ ] No hardcoded colors are visible
- [ ] Transitions are smooth (60fps)
- [ ] No console errors

## Performance Tips

1. **Use CSS variables** instead of JavaScript for styling
2. **Minimize transitions** on large lists
3. **Batch DOM updates** if changing multiple colors
4. **Test on low-end devices** for performance

## Browser Support

- Chrome/Edge: ✓ Full support
- Firefox: ✓ Full support
- Safari: ✓ Full support (iOS 9.3+)
- IE 11: ✗ No support (fallback to dark theme)

## Accessibility Notes

- ✓ WCAG 2.1 AA contrast ratios maintained
- ✓ Prefers-color-scheme supported
- ✓ Smooth transitions (no motion sickness)
- ✓ Focus states clearly visible
- ✓ Color not sole differentiator

## Example: Creating a New Component

```html
<!-- HTML -->
<div class="my-component">
    <h3>Title</h3>
    <p>Description</p>
    <button class="btn btn-primary">Action</button>
</div>
```

```css
/* CSS */
.my-component {
    background-color: var(--secondary-bg);
    border: 1px solid var(--border-color);
    border-radius: 0.75rem;
    padding: var(--spacing-lg);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.my-component h3 {
    color: var(--text-primary);
    margin-bottom: var(--spacing-md);
}

.my-component p {
    color: var(--text-secondary);
    margin-bottom: var(--spacing-md);
}

.my-component:hover {
    border-color: var(--accent-color);
    box-shadow: var(--shadow-lg);
}
```

## Troubleshooting

### Issue: Colors don't change when toggling theme
**Solution**: Make sure you're using CSS variables, not hardcoded colors

### Issue: Flashing white/dark on page load
**Solution**: theme.js is already in `<head>` and applies theme immediately

### Issue: Some elements don't transition smoothly
**Solution**: Add `transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);` to the element

### Issue: Debug panel won't appear
**Solution**: Open browser console and type `ThemeDebug.healthCheck()`

---

**Last Updated**: December 13, 2025
**Version**: 2.1
**Status**: Production Ready
