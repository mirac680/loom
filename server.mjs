import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.dirname(fileURLToPath(import.meta.url));
const port = Number.parseInt(process.env.PORT || '4173', 10);
const mimeTypes = new Map([
  ['.html', 'text/html; charset=utf-8'],
  ['.css', 'text/css; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.mjs', 'text/javascript; charset=utf-8'],
  ['.svg', 'image/svg+xml'],
  ['.webmanifest', 'application/manifest+json; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8']
]);

const server = createServer(async (request, response) => {
  const method = request.method || 'GET';
  if (method !== 'GET' && method !== 'HEAD') {
    response.writeHead(405, { Allow: 'GET, HEAD' });
    response.end('Method not allowed');
    return;
  }

  let pathname;
  try { pathname = decodeURIComponent(new URL(request.url || '/', 'http://localhost').pathname); }
  catch {
    response.writeHead(400);
    response.end('Bad request');
    return;
  }

  let filePath = path.resolve(projectRoot, `.${pathname}`);
  if (filePath !== projectRoot && !filePath.startsWith(`${projectRoot}${path.sep}`)) {
    response.writeHead(403);
    response.end('Forbidden');
    return;
  }

  try {
    if ((await stat(filePath)).isDirectory()) filePath = path.join(filePath, 'index.html');
    const contents = await readFile(filePath);
    const extension = path.extname(filePath).toLowerCase();
    const headers = {
      'Content-Type': mimeTypes.get(extension) || 'application/octet-stream',
      'Content-Length': contents.length,
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), geolocation=(), microphone=()',
      'Content-Security-Policy': "default-src 'self'; base-uri 'self'; connect-src 'self'; font-src 'self'; img-src 'self' data:; object-src 'none'; script-src 'self'; style-src 'self'; worker-src 'self'; frame-ancestors 'none'; form-action 'self'",
      'Cache-Control': ['.html', '.webmanifest', '.js', '.css'].includes(extension) ? 'no-cache' : 'public, max-age=86400'
    };
    response.writeHead(200, headers);
    if (method === 'HEAD') response.end();
    else response.end(contents);
  } catch (error) {
    const status = error?.code === 'ENOENT' || error?.code === 'ENOTDIR' ? 404 : 500;
    response.writeHead(status, { 'Content-Type': 'text/plain; charset=utf-8', 'X-Content-Type-Options': 'nosniff' });
    response.end(status === 404 ? 'Not found' : 'Could not read this file');
  }
});

server.listen(port, '127.0.0.1', () => {
  console.log(`Loom is ready at http://127.0.0.1:${port}`);
  console.log('Press Ctrl+C to stop the local server.');
});
