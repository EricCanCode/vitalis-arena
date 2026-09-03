/* modules/gameLogic.js
 * Small, testable game-logic utilities.
 * Exposes a UMD-compatible `GameLogic` object for browser and Node test use.
 */
(function () {
  'use strict';

  function clamp(v, min, max) {
    return Math.max(min, Math.min(max, v));
  }

  // Simple deterministic damage calculation used in multiple places.
  // base: base damage, multiplier: percent multiplier (1.0 == 100%)
  function calculateDamage(base, multiplier, minDamage) {
    var raw = Math.floor(base * multiplier);
    if (typeof minDamage === 'number') raw = Math.max(raw, minDamage);
    return clamp(raw, 0, Number.MAX_SAFE_INTEGER);
  }

  var GameLogic = {
    clamp: clamp,
    calculateDamage: calculateDamage
  };

  // Browser global
  if (typeof window !== 'undefined') {
    window.GameLogic = GameLogic;
  }

  // CommonJS export for Node tests
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = GameLogic;
  }

})();
