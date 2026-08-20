import { createComponent, render as renderTemplate, renderComponent } from 'astro/compiler-runtime';
import paymentsMap from './payments/payments-map';
import type { AstroComponent, PaymentProps } from './types';

export type PaymentProvider = keyof typeof paymentsMap;

export interface DynamicPaymentProps extends PaymentProps {
  /** Provider slug, e.g. `"visa"`, `"mastercard"`, `"google-pay"` — see `paymentsList`. */
  provider: PaymentProvider;
}

/**
 * Renders a payment provider logo by slug, for data-driven lists. Mirrors the
 * existing CSS-plugin/Astro API (`tabler/shared/ui/Payment.astro`'s `payment` prop).
 * For a static, known provider, prefer the tree-shakable named export instead.
 *
 * Delegates to the looked-up provider's own component factory via Astro's
 * `renderComponent` — verified against `astro@7.2.4`'s actual runtime export
 * (`renderComponent(result, displayName, Component, props, slots)`).
 */
const Payment = createComponent((result: any, props: DynamicPaymentProps, slots: any) => {
  const { provider, ...rest } = props ?? ({} as DynamicPaymentProps);
  const Component = paymentsMap[provider];

  if (!Component) {
    return renderTemplate``;
  }

  return renderTemplate`${renderComponent(result, `Payment${String(provider)}`, Component, rest, slots)}`;
}, 'Payment', undefined) as AstroComponent;

export default Payment;
