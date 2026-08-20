import { h, toChildArray, ComponentChild } from 'preact';
import defaultAttributes, { ASPECT_RATIO } from './defaultAttributes';
import type { IconNode, PaymentIcon, PaymentProps } from './types';

const renderNodes = (nodes: IconNode): ComponentChild[] =>
  nodes.map(([tag, attrs, children]) => h(tag as any, attrs, children ? renderNodes(children) : undefined));

const createPaymentPreactComponent = (
  slug: string,
  namePascal: string,
  nodes: { light: IconNode; dark: IconNode },
): PaymentIcon => {
  const Component = ({
    variant = 'light',
    size = 24,
    title,
    children,
    className = '',
    class: classes = '',
    style,
    ...rest
  }: PaymentProps) => {
    const height = typeof size === 'number' ? size : parseFloat(String(size)) || 24;
    const width = Math.round(height * ASPECT_RATIO * 100) / 100;

    return h(
      'svg' as any,
      {
        ...defaultAttributes,
        width: String(width),
        height: String(height),
        class: ['tabler-payment', `tabler-payment-${slug}`, classes, className].filter(Boolean).join(' '),
        style,
        ...rest,
      },
      [title && h('title', {}, title), ...renderNodes(nodes[variant]), ...toChildArray(children)],
    );
  };

  Component.displayName = `Payment${namePascal}`;

  return Component;
};

export default createPaymentPreactComponent;
