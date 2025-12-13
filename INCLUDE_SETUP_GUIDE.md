# Self-Contained Data-Include System

The `data-include` system now works **without a server** using a dual-approach fallback system.

## How It Works

### Option 1: Network-Based Includes (Recommended)
Uses fetch with automatic XMLHttpRequest fallback for file:// protocol.

**Setup:**
```html
<div data-include="includes/header.html"></div>
<script src="./js/include.js" defer></script>
```

**Running without server:**
- Windows: `python -m http.server 8000`
- macOS/Linux: `python3 -m http.server 8000`
- Then open: `http://localhost:8000`

**Why fetch + XMLHttpRequest?**
- Fetch works with http/https and modern file:// scenarios
- XMLHttpRequest handles older browsers and strict file:// restrictions
- Automatic fallback ensures compatibility

---

### Option 2: Offline-First (Zero-Server Setup)
Embed HTML directly in script tags. Works instantly on file:// without any server.

**Setup:**

1. Add script templates in your HTML before the load:
```html
<script type="text/include" id="include-header">
  <!-- Your header HTML here -->
  <header>
    <nav>...</nav>
  </header>
</script>

<script type="text/include" id="include-footer">
  <!-- Your footer HTML here -->
  <footer>...</footer>
</script>
```

2. Use the offline loader:
```html
<div data-include-offline="header"></div>
<!-- page content -->
<div data-include-offline="footer"></div>

<script src="./js/include-offline.js" defer></script>
```

**Advantages:**
- ✅ Works with file:// protocol (no server needed)
- ✅ Zero latency (content already in DOM)
- ✅ No fetch/XHR calls
- ✅ Perfect for local development

**Disadvantages:**
- ✗ Large HTML gets bundled in each page
- ✗ Harder to update shared components

---

## Troubleshooting

### Issue: "Failed to load content"

**Cause:** Using file:// protocol without a server
**Solution:** Use Option 2 (offline-first) or run a local server

```bash
# Windows
python -m http.server 8000

# macOS/Linux
python3 -m http.server 8000

# With Node.js (http-server)
npx http-server
```

### Issue: CORS errors with http:// or https://

**Cause:** Server restrictions
**Solution:** Ensure `include.js` is served from same origin, or check server CORS headers

### Issue: Theme not applying after include loads

**Cause:** Script order or missing `reinitTheme()` function
**Solution:** Ensure `theme.js` is loaded before `include.js`:

```html
<script src="./js/theme.js" defer></script>
<script src="./js/include.js" defer></script>
```

---

## Event System

Both systems dispatch a custom event when includes load:

```javascript
window.addEventListener('includeLoaded', (event) => {
  console.log('Loaded:', event.detail.url || event.detail.key);
  // Re-run initialization code here if needed
});
```

---

## Current Setup (index.html)

Currently using **Option 1** (network-based):
```html
<div data-include="includes/header.html"></div>
<!-- content -->
<div data-include="includes/footer.html"></div>
<script src="./js/include.js" defer></script>
```

This works with any local server or http/https deployment.

---

## Recommended Workflow

1. **Local Development:** Use Option 1 with local server
   ```bash
   python -m http.server 8000
   ```

2. **Production:** Keep Option 1 (standard fetch)

3. **Offline/Archive:** Switch to Option 2 (embed templates)

---

## File Structure Expected

```
project/
├── index.html
├── shop.html
├── contact.html
├── js/
│   ├── include.js          (Network-based, with fallback)
│   └── include-offline.js  (Offline-first, zero-server)
└── includes/
    ├── header.html
    └── footer.html
```

---

## Script Performance Tips

- Both scripts run on `DOMContentLoaded` after DOM is ready
- Includes are processed sequentially to avoid race conditions
- Use `defer` attribute on script tags for non-blocking load
- Avoid heavy processing in included files
- Use `async` carefully (can cause race conditions)

---

## Version History

- **v3.0:** Added dual-fallback (fetch + XHR), offline support
- **v2.0:** Theme persistence, custom events
- **v1.0:** Basic fetch-based includes
