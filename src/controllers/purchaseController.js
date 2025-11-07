import { parseBody } from '../utils/requestHelpers.js';
import { createPurchase } from '../services/purchaseService.js';

/**
 * Handle purchase POST requests
 */
export async function handlePurchase(req, res) {
  try {
    const body = await parseBody(req);

    // Validate request body
    if (!body.investmentAmount || !body.goldOunces || !body.priceAtPurchase) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        success: false,
        error: 'Missing required fields: investmentAmount, goldOunces, priceAtPurchase'
      }));
      return;
    }

    // Create purchase via service
    const purchase = await createPurchase(body);

    // Send success response
    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      success: true,
      purchase,
      message: 'Purchase recorded successfully'
    }));

  } catch (error) {
    console.error('Error processing purchase:', error);

    // Check if it's a validation error
    if (error.message.includes('must be positive')) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        success: false,
        error: error.message
      }));
      return;
    }

    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      success: false,
      error: 'Failed to process purchase'
    }));
  }
}
