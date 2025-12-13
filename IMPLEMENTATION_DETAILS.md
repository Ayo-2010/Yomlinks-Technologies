# Professional Light/Dark Theme - Implementation Details

## Architecture Overview

```
User Interface
    ↓
Theme Toggle Button (header)
    ↓
JavaScript (theme.js)
    ├─ Event Listener (click/keyboard)
    ├─ Toggle Function
    ├─ Logo Update Function
    └─ Storage Management
    ↓
CSS Variables
    ├─ :root (dark theme)
    └─ body.light-theme (light theme)
    ↓
Rendered Page
```

## Core Components

### 1. HTML Toggle Button
**File**: `includes/header.html`

```html
<button class="theme-toggle" id="themeToggle" 
        type="button" 
        title="Toggle light/dark theme" 
        aria-label="Toggle theme" 
        role="switch">
    <span class="icon-moon"><i class="fas fa-moon"></i></span>
    <span class="slider"></span>
    <span class="icon-sun"><i class="fas fa-sun"></i></span>
</button>
```

**Key Attributes**:
- `id="themeToggle"` - JavaScript target selector
- `type="button"` - Semantic HTML
- `role="switch"` - Accessibility
- `aria-label` - Screen reader text
- `aria-pressed` - Dynamically updated by JavaScript

### 2. CSS Variables System
**File**: `style.css`

#### Dark Theme (Default - :root)
```css
:root {
    --primary-bg: #0a0e27;
    --secondary-bg: #111629;
    --tertiary-bg: #1a1f3a;
    --accent-color: #00d9ff;
    --accent-dark: #00a8cc;
    --text-primary: #ffffff;
    --text-secondary: #a8b5d1;
    --text-muted: #6b7493;
    --border-color: #2a2f4a;
    /* ... more variables ... */
}
```

#### Light Theme (body.light-theme)
```css
body.light-theme {
    --primary-bg: #f5f7fa;
    --secondary-bg: #ffffff;
    --tertiary-bg: #eff2f5;
    --accent-color: #0066ff;
    --accent-dark: #0052cc;
    --text-primary: #0f1419;
    --text-secondary: #57606a;
    --text-muted: #8590a2;
    --border-color: #d0d7de;
    /* ... more variables ... */
}
```

### 3. JavaScript Theme Engine
**File**: `js/theme.js`

#### Key Functions

**`getPreferredTheme()`**
```javascript
// Returns theme preference in order of priority:
// 1. localStorage (user's choice)
// 2. System preference (prefers-color-scheme)
// 3. Default (dark theme)
```

**`setTheme(theme)`**
```javascript
// 1. Removes all theme classes
// 2. Adds selected theme class
// 3. Updates logo
// 4. Saves to localStorage
// 5. Updates button state
```

**`updateLogo(theme)`**
```javascript
// Changes logo image based on theme:
// Light: YomlinksLogoLight.jpg
// Dark: YomlinksLogo.jpg
```

**`toggleTheme()`**
```javascript
// Switches between current and opposite theme
// Called by button click or keyboard press
```

#### Event Handlers
```javascript
// Click handler
button.addEventListener('click', function(e) {
    e.preventDefault();
    toggleTheme();
});

// Keyboard handler
button.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleTheme();
    }
});
```

### 4. CSS Theme Application

#### Header Example
```css
header#nav {
    background-color: rgba(10, 14, 39, 0.98);
    transition: all 0.3s ease;
}

body.light-theme header#nav {
    background-color: rgba(255, 255, 255, 0.99);
}
```

#### Button Styles
```css
.btn-primary {
    background-color: var(--accent-color);
    color: var(--primary-bg);
}

/* Automatically adapts when body theme changes */
```

#### Cards Example
```css
.category-card {
    background-color: var(--tertiary-bg);
    border: 1px solid var(--border-color);
}

/* Works in both themes without duplication */
```

## Data Flow

### Theme Change Process

1. **User clicks toggle**
   ```
   Click event → preventDefault() → toggleTheme()
   ```

2. **JavaScript determines new theme**
   ```javascript
   const currentTheme = document.body.classList.contains('light-theme')
       ? 'light-theme' : 'dark-theme';
   const newTheme = currentTheme === 'light-theme' ? 'dark-theme' : 'light-theme';
   ```

3. **Update DOM**
   ```javascript
   body.classList.remove('light-theme', 'dark-theme');
   body.classList.add(newTheme);
   ```

4. **Update Logo**
   ```javascript
   logoImg.src = theme === 'light-theme' 
       ? '/images/YomlinksLogoLight.jpg' 
       : '/images/YomlinksLogo.jpg';
   ```

5. **Save Preference**
   ```javascript
   localStorage.setItem('yomlinks-theme', newTheme);
   ```

6. **CSS Variables Update**
   - Browser automatically applies new variable values
   - All elements using `var(--*)` update instantly
   - Transitions defined in CSS create smooth effect

### Initial Load Process

1. **Page loads**
2. **JavaScript checks for saved preference**
   ```javascript
   const stored = localStorage.getItem('yomlinks-theme');
   ```
3. **If none, check system preference**
   ```javascript
   if (window.matchMedia('(prefers-color-scheme: light)').matches)
   ```
4. **Default to dark theme if no preference**
5. **Apply theme class to body**
6. **All CSS variables adapt automatically**

## Performance Considerations

### Optimizations
- **CSS Variables**: No JavaScript color calculations
- **Single Class Toggle**: Minimal DOM manipulation
- **Hardware Acceleration**: `transition: all 0.3s ease` uses GPU
- **Lazy Logo Update**: Only updates when theme changes
- **localStorage**: Minimal I/O, synchronous operation

### Transition Smooth
```css
body {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```
- Creates smooth 300ms color transition
- No layout shift (colors only, no sizes)
- Cubic-bezier easing for natural feel

## Browser Compatibility

### Required Features
| Feature | Support |
|---------|---------|
| CSS Custom Properties | ✅ All modern browsers |
| prefers-color-scheme | ✅ Chrome 76+, Firefox 67+, Safari 12.1+ |
| localStorage | ✅ All modern browsers |
| Transition | ✅ All modern browsers |

### Fallbacks
- No fallback needed: all modern browsers support features
- Gracefully degrades in older browsers (defaults to dark theme)

## File Structure

```
yomlinks-technologies/
├── style.css
│   ├── :root (dark theme variables)
│   ├── body.light-theme (light theme variables)
│   └── .theme-toggle (button styles)
├── js/
│   └── theme.js
│       ├── getPreferredTheme()
│       ├── setTheme()
│       ├── updateLogo()
│       ├── toggleTheme()
│       └── initialization code
├── includes/
│   └── header.html
│       └── theme toggle button
└── images/
    ├── YomlinksLogo.jpg (dark)
    └── YomlinksLogoLight.jpg (light)
```

## Styling Integration Points

### All elements using variables
```css
/* Background colors */
background-color: var(--primary-bg);
background-color: var(--secondary-bg);

/* Text colors */
color: var(--text-primary);
color: var(--text-secondary);

/* Accents */
background-color: var(--accent-color);
border-color: var(--border-color);

/* Shadows */
box-shadow: var(--shadow-lg);
```

### Transitions
```css
/* All elements with theme-sensitive properties */
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
```

## Accessibility Features

### ARIA Attributes
```html
role="switch"                    <!-- Semantic role -->
aria-label="Toggle theme"        <!-- Screen reader text -->
aria-pressed="true|false"        <!-- Dynamic state -->
title="Toggle light/dark theme"  <!-- Tooltip -->
```

### Keyboard Support
```javascript
// Enter or Space key
if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    toggleTheme();
}
```

### Color Contrast
- Dark theme: Light text on dark background (WCAG AAA)
- Light theme: Dark text on light background (WCAG AAA)

## Future Enhancement Options

1. **Three-Tone Theme**
   - Add high-contrast mode
   - Add auto-theme based on time

2. **Animations**
   - Add transition animations
   - Fade effects on theme change

3. **Theme Customization**
   - User-selectable accent colors
   - Custom theme creator

4. **Analytics**
   - Track theme preference popularity
   - Device-specific theme defaults

---

**Implementation Status**: ✅ Complete and Production-Ready
