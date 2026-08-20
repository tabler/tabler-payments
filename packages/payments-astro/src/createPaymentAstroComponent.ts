import { createComponent, render as renderTemplate, spreadAttributes, unescapeHTML } from 'astro/compiler-runtime';
import defaultAttributes, { ASPECT_RATIO } from './defaultAttributes';
import type { AstroComponent, IconNode, PaymentProps } from './types';

/**
 * Serialize a (possibly nested) IconNode tree to a raw HTML string once, at
 * module init — the path data never changes per render, only the root <svg>
 * attributes do. Recursion is required: unlike tabler-icons' flat icon nodes,
 * ~12% of these logos nest <defs>/<clipPath>/<linearGradient>.
 */
const renderNodesToString = (nodes: IconNode): string =>
  nodes
    .map(([tag, attrs, children]) => `<${tag}${String(spreadAttributes(attrs))}>${children ? renderNodesToString(children) : ''}</${tag}>`)
    .join('');

/**
 * Creates an Astro component factory for a payment provider logo.
 *
 * Astro compiles a `.astro` file down to a `createComponent()` call whose
 * render function returns a `renderTemplate` tagged-template result. We build
 * the same shape by hand so every provider can ship as a plain `.ts` module —
 * verified against the actual `astro@7.2.4` runtime exports, since
 * `astro/compiler-runtime` is an internal, unpublished API.
 */
const createPaymentAstroComponent = (slug: string, namePascal: string, nodes: { light: IconNode; dark: IconNode }): AstroComponent => {
  const html = {
    light: renderNodesToString(nodes.light),
    dark: renderNodesToString(nodes.dark),
  };

  return createComponent((result: any, props: PaymentProps, slots: any) => {
    const { variant = 'light', size = 24, title, class: className, ...rest } = props ?? {};

    const height = typeof size === 'number' ? size : parseFloat(String(size)) || 24;
    const width = Math.round(height * ASPECT_RATIO * 100) / 100;

    const attributes = {
      ...defaultAttributes,
      width,
      height,
      class: `tabler-payment tabler-payment-${slug}${className ? ` ${className}` : ''}`,
      ...rest,
    };

    return renderTemplate`<svg${spreadAttributes(attributes)}>${title != null ? renderTemplate`<title>${title}</title>` : ''}${unescapeHTML(html[variant])}</svg>`;
  }, `tabler-payment-${slug}`, undefined) as AstroComponent;
};

export default createPaymentAstroComponent;
