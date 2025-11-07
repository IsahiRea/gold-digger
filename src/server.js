import http from 'node:http';
import { PORT, PRICE_CONFIG } from './config/constants.js';
import GoldPriceSimulator from './services/priceSimulator.js';
import { handleApiRoutes } from './routes/api.js';
import { serveStatic } from './middleware/staticFiles.js';

// Create a single shared price simulator instance
const priceSimulator = new GoldPriceSimulator(PRICE_CONFIG.basePrice);
const connectedClients = new Set();

// Start the price simulator once
const globalIntervalId = priceSimulator.startPriceUpdates((newPrice) => {
  // Broadcast to all connected clients
  const priceData = `data: ${JSON.stringify({ price: newPrice })}\n\n`;

  for (const client of connectedClients) {
    try {
      client.write(priceData);
    } catch (error) {
      // Remove client if write fails
      connectedClients.delete(client);
    }
  }
}, PRICE_CONFIG.updateInterval);

// Create shared context for route handlers
const context = { priceSimulator, connectedClients };

// Create HTTP server
const server = http.createServer(async (req, res) => {
  // Serve static files
  if (!req.url.startsWith('/api')) {
    return await serveStatic(req, res);
  }

  // Handle API routes
  return await handleApiRoutes(req, res, context);
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

// Graceful shutdown handling
function shutdown(signal) {
  console.log(`\n${signal} received, shutting down gracefully...`);
  priceSimulator.stopPriceUpdates(globalIntervalId);
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
