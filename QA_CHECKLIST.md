# Vitalis Arena — QA Checklist

Automated and manual checks to validate the recent refactor and responsive fixes.

Automated checks
- `npm test` — run Node smoke tests for `modules/gameLogic.js`.
- `node scripts/check-ids.js` — ensure JS DOM id references exist in `index.html` or are intentionally injected.
- `npm run build` — verify `dist/` is produced and contains expected files.

Quick manual device checks
- Load the app in desktop Chrome and verify canvas renders and HUD updates (health, XP, time).
- Load in iOS Safari (standalone and browser) and validate audio unlock behavior (first tap should resume AudioContext) and service worker registration.
- Test mobile DPR: verify canvas remains sharp on Retina displays (no blurry scaling).
- Test accessible navigation: open Settings, toggle `Reduced Motion` and `High Contrast`, ensure changes apply, and modals return focus.

Runtime sanity checks
- Open DevTools Console and confirm no uncaught exceptions on startup.
- Verify keybinds modal opens via Settings → Rebind Keys and that key presses update the UI.
- Toggle `Sound` in top-right — verify `audioSettings` in `localStorage` updates.

Reporting
- If any check fails, capture a screenshot, console log, and steps to reproduce. File bugs against the repository with labels: `bug`, `regression`, `platform-ios` (if applicable).
