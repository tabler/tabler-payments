#!/usr/bin/env node

import { buildJsPayments, buildPaymentsList, buildPaymentsMap } from '../../.build/build-payments.mjs';

const componentTemplate = ({ slug, namePascal, light, dark }) => `\
import createPaymentPreactComponent from '../createPaymentPreactComponent';
import { IconNode } from '../types';

const __lightNode: IconNode = ${JSON.stringify(light.nodes)}
const __darkNode: IconNode = ${JSON.stringify(dark.nodes)}

const Payment${namePascal} = createPaymentPreactComponent('${slug}', '${namePascal}', { light: __lightNode, dark: __darkNode });

export default Payment${namePascal};`;

const indexItemTemplate = ({ namePascal }) => `export { default as Payment${namePascal} } from './Payment${namePascal}';`;

buildJsPayments({
  name: 'payments-preact',
  componentTemplate,
  indexItemTemplate,
  indexFile: 'payments.ts',
  pascalCase: true,
  extension: 'ts',
});

buildPaymentsList('payments-preact');
buildPaymentsMap('payments-preact');
