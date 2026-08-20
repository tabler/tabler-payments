import type { FunctionComponent, JSX } from 'preact';

export type IconNode = [tag: string, attrs: Record<string, string>, children?: IconNode][];

export interface PaymentProps extends Partial<Omit<JSX.SVGAttributes, 'ref' | 'size'>> {
  /** Sets the SVG height; width is derived from the provider's fixed 5:3 aspect ratio unless overridden. */
  size?: string | number;
  /** Which pre-baked color variant to render. @default 'light' */
  variant?: 'light' | 'dark';
  title?: string;
}

export type PaymentIcon = FunctionComponent<PaymentProps>;
