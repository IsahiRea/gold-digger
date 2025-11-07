/**
 * Handle SSE price stream connections
 */
export function streamPrices(req, res, context) {
  const { priceSimulator, connectedClients } = context;

  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
  });

  // Add this client to the connected clients set
  connectedClients.add(res);

  // Send current price immediately
  res.write(`data: ${JSON.stringify({ price: priceSimulator.currentPrice })}\n\n`);

  req.on('close', () => {
    connectedClients.delete(res);
  });
}
