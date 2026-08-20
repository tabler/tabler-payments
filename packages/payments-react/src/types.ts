import { ForwardRefExoticComponent, RefAttributes, ComponentPropsWithoutRef } from 'react';
export type { ReactNode } from 'react';

export type IconNode = [tag: string, attrs: Record<string, string>, children?: IconNode][];

export interface PaymentProps extends Partial<ComponentPropsWithoutRef<'svg'>> {
  /** Sets the SVG height; width is derived from the provider's fixed 5:3 aspect ratio unless overridden. */
  size?: string | number;
  /** Which pre-baked color variant to render. @default 'light' */
  variant?: 'light' | 'dark';
  title?: string;
}

export type PaymentIcon = ForwardRefExoticComponent<PaymentProps & RefAttributes<SVGSVGElement>>;
