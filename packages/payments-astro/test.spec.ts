import { describe, it, expect, beforeAll } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { PaymentVisa, PaymentJcb, PaymentEasypaisa, Payment } from './src/tabler-payments-astro';

describe('payments-astro', () => {
  let container: Awaited<ReturnType<typeof AstroContainer.create>>;

  beforeAll(async () => {
    container = await AstroContainer.create();
  });

  const openingTag = (html: string) => html.slice(0, html.indexOf('>') + 1);

  it('renders a flat-path provider', async () => {
    const html = await container.renderToString(PaymentVisa as any);
    expect(html).toContain('<svg');
    expect(html).toContain('</svg>');
  });

  it('renders a provider with nested <defs>/<clipPath> nodes without dropping them', async () => {
    const html = await container.renderToString(PaymentJcb as any);
    expect(html).toMatch(/<defs|<clipPath|<linearGradient|<g[ >]/);
  });

  it('renders both light and dark variants for the renamed easypaisa asset', async () => {
    const light = await container.renderToString(PaymentEasypaisa as any, { props: { variant: 'light' } });
    const dark = await container.renderToString(PaymentEasypaisa as any, { props: { variant: 'dark' } });
    expect(light).toContain('<svg');
    expect(dark).toContain('<svg');
  });

  it('sizes height from `size` and derives width from the 5:3 aspect ratio', async () => {
    const tag = openingTag(await container.renderToString(PaymentVisa as any, { props: { size: 30 } }));
    expect(tag).toContain('height="30"');
    expect(tag).toContain('width="50"');
  });

  it('renders dynamically via the Payment lookup component', async () => {
    const html = await container.renderToString(Payment as any, { props: { provider: 'mastercard' } });
    expect(html).toContain('<svg');
  });
});
