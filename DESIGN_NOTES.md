# HCI and glass design notes

The redesign applies Nielsen's usability heuristics as design guidance and uses WCAG 2.2 AA as an accessibility baseline. These are not interchangeable: heuristics guide usability decisions; WCAG provides testable accessibility criteria. Automated testing is not a claim of complete conformance or a substitute for user testing.

## Design decisions

- **Clear hierarchy and recognition:** explicit FSL headline, one primary install action, scannable headings, concise feature grouping, consistent controls, larger supporting text, and native expandable sections.
- **System status and feedback:** visible development status near installation actions; immediate Coming soon dialog; active-section navigation indicated by both color and underline. No fake download, progress bar, release date, or unavailable APK link.
- **User control:** close button, Got it action, Escape dismissal, returned focus, keyboard navigation, and persistent light/dark/system settings.
- **Error prevention:** retain unavailable release state; require complete release metadata before activating an HTTPS APK link. Draft policies and illustrative app placeholders remain clearly labeled.
- **Readable glass:** deep navy hero and header, light reading sections by default, restrained gradients, high-opacity panels, solid text colors, fine borders, limited blur, and opaque fallbacks. Dark mode is still available. Glass is decorative, not necessary to understand or operate controls.
- **Accessibility:** visible focus, 48px controls, text contrast testing, responsive reflow, reduced motion, reduced transparency, forced-colors treatment, semantic landmarks, and meaningful accessible names.
- **Help in context:** offline/online comparison, installation instructions, and FAQ remain near the relevant actions.

## References

- Nielsen Norman Group — 10 Usability Heuristics: https://www.nngroup.com/articles/ten-usability-heuristics/
- W3C — WCAG 2.2 Quick Reference: https://www.w3.org/WAI/WCAG22/quickref/

## Validation limits

Test the visual design with real learners, including Deaf users, when available. No participant usability study or manual screen-reader assessment has been performed. Screenshots remain illustrative placeholders. The app is still in development; the site is a local preview and has not been published.
