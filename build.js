#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, 'dist');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const toCopy = [
  'index.html',
  'styles.css',
  'start-menu.js',
  'script.js',
  'service-worker.js',
  'manifest.json'
];

toCopy.forEach(f => {
  const src = path.join(__dirname, f);
  const dest = path.join(outDir, f);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log('Copied', f);
  } else {
    console.warn('Missing', f, '— skipping');
  }
});

function copyDirectory(name) {
  const sourceDir = path.join(__dirname, name);
  const destinationDir = path.join(outDir, name);
  if (!fs.existsSync(sourceDir)) {
    console.warn('Missing directory', name, '— skipping');
    return;
  }
  fs.mkdirSync(destinationDir, { recursive: true });
  fs.readdirSync(sourceDir, { withFileTypes: true }).forEach(entry => {
    const source = path.join(sourceDir, entry.name);
    const destination = path.join(destinationDir, entry.name);
    if (entry.isDirectory()) {
      copyDirectory(path.join(name, entry.name));
    } else {
      fs.copyFileSync(source, destination);
      console.log('Copied', path.join(name, entry.name));
    }
  });
}

copyDirectory('modules');
copyDirectory('images');
copyDirectory('sounds');

console.log('Build complete — files copied to ./dist');
