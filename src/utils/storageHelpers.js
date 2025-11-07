import { promises as fs } from 'node:fs';
import { DATA_DIR, PURCHASES_FILE } from '../config/constants.js';

/**
 * Ensure data directory exists
 */
export async function ensureDataDirectory() {
  try {
    await fs.access(DATA_DIR);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
  }
}

/**
 * Read purchases from file
 */
export async function readPurchases() {
  try {
    const data = await fs.readFile(PURCHASES_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // File doesn't exist or is invalid, return empty array
    return [];
  }
}

/**
 * Save purchases to file
 */
export async function savePurchases(purchases) {
  await ensureDataDirectory();
  await fs.writeFile(PURCHASES_FILE, JSON.stringify(purchases, null, 2), 'utf-8');
}
