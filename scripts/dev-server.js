const esbuild = require('esbuild');
const http = require('http');
const fs = require('fs');
const path = require('path');

// Simple esbuild watch that copies files into ./dist and serves them
esbuild.build({
  entryPoints: ['index.html'],
  bundle: false,
  outdir: 'dist',
  watch: true,
  loader: { '.html': 'file' }
}).catch(() => process.exit(1));

// Serve ./dist
const PORT = 8000;
const server = http.createServer((req, res) => {
  let filePath = path.join(process.cwd(), 'dist', req.url === '/' ? 'index.html' : req.url);
  if (filePath.endsWith('/')) filePath += 'index.html';
  fs.readFile(filePath, (err, data) => {
    if (err) { res.statusCode = 404; res.end('Not found'); return; }
    res.end(data);
  });
});
server.listen(PORT, () => console.log(`Dev server running at http://localhost:${PORT}`));
