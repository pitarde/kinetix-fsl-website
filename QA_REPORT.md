# Kinetix FSL — professional glass redesign

Implemented in `C:\Users\pitar\Documents\kinetix-fsl-website`.

Preview: http://127.0.0.1:4173. Open the website folder in VS Code and run `npm start` if the server is not running. No dependency installation is needed.

## What changed

- Deep navy hero and translucent sticky header, mint primary actions, soft indigo accents, and lighter reading sections. Full dark mode remains available.
- Restrained frosted-glass panels, fine borders, layered gradients, and subtle shadows. Text uses high-opacity surfaces rather than relying on blur for readability.
- Larger supporting type, clearer headings, visible development status, consistent controls, and current-section navigation using both underline and accessible location state.
- Keyboard focus, dialog Escape/close/focus restoration, 48px controls, reduced motion, reduced transparency, and high-contrast handling.
- Both Install the app actions still show Coming soon. No APK, public deployment, or DNS changes.
- Updated social artwork and editable vector source in the assets folder.

`design.css` contains the new presentation layer; `styles.css` retains shared tokens and structural layout. `DESIGN_NOTES.md` explains the HCI decisions. All source remains in the user's requested website folder.

## Design references

The design uses [Nielsen's usability heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/) for hierarchy, consistency, feedback, recognition, and user control. [WCAG 2.2](https://www.w3.org/WAI/WCAG22/quickref/) provides the accessibility baseline. These are design and testing references, not a certification claim.

## Validation — October 13, 2026

| Check | Result |
| --- | --- |
| Source, local assets, links, IDs, alt text, and preview status | Passed |
| Browser layout and interaction assertions | 63 passed |
| System theme, narrow reflow, keyboard, and blocked-storage checks | 6 passed |
| Current-section navigation and glass accessibility behavior | 8 passed |
| Axe accessibility audits | 17 scenarios; no automated violations |
| Mobile Lighthouse performance | 99 |
| Mobile Lighthouse accessibility | 100 |
| Mobile Lighthouse best practices | 100 |
| Mobile Lighthouse SEO | 69; intentionally non-indexable preview |
| Largest contentful paint | 1.7 seconds in the local mobile simulation |

Browser checks used Microsoft Edge (Chromium), both themes, and 360/390/768/1440px home layouts, with additional 320px and 720px reflow checks. Policy pages and 404 layouts were checked, alongside no-JavaScript behavior, dialog actions, focus return, reduced motion, stored themes, and nested 404 assets. The only expected HTTP error is the intentionally requested missing document.

The glass-specific checks cover all five navigation sections, active backdrop blur, reduced-transparency fallback, and the Coming soon dialog in forced-colors mode. An early fixed-delay navigation test ran before the browser dispatched its first scroll event; final checks wait for the observable location state and all pass.

No physical-device study, participant usability study, or manual screen-reader assessment was conducted. Automated results do not establish complete WCAG conformance. App screenshots remain labeled placeholders and the policy pages remain drafts.
