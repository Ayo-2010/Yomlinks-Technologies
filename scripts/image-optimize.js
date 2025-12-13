#!/usr/bin/env node
/*
 Image optimization script
 - Scans ./images for raster files (jpg, png, webp, avif)
 - Produces resized WebP and AVIF variants into ./images/optimized
 - Usage:
    node scripts/image-optimize.js            # process all raster images in ./images
    node scripts/image-optimize.js file1.avif file2.webp  # process only listed files
*/

const fs = require('fs').promises;
const path = require('path');
const sharp = require('sharp');

const projectRoot = path.resolve(__dirname, '..');
const inputDir = path.join(projectRoot, 'images');
const outputDir = path.join(inputDir, 'optimized');
const widths = [480, 800, 1200];
const quality = 75;
const extWhitelist = ['.jpg', '.jpeg', '.png', '.webp', '.avif'];

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function listImages() {
  const files = await fs.readdir(inputDir);
  return files.filter(f => {
    const ext = path.extname(f).toLowerCase();
    if (!extWhitelist.includes(ext)) return false;
    if (f === 'optimized') return false;
    return true;
  });
}

async function processFile(file) {
  const inputPath = path.join(inputDir, file);
  const { name } = path.parse(file);

  for (const w of widths) {
    const webpOut = path.join(outputDir, `${name}-${w}.webp`);
    const avifOut = path.join(outputDir, `${name}-${w}.avif`);
    await sharp(inputPath).resize({ width: w }).webp({ quality }).toFile(webpOut);
    await sharp(inputPath).resize({ width: w }).avif({ quality }).toFile(avifOut);
  }

  // full-size optimized fallbacks
  await sharp(inputPath).webp({ quality }).toFile(path.join(outputDir, `${name}-full.webp`));
  await sharp(inputPath).avif({ quality }).toFile(path.join(outputDir, `${name}-full.avif`));

  console.log(`Processed ${file}`);
}

(async function main() {
  try {
    await ensureDir(outputDir);

    const args = process.argv.slice(2);
    const files = args.length ? args : await listImages();

    if (!files.length) {
      console.log('No raster images found to process. Supported extensions:', extWhitelist.join(', '));
      return;
    }

    for (const f of files) {
      // allow passing relative paths or bare filenames
      const filename = path.basename(f);
      await processFile(filename);
    }

    console.log('Image optimization complete. Outputs in ./images/optimized');
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
})();
