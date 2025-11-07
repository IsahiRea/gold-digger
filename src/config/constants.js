import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const PORT = process.env.PORT || 8080;
export const PROJECT_ROOT = path.resolve(__dirname, '..', '..');
export const PUBLIC_DIR = path.join(PROJECT_ROOT, 'public');
export const DATA_DIR = path.join(PROJECT_ROOT, 'data');
export const PURCHASES_FILE = path.join(DATA_DIR, 'purchases.json');

// Price simulator configuration
export const PRICE_CONFIG = {
  basePrice: 1900,
  updateInterval: 1000, // ms
};
