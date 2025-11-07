/**
 * Gold Price Simulator
 * Generates realistic live gold prices with market-like fluctuations
 * Base price in GBP per troy ounce
 */

class GoldPriceSimulator {
  constructor(basePrice = 2050.00) {
    this.basePrice = basePrice;
    this.currentPrice = basePrice;
    this.trend = 0; // Current market trend (-1 to 1)
    this.volatility = 0.0005; // 0.05% volatility per update
    this.trendStrength = 0.3; // How strongly the trend persists
    this.meanReversion = 0.02; // Pull back to base price
  }

  /**
   * Generate next price using random walk with drift and mean reversion
   * Simulates realistic market behavior with:
   * - Random fluctuations
   * - Trending behavior (momentum)
   * - Mean reversion to base price
   */
  getNextPrice() {
    // Update trend with some persistence and randomness
    const trendChange = (Math.random() - 0.5) * 0.1;
    this.trend = this.trend * this.trendStrength + trendChange;

    // Clamp trend to reasonable bounds
    this.trend = Math.max(-1, Math.min(1, this.trend));

    // Calculate mean reversion force
    const priceDeviation = (this.currentPrice - this.basePrice) / this.basePrice;
    const reversionForce = -priceDeviation * this.meanReversion;

    // Random walk component
    const randomWalk = (Math.random() - 0.5) * 2;

    // Combine all forces
    const priceChange = (
      this.trend * this.volatility +
      randomWalk * this.volatility +
      reversionForce
    ) * this.currentPrice;

    // Update current price
    this.currentPrice += priceChange;

    // Ensure price doesn't go negative or unreasonably low
    this.currentPrice = Math.max(this.basePrice * 0.8, this.currentPrice);

    // Round to 2 decimal places
    return Math.round(this.currentPrice * 100) / 100;
  }

  /**
   * Start generating prices at specified interval
   * @param {Function} callback - Called with each new price
   * @param {number} intervalMs - Update interval in milliseconds (default: 1000)
   * @returns {number} Interval ID for stopping
   */
  startPriceUpdates(callback, intervalMs = 1000) {
    // Send initial price immediately
    callback(this.currentPrice);

    // Then update at specified interval
    return setInterval(() => {
      const newPrice = this.getNextPrice();
      callback(newPrice);
    }, intervalMs);
  }

  /**
   * Stop price updates
   * @param {number} intervalId - ID returned from startPriceUpdates
   */
  stopPriceUpdates(intervalId) {
    clearInterval(intervalId);
  }

  /**
   * Reset to base price
   */
  reset() {
    this.currentPrice = this.basePrice;
    this.trend = 0;
  }

  /**
   * Simulate a market event (spike or crash)
   * @param {number} magnitude - Percentage change (-1 to 1, e.g., 0.05 for 5% increase)
   */
  simulateEvent(magnitude) {
    this.currentPrice *= (1 + magnitude);
    this.trend = magnitude * 2; // Set trend in direction of event
  }
}

// Export for use in Node.js ES modules or browser
export default GoldPriceSimulator;

// Example usage (commented out - uncomment to test)
/*
const simulator = new GoldPriceSimulator(2050.00);

console.log('Starting gold price simulation...');
console.log('Price updates every second. Press Ctrl+C to stop.\n');

const intervalId = simulator.startPriceUpdates((price) => {
  const timestamp = new Date().toLocaleTimeString();
  const change = (price - 2050.00).toFixed(2);
  const changePercent = ((price / 2050.00 - 1) * 100).toFixed(3);
  const arrow = change >= 0 ? '�' : '�';

  console.log(
    `[${timestamp}] �${price.toFixed(2)} ${arrow} ` +
    `(${change >= 0 ? '+' : ''}${change} | ${change >= 0 ? '+' : ''}${changePercent}%)`
  );
}, 1000);

// Simulate a market event after 10 seconds
setTimeout(() => {
  console.log('\n= Market event: Sudden 2% price increase!\n');
  simulator.simulateEvent(0.02);
}, 10000);
*/
