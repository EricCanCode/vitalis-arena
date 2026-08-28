const fs = require('fs');
const path = require('path');

function gatherIdsFromHTML(file) {
  const txt = fs.readFileSync(file, 'utf8');
  const re = /id\s*=\s*"([^"]+)"/g;
  const ids = new Set();
  let m;
  while ((m = re.exec(txt)) !== null) ids.add(m[1]);
  return ids;
}

function gatherIdsFromJS(file) {
  const txt = fs.readFileSync(file, 'utf8');
  const ids = new Set();
  const re1 = /getElementById\(['"]([^'"]+)['"]\)/g;
  const re2 = /querySelector\(['"]#([^'"\)]+)['"]\)/g;
  let m;
  while ((m = re1.exec(txt)) !== null) ids.add(m[1]);
  while ((m = re2.exec(txt)) !== null) ids.add(m[1]);
  return ids;
}

const repoRoot = path.join(__dirname, '..');
const htmlFile = path.join(repoRoot, 'index.html');
const htmlIds = gatherIdsFromHTML(htmlFile);

const jsFiles = fs.readdirSync(repoRoot).filter(f => f.endsWith('.js') && f !== 'build.js' && f !== 'check-ids.js');
const missing = new Set();
const referenced = new Set();

jsFiles.forEach(f => {
  const filePath = path.join(repoRoot, f);
  const ids = gatherIdsFromJS(filePath);
  ids.forEach(id => referenced.add(id));
});

referenced.forEach(id => {
  if (!htmlIds.has(id)) missing.add(id);
});

console.log('Total IDs referenced in JS:', referenced.size);
console.log('Total IDs defined in index.html:', htmlIds.size);
if (missing.size === 0) {
  console.log('No missing IDs found.');
} else {
  console.log('Missing IDs (referenced in JS but not in index.html):');
  missing.forEach(m => console.log(' -', m));
}
