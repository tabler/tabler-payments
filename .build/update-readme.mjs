import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { HOME_DIR, getAllPayments } from './helpers.mjs';

/**
 * Refresh the provider count between <!--payments-count--> markers in README.md,
 * same mechanism as the icons-count markers in tabler-icons. Counts only providers
 * that actually ship (both light and dark SVG present), not raw payments.json entries.
 */
const README_PATH = resolve(HOME_DIR, 'README.md');
const MARKER = /<!--payments-count-->\d+<!--\/payments-count-->/g;

const count = getAllPayments().length;
const readme = readFileSync(README_PATH, 'utf-8');

if (!MARKER.test(readme)) {
  console.warn('[tabler-payments] No <!--payments-count--> marker found in README.md, skipping');
  process.exit(0);
}

const updated = readme.replace(MARKER, `<!--payments-count-->${count}<!--/payments-count-->`);

if (updated !== readme) {
  writeFileSync(README_PATH, updated, 'utf-8');
  console.log(`[tabler-payments] README.md payments count updated to ${count}`);
}
