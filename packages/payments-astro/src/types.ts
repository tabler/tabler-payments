export type IconNode = [tag: string, attrs: Record<string, string>, children?: IconNode][];

export interface PaymentProps extends Record<string, any> {
  /** Sets the SVG height; width is derived from the provider's fixed 5:3 aspect ratio unless overridden. */
  size?: string | number;
  /** Which pre-baked color variant to render. @default 'light' */
  variant?: 'light' | 'dark';
  title?: string;
  class?: string;
}

/**
 * Structural type for an Astro component factory. The runtime marker
 * `isAstroComponentFactory` is attached by Astro's `createComponent`.
 */
export type AstroComponent = ((result: any, props: PaymentProps, slots: any) => any) & {
  isAstroComponentFactory: true;
};
