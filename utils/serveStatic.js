import fs from 'node:fs/promises'
import path from 'node:path'
import { sendResponse } from './sendResponse.js'
import { getContentType } from './getContentType.js'

export async function serveStatic(res, baseDir) {
    const publicDir = path.join(baseDir, 'public')
    const pathToResource = path.join(
        publicDir,
        req.url === '/' ? 'index.html' : req.url)
    try { 
        const content = await fs.readFile(pathToResource)
        const ext = path.extname(filePath)
        const contentType = getContentType(ext)
        return sendResponse(res, 200, contentType, content)
        // return sendResponse(res, 200, getContentType(filePath), content)
    } catch (error) {
        if (error.code === 'ENOENT') {
            try {
                    const notFoundPath = path.join(publicDir, '404.html')
                    const notFoundContent = await fs.readFile(notFoundPath)
                    return sendResponse(res, 404, 'text/html', notFoundContent)
            } catch {
                console.log(error)
            }
        } else {
            return sendResponse(res, 500, 'text/plain', '500 Internal Server Error')
        }
    }
}