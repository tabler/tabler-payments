<p align="center">
<a href="https://tabler.io"><img src="https://raw.githubusercontent.com/tabler/tabler/refs/heads/dev/shared/static/logo.svg" alt="Tabler" width="300"></a>
</p>

<p align="center">
Payment provider logos as components for React, Vue, Preact and Astro.
</p>

<p align="center">
<a href="https://github.com/tabler/tabler-payments/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/@tabler/payments-react.svg?label=License&message=MIT&color=1c7ed6" alt="License"></a>
<a href="https://github.com/tabler/tabler-payments/actions/workflows/ci.yml" target="__blank"><img alt="CI" src="https://github.com/tabler/tabler-payments/actions/workflows/ci.yml/badge.svg"></a>
<a href="https://github.com/tabler/tabler-payments/actions/workflows/release.yml" target="__blank"><img alt="Release" src="https://github.com/tabler/tabler-payments/actions/workflows/release.yml/badge.svg"></a>
<a href="https://github.com/tabler/tabler-payments" target="__blank"><img alt="GitHub stars" src="https://img.shields.io/github/stars/tabler/tabler-payments?style=social"></a>
</p>

## 💛 Sponsors

**If you want to support our project and help us grow it, you can [become a sponsor on GitHub](https://github.com/sponsors/codecalm) or just [donate on PayPal](https://paypal.me/codecalm) :)**

<p align="center">
	<a href="https://github.com/sponsors/codecalm">
		<img src="https://raw.githubusercontent.com/tabler/sponsors/main/sponsors.svg" alt="Tabler sponsors">
	</a>
</p>

## 📦 Packages

Each package ships one tree-shakable component per provider (`PaymentVisa`, `PaymentMastercard`, ...), plus a `Payment` component for rendering by slug. See each package's own README for its exact API:

| Package | Version | Framework | README |
| --- | --- | --- | --- |
| [`@tabler/payments-react`](packages/payments-react) | [![npm](https://img.shields.io/npm/v/@tabler/payments-react?color=1864ab&label=%20)](https://www.npmjs.com/package/@tabler/payments-react) | React | [README](packages/payments-react/README.md) |
| [`@tabler/payments-vue`](packages/payments-vue) | [![npm](https://img.shields.io/npm/v/@tabler/payments-vue?color=1864ab&label=%20)](https://www.npmjs.com/package/@tabler/payments-vue) | Vue 3 | [README](packages/payments-vue/README.md) |
| [`@tabler/payments-preact`](packages/payments-preact) | [![npm](https://img.shields.io/npm/v/@tabler/payments-preact?color=1864ab&label=%20)](https://www.npmjs.com/package/@tabler/payments-preact) | Preact | [README](packages/payments-preact/README.md) |
| [`@tabler/payments-astro`](packages/payments-astro) | [![npm](https://img.shields.io/npm/v/@tabler/payments-astro?color=1864ab&label=%20)](https://www.npmjs.com/package/@tabler/payments-astro) | Astro | [README](packages/payments-astro/README.md) |

## 🗂️ Repo structure

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

## 🛠️ Local development

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

## ➕ Adding a provider

1. Add `src/light/{slug}.svg` and `src/dark/{slug}.svg` — both variants are required, a provider with only one is skipped by the build (with a console warning) rather than failing.
2. Add an entry to `payments.json`: `{ "name": "Display Name", "logo": "slug" }`.
3. That's it — `pnpm run build` regenerates `Payment<Slug>` in all 4 packages automatically. Nothing else needs to change by hand.

If the SVG has gradients, clip paths, or other nested elements, no extra work is needed either — the generator parses SVG recursively, not just flat `<path>` lists.

## 🚀 Release

This repo uses [Changesets](https://github.com/changesets/changesets). All four packages share one version.

1. After a change that should go to npm, run `pnpm changeset` and commit the new file in `.changeset/`.
2. Merge the PR into `main`. CI opens a **Version packages** PR.
3. Merge that PR. CI publishes to npm and creates a GitHub release.

For a change that should not publish, use `pnpm changeset --empty`.

Publish uses [npm Trusted Publishers](https://docs.npmjs.com/trusted-publishers/) (OIDC). No `NPM_TOKEN` secret.

On each `@tabler/payments-*` package on npmjs.com, add a GitHub Actions trusted publisher:

- Organization: `tabler`
- Repository: `tabler-payments`
- Workflow filename: `release.yml`
- Environment: leave empty
- Allowed actions: `npm publish`

Also enable **Allow GitHub Actions to create and approve pull requests** under Settings → Actions → General.

## 🤝 Contributing

Found a bug or have an idea? [Open an issue](https://github.com/tabler/tabler-payments/issues/new). By participating, you agree to follow our [Code of Conduct](CODE_OF_CONDUCT.md).

## 📄 License

tabler-payments is licensed under the [MIT License](https://github.com/tabler/tabler-payments/blob/main/LICENSE).
