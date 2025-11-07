import { readPurchases, savePurchases } from '../utils/storageHelpers.js';

/**
 * Create a new purchase record
 * @param {Object} purchaseData - Purchase data
 * @returns {Promise<Object>} Created purchase with ID and timestamp
 */
export async function createPurchase(purchaseData) {
  const { investmentAmount, goldOunces, priceAtPurchase } = purchaseData;

  // Validate amounts are positive numbers
  if (investmentAmount <= 0 || goldOunces <= 0 || priceAtPurchase <= 0) {
    throw new Error('All amounts must be positive numbers');
  }

  // Create purchase record
  const purchase = {
    id: Date.now().toString(),
    investmentAmount,
    goldOunces,
    priceAtPurchase,
    timestamp: new Date().toISOString()
  };

  // Save to file
  const purchases = await readPurchases();
  purchases.push(purchase);
  await savePurchases(purchases);

  return purchase;
}

/**
 * Get all purchases
 * @returns {Promise<Array>} List of all purchases
 */
export async function getAllPurchases() {
  return await readPurchases();
}
