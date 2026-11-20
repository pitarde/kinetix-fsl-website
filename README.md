# KinetixFSL website

An original, static website for the KinetixFSL Android app, live at https://kinetixfsl.app (GitHub Pages, deployed from `main`). The Download buttons point at the newest release APK; the release workflow in the app repository keeps them current (see "What the release workflow depends on" below). The older notes further down this file (launch plan, DNS) are historical.

## Open in VS Code

1. Open this entire folder with **File → Open Folder**.
2. Open **Terminal → New Terminal** and run `npm start` (Node.js 18 or newer). There are no packages to install.
3. Visit **http://127.0.0.1:4173**. Leave the terminal running while reviewing. Stop with Ctrl+C.
4. Alternatively, use **Terminal → Run Task → Preview KinetixFSL**. If you already use VS Code Live Server, opening `index.html` with it also works.
5. Run `npm run check` for local page/asset checks. You can open `index.html` directly, but HTTP preview is preferred for proper 404 behavior.

## Edit the website

| File                         | Purpose                                                                 |
| ---------------------------- | ----------------------------------------------------------------------- |
| `index.html`                 | English homepage: sections, module lists, community modules, FAQ        |
| `fil.html`                   | Filipino homepage: the same sections and layout, translated. When you change text in `index.html`, change it here too |
| `styles.css`                 | Full palette, responsive layouts, light/dark themes                     |
| `theme.js`                   | Early saved-theme selection; works even when storage is unavailable     |
| `script.js`                  | Mobile menu, theme control, looping videos, screenshot carousel, release details; picks Filipino words when the page is `lang="fil"` |
| `release.js`                 | Single release configuration: availability, URL, version, size, SHA-256 |
| `app-update.json`            | What the app's "Check for new updates" reads (same APK as `release.js`) |
| `tools/publish-release.mjs`  | Writes `release.js`, `app-update.json` and `index.html`'s downloadUrl; run by the app repo's CI on every push to main |
| `privacy.html`, `terms.html` | Clearly marked drafts with unresolved details                           |
| `404.html`                   | Custom not-found page                                                   |
| `assets/fonts/`              | Bricolage Grotesque and Atkinson Hyperlegible Next (latin subset, SIL Open Font License), hosted here so there are no remote font requests |
| `assets/video/`              | Three silent 480 px loops cut from the 2026-11-15 phone recordings (practice, offline, community modules) with a `-poster.webp` still each; each plays only on screen and has a pause button |
| `assets/logo.svg`            | Exact path conversion of the supplied Android vector                    |
| `assets/social-preview.png`  | Original 1200×630 social artwork                                        |
| `serve.mjs`, `checks.mjs`    | Dependency-free local preview and static checks                         |

The theme button cycles **Auto → Light → Dark → Auto**. Auto follows the device setting. No analytics, forms, remote fonts, cookies, or account integration are included. Only the theme preference is saved locally.

### What the release workflow depends on

The app repository's "Publish release" workflow clones this repository, runs `tools/publish-release.mjs` and `node checks.mjs`, then commits `release.js`, `app-update.json` and `index.html` as kinetix-release-bot. A redesign must keep:

- `tools/publish-release.mjs` (the workflow greps it for `"display-version"`), `release.js` and `app-update.json` as they are.
- In `index.html`: the JSON-LD `"downloadUrl": "..."` line (the script rewrites it), exactly one `<h1>`, and exactly seven `class="module"` entries (the seven official modules; the community block uses a different class).
- `node checks.mjs` passing on every page it lists (unique ids, one h1, working links, alt text on `<img>`).
- New files either under `assets/` or added to the copy list in `.github/workflows/pages.yml`, because Pages publishes only that list.

`fil.html` has no `downloadUrl` of its own: its buttons read `release.js` in the browser like the English page.

### App screenshots

Seven supplied screens are integrated in `assets/screenshots/`: dashboard, modules, camera practice, quiz, game progress, badge, and community. Portrait images preserve the full screen; below-the-fold captures open full-size in a new tab. Replace WebP files using the same names and update dimensions/alt text if their content changes.

The landscape camera screenshot uses an AI-edited neutral illustration instead of the original person and room. The original camera photo is not included in website assets. Its visible caption identifies the illustrative camera feed. Other screenshots show the supplied development UI.

Camera edit prompt (built-in image generation): Replace the entire photographic camera feed with a pale lavender and mint default graphic, a generic indigo head-and-shoulders outline, and framing guides. Preserve the outer landscape app screen and Practice: Kamusta header. Remove detection/debug overlays and label the graphic Camera preview illustration.

## Before a public launch (historical)

The site currently has **noindex,nofollow** on all four pages and `Disallow: /` in robots.txt. These are indexing directives, not access controls. Do not treat a deployed draft as private.

Complete these items before publishing:

- Review supplied screenshots and visible community content for public release; replace development captures when needed.
- Verify the catalog, offline capabilities, Android requirements, camera-scoring coverage, and privacy claims against the actual release. Do not promise all 59 signs can be scored.
- Supply and approve Privacy and Terms: operator/contact, age policy, retention, deletion instructions, training-data use, moderation and appeals. Remove draft notices only when finalized.
- Add the approved public contact address to the footer and policy pages. No address has been invented.
- Create a tested, shared-key-signed arm64 release APK. The Android repository's zero-byte `app/release/app-release.apk` is unusable and was not copied.
- Verify installation on a supported Android phone. Compute SHA-256 with PowerShell: `Get-FileHash -Algorithm SHA256 -LiteralPath '<final-apk-path>'`.
- Upload the APK as an asset on a tagged **GitHub Release in the separate public website repository**, not inside the website Git history. Verify its link works while logged out.
- Fill `release.js` with `available: true`, an HTTPS `apkUrl`, version, human-readable size, and 64-character SHA-256. The script will activate downloads only when every field is valid. Also replace development/coming-soon copy, the FAQ launch answer, status badges, and social preview artwork; release configuration does not automatically rewrite editorial content.
- Remove preview robots meta from homepage/privacy/terms; keep the 404 non-indexable. Replace robots.txt with `User-agent: *`, `Allow: /`, and `Sitemap: https://kinetixfsl.app/sitemap.xml` on separate lines.
- Update the preview-only availability/noindex assertions in `checks.mjs` for the production milestone.

## GitHub Pages and your domain — later milestone

1. Create a **separate public repository**, for example `kinetix-fsl-website`; commit these website files only. Leave the Android and admin source repositories separate. Free GitHub Pages is supported for public repositories.
2. In repository **Settings → Pages**, select **Deploy from a branch**, `main`, `/ (root)`. `.nojekyll` disables Jekyll processing. Source-tool files can remain in the repository; they contain no secrets.
3. Test the project URL, including links and assets under `/<repository>/`. Main pages use relative links. For a temporary project-domain deployment before connecting the custom domain, change the 404 page's `<base href="/">` to `<base href="/kinetix-fsl-website/">` (use the actual repository name); restore `/` when connecting `kinetixfsl.app`. This static base prevents speculative browser requests to incorrect nested asset paths.
4. Verify ownership of `kinetixfsl.app` in the GitHub account's Pages settings using GitHub's assigned TXT record. Keep that verification record.
5. Add `kinetixfsl.app` as the repository's Pages custom domain **before** changing routing DNS. Branch publication creates a `CNAME` file; pull that commit into the local folder.
6. At the domain's DNS provider, use the current A records in the official documentation below for the apex domain, and a `www` CNAME pointing to `<github-owner>.github.io` (without the repository name). Preserve unrelated email/TXT records. Do not create a wildcard record. The domain registrar can stay unchanged.
7. After DNS and certificate provisioning succeed, enable **Enforce HTTPS**. With both names configured and the apex selected, GitHub redirects `www` to the apex. Confirm both on a phone.
8. Verify the sitemap, canonical URLs, social image, 404 behavior, and logged-out APK download. Keep current domain-renewal information with your team; hosting and domain registration are separate.

Official references:

- https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages
- https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site
- https://docs.github.com/en/repositories/releasing-projects-on-github/about-releases

## Review checklist

- Check 360, 390, 768, and 1440px widths in light/dark modes and at 200% zoom.
- Test navigation, every install action, dialog Escape/close/backdrop, returned focus, FAQ and all seven modules.
- Check keyboard focus, touch targets, contrast, reduced motion, no-JavaScript reading and system theme behavior.
- Check all pages and a nested missing URL; check browser console/network failures.
- Target Lighthouse 90+ for performance, accessibility, and best practices. SEO will reflect intentional preview noindex until launch; record actual measurements, not assumed scores.
