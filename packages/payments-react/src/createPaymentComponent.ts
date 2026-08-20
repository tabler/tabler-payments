import { forwardRef, createElement, ReactNode } from 'react';
import defaultAttributes, { ASPECT_RATIO } from './defaultAttributes';
import type { IconNode, PaymentProps } from './types';

const renderNodes = (nodes: IconNode): ReactNode[] =>
  nodes.map(([tag, attrs, children], i) =>
    createElement(tag, { key: `svg-${i}`, ...attrs }, children ? renderNodes(children) : undefined),
  );

const createPaymentComponent = (slug: string, namePascal: string, nodes: { light: IconNode; dark: IconNode }) => {
  const Component = forwardRef<SVGSVGElement, PaymentProps>(
    ({ variant = 'light', size = 24, title, className, children, ...rest }, ref) => {
      const height = typeof size === 'number' ? size : parseFloat(String(size)) || 24;
      const width = Math.round(height * ASPECT_RATIO * 100) / 100;

      return createElement(
        'svg',
        {
          ref,
          ...defaultAttributes,
          width,
          height,
          className: ['tabler-payment', `tabler-payment-${slug}`, className].filter(Boolean).join(' '),
          ...rest,
        },
        [
          title && createElement('title', { key: 'svg-title' }, title),
          ...renderNodes(nodes[variant]),
          ...(Array.isArray(children) ? children : children ? [children] : []),
        ],
      );
    },
  );

  Component.displayName = `Payment${namePascal}`;

  return Component;
};

export default createPaymentComponent;
