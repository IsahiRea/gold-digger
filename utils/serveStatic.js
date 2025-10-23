import fs from 'node:fs/promises'
import path from 'node:path'
import { sendResponse } from './sendResponse.js'
import { getContentType } from './getContentType.js'

export async function serveStatic(req, res, baseDir) {

    const publicDir = path.join(baseDir, 'public')
    const pathToResource = path.join(
        publicDir,
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
                const content = await fs.readFile(path.join(publicDir, '404.html'))
                return sendResponse(res, 404, 'text/html', content)
            } catch {
                console.log(error)
            }
        } else {
            return sendResponse(res, 500, 'text/plain', '500 Internal Server Error')
        }
    }
}