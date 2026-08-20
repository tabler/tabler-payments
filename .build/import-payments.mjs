import { globSync } from 'glob';
import { join, basename } from 'path';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { optimize } from 'svgo';

const __dirname = new URL('.', import.meta.url).pathname

const themes = ['light', 'dark'];

themes.forEach(theme => {
   const payments = globSync(join(__dirname, `../import/${theme}/*.svg`));

   mkdirSync(join(__dirname, `../src/${theme}`), { recursive: true });

   payments.forEach(payment => {
      let paymentContent = readFileSync(payment, 'utf8'),
         name = basename(payment, '.svg');

      paymentContent = optimize(paymentContent, {
         multipass: true,
         js2svg: {
            indent: 3,
            pretty: true,
         },
         plugins: [
            "sortAttrs",
            "removeTitle",
            "cleanupIds",
            "removeXMLProcInst",
            "cleanupAttrs",
            "convertStyleToAttrs",
            "moveGroupAttrsToElems",
            "convertColors",
            "convertTransform",
            {
               name: "prefixIds",
               params: {
                  // Prefix includes the theme, not just the slug: light/dark are
                  // often rendered side by side (see the preview page), and a
                  // shared id (e.g. a <clipPath>) would collide across the two
                  // <svg> elements in the same document otherwise.
                  prefix: `tabler-payments-${name}-${theme}`,
                  delim: '-'
               }
            },
            {
               name: "convertShapeToPath",
               params: {
                  convertArcs: true
               }
            },
            {
               name: "cleanupNumericValues",
               params: {
                  floatPrecision: 2
               }
            },
            {
               name: "convertPathData",
               params: {
                  floatPrecision: 2
               }
            },
            {
               name: "convertTransform",
               params: {
                  floatPrecision: 2
               }
            },
            {
               name: "cleanupListOfValues",
               params: {
                  floatPrecision: 2
               }
            }
         ]
      }).data;

      const writePath = join(__dirname, `../src/${theme}/${name}.svg`)
      if (!existsSync(writePath) || paymentContent !== readFileSync(writePath, 'utf8')) {
         console.log(`Writing ${name}.svg`)
         writeFileSync(writePath, paymentContent)
      }
   })
})