# Theme Switch - Testing Guide

## Quick Test Instructions

### 1. Test the Toggle Button
1. Open any page (e.g., index.html)
2. Look at the header - you should see a moon/sun icon toggle
3. Click the toggle button
4. **Expected Result**: 
   - Entire page transitions to light theme
   - Background changes from dark navy to light blue-gray
   - Text changes from white to dark gray/black
   - Logo changes to light version
   - All sections update smoothly

### 2. Test Dark Theme
1. Click toggle again
2. **Expected Result**:
   - Page returns to dark theme
   - All colors revert to original dark mode colors
   - Logo changes back to dark version

### 3. Test Persistence
1. Toggle to light theme
2. Refresh the page (F5 or Cmd+R)
3. **Expected Result**: Page loads in light theme (preference remembered)
4. Toggle to dark theme
5. Close tab and reopen the website
6. **Expected Result**: Page opens in dark theme

### 4. Test All Sections
Verify the following sections change properly:

- [ ] **Header** - Background and text colors update
- [ ] **Hero Section** - Background gradient and glow effect adapt
- [ ] **Categories Section** - Card backgrounds and borders update
- [ ] **Featured Products** - Card styling changes
- [ ] **Why Choose Us** - Card styling updates
- [ ] **Services Section** - Background and text adapt
- [ ] **Team Section** - Card styling changes
- [ ] **Newsletter Section** - Background updates
- [ ] **Footer** - Background and text colors change
- [ ] **All Buttons** - Colors adapt for both themes
- [ ] **All Borders** - Border colors update

### 5. Test Logo Switching
1. In dark theme, check the logo (top-left corner)
2. Click toggle to light theme
3. **Expected Result**: Logo changes to light version
4. Click toggle back to dark theme
5. **Expected Result**: Logo changes back to dark version

### 6. Test on Different Pages
Test the toggle on these pages:
- [ ] index.html (Home)
- [ ] shop.html (Shop)
- [ ] blog.html (Blog)
- [ ] contact.html (Contact)
- [ ] services.html (Services)
- [ ] training.html (Training)
- [ ] Any product page (products/*.html)

### 7. Test Mobile Responsiveness
1. Open on mobile device or use browser responsive mode
2. Toggle the theme button
3. **Expected Result**: 
   - Toggle button is accessible and clickable
   - All content adapts to mobile width
   - Theme changes work on small screens
   - Layout remains proper in both themes

### 8. Test Keyboard Accessibility
1. Tab to the theme toggle button (header)
2. Press **Enter** or **Space**
3. **Expected Result**: Theme toggles without mouse
4. Verify this works in multiple browsers

## Color Reference

### What to Look For - Light Theme
- **Backgrounds**: Light blue-gray (#f5f7fa)
- **Cards/Secondary**: Pure white (#ffffff)  
- **Text**: Dark gray/black (#0f1419)
- **Accent/Buttons**: Blue (#0066ff)
- **Borders**: Light gray (#d0d7de)

### What to Look For - Dark Theme
- **Backgrounds**: Navy blue (#0a0e27)
- **Cards/Secondary**: Dark blue (#111629)
- **Text**: White (#ffffff)
- **Accent/Buttons**: Cyan (#00d9ff)
- **Borders**: Dark gray (#2a2f4a)

## Browser Testing

Test in these browsers:
- [ ] Chrome/Edge (Latest)
- [ ] Firefox (Latest)
- [ ] Safari (Latest)
- [ ] Mobile Safari (iPhone)
- [ ] Chrome Mobile (Android)

## Console Testing

Open developer console (F12) and test:
```javascript
// Toggle theme from console
window.toggleTheme()

// Check current theme
console.log(document.body.className)

// Check localStorage
console.log(localStorage.getItem('yomlinks-theme'))
```

## Expected Console Output
```
yomlinks-theme: "light-theme"  // or "dark-theme"
body.className: "light-theme"  // or "dark-theme"
```

## Performance Check
- [ ] No layout shifts during theme change
- [ ] Theme switches instantly (< 300ms)
- [ ] No flickering or flash
- [ ] Smooth transitions on all elements
- [ ] No console errors

## Accessibility Check
- [ ] Toggle button has `aria-label`
- [ ] Toggle button has `role="switch"`
- [ ] Toggle button is keyboard accessible
- [ ] Color contrast is adequate in both themes
- [ ] No color-only information (icons support contrast)

## Troubleshooting

### If toggle doesn't work:
1. Check browser console for errors (F12)
2. Verify `js/theme.js` is loading
3. Verify `YomlinksLogoLight.jpg` exists
4. Clear browser cache and reload
5. Check if localStorage is enabled

### If backgrounds don't change:
1. Verify `style.css` is linked in `<head>`
2. Check that body gets `light-theme` class
3. Verify CSS variables in light-theme section
4. Check browser DevTools styles tab

### If logo doesn't change:
1. Verify light logo file exists
2. Check file path in console
3. Verify updateLogo() is being called
4. Check image file permissions

## Sign-Off Checklist

After testing, verify:
- [ ] All pages have theme switcher
- [ ] Toggle works on every page
- [ ] Theme persists across page loads
- [ ] All sections style correctly
- [ ] Logo changes with theme
- [ ] Mobile responsive
- [ ] Keyboard accessible
- [ ] No console errors
- [ ] Smooth transitions
- [ ] Professional appearance

## Final Verification

The implementation is complete when:
✅ User can click toggle button to switch themes
✅ All page sections update colors automatically
✅ Logo changes between versions
✅ Preference is remembered on return visits
✅ Works on all devices and browsers
✅ Looks professional in both themes

---

**Status**: Ready for production use
