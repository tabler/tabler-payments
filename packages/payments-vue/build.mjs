#!/usr/bin/env node

import { buildJsPayments, buildPaymentsList, buildPaymentsMap } from '../../.build/build-payments.mjs';

const componentTemplate = ({ slug, namePascal, light, dark }) => `\
import createPaymentVueComponent from '../createPaymentVueComponent';

const Payment${namePascal} = createPaymentVueComponent('${slug}', {
  light: ${JSON.stringify(light.nodes)},
  dark: ${JSON.stringify(dark.nodes)},
});

export default Payment${namePascal};`;

const indexItemTemplate = ({ namePascal }) => `export { default as Payment${namePascal} } from './Payment${namePascal}';`;

buildJsPayments({
  name: 'payments-vue',
  componentTemplate,
  indexItemTemplate,
  indexFile: 'payments.ts',
  pascalCase: false,
  extension: 'ts',
});

buildPaymentsList('payments-vue');
buildPaymentsMap('payments-vue');
