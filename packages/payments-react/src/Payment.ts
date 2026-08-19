import { createElement } from 'react';
import paymentsMap from './payments/payments-map';
import type { PaymentProps } from './types';

export type PaymentProvider = keyof typeof paymentsMap;

export interface DynamicPaymentProps extends PaymentProps {
  /** Provider slug, e.g. `"visa"`, `"mastercard"`, `"google-pay"` — see `paymentsList`. */
  provider: PaymentProvider;
}

/**
 * Renders a payment provider logo by slug, for data-driven lists (e.g. an accepted-
 * providers row built from `@tabler/payments`' `payments.json`). Mirrors the existing
 * CSS-plugin/Astro API (`tabler/shared/ui/Payment.astro`'s `payment` prop) so teams
 * already using that plugin have a drop-in equivalent here.
 *
 * For a static, known provider, prefer the tree-shakable named export instead, e.g.
 * `import { PaymentVisa } from '@tabler/payments-react'`.
 */
const Payment = ({ provider, ...rest }: DynamicPaymentProps) => {
  const Component = paymentsMap[provider];

  if (!Component) {
    return null;
  }

  return createElement(Component, rest);
};

export default Payment;
