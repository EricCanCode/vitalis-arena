/* modules/rendering.js
 * Utilities for canvas DPR setup and HUD layout adjustments.
 * Exposes a `Renderer` global for the browser and CommonJS for tests if needed.
 */
(function () {
  'use strict';

  function setupCanvasDPR(canvas) {
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    var dpr = Math.max(1, window.devicePixelRatio || 1);
    var rect = canvas.getBoundingClientRect();
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { canvas: canvas, ctx: ctx, dpr: dpr };
  }

  function adjustHUDLayout(width, height) {
    // Simple responsive HUD placements: adjust CSS variables used by styles.
    var root = document.documentElement;
    root.style.setProperty('--viewport-width', width + 'px');
    root.style.setProperty('--viewport-height', height + 'px');

    // Example: smaller font-size on narrow viewports
    if (width < 420) {
      root.style.setProperty('--hud-scale', '0.85');
    } else if (width < 720) {
      root.style.setProperty('--hud-scale', '0.95');
    } else {
      root.style.setProperty('--hud-scale', '1');
    }
  }

  var Renderer = {
    setupCanvasDPR: setupCanvasDPR,
    adjustHUDLayout: adjustHUDLayout
  };

  if (typeof window !== 'undefined') window.Renderer = Renderer;
  if (typeof module !== 'undefined' && module.exports) module.exports = Renderer;

})();
