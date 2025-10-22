export function sendResponse(res, statusCode, contentType, message) {
  res.statusCode = statusCode
  res.setHeader('Content-Type', contentType)
  res.end(message)
}