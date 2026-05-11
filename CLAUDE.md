# CLAUDE.md — Frontend Website Rules

## Always Do First
- **Invoke the `frontend-design` skill** before writing any frontend code, every session, no exceptions.

## Responsive Verification (mandatory — mobile + tablet + desktop)
ShapeLab is used across phones (primary), tablets (real but secondary), and desktops. **Every UI change must be verified at all three form factors before being declared done.**

After any edit to `index.html` (or any future CSS files), screenshot at **all five** of these viewports before claiming the change ships:

| Device | Viewport | Puppeteer config |
|---|---|---|
| iPhone SE | 375×667 | `width: 375, height: 667, deviceScaleFactor: 2, isMobile: true, hasTouch: true` |
| iPhone 14 | 390×844 | `width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true` |
| iPad portrait | 820×1180 | `width: 820, height: 1180, deviceScaleFactor: 2, isMobile: true, hasTouch: true` |
| iPad landscape | 1180×820 | `width: 1180, height: 820, deviceScaleFactor: 2, isMobile: true, hasTouch: true` |
| Desktop | 1440×900 | `width: 1440, height: 900` |

**Key breakpoints in this codebase** (memorize these — they're where bugs hide):
- `@media (max-width: 1024px)` — tablet adjustments (nav collapses, hero-stats stays 3-col, services starts narrower padding)
- `@media (max-width: 900px)` — services switches to compact tap-to-expand mobile cards (PSR pinned scroll disabled)
- `@media (max-width: 768px)` — nav-logo shrinks, services full-width, about flex-centered
- `@media (max-width: 480px)` — narrowest mobile (hero buttons stack, footer 1-col)

**Common tablet-specific bugs** (the 481–1024px window where most subtle issues hide):
- Hero stats orphan cell (was 2-col with 3 stats — now fixed to 3-col across)
- PSR pinned scroll active at iPad landscape but mobile compact cards at iPad portrait — different UX on the same device
- Footer grid collapses 4-col → 2-col at 1024 → 1-col at 768
- About section is full-width centered quote at all sizes
- Doctor section: 2-col grid at >900px, stacked at ≤900px

**Common mobile-specific bugs:**
- Hero stats grid (now 3-col everywhere)
- Doctor image fit / WebP loading
- Services compact cards (tap-to-expand) — different layout than desktop's pinned scroll
- Floating CTAs not overlapping consult buttons or cookie banner
- FAQ accordion padding
- Anchor scroll-margin under fixed banner + navbar

If you can't run viewport screenshots in this session, **say so explicitly** — never assume the change works on a form factor you haven't tested. "Tested on desktop only" is acceptable; silently shipping is not.

The PostToolUse hook in `.claude/settings.json` will inject a viewport reminder automatically after each Edit/Write to `index.html` or `*.css`.

## Reference Images
- If a reference image is provided: match layout, spacing, typography, and color exactly. Swap in placeholder content (images via `https://placehold.co/`, generic copy). Do not improve or add to the design.
- If no reference image: design from scratch with high craft (see guardrails below).
- Screenshot your output, compare against reference, fix mismatches, re-screenshot. Do at least 2 comparison rounds. Stop only when no visible differences remain or user says so.

## Local Server
- **Always serve on localhost** — never screenshot a `file:///` URL.
- Start the dev server: `node serve.mjs` (serves the project root at `http://localhost:3000`)
- `serve.mjs` lives in the project root. Start it in the background before taking any screenshots.
- If the server is already running, do not start a second instance.

## Screenshot Workflow
- Puppeteer is installed at `/Users/dominiqueannjopson/website building/node_modules/puppeteer`. Chrome cache is at `/Users/dominiqueannjopson/.cache/puppeteer/`. Chrome executable: `/Users/dominiqueannjopson/.cache/puppeteer/chrome/mac_arm-148.0.7778.97/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing`.
- **Always screenshot from localhost:** `node screenshot.mjs http://localhost:3000`
- Screenshots are saved automatically to `./temporary screenshots/screenshot-N.png` (auto-incremented, never overwritten).
- Optional label suffix: `node screenshot.mjs http://localhost:3000 label` → saves as `screenshot-N-label.png`
- `screenshot.mjs` lives in the project root. Use it as-is.
- After screenshotting, read the PNG from `temporary screenshots/` with the Read tool — Claude can see and analyze the image directly.
- When comparing, be specific: "heading is 32px but reference shows ~24px", "card gap is 16px but should be 24px"
- Check: spacing/padding, font size/weight/line-height, colors (exact hex), alignment, border-radius, shadows, image sizing

## Output Defaults
- Single `index.html` file, all styles inline, unless user says otherwise
- Tailwind CSS via CDN: `<script src="https://cdn.tailwindcss.com"></script>`
- Placeholder images: `https://placehold.co/WIDTHxHEIGHT`
- Mobile-first responsive

## Brand Assets
- Always check the `brand_assets/` folder before designing. It may contain logos, color guides, style guides, or images.
- If assets exist there, use them. Do not use placeholders where real assets are available.
- If a logo is present, use it. If a color palette is defined, use those exact values — do not invent brand colors.

## Anti-Generic Guardrails
- **Colors:** Never use default Tailwind palette (indigo-500, blue-600, etc.). Pick a custom brand color and derive from it.
- **Shadows:** Never use flat `shadow-md`. Use layered, color-tinted shadows with low opacity.
- **Typography:** Never use the same font for headings and body. Pair a display/serif with a clean sans. Apply tight tracking (`-0.03em`) on large headings, generous line-height (`1.7`) on body.
- **Gradients:** Layer multiple radial gradients. Add grain/texture via SVG noise filter for depth.
- **Animations:** Only animate `transform` and `opacity`. Never `transition-all`. Use spring-style easing.
- **Interactive states:** Every clickable element needs hover, focus-visible, and active states. No exceptions.
- **Images:** Add a gradient overlay (`bg-gradient-to-t from-black/60`) and a color treatment layer with `mix-blend-multiply`.
- **Spacing:** Use intentional, consistent spacing tokens — not random Tailwind steps.
- **Depth:** Surfaces should have a layering system (base → elevated → floating), not all sit at the same z-plane.

## Hard Rules
- Do not add sections, features, or content not in the reference
- Do not "improve" a reference design — match it
- Do not stop after one screenshot pass
- Do not use `transition-all`
- Do not use default Tailwind blue/indigo as primary color
