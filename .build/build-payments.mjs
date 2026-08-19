import fs from 'fs-extra';
import path from 'path';
import { PACKAGES_DIR, getAllPayments } from './helpers.mjs';

/**
 * Generate one component file per payment provider.
 *
 * Adapted from tabler-icons' `buildJsIcons`, with two structural differences:
 *  - one component bakes BOTH the light and dark variant (tabler-icons instead
 *    generates two entirely separate components for outline/filled)
 *  - nodes are recursive ([tag, attrs, children?]), not a flat one-level list,
 *    because ~12% of source logos nest <defs>/<clipPath>/<linearGradient>
 */
export const buildJsPayments = ({ name, componentTemplate, indexItemTemplate, extension = 'js', pascalCase = false, indexFile = 'payments.ts' }) => {
  const DIST_DIR = path.resolve(PACKAGES_DIR, name);
  const payments = getAllPayments({ withNodes: true, pascalCase });

  const index = [];

  payments.forEach((payment) => {
    const component = componentTemplate(payment);

    const filePath = path.resolve(DIST_DIR, 'src/payments', `Payment${payment.namePascal}.${extension}`);
    fs.writeFileSync(filePath, component, 'utf-8');

    index.push(indexItemTemplate(payment));
  });

  fs.writeFileSync(path.resolve(DIST_DIR, `src/payments/${indexFile}`), index.join('\n'), 'utf-8');

  return payments;
};

export const buildPaymentsList = (name) => {
  const DIST_DIR = path.resolve(PACKAGES_DIR, name);
  const payments = getAllPayments();

  fs.writeFileSync(
    path.resolve(DIST_DIR, './src/payments-list.ts'),
    `export default ${JSON.stringify(payments.map((p) => p.slug), null, 2)};`,
    'utf-8',
  );
};

/**
 * slug -> component map, consumed by each framework's dynamic `<Payment provider="visa" />`
 * lookup component (mirrors `tabler/shared/ui/Payment.astro`'s `payment` prop API).
 */
export const buildPaymentsMap = (name) => {
  const DIST_DIR = path.resolve(PACKAGES_DIR, name);
  const payments = getAllPayments();

  const imports = payments.map((p) => `import Payment${p.namePascal} from './Payment${p.namePascal}';`).join('\n');
  const map = payments.map((p) => `  '${p.slug}': Payment${p.namePascal},`).join('\n');

  fs.writeFileSync(
    path.resolve(DIST_DIR, './src/payments/payments-map.ts'),
    `${imports}\n\nexport default {\n${map}\n};\n`,
    'utf-8',
  );
};
