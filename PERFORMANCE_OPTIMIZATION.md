# Website Performance Optimization Guide

## Quick Summary
**Target: Improve Core Web Vitals (LCP, FID, CLS)**

---

## 1. CRITICAL OPTIMIZATIONS (Implement First)

### 1.1 Font Loading Optimization
**Current Issue:** Google Fonts blocks rendering
**Fix:** Add `display=swap` parameter

```html
<!-- BEFORE -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Poppins:wght@500;600;700;800&display=swap" rel="stylesheet">

<!-- AFTER (Already correct!) -->
<!-- Keep display=swap - it prevents font blocking -->
```

### 1.2 Defer Non-Critical JavaScript
**Current Issue:** Scripts load before content renders
**Fix:** Add `defer` to all non-critical scripts

```html
<!-- Move to bottom of body, use defer -->
<script src="./js/include.js" defer></script>
<script src="./fontawesome-free-6.6.0-web/js/all.min.js" defer></script>
```

### 1.3 Font Subsetting
**Reduce font file size by 60-70%**

Create `fonts/fonts.css`:
```css
/* Only load weights actually used */
@font-face {
  font-family: 'Inter';
  src: url('./Inter-subset.woff2') format('woff2');
  font-weight: 300 700;
  font-display: swap;
}

@font-face {
  font-family: 'Poppins';
  src: url('./Poppins-subset.woff2') format('woff2');
  font-weight: 600 800;
  font-display: swap;
}
```

### 1.4 Preload Critical Resources
Add to `<head>`:
```html
<!-- Preload critical resources -->
<link rel="preload" as="style" href="./style.css">
<link rel="preload" as="script" href="./js/theme.js">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="dns-prefetch" href="https://fonts.gstatic.com">
```

---

## 2. IMAGE OPTIMIZATION (60-70% of page size)

### 2.1 Image Format Strategy
- **Modern formats:** WebP (30% smaller) + AVIF (20% smaller than WebP)
- **Fallback:** JPEG for older browsers

**Use picture tags:**
```html
<picture>
  <source srcset="image.avif" type="image/avif">
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="description" loading="lazy" width="800" height="600">
</picture>
```

### 2.2 Responsive Images
Use `srcset` for different screen sizes:
```html
<img 
  srcset="image-320w.jpg 320w, image-640w.jpg 640w, image-1200w.jpg 1200w"
  sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 100vw"
  src="image-1200w.jpg"
  alt="description"
  loading="lazy"
>
```

### 2.3 Current Image Assets to Optimize
Located in `./images/`:
- gamingpc.webp → Convert to AVIF + lazy load
- keyboard.avif → Already optimized
- Monitor images → Compress and add srcset
- Employee photos → Compress to ~50KB each

### 2.4 Generate Optimized Images
Already have script in `scripts/image-optimize.js`:
```bash
npm run optimize-images
```

---

## 3. CSS OPTIMIZATION

### 3.1 Critical CSS Inlining
Inline above-the-fold CSS in `<head>`:
```html
<style>
  /* Critical styles only - max 14KB */
  :root { /* color vars */ }
  body { /* basic layout */ }
  .hero { /* above fold */ }
  .header { /* always visible */ }
</style>
<link rel="stylesheet" href="style.css">
```

### 3.2 Split CSS by Purpose
- `critical.css` (2KB) - Inline in head
- `style.css` (main)
- `responsive.css` - Add `media="print"` then `onload="this.media='all'"`
- `blog-style.css` - Only load on blog pages
- `contact-style.css` - Only load on contact page
- `shop-style.css` - Only load on shop page

**Load conditionally:**
```html
<link rel="stylesheet" href="blog-style.css" media="print" onload="this.media='all'">
```

### 3.3 Remove Unused CSS
Currently loading 5+ stylesheets on every page:
- `style.css` - Load everywhere (main)
- `responsive.css` - Load everywhere
- `blog-style.css` - Load only on blog.html
- `contact-style.css` - Load only on contact.html
- `shop-style.css` - Load only on shop.html

---

## 4. JAVASCRIPT OPTIMIZATION

### 4.1 Code Splitting
Separate scripts by page:
- `theme.js` - Load on all pages ✓
- `include.js` - Load on all pages ✓
- `theme-debug.js` - Remove for production
- Training scripts - Only on training.html
- Shop scripts - Only on shop.html

### 4.2 Optimize theme.js (Currently 8KB)
Changes to improve:
1. Remove setTimeout retries - use simpler logic
2. Remove updateAllIframes (unused)
3. Cache DOM queries

**Before:**
```javascript
function setupButton() {
  const btn = document.getElementById('themeToggle');
  if (!btn) {
    if (!window.__themeInitRetries) {
      window.__themeInitRetries = 0;
    }
    if (window.__themeInitRetries < 5) {
      window.__themeInitRetries++;
      const delay = Math.min(100 * window.__themeInitRetries, 500);
      setTimeout(setupButton, delay);
    }
    return;
  }
  // ...
}
```

**After:**
```javascript
function setupButton() {
  const btn = document.getElementById('themeToggle');
  if (!btn) return; // Simpler
  
  if (btn.hasAttribute('data-theme-listeners')) {
    updateButton(getTheme());
    return;
  }
  
  btn.addEventListener('click', handleClick);
  btn.addEventListener('keydown', handleKeydown);
  btn.setAttribute('data-theme-listeners', 'true');
  updateButton(getTheme());
}
```

### 4.3 FontAwesome Optimization
**Current:** Loading `all.min.js` (100KB+)

**Solutions:**
1. Use CSS-only icons where possible
2. Load only `solid.min.js` (lighter)
3. Or use inline SVGs for critical icons

```html
<!-- INSTEAD OF: -->
<i class="fas fa-check"></i>

<!-- USE: -->
<svg width="20" height="20" viewBox="0 0 20 20">
  <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
</svg>
```

---

## 5. SERVER & CACHING

### 5.1 Add Cache Headers (.htaccess or server config)
```apache
# Cache static assets for 1 year
<FilesMatch "\.(jpg|jpeg|png|webp|avif|woff2|css|js)$">
  Header set Cache-Control "public, max-age=31536000, immutable"
</FilesMatch>

# Cache HTML with short TTL
<FilesMatch "\.html$">
  Header set Cache-Control "public, max-age=3600, must-revalidate"
</FilesMatch>
```

### 5.2 Enable GZIP Compression
```apache
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript
</IfModule>
```

### 5.3 Enable Browser Caching
Add to `.htaccess`:
```apache
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/avif "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType font/woff2 "access plus 1 year"
</IfModule>
```

---

## 6. LIGHTHOUSE IMPROVEMENTS

### 6.1 Metrics Impact
| Optimization | Impact |
|---|---|
| Image optimization | +25-35 Lighthouse |
| Font subsetting | +8-12 Lighthouse |
| Critical CSS inlining | +5-10 Lighthouse |
| Script deferring | +8-15 Lighthouse |
| Caching headers | +10-15 Lighthouse |
| **Total Expected** | **+60-80 Lighthouse** |

### 6.2 Target Scores
- **Performance:** 85+ (from ~55-65)
- **FCP (First Contentful Paint):** <1.5s
- **LCP (Largest Contentful Paint):** <2.5s
- **CLS (Cumulative Layout Shift):** <0.1

---

## 7. IMPLEMENTATION CHECKLIST

### Phase 1: Critical (Do First)
- [ ] Defer all non-critical scripts
- [ ] Add preload for critical resources
- [ ] Optimize all JPEG/PNG to WebP/AVIF
- [ ] Add lazy loading to all images
- [ ] Remove `theme-debug.js` from production
- [ ] Split page-specific CSS files

### Phase 2: Important (Next)
- [ ] Inline critical CSS
- [ ] Font subsetting
- [ ] Responsive images with srcset
- [ ] Replace FontAwesome with inline SVGs
- [ ] Minify CSS/JS files
- [ ] Add cache headers

### Phase 3: Nice-to-Have (Later)
- [ ] Service Worker for offline support
- [ ] Image CDN (Cloudinary/Imgix)
- [ ] Reduce third-party scripts
- [ ] Code splitting for training/shop
- [ ] Dynamic imports for modals

---

## 8. TESTING & MONITORING

### 8.1 Check Performance
```bash
# Use Chrome DevTools:
1. Lighthouse (Ctrl+Shift+I > Lighthouse)
2. Network tab (check waterfall, file sizes)
3. Coverage tab (unused CSS/JS)
4. Performance tab (record, find bottlenecks)

# Or online:
- PageSpeed Insights (Google)
- GTmetrix
- WebPageTest
```

### 8.2 Before & After Comparison
Log these metrics:
- Total bundle size
- First Contentful Paint
- Largest Contentful Paint
- Time to Interactive
- Cumulative Layout Shift

### 8.3 Monitoring Script
Add to `<head>`:
```html
<script>
// Track Web Vitals
function trackWebVitals() {
  const nav = performance.getEntriesByType('navigation')[0];
  console.log('Page Load:', {
    FCP: nav.domContentLoadedEventEnd - nav.domContentLoadedEventStart,
    LCP: nav.loadEventEnd - nav.loadEventStart,
    TTFB: nav.responseStart - nav.requestStart
  });
}
window.addEventListener('load', trackWebVitals);
</script>
```

---

## 9. QUICK WINS (30 min implementation)

1. **Remove debug scripts** → 5KB saved
   ```html
   <!-- Remove: <script src="./js/theme-debug.js"></script> -->
   ```

2. **Add img lazy loading** → Saves initial bandwidth
   ```html
   <img src="..." loading="lazy" alt="...">
   ```

3. **Defer scripts** → Speeds up rendering
   ```html
   <script src="theme.js" defer></script>
   <script src="include.js" defer></script>
   ```

4. **Add preload** → Faster critical resources
   ```html
   <link rel="preload" as="style" href="./style.css">
   <link rel="preconnect" href="https://fonts.googleapis.com">
   ```

5. **Load only needed CSS** → Reduce cascade
   ```html
   <!-- On blog.html only: -->
   <link rel="stylesheet" href="blog-style.css">
   ```

---

## 10. PERFORMANCE BUDGET

**Target file sizes:**
- HTML: < 100KB each
- CSS: < 50KB (main)
- JS: < 30KB (main)
- Images: < 300KB total per page
- Fonts: < 200KB total

**Current vs Target:**
```
Main bundle (index.html):
- Before: ~200KB (all CSS + JS)
- After: ~80KB (optimized + lazy)
- Saving: 60% reduction
```

---

## 11. AUTOMATION

### 11.1 Image Optimization Script
Already exists: `scripts/image-optimize.js`
```bash
npm install
npm run optimize-images
```

### 11.2 CSS Minification
Install & run:
```bash
npm install -D cssnano postcss postcss-cli
npx postcss style.css -o style.min.css
```

### 11.3 JS Minification
```bash
npm install -D uglify-js
npx uglifyjs js/theme.js -o js/theme.min.js -c -m
```

---

## Next Steps

1. **Start with Phase 1** - Takes 1-2 hours
2. **Test with Lighthouse** - Get baseline metrics
3. **Implement Phase 2** - Takes 2-3 hours
4. **Monitor performance** - Use web vitals
5. **Iterate** - Focus on biggest improvements

**Expected result:** 30-50 point Lighthouse improvement
