/* modules/hud.js
 * Non-invasive HUD updater: waits for `window.game` and updates DOM HUD
 * elements at a modest interval. This keeps HUD update logic separate
 * from the main game file and prepares for extraction.
 */
(function () {
  'use strict';

  function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }

  function updateHUD(game) {
    try {
      if (!game || !game.player) return;
      const stageText = document.getElementById('stageText');
      if (stageText) stageText.textContent = game.currentStage ?? 1;
      const coinsText = document.getElementById('coinsText');
      if (coinsText) coinsText.textContent = game.coins ?? 0;
      const healthBar = document.getElementById('healthBar');
      if (healthBar && game.player.maxHealth) {
        const hpPct = Math.max(0, (game.player.health / game.player.maxHealth) * 100);
        healthBar.style.width = hpPct + '%';
      }
      const healthText = document.getElementById('healthText');
      if (healthText) healthText.textContent = `${Math.max(0, Math.ceil(game.player.health))}/${game.player.maxHealth}`;
      const levelText = document.getElementById('levelText');
      if (levelText) levelText.textContent = game.player.level ?? 1;
      if (game.player.xpToLevel) {
        const xpPct = Math.min(100, (game.player.xp / game.player.xpToLevel) * 100);
        const xpBar = document.getElementById('xpBar');
        if (xpBar) xpBar.style.setProperty('width', xpPct + '%');
      }
      const timeText = document.getElementById('timeText');
      if (timeText) timeText.textContent = formatTime(game.gameTime ?? 0);
      const killText = document.getElementById('killText');
      if (killText) killText.textContent = game.player.kills ?? 0;
      // Ultimate
      const ultimateBar = document.getElementById('ultimateBar');
      if (ultimateBar && game.player.ultimateMax) {
        ultimateBar.style.width = ((game.player.ultimateCharge / game.player.ultimateMax) * 100) + '%';
      }
      const ultimateText = document.getElementById('ultimateText');
      if (ultimateText) ultimateText.textContent = `${Math.floor(game.player.ultimateCharge || 0)}/${game.player.ultimateMax || 100}`;

      // P2 HUD
      if (game.player2) {
        const p2Hud = document.getElementById('p2Hud');
        if (p2Hud) p2Hud.style.display = '';
        const p2HealthBar = document.getElementById('p2HealthBar');
        if (p2HealthBar && game.player2.maxHealth) {
          p2HealthBar.style.width = Math.max(0, (game.player2.health / game.player2.maxHealth) * 100) + '%';
        }
        const p2Status = document.getElementById('p2ReviveStatus');
        if (p2Status) {
          if (game.player2.downed) p2Status.textContent = `DOWN (${Math.ceil(game.player2.reviveTimer)}s)`;
          else p2Status.textContent = '';
        }
      } else {
        const p2Hud = document.getElementById('p2Hud');
        if (p2Hud) p2Hud.style.display = 'none';
      }
    } catch (e) {
      // swallow errors—HUD should not crash game
      console.warn('HUD update error:', e);
    }
  }

  function waitForGameAndBind() {
    let attempts = 0;
    const iv = setInterval(() => {
      attempts++;
      const g = window.game;
      if (g && g.player) {
        clearInterval(iv);
        // Update at 8-10Hz to avoid DOM thrash
        updateHUD(g);
        setInterval(() => updateHUD(window.game), 120);
      } else if (attempts > 200) { // ~20s give-up
        clearInterval(iv);
      }
    }, 100);
  }

  if (typeof window !== 'undefined') {
    // start asynchronously so loading order is flexible
    window.addEventListener('load', waitForGameAndBind);
    // Also attempt immediately in case script already ran
    setTimeout(waitForGameAndBind, 50);
  }

})();
