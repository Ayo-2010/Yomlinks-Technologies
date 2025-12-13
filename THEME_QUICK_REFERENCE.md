# Theme System - Quick Reference Card

## Color Palette at a Glance

### Dark Theme (Default)
```
Primary:    #0a0e27  (deep blue-black)
Secondary:  #111629  (dark blue)
Tertiary:   #1a1f3a  (darker blue)
Text:       #ffffff  (white)
Accent:     #00d9ff  (bright cyan)
Border:     #2a2f4a  (muted blue)
```

### Light Theme
```
Primary:    #f5f7fa  (very light blue)
Secondary:  #ffffff  (white)
Tertiary:   #eff2f5  (light gray-blue)
Text:       #0f1419  (dark gray)
Accent:     #0066ff  (bright blue)
Border:     #d0d7de  (light gray)
```

## Most Used Variables

```css
/* Backgrounds */
var(--primary-bg)     /* Main page background */
var(--secondary-bg)   /* Cards, containers */

/* Text */
var(--text-primary)   /* Headings, main text */
var(--text-secondary) /* Secondary text, descriptions */

/* Interactive */
var(--accent-color)   /* Buttons, links */
var(--accent-dark)    /* Hover states */

/* Utility */
var(--border-color)   /* Borders */
var(--shadow-md)      /* Drop shadows */
```

## Quick Styling Template

```css
.my-element {
    background-color: var(--secondary-bg);
    color: var(--text-primary);
    border: 1px solid var(--border-color);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.my-element:hover {
    background-color: var(--tertiary-bg);
    border-color: var(--accent-color);
}
```

## JavaScript API Cheat Sheet

| Function | Usage | Returns |
|----------|-------|---------|
| `toggleTheme()` | Switch theme | — |
| `setTheme('light-theme')` | Set light mode | — |
| `setTheme('dark-theme')` | Set dark mode | — |
| `getTheme()` | Get current theme | `'light-theme'` or `'dark-theme'` |
| `isLightTheme()` | Check if light theme | `true` or `false` |

## Console Debug Commands

```javascript
// Full health check
ThemeDebug.healthCheck()

// Get current state
ThemeDebug.getState()

// Test toggle
ThemeDebug.testSwitch()

// Reset to defaults
ThemeDebug.reset()

// Get help
ThemeDebug.info()
```

## Common Color Combinations

### Default Button
```css
.btn {
    background-color: var(--accent-color);
    color: var(--primary-bg);
}
```

### Secondary Button
```css
.btn-secondary {
    background-color: transparent;
    color: var(--accent-color);
    border: 2px solid var(--accent-color);
}
```

### Card / Container
```css
.card {
    background-color: var(--secondary-bg);
    border: 1px solid var(--border-color);
    box-shadow: var(--shadow-md);
}
```

### Text with Secondary Color
```css
p {
    color: var(--text-secondary);
}
```

### Muted / Disabled
```css
.disabled {
    color: var(--text-muted);
    opacity: 0.6;
}
```

## Files to Edit When Adding Styles

| File | Purpose | When to Edit |
|------|---------|-------------|
| `style.css` | Main styles | General components, layouts |
| `responsive.css` | Mobile styles | Responsive breakpoints |
| `contact-style.css` | Contact page | Contact page specific |
| `blog-style.css` | Blog styles | Blog page specific |
| `Shop-style.css` | Shop page | Shop page specific |

## Theme Checklist for New Elements

- [ ] Use CSS variables for colors
- [ ] Add smooth transitions (0.3s)
- [ ] Test in both light & dark modes
- [ ] Check contrast ratios (WCAG AA)
- [ ] Verify hover states work
- [ ] Mobile responsive
- [ ] No hardcoded colors
- [ ] No flashing on toggle

## Transition Timing

Use this easing function for smooth animations:
```css
cubic-bezier(0.4, 0, 0.2, 1)
```

Timing:
- Quick changes: `0.15s`
- Normal changes: `0.3s`
- Slow animations: `0.5s`

## Browser DevTools Tips

### Check What Theme is Active
```javascript
document.documentElement.className
// Returns: "dark-theme" or "light-theme"
```

### See All Theme Variables
```javascript
getComputedStyle(document.documentElement)
// Look for variables like: --primary-bg, --text-primary, etc.
```

### Test Theme Changes
```javascript
// Quick test
window.toggleTheme()

// Set light
window.setTheme('light-theme')

// Set dark
window.setTheme('dark-theme')
```

## Common Mistakes to Avoid

❌ Using hardcoded colors
```css
.button { background-color: #00d9ff; }
```

✓ Using CSS variables
```css
.button { background-color: var(--accent-color); }
```

---

❌ Not adding transitions
```css
.element { color: var(--text-primary); }
```

✓ Adding smooth transitions
```css
.element { 
    color: var(--text-primary);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```

---

❌ Over-styling dark theme only
```css
body.dark-theme .element { color: white; }
```

✓ Use variables for both themes
```css
.element { color: var(--text-primary); }
```

## Performance Notes

- CSS variables = instant theme switch
- No JavaScript re-painting needed
- Transitions use GPU acceleration
- Mobile friendly
- No performance impact

## Need Help?

1. **Stuck on a color?** Look at page in both themes
2. **Not switching?** Check for hardcoded colors
3. **Flashing?** Add transition CSS
4. **Element invisible?** Check contrast ratios
5. **Want to debug?** Run `ThemeDebug.healthCheck()`

---

**Version**: 2.1  
**Last Updated**: Dec 13, 2025  
**Status**: ✓ All issues fixed
