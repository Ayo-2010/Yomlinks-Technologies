# Active Navigation Link Feature

## Overview
Navigation links now automatically highlight the current page to show users where they are in the site.

## What's New

### Files Created
- **`js/active-link.js`** - Detects current page and applies active state to matching nav link

### Files Modified
- **`style.css`** - Added `.nav-link.active` styling
- **`index.html`** - Added active-link.js script
- **`shop.html`** - Added active-link.js script
- **`training.html`** - Added active-link.js script
- **`blog.html`** - Added active-link.js script
- **`services.html`** - Added active-link.js script
- **`contact.html`** - Added active-link.js script

## How It Works

### Automatic Detection
When a page loads, the script automatically:
1. Gets the current page filename from the URL
2. Finds all navigation links
3. Compares link URLs to the current page
4. Adds `.active` class to the matching link
5. Sets `aria-current="page"` for accessibility

### Visual Indicator
The active link shows:
- **Accent color** (cyan/turquoise)
- **Underline** (2px border-bottom)
- **Bold text** (font-weight: 600)

## CSS Styling

```css
header#nav .nav-link.active {
    color: var(--accent-color);           /* Cyan color */
    font-weight: 600;                      /* Bold */
    position: relative;
    border-bottom: 2px solid var(--accent-color);  /* Underline */
    padding-bottom: 2px;
}
```

## JavaScript Implementation

The script checks the current page path and compares it with navigation link hrefs:

```javascript
// Get current page
const currentPage = window.location.pathname.split('/').pop() || 'index.html';

// Compare with each link
navLinks.forEach(link => {
  const href = link.getAttribute('href');
  const linkPage = href.split('/').pop();
  
  // Match and add active class
  if (linkPage === currentPage) {
    link.classList.add('active');
    link.setAttribute('aria-current', 'page');
  }
});
```

## Examples

### When on Shop Page
```
Shop  ← Highlighted (active)
Courses
Blog
Contact
```

### When on Training Page
```
Shop
Courses  ← Highlighted (active)
Blog
Contact
```

### When on Blog Page
```
Shop
Courses
Blog  ← Highlighted (active)
Contact
```

### When on Contact Page
```
Shop
Courses
Blog
Contact  ← Highlighted (active)
```

## Accessibility Features

- Uses `aria-current="page"` attribute for screen readers
- Semantic HTML with proper link structure
- Color contrast meets WCAG standards
- Keyboard accessible (can tab to links)
- Works without JavaScript (graceful degradation)

## Browser Support

Works in all modern browsers:
- ✓ Chrome/Edge
- ✓ Firefox
- ✓ Safari
- ✓ Opera

Gracefully degrades in older browsers (no active indicator, but links still work).

## Performance

- Lightweight (~1KB minified)
- Runs on DOMContentLoaded
- No external dependencies
- No performance impact

## How to Test

1. Open index.html → No nav link highlighted (you're on home)
2. Click "Shop" → Shop link highlights
3. Click "Courses" → Courses link highlights
4. Click "Blog" → Blog link highlights
5. Click "Contact" → Contact link highlights
6. Click logo or home link → Back to index (no highlight)

## Customization

### Change Active Link Color
In `style.css`, modify:
```css
header#nav .nav-link.active {
    color: var(--accent-color);  /* Change this to any color */
}
```

### Change Active Link Style
To use a different indicator (e.g., background instead of underline):
```css
header#nav .nav-link.active {
    color: var(--text-primary);
    background-color: var(--accent-color);
    border-radius: 0.25rem;
    padding: 0.5rem 1rem;
}
```

### Add Animation
```css
header#nav .nav-link.active {
    animation: highlightPulse 0.3s ease-out;
}

@keyframes highlightPulse {
    from {
        opacity: 0.5;
        transform: scale(0.95);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}
```

## Troubleshooting

### Active Link Not Showing?
1. Check browser console for errors (F12)
2. Verify `js/active-link.js` is loaded
3. Check that the page URL matches the nav link href
4. Clear browser cache and reload

### Active Link Wrong Page?
1. Check the href attributes in `includes/header.html`
2. Verify URL structure matches
3. File names must match exactly

### Mobile Navigation?
If you add a mobile menu later:
```javascript
// Re-run active link detection after menu loads
window.setActiveLink();
```

## Future Enhancements

Possible improvements:
- Highlight parent menu items for nested navigation
- Add smooth transition animations
- Support for hash-based routing
- Track scroll position for sections

## Summary

✓ Users see which page they're currently on
✓ Improves navigation clarity
✓ Better user experience
✓ Fully accessible
✓ Zero performance impact
✓ Works on all pages
