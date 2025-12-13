# Light/Dark Theme Audit Report

## Critical Issues Found

### 1. **Contact Page (contact-style.css)**
- **Issue**: Hardcoded colors that DON'T respect the theme system
- **Example**: `.contact-hero` has hardcoded `#1e293b` and `#0f172a` instead of using CSS variables
- **Impact**: Contact page stays dark regardless of theme toggle
- **Lines**: 25, 507

### 2. **Contact Page Info Cards**
- **Issue**: Hardcoded white backgrounds for `.form-card` and `.info-card`
- **Impact**: Cards don't adapt to light/dark themes
- **Lines**: 111, 328

### 3. **Blog Page (blog-style.css)**
- **Issue**: Hardcoded `rgb(255, 251, 252)` background in body
- **Impact**: Body stays light even in dark theme
- **Lines**: 2, 222

### 4. **Blog Page Sidebar**
- **Issue**: Hardcoded `rgba(250,250,250,0.9)` background
- **Impact**: Doesn't follow theme colors
- **Line**: 222

### 5. **Shop Page (Shop-style.css)**
- **Issue**: Uses hardcoded colors in border styling
- **Impact**: Some borders don't change color in light theme
- **Line**: 167 (hardcoded #d1d5db)

### 6. **Header Background**
- **Issue**: Header has hardcoded `rgba(10, 14, 39, 0.98)` instead of using theme variables
- **Impact**: Header background doesn't smoothly transition
- **Line**: 213 in style.css

### 7. **Newsletter Form Input**
- **Issue**: Focus shadow uses hardcoded color `rgba(0, 217, 255, 0.3)`
- **Impact**: Not theme-aware
- **Line**: 975 in style.css

### 8. **All Pages Missing Theme Debug**
- **Issue**: theme-debug.js is included but not found, may cause errors
- **Impact**: Potential console errors

## Summary of Changes Needed
- Convert all hardcoded colors to CSS variables
- Update contact-style.css for theme support
- Update blog-style.css for theme support
- Update Shop-style.css border colors
- Improve header transitions
- Remove/update theme-debug.js reference
- Test all pages in both themes
