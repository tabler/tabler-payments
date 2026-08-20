#!/usr/bin/env node

import { buildJsPayments, buildPaymentsList, buildPaymentsMap } from '../../.build/build-payments.mjs';

// No pascalCase conversion: spreadAttributes() writes raw HTML attribute
// strings, so these must stay as the original SVG attribute names
// (kebab-case, e.g. `stroke-width`), not camelCase JS prop names.
const componentTemplate = ({ slug, namePascal, light, dark }) => `\
import createPaymentAstroComponent from '../createPaymentAstroComponent';
import type { IconNode } from '../types';

const __lightNode: IconNode = ${JSON.stringify(light.nodes)}
const __darkNode: IconNode = ${JSON.stringify(dark.nodes)}

const Payment${namePascal} = createPaymentAstroComponent('${slug}', '${namePascal}', { light: __lightNode, dark: __darkNode });

export default Payment${namePascal};`;

const indexItemTemplate = ({ namePascal }) => `export { default as Payment${namePascal} } from './Payment${namePascal}';`;

buildJsPayments({
  name: 'payments-astro',
  componentTemplate,
  indexItemTemplate,
  indexFile: 'payments.ts',
  pascalCase: false,
  extension: 'ts',
});

buildPaymentsList('payments-astro');
buildPaymentsMap('payments-astro');
