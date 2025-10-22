import http from 'node:http'
import { serveStatic } from './utils/serveStatic.js';

const PORT = process.env.PORT || 8080;
const baseDir = import.meta.dirname

const server = http.createServer(async (req, res) => {

  if(req.method === 'GET' && req.url === '/') {
    return await serveStatic(res, baseDir)
  }
})

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
})


