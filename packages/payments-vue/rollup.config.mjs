import fs from 'fs';
import { getRollupConfig } from '../../.build/rollup-plugins.mjs';
import dts from 'rollup-plugin-dts';

const pkg = JSON.parse(fs.readFileSync('package.json', 'utf-8'));

const outputFileName = 'tabler-payments-vue';
const inputs = ['./src/tabler-payments-vue.ts'];
const bundles = [
  { format: 'cjs', extension: 'cjs', inputs },
  { format: 'esm', extension: 'mjs', preserveModules: true, inputs },
];

export default [
  {
    input: inputs[0],
    output: [{ file: `dist/${outputFileName}.d.ts`, format: 'es' }],
    plugins: [dts({ compilerOptions: { preserveSymlinks: false } })],
  },
  ...getRollupConfig(pkg, outputFileName, bundles, { vue: 'vue' }),
];
