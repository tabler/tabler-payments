# tabler-payments

Payment provider logos as components for React, Vue, Preact and Astro — the payments counterpart to [`@tabler/icons-*`](https://github.com/tabler/tabler-icons).

Each package ships one tree-shakable component per provider (`PaymentVisa`, `PaymentMastercard`, ...), plus a `Payment` component for rendering by slug. See each package's own README for its exact API:

| Package | README | Framework |
| --- | --- | --- |
| [`@tabler/payments-react`](packages/payments-react) | [README](packages/payments-react/README.md) | React |
| [`@tabler/payments-vue`](packages/payments-vue) | [README](packages/payments-vue/README.md) | Vue 3 |
| [`@tabler/payments-preact`](packages/payments-preact) | [README](packages/payments-preact/README.md) | Preact |
| [`@tabler/payments-astro`](packages/payments-astro) | [README](packages/payments-astro/README.md) | Astro |

Currently 100 of 107 payment providers have an SVG (7 are pending — see [Adding a provider](#adding-a-provider) below).

## Repo structure

```
tabler-payments/
  payments.json          # canonical list of every provider: { name, logo (slug) }
  src/
    light/*.svg           # source SVG, one per provider, for use on light backgrounds
    dark/*.svg             # source SVG, one per provider, for use on dark backgrounds
  .build/
    helpers.mjs            # getAllPayments(): reads payments.json + src/, parses each
                            # SVG recursively into IconNode ([tag, attrs, children?][])
    build-payments.mjs      # shared generator every package's build.mjs calls
    rollup-plugins.mjs       # shared Rollup config (esbuild, license banner, ...)
  packages/
    payments-react/          # @tabler/payments-react
    payments-vue/             # @tabler/payments-vue
    payments-preact/           # @tabler/payments-preact
    payments-astro/             # @tabler/payments-astro
  preview/                      # local-only Astro page listing every provider
                                  # (visual QA — not published, not part of the build)
  .github/workflows/ci.yml       # CI: build + typecheck + test per package
```

All four packages share the same source of truth (`payments.json` + `src/`) and the same generator (`.build/`). A framework package only supplies the last step — turning the shared `IconNode` data into a real component.

## Local development

```bash
pnpm install
pnpm run build   # builds all 4 packages
pnpm run test    # tests all 4 packages
```

To work on a single package:

```bash
pnpm --filter @tabler/payments-react run build
pnpm --filter @tabler/payments-react run test
```

To run the visual QA page (renders every provider, light and dark, independent of the 4 packages):

```bash
pnpm --filter preview run dev
```

## Adding a provider

1. Add `src/light/{slug}.svg` and `src/dark/{slug}.svg` — both variants are required, a provider with only one is skipped by the build (with a console warning) rather than failing.
2. Add an entry to `payments.json`: `{ "name": "Display Name", "logo": "slug" }`.
3. That's it — `pnpm run build` regenerates `Payment<Slug>` in all 4 packages automatically. Nothing else needs to change by hand.

If the SVG has gradients, clip paths, or other nested elements, no extra work is needed either — the generator parses SVG recursively, not just flat `<path>` lists.

## License

tabler-payments is licensed under the [MIT License](https://github.com/tabler/tabler-payments/blob/main/LICENSE).
