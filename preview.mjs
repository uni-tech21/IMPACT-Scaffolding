import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('./dist/', import.meta.url));
const portArgument = process.argv.indexOf('--port');
const requestedPort = Number(portArgument >= 0 ? process.argv[portArgument + 1] : process.env.PORT || 4173);
if (!Number.isInteger(requestedPort) || requestedPort < 1 || requestedPort > 65535) {
  console.error('Choose a port between 1 and 65535.');
  process.exit(1);
}
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.ico': 'image/x-icon' };
const server = http.createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    const file = path.resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
    const relative = path.relative(root, file);
    if (relative.startsWith('..') || path.isAbsolute(relative)) { res.writeHead(403); res.end('Forbidden'); return; }
    const body = await readFile(file);
    res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    res.end(req.method === 'HEAD' ? undefined : body);
  } catch (error) {
    res.writeHead(error instanceof URIError ? 400 : 404);
    res.end(error instanceof URIError ? 'Invalid address' : 'Not found');
  }
});
let port = requestedPort;
server.on('error', error => {
  if (error.code === 'EADDRINUSE' && port < Math.min(requestedPort + 10, 65535)) {
    console.log(`Port ${port} is already in use; trying ${port + 1}.`);
    server.listen(++port, '127.0.0.1');
  } else { console.error(`Could not start the preview: ${error.message}`); process.exitCode = 1; }
});
server.on('listening', () => { console.log(`Local: http://127.0.0.1:${port}`); console.log(`Serving: ${root}`); });
server.listen(port, '127.0.0.1');
