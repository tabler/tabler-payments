#!/usr/bin/env node

import { buildJsPayments, buildPaymentsList, buildPaymentsMap } from '../../.build/build-payments.mjs';

const componentTemplate = ({ slug, namePascal, light, dark }) => {
  const svgBase64 = Buffer.from(light.content).toString('base64');
  return `\
import createPaymentComponent from '../createPaymentComponent';
import { IconNode } from '../types';

const __lightNode: IconNode = ${JSON.stringify(light.nodes)}
const __darkNode: IconNode = ${JSON.stringify(dark.nodes)}

/**
 * Payment${namePascal}
 * @preview ![img](data:image/svg+xml;base64,${svgBase64})
 */
const Payment${namePascal} = createPaymentComponent('${slug}', '${namePascal}', { light: __lightNode, dark: __darkNode });

export default Payment${namePascal};`;
};

const indexItemTemplate = ({ namePascal }) => `export { default as Payment${namePascal} } from './Payment${namePascal}';`;

buildJsPayments({
  name: 'payments-react',
  componentTemplate,
  indexItemTemplate,
  indexFile: 'payments.ts',
  pascalCase: true,
  extension: 'ts',
});

buildPaymentsList('payments-react');
buildPaymentsMap('payments-react');
