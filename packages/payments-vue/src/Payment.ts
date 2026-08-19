import { h } from 'vue';
import paymentsMap from './payments/payments-map';
import type { PaymentProps } from './types';

export type PaymentProvider = keyof typeof paymentsMap;

export interface DynamicPaymentProps extends PaymentProps {
  /** Provider slug, e.g. `"visa"`, `"mastercard"`, `"google-pay"` — see `paymentsList`. */
  provider: PaymentProvider;
}

/**
 * Renders a payment provider logo by slug, for data-driven lists. Mirrors the
 * existing CSS-plugin/Astro API (`tabler/shared/ui/Payment.astro`'s `payment` prop).
 * For a static, known provider, prefer the tree-shakable named export instead.
 */
const Payment = ({ provider, ...rest }: DynamicPaymentProps) => {
  const Component = paymentsMap[provider];

  if (!Component) {
    return null;
  }

  return h(Component, rest);
};

export default Payment;
