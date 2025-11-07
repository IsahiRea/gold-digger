import { streamPrices } from '../controllers/priceController.js';
import { handlePurchase } from '../controllers/purchaseController.js';

/**
 * Handle API routes
 * @param {http.IncomingMessage} req - Request object
 * @param {http.ServerResponse} res - Response object
 * @param {Object} context - Shared context (priceSimulator, connectedClients)
 */
export async function handleApiRoutes(req, res, context) {
  // Price stream endpoint
  if (req.url === '/api/price-stream') {
    return streamPrices(req, res, context);
  }

  // Purchase endpoint
  if (req.url === '/api/purchase' && req.method === 'POST') {
    return await handlePurchase(req, res);
  }

  // Unknown API route
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ success: false, error: 'Not found' }));
}
