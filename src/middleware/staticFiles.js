import fs from 'node:fs/promises'
import path from 'node:path'
import { sendResponse } from '../utils/sendResponse.js'
import { getContentType } from '../utils/getContentType.js'
import { PUBLIC_DIR } from '../config/constants.js';

/**
 * Middleware to serve static files from public directory
 */
export async function serveStatic(req, res) {
  const pathToResource = path.join(
    PUBLIC_DIR,
    req.url === '/' ? 'index.html' : req.url
  )
  const ext = path.extname(pathToResource)
  const contentType = getContentType(ext)

  try {
    const content = await fs.readFile(pathToResource)
    sendResponse(res, 200, contentType, content)
  } catch (error) {
    if (error.code === 'ENOENT') {
      try {
        const content = await fs.readFile(path.join(PUBLIC_DIR, '404.html'))
        return sendResponse(res, 404, 'text/html', content)
      } catch {
        console.log(error)
      }
    } else {
      return sendResponse(res, 500, 'text/plain', '500 Internal Server Error')
    }
  }
}
