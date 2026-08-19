import { h, VNode } from 'vue';
import defaultAttributes, { ASPECT_RATIO } from './defaultAttributes';
import type { IconNode, PaymentComponent, PaymentProps } from './types';

const renderNode = ([tag, attrs, children]: IconNode[number]): VNode =>
  h(tag, attrs, children ? children.map(renderNode) : undefined);

const createPaymentVueComponent =
  (slug: string, nodes: { light: IconNode; dark: IconNode }): PaymentComponent =>
  ({ variant = 'light', size = 24, title, class: classes, ...rest }: PaymentProps, { attrs, slots }) => {
    const height = typeof size === 'number' ? size : parseFloat(String(size)) || 24;
    const width = Math.round(height * ASPECT_RATIO * 100) / 100;

    let children = [...nodes[variant].map(renderNode), ...(slots.default ? [slots.default()] : [])];
    if (title) children = [h('title', title), ...children];

    return h(
      'svg',
      {
        ...defaultAttributes,
        width,
        height,
        ...attrs,
        class: ['tabler-payment', `tabler-payment-${slug}`, classes],
        ...rest,
      },
      children,
    );
  };

export default createPaymentVueComponent;
