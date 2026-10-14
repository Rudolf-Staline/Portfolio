## 2025-03-01 - Avoid Redundant Screen Reader Announcements for Icons
**Learning:** When a button containing visual text symbols (like `×` for close or `←`/`→` for arrows) already has a descriptive `aria-label`, leaving the text symbols exposed causes screen readers to read the symbol's name out loud (e.g. "times" or "leftwards arrow") after or before the descriptive label. This creates a confusing and redundant experience for screen reader users.
**Action:** Always wrap plain text visual symbols inside buttons with `<span aria-hidden="true">` when the button already has an `aria-label`.
