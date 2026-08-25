import { describe, it, expect, afterEach } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import { PaymentVisa, PaymentJcb, PaymentEasypaisa, Payment, paymentsList } from './src/tabler-payments-react';

describe('payments-react', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders a flat-path provider', () => {
    const { container } = render(<PaymentVisa />);
    expect(container.querySelector('svg')).toBeTruthy();
  });

  it('renders a provider with nested <defs>/<clipPath> nodes without dropping them', () => {
    const { container } = render(<PaymentJcb />);
    const svg = container.querySelector('svg');
    expect(svg).toBeTruthy();
    expect(svg?.querySelector('defs, clipPath, linearGradient, g')).toBeTruthy();
  });

  it('renders both light and dark variants for the renamed easypaisa asset', () => {
    const light = render(<PaymentEasypaisa variant="light" />);
    const dark = render(<PaymentEasypaisa variant="dark" />);
    expect(light.container.querySelector('svg')).toBeTruthy();
    expect(dark.container.querySelector('svg')).toBeTruthy();
  });

  it('sizes height from `size` and derives width from the 5:3 aspect ratio', () => {
    const { container } = render(<PaymentVisa size={30} />);
    const svg = container.querySelector('svg');
    expect(svg?.getAttribute('height')).toBe('30');
    expect(svg?.getAttribute('width')).toBe('50');
  });

  it('renders dynamically via the Payment lookup component', () => {
    const { container } = render(<Payment provider="mastercard" />);
    expect(container.querySelector('svg')).toBeTruthy();
  });

  it('renders nothing for an unknown provider slug', () => {
    const { container } = render(<Payment provider={'not-a-real-provider' as any} />);
    expect(container.querySelector('svg')).toBeNull();
  });

  it('adds an accessible <title> when the title prop is set', () => {
    const { container } = render(<PaymentVisa title="Visa" />);
    expect(container.querySelector('title')?.textContent).toBe('Visa');
  });

  it('forwards unknown props to the root <svg>', () => {
    const { container } = render(<PaymentVisa data-testid="my-visa" aria-label="Visa logo" />);
    const svg = container.querySelector('svg');
    expect(svg?.getAttribute('data-testid')).toBe('my-visa');
    expect(svg?.getAttribute('aria-label')).toBe('Visa logo');
  });

  it('defaults to the light variant when none is given', () => {
    const withoutVariant = render(<PaymentVisa />);
    const explicitLight = render(<PaymentVisa variant="light" />);
    expect(withoutVariant.container.innerHTML).toBe(explicitLight.container.innerHTML);
  });

  it('renders every provider in paymentsList without throwing', () => {
    expect(paymentsList.length).toBeGreaterThan(0);
    paymentsList.forEach((slug) => {
      const { container, unmount } = render(<Payment provider={slug as any} />);
      expect(container.querySelector('svg'), `provider "${slug}" did not render an <svg>`).toBeTruthy();
      unmount();
    });
  });
});
