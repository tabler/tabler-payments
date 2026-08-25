import { describe, it, expect, beforeAll } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { PaymentVisa, PaymentJcb, PaymentEasypaisa, Payment, paymentsList } from './src/tabler-payments-astro';

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

  it('renders nothing for an unknown provider slug', async () => {
    const html = await container.renderToString(Payment as any, { props: { provider: 'not-a-real-provider' } });
    expect(html).not.toContain('<svg');
  });

  it('adds an accessible <title> when the title prop is set', async () => {
    const html = await container.renderToString(PaymentVisa as any, { props: { title: 'Visa' } });
    expect(html).toContain('<title>Visa</title>');
  });

  it('forwards unknown props to the root <svg>', async () => {
    const tag = openingTag(await container.renderToString(PaymentVisa as any, { props: { 'data-testid': 'my-visa', 'aria-label': 'Visa logo' } }));
    expect(tag).toContain('data-testid="my-visa"');
    expect(tag).toContain('aria-label="Visa logo"');
  });

  it('defaults to the light variant when none is given', async () => {
    const withoutVariant = await container.renderToString(PaymentVisa as any);
    const explicitLight = await container.renderToString(PaymentVisa as any, { props: { variant: 'light' } });
    expect(withoutVariant).toBe(explicitLight);
  });

  it('renders every provider in paymentsList without throwing', async () => {
    expect(paymentsList.length).toBeGreaterThan(0);
    for (const slug of paymentsList) {
      const html = await container.renderToString(Payment as any, { props: { provider: slug } });
      expect(html, `provider "${slug}" did not render an <svg>`).toContain('<svg');
    }
  });
});
