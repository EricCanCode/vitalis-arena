/* modules/ui.js
 * Tiny helpers for safe-area handling and UI utilities.
 */
(function () {
  'use strict';

  function applySafeAreaVars() {
    var root = document.documentElement;
    // Mirror CSS env vars to --safe-area-* for easier JS-driven fallbacks
    root.style.setProperty('--safe-area-top', getComputedStyle(root).getPropertyValue('env(safe-area-inset-top)') || '0px');
    root.style.setProperty('--safe-area-right', getComputedStyle(root).getPropertyValue('env(safe-area-inset-right)') || '0px');
    root.style.setProperty('--safe-area-bottom', getComputedStyle(root).getPropertyValue('env(safe-area-inset-bottom)') || '0px');
    root.style.setProperty('--safe-area-left', getComputedStyle(root).getPropertyValue('env(safe-area-inset-left)') || '0px');
  }

  var UI = { applySafeAreaVars: applySafeAreaVars };
  if (typeof window !== 'undefined') window.UI = UI;
  if (typeof module !== 'undefined' && module.exports) module.exports = UI;

})();
