# Hybrid Include System (v4.0)

**Smart fallback system that works both online and offline—no configuration needed.**

## How It Works

The system attempts to load in this order:

```
1. Fetch from external file (online/server mode)
   └─ If fails → XMLHttpRequest (file:// protocol)
       └─ If fails → Embedded template (offline mode)
```

## Setup (Already Configured in index.html)

### External File Reference
```html
<div data-include="includes/header.html" data-include-id="header"></div>
```

### Embedded Fallback Template
```html
<template id="include-template-header">
  <!-- Content here automatically used if external file unavailable -->
</template>
```

### Script Loader
```html
<script src="./js/include.js" defer></script>
```

## Usage Scenarios

### Scenario 1: Online with Server ✅
```bash
python -m http.server 8000
# Open http://localhost:8000
```
✓ Loads from `includes/header.html`  
✓ Fast updates (edit file, refresh page)  
✓ Single source of truth

### Scenario 2: Offline / File Protocol ✅
```bash
# Just open index.html in browser (file://)
# No server needed
```
✓ Uses embedded template automatically  
✓ Works instantly (no network calls)  
✓ Perfect for archives/distribution

### Scenario 3: Network Fails Gracefully ✅
```
Server offline?
→ Falls back to embedded template
→ Page still renders completely
```

## Console Output (Shows What Loaded)

```javascript
[Include] Loaded from external: includes/header.html
[Include] Loaded from xhr: includes/footer.html
[Include] Loaded from embedded: includes/header.html
```

## HTML Attributes

| Attribute | Purpose | Example |
|-----------|---------|---------|
| `data-include` | Path to external file | `"includes/header.html"` |
| `data-include-id` | Custom ID for template lookup | `"header"` |
| `data-include-loaded` | Status flag (set by script) | `"true"` or `"false"` |
| `data-include-source` | Where it loaded from | `"external"`, `"xhr"`, `"embedded"` |

## Adding New Includes

### Step 1: Create external file
**includes/sidebar.html**
```html
<aside class="sidebar">
  <!-- content -->
</aside>
```

### Step 2: Add include in page
```html
<div data-include="includes/sidebar.html" data-include-id="sidebar"></div>
```

### Step 3: Add fallback template
```html
<template id="include-template-sidebar">
  <aside class="sidebar">
    <!-- same content -->
  </aside>
</template>
```

### Step 4: Done ✓
Works online (external file) and offline (embedded template)

## Event System

Listen for when includes load:

```javascript
window.addEventListener('includeLoaded', (event) => {
  const { url, source, element } = event.detail;
  console.log(`Loaded from ${source}:`, url);
  
  // Re-run initialization if needed
  if (source === 'embedded') {
    reinitTheme();
  }
});
```

## Keeping Templates in Sync

**Recommended Workflow:**

1. **Edit external file** → `includes/header.html`
2. **Copy content to template** → `<template id="include-template-header">`
3. **Test offline** → Open as `file://`
4. **Verify both work** → Server mode + file mode

**VS Code Snippet** (save to `.vscode/snippets.code-snippets`):
```json
"Sync Include Template": {
  "prefix": "sync-include",
  "body": "<!-- TODO: Keep this template in sync with includes/${1:filename}.html -->"
}
```

## Troubleshooting

### Template Not Found
```
[Include] Failed to load includes/header.html: Could not load from: 
external file, XHR, or embedded template (id: include-template-header)
```
**Fix:** Ensure `<template id="include-template-header">` exists in HTML

### Theme Not Applying
**Cause:** Theme script loads before includes  
**Fix:** Ensure script order:
```html
<script src="./js/theme.js"></script>  <!-- First -->
<script src="./js/include.js"></script> <!-- Then includes -->
```

### External File Won't Load
**Cause:** Path error or no server  
**Fix:** 
- Check file path is correct
- Run local server: `python -m http.server 8000`
- Or add fallback template

## Performance Tips

- ✅ Templates are parsed during DOMContentLoaded
- ✅ Includes processed sequentially (no race conditions)
- ✅ Use `defer` on script tag for non-blocking load
- ✅ Embedded templates = zero latency (no network)
- ✅ External files = single source (easier maintenance)

## Current Files

### Updated Files
- `index.html` - Added templates for header & footer
- `js/include.js` - v4.0 hybrid loader

### Other Pages to Update
Update these pages with the same pattern:
- `shop.html`
- `blog.html`
- `contact.html`
- `training.html`
- `services.html`

Add to each:
```html
<!-- External file reference -->
<div data-include="includes/header.html" data-include-id="header"></div>

<!-- Later in page -->
<div data-include="includes/footer.html" data-include-id="footer"></div>

<!-- At bottom: embedded templates + script loader (copy from index.html) -->
<template id="include-template-header">...</template>
<template id="include-template-footer">...</template>
<script src="./js/include.js" defer></script>
```

## Version History

| Version | Features |
|---------|----------|
| **v4.0** | Hybrid: fetch → XHR → embedded templates (auto-fallback) |
| v3.0 | Fetch + XHR fallback, offline script separate |
| v2.0 | Theme persistence, custom events |
| v1.0 | Basic fetch |

---

**Best of both worlds:** Works online, offline, or with any network condition. Zero configuration needed.
