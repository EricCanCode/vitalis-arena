/* modules/gameWrapper.js
 * Lightweight wrapper around the global `window.game` instance.
 * Provides a stable API surface for other modules/tests to call without
 * forcing a full refactor of the monolithic `Game` class.
 */
(function () {
  'use strict';

  function getGame() {
    if (typeof window !== 'undefined') return window.game || null;
    try { return require('../script.js').game || null; } catch (e) { return null; }
  }

  const GameWrapper = {
    get: getGame,
    isRunning: function () { const g = getGame(); return !!(g && g.isRunning); },
    start: function () { const g = getGame(); if (g && typeof g.startGame === 'function') return g.startGame(); },
    pause: function () { const g = getGame(); if (g) g.isPaused = true; },
    resume: function () { const g = getGame(); if (g) g.isPaused = false; }
  };

  if (typeof window !== 'undefined') window.GameWrapper = GameWrapper;
  if (typeof module !== 'undefined' && module.exports) module.exports = GameWrapper;

})();
