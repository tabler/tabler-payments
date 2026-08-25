import { describe, it, expect, afterEach } from 'vitest';
import { render, cleanup } from '@testing-library/vue';
import { PaymentVisa, PaymentJcb, PaymentEasypaisa, Payment, paymentsList } from './src/tabler-payments-vue.ts';

describe('payments-vue', () => {
  afterEach(() => cleanup());

  it('renders a flat-path provider', () => {
    const { container } = render(PaymentVisa);
    expect(container.getElementsByTagName('svg').length).toBeGreaterThan(0);
  });

  it('renders a provider with nested <defs>/<clipPath> nodes without dropping them', () => {
    const { container } = render(PaymentJcb);
    const svg = container.getElementsByTagName('svg')[0];
    expect(svg).toBeTruthy();
    expect(svg.querySelector('defs, clipPath, linearGradient, g')).toBeTruthy();
  });

  it('renders both light and dark variants for the renamed easypaisa asset', () => {
    const light = render(PaymentEasypaisa, { props: { variant: 'light' } });
    const dark = render(PaymentEasypaisa, { props: { variant: 'dark' } });
    expect(light.container.getElementsByTagName('svg').length).toBe(1);
    expect(dark.container.getElementsByTagName('svg').length).toBe(1);
  });

  it('sizes height from `size` and derives width from the 5:3 aspect ratio', () => {
    const { container } = render(PaymentVisa, { props: { size: 30 } });
    const svg = container.getElementsByTagName('svg')[0];
    expect(svg.getAttribute('height')).toBe('30');
    expect(svg.getAttribute('width')).toBe('50');
  });

  it('renders dynamically via the Payment lookup component', () => {
    const { container } = render(Payment, { props: { provider: 'mastercard' } });
    expect(container.getElementsByTagName('svg').length).toBeGreaterThan(0);
  });

  it('renders nothing for an unknown provider slug', () => {
    const { container } = render(Payment, { props: { provider: 'not-a-real-provider' } });
    expect(container.getElementsByTagName('svg').length).toBe(0);
  });

  it('adds an accessible <title> when the title prop is set', () => {
    const { container } = render(PaymentVisa, { props: { title: 'Visa' } });
    expect(container.querySelector('title')?.textContent).toBe('Visa');
  });

  it('forwards unknown props/attrs to the root <svg>', () => {
    const { container } = render(PaymentVisa, { props: { id: 'my-visa', 'aria-label': 'Visa logo' } });
    const svg = container.getElementsByTagName('svg')[0];
    expect(svg.getAttribute('id')).toBe('my-visa');
    expect(svg.getAttribute('aria-label')).toBe('Visa logo');
  });

  it('defaults to the light variant when none is given', () => {
    const withoutVariant = render(PaymentVisa);
    const explicitLight = render(PaymentVisa, { props: { variant: 'light' } });
    expect(withoutVariant.container.innerHTML).toBe(explicitLight.container.innerHTML);
  });

  it('renders every provider in paymentsList without throwing', () => {
    expect(paymentsList.length).toBeGreaterThan(0);
    paymentsList.forEach((slug) => {
      const { container, unmount } = render(Payment, { props: { provider: slug } });
      expect(container.getElementsByTagName('svg').length, `provider "${slug}" did not render an <svg>`).toBeGreaterThan(0);
      unmount();
    });
  });
});
