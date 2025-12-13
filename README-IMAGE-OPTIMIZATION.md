Image optimization (AVIF & WebP)

This project includes a small Node script to generate optimized, responsive images.

What it does
- Scans `./images` for raster files (jpg, png, webp, avif).
- Produces resized WebP and AVIF variants at widths: 480, 800, 1200.
- Produces full-size `-full` AVIF/WebP fallbacks.
- Outputs to `./images/optimized`.

Requirements
- Node.js 16+ (LTS recommended)
- npm

Install

```powershell
cd C:\Users\user\Desktop\computer
npm install
```

Run (process all raster images in `./images`)

```powershell
npm run optimize-images
```

Run for specific files (pass filenames relative to `images`)

```powershell
node scripts/image-optimize.js desktop_bundle.avif keyboard.avif
# or via npm
npm run optimize-images -- desktop_bundle.avif keyboard.avif
```

Output
- Optimized files are written to `./images/optimized`.
- Filenames: `name-480.webp`, `name-480.avif`, `name-800.webp`, etc., and `name-full.webp`/`name-full.avif`.

Notes
- The script avoids touching SVGs.
- After generating optimized images you can update your HTML to use `<picture>` elements with AVIF/WebP fallbacks and responsive `srcset` values.
- If you want different sizes or quality, edit `scripts/image-optimize.js` and adjust `widths` and `quality`.
