import { readFileSync, existsSync, readdirSync } from 'fs';
import path, { resolve } from 'path';
import { fileURLToPath } from 'url';
import { parseSync } from 'svgson';

export const getCurrentDirPath = () => path.dirname(fileURLToPath(import.meta.url));

export const HOME_DIR = resolve(getCurrentDirPath(), '..');
export const SRC_DIR = resolve(HOME_DIR, 'src');
export const PACKAGES_DIR = resolve(HOME_DIR, 'packages');

export const variants = ['light', 'dark'];

// Every source SVG shares this canvas — verified against all 200 files.
export const defaultAttributes = {
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 100 60',
  fill: 'none',
};

/**
 * Convert string to camelCase (handles hyphens, underscores, spaces).
 */
export const toCamelCase = (string) =>
  string.replace(/^([A-Z])|[\s-_]+(\w)/g, (match, p1, p2) => (p2 ? p2.toUpperCase() : p1.toLowerCase()));

export const toPascalCase = (string) => {
  const camelCase = toCamelCase(string);
  return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};

/**
 * Convert a single SVG attribute name to its React/Preact/RN camelCase prop name.
 * Unlike icon libraries with only `stroke-width`, brand logos use a much wider
 * attribute vocabulary (clip-path, fill-rule, stop-color, xlink:href, ...), so this
 * is generic rather than a single hardcoded special case.
 */
export const toCamelCaseAttr = (attr) => attr.replace(/[-:]([a-z])/g, (_, c) => c.toUpperCase());

/**
 * Recursively convert a svgson node into an `IconNode` tuple: [tag, attrs, children?].
 * Recursion matters here: ~12% of source logos contain <defs>/<clipPath>/<linearGradient>
 * with nested children (gradients stops, clip shapes) that a flat one-level mapper
 * (as used by tabler-icons, which only ever has flat <path> lists) would silently drop.
 */
const buildNode = (node, { pascalCase }) => {
  const attrs = {};
  for (const [key, value] of Object.entries(node.attributes || {})) {
    attrs[pascalCase ? toCamelCaseAttr(key) : key] = value;
  }

  const children = (node.children || [])
    .filter((child) => child.type === 'element')
    .map((child) => buildNode(child, { pascalCase }));

  return children.length ? [node.name, attrs, children] : [node.name, attrs];
};

/**
 * Load the canonical provider list (name + slug) from the repo-root payments.json,
 * cross-reference it against the SVGs actually present in src/light + src/dark, and
 * return only providers that have both variants on disk. Providers missing an SVG are
 * skipped with a warning rather than failing the build; SVGs present on disk but not
 * in the canonical list are also skipped with a warning (stale/renamed asset).
 */
export const getAllPayments = ({ withNodes = false, pascalCase = false } = {}) => {
  const canonical = JSON.parse(readFileSync(resolve(HOME_DIR, 'payments.json'), 'utf-8'));

  const payments = [];
  const missing = [];

  canonical.forEach(({ name, logo: slug }) => {
    const lightPath = resolve(SRC_DIR, 'light', `${slug}.svg`);
    const darkPath = resolve(SRC_DIR, 'dark', `${slug}.svg`);

    if (!existsSync(lightPath) || !existsSync(darkPath)) {
      missing.push(slug);
      return;
    }

    const payment = {
      name,
      slug,
      namePascal: toPascalCase(slug),
    };

    variants.forEach((variant) => {
      const svgPath = resolve(SRC_DIR, variant, `${slug}.svg`);
      const content = readFileSync(svgPath, 'utf-8');
      payment[variant] = {
        content,
        ...(withNodes ? { nodes: parseSync(content).children.map((n) => buildNode(n, { pascalCase })) } : {}),
      };
    });

    payments.push(payment);
  });

  if (missing.length) {
    console.warn(`\n[tabler-payments] Skipping ${missing.length} provider(s) with no SVG yet: ${missing.join(', ')}\n`);
  }

  const canonicalSlugs = new Set(canonical.map((p) => p.logo));
  const stray = variants.flatMap((variant) =>
    readdirSync(resolve(SRC_DIR, variant))
      .filter((f) => f.endsWith('.svg'))
      .map((f) => f.replace(/\.svg$/, ''))
      .filter((slug) => !canonicalSlugs.has(slug))
      .map((slug) => `${variant}/${slug}`),
  );
  if (stray.length) {
    console.warn(`\n[tabler-payments] Ignoring SVG(s) not in payments.json: ${stray.join(', ')}\n`);
  }

  return payments;
};
