# ShapeLab Aesthetic Clinic

Marketing site for ShapeLab Aesthetic Clinic — Puerto Princesa City.

A single-page brochure site built with vanilla HTML, Tailwind (via CDN), and vanilla JS. Dark luxury aesthetic, gold accents, scroll-driven animations, pinned-scroll services storytelling.

## Run locally

```bash
node serve.mjs
```

Serves the project root at <http://localhost:3000>.

## Take a screenshot for review

```bash
node screenshot.mjs http://localhost:3000 [optional-label]
```

Saves to `temporary screenshots/screenshot-N.png` (auto-incremented). Requires the bundled Puppeteer install — `npm install` if `node_modules/` is missing.

## Project layout

- [`index.html`](index.html) — the entire site (intro logo reveal, navbar, hero, about, pinned services, why, consult, footer, map modal).
- [`brandassets/`](brandassets/) — clinic logo, doctor photo, service imagery.
- [`serve.mjs`](serve.mjs), [`screenshot.mjs`](screenshot.mjs) — dev tooling.
- [`CLAUDE.md`](CLAUDE.md) — instructions for AI-assisted edits.

## Deploy

Push to `main` → Vercel auto-deploys to production. Open a PR → Vercel posts a preview URL on the PR.

## Stack

- HTML + Tailwind (CDN) + vanilla JS
- Cormorant Garamond + Jost (Google Fonts)
- Puppeteer (dev-only, for screenshots)
