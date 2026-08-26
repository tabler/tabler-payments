---
name: generate-changeset
description: >-
  Creates a Tabler Payments changeset file in `.changeset/` from the current
  code changes. Use this skill for every changeset in this repo — when the user
  asks for a changeset, version bump, release note, or changelog entry, and also
  on your own whenever a change under `src/`, `import/`, or `packages/` is about
  to be committed or opened as a PR. Never hand-write the file instead.
---

# Generate changeset

Create one `.changeset/<name>.md` file per logical change. Ground package selection and bump level in **actual git output**—not guesses.

## 1. Inspect the change

From the repository root, determine scope:

- **Uncommitted work:** `git status -sb`, `git diff`, `git diff --cached`
- **Branch work (default base: `main`):** `git diff origin/main...HEAD --stat`, then targeted `git diff origin/main...HEAD -- <paths>`

If the user points at specific files or a feature, read those diffs first.

## 2. Map paths to packages

| Path | Package |
|------|---------|
| `packages/payments-react/` | `@tabler/payments-react` |
| `packages/payments-vue/` | `@tabler/payments-vue` |
| `packages/payments-preact/` | `@tabler/payments-preact` |
| `packages/payments-astro/` | `@tabler/payments-astro` |
| `src/light/`, `src/dark/`, `import/` (logo sources built into every framework package) | All four `@tabler/payments-*` packages |
| `preview/` | **No changeset** — the preview app is private and not versioned |
| Root tooling (`.build/`, `.github/`, `turbo.json`, lockfile only) | Often **no changeset** unless it affects published package behavior |

Include **every affected package** in the frontmatter. Omit packages with no relevant changes.

`.changeset/config.json` puts all `@tabler/payments-*` packages in a **fixed** group, so they release together on one version. That is not a reason to list packages the diff does not touch — list only what actually changed.

## 3. Choose bump level (per package)

| Level | When |
|-------|------|
| **patch** | Bug fixes, small improvements, corrected or redrawn logos, viewBox/color fixes, build or typing fixes |
| **minor** | New provider logos, new exported components, new props, significant enhancements |
| **major** | Breaking changes, removed or renamed exports, rewrites that break consumers (rare in this repo) |

Packages can differ: e.g. `@tabler/payments-react`: minor + `@tabler/payments-astro`: patch is valid.

When unsure between patch and minor: prefer **patch** for fixes and visual tweaks; prefer **minor** for new user-facing capabilities.

## 4. Write the description

A changeset is one line in a changelog. It is not a summary of the work.

- **One sentence, 130 characters or fewer**, including backticks. This is the limit to write to.
- **160 characters is a hard ceiling.** Go over 130 only when a shorter version would drop a fact the reader needs — a long list of affected providers, for example. Never go over 160.
- Start with: `Added`, `Updated`, `Fixed`, or `Removed`
- Say **what** changed and **where** (provider, component, package, script). Then stop.
- **Name at least one concrete thing**: a provider, component, prop, file, or dependency. "Fixed logo rendering" and "Updated payment icons" name nothing — a reader cannot tell whether the change affects them. There is no minimum length, but an entry under ~40 characters that names nothing is almost always too vague; a dependency bump like `Updated Astro to v7.2.4.` is fine at 24, because the dependency and version are the content.
- Use **backticks** for code tokens:
  - Components: `Revolut`, `ApplePay`
  - Props: `size`, `class`
  - Files: `payments.json`, `src/dark/paypal.svg`
  - Attributes: `viewBox`, `aria-label`
  - Functions: `import-payments`

**Count the characters before writing the file:**

```shell
printf '%s' 'Added `Revolut` and `Wise` logos in light and dark variants.' | wc -c
```

If it is over the limit, **cut words**. Never split it into two sentences, a second paragraph, or a bullet list.

### Leave this out

These belong in the PR description or the commit body, not in the changeset:

- Why the change was made, or what was broken before
- How it was built: file paths, script internals, refactor steps
- A list of every affected provider or file
- Migration and rollout notes, unless the change is breaking

**Cut the tail first.** An over-long entry is almost always a good sentence with a trailing justification clause glued on. Delete that clause and the length problem is usually solved:

```text
… and regenerated the exports so tree-shaking keeps working.
… so the logo matches the provider's current brand guidelines.
```

### Examples

Good — short and specific:

```text
(60) Added `Revolut` and `Wise` logos in light and dark variants.
(76) Fixed `PayPal` dark variant using the light background fill in all packages.
(64) Updated `ApplePay` logo to the 2025 brand mark.
(58) Removed the deprecated `Maestro` logo from every package.
```

Too vague — name the thing that changed:

```text
 (26) ❌ Fixed logo rendering.
 (71) ✅ Fixed `Stripe` logo viewBox so the mark is not cropped at small sizes.
 (28) ❌ Updated payment icons.
 (69) ✅ Updated `Visa`, `Mastercard` and `Amex` logos to their current marks.
```

Too long — trim it:

```text
(168) ❌ Added support for the `size` prop across React, Vue, Preact and Astro components so consumers can render logos at a fixed height without wrapping them in a container.
(84)  ✅ Added a `size` prop to every logo component for rendering at a fixed height.
```

Over 130 but justified — the list of providers is the content, and cutting it would say nothing:

```text
(134) Added `Revolut`, `Wise`, `Monzo`, `N26`, `Curve`, `Payoneer` and `Skrill` logos in light and dark variants.
```

Write in **simple English**, even if the user asked in another language.

### Language (simple English)

- Short sentences. Common words. One idea per sentence when possible.
- No buzzwords or filler. Use technical terms only when they appear in the code or are needed to name a behavior.
- Prefer plain phrasing: "Fixed `PayPal` logo colors in dark mode" over "Enhanced dark-theme brand fidelity pipeline".
- Keep the description easy to scan in a changelog—reviewers and users should understand it without reading the diff.

## 5. Pick the filename

- Location: `.changeset/`
- **Kebab-case**, descriptive: `add-revolut-logo.md`, `fix-paypal-dark-variant.md`, `size-prop.md`
- One logical change per file; split unrelated changes into separate changesets
- Do not overwrite an existing changeset unless the user asks to update it

## 6. File format

```md
---
"@tabler/payments-react": minor
"@tabler/payments-vue": minor
"@tabler/payments-preact": minor
"@tabler/payments-astro": minor
---

One-sentence description here.
```

Rules:

- Frontmatter uses quoted package names: `"@tabler/payments-react": patch`
- Blank line after closing `---`
- No title heading, no bullet list in the body
- Body is a single line — no second paragraph
- Bump values: `patch`, `minor`, or `major` only

## 7. Validate before writing

- [ ] Every listed package has touched paths in the diff
- [ ] Description is one sentence with action verb, in simple English
- [ ] Description is **130 characters or fewer** — counted, not estimated; over 130 only with a reason, never over 160
- [ ] Description names a concrete provider, component, prop, file, or dependency
- [ ] Code tokens use backticks
- [ ] Filename is kebab-case and not already used for a different change
- [ ] Changes to shared logo sources (`src/`, `import/`) list **all four** `@tabler/payments-*` packages
- [ ] `preview/`-only changes get **no** changeset

## 8. Output to the user

After creating the file:

1. Show the full changeset content in a fenced `markdown` block (for easy copy/review)
2. Give the description length, e.g. `112 / 130 characters`; if it is over 130, say why the extra words earn their place
3. Briefly explain **why** each package and bump level was chosen
4. If no changeset is needed (CI-only, preview-only, lockfile-only, etc.), say so and why

Do **not** run `changeset version` or `changeset publish` unless the user explicitly asks.
