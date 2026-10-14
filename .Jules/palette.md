
## 2024-05-18 - Explicitly label external links
**Learning:** Links that open in a new tab (`target="_blank"`) can be disorienting for screen reader users if they aren't warned in advance, breaking WCAG requirements.
**Action:** Always append visually hidden text like `<span className="sr-only">(s'ouvre dans un nouvel onglet)</span>` inside external links to provide context for screen readers without cluttering the visual UI.
