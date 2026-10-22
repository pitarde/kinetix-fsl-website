# Kinetix FSL website handoff

All website source is in `C:\Users\pitar\Documents\kinetix-fsl-website`.

## Preview in VS Code

Open that folder, then run `npm start` in the integrated terminal. No dependency installation is required. Visit http://127.0.0.1:4173. If the preview is already running, use that address directly; Ctrl+C in its terminal stops it.

The local preview was started during implementation. Nothing was deployed, no APK was uploaded, and no DNS settings were changed.

## Included

- Responsive homepage with the supplied logo converted to SVG, the brand palette, light/dark/system themes, seven expandable learning modules, and FAQ.
- Accessible **Coming soon** dialog on both install actions. With JavaScript disabled, install actions lead to the clearly labeled coming-soon section.
- Intentionally labeled app-screen placeholders, not invented screenshots of the real app.
- Draft Privacy and Terms pages and a custom 404 page.
- Social preview image, metadata, sitemap, and deliberate preview non-indexing.
- Dependency-free Node preview server, static checks, VS Code tasks, and README editing/launch instructions.

## Verification — October 13, 2026

| Check | Result |
| --- | --- |
| Local assets, links, anchors, IDs, alt text, module count, preview release status | Passed |
| Browser layout and interaction assertions | 63 passed |
| Additional system-theme, reflow, keyboard, blocked-storage checks | 6 passed |
| Axe accessibility scenarios | 17 checked, no automated violations |
| Lighthouse mobile performance | 100 |
| Lighthouse accessibility | 100 |
| Lighthouse best practices | 100 |
| Lighthouse SEO | 69 — preview intentionally blocked from indexing |
| Largest contentful paint | 1.5 seconds in the local mobile simulation |
| Cumulative layout shift | 0 |
| Total blocking time | 0 milliseconds |

Browser testing used headless Microsoft Edge (Chromium). Home layouts were checked at 360, 390, 768, and 1440px in both themes, with additional 320px and 720px reflow checks. Privacy, Terms, and 404 pages were checked for overflow. Install dialogs, dismissal, focus restoration, theme persistence, reduced motion, all expanders, no-JavaScript navigation, and nested 404 asset loading were exercised. The nested missing-page test returns an intentional document HTTP 404; assets load successfully.

The Lighthouse visible-label audit also passed after the theme control's accessible name was aligned with its visible label. Automated checks do not establish complete WCAG conformance. Physical Android devices and manual screen-reader behavior were not tested. Live hosting/DNS and actual APK installation remain outside this preview milestone.

## Still needed before launch

Real app screenshots, a tested signed APK, release metadata, confirmed app-feature claims, public contact details, and approved policy text. The root folder's README explains GitHub Pages, GitHub Releases, custom-domain setup, HTTPS, and removal of preview non-indexing.

Edit `release.js` only when the final APK is ready. Its initial `available: false` setting prevents a live download link. The README also identifies the development-status copy that needs editorial updates at launch.
