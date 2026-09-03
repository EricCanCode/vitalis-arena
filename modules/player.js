// Clean Player module (compact, test-friendly)
(function(){
  'use strict';

  class Player {
    constructor(x, y, type, game) {
      this.x = x; this.y = y; this.type = type; this.game = game || {};
      this.radius = 20; this.maxHealthBonus = 0;
      const stats = { 
        warrior: { maxHealth: 120, speed: 230, damage: 15, armor: 0.25, color: '#ff6b6b', icon: '⚔️' },
        ranger: { maxHealth: 80, speed: 250, damage: 10, color: '#51cf66', icon: '🏹' },
        mage: { maxHealth: 70, speed: 150, damage: 20, color: '#845ef7', icon: '🔮' },
        assassin: { maxHealth: 75, speed: 300, damage: 18, color: '#ffd43b', icon: '🗡️' },
        tank: { maxHealth: 150, speed: 120, damage: 8, color: '#74c0fc', icon: '🛡️' }
      };
      const stat = stats[this.type] || stats.warrior;
      this.maxHealth = stat.maxHealth + (this.maxHealthBonus || 0);
      this.speed = stat.speed; this.baseDamage = stat.damage; this.color = stat.color; this.icon = stat.icon; this.armor = stat.armor || 0;
      this.health = this.maxHealth; this.xp = 0; this.level = 1; this.xpToLevel = 10; this.kills = 0;
      this.attackCooldown = 0; this.attackSpeed = 1.0; this.projectileSpeed = 400; this.projectileDamage = this.baseDamage; this.projectileCount = 1; this.piercing = false;
      this.abilityCooldown = 0; this.ultimateCharge = 0; this.ultimateMax = 100; this.ultimateReady = false;
      this.invulnerable = false; this.iframeTimer = 0; this.iframeDuration = 2.0;
      this.weapons = []; this.equipment = { weapon: null, armor: null, accessory: null, ring: null };
    }

    update(deltaTime, keys = {}, canvasWidth = 800, canvasHeight = 600) {
      let dx = 0, dy = 0;
      if (keys['w'] || keys['arrowup']) dy -= 1;
      if (keys['s'] || keys['arrowdown']) dy += 1;
      if (keys['a'] || keys['arrowleft']) dx -= 1;
      if (keys['d'] || keys['arrowright']) dx += 1;
      if (dx !== 0 && dy !== 0) { dx *= 0.707; dy *= 0.707; }
      this.x += dx * this.speed * deltaTime; this.y += dy * this.speed * deltaTime;
      this.x = Math.max(this.radius, Math.min(canvasWidth - this.radius, this.x)); this.y = Math.max(this.radius, Math.min(canvasHeight - this.radius, this.y));
      if (this.attackCooldown > 0) this.attackCooldown -= deltaTime; if (this.abilityCooldown > 0) this.abilityCooldown -= deltaTime;
      if (this.iframeTimer > 0) { this.iframeTimer -= deltaTime; if (this.iframeTimer <= 0) { this.iframeTimer = 0; this.invulnerable = false; } }
    }

    takeDamage(amount) { if (this.invulnerable) return; const reduced = amount * (1 - (this.armor || 0)); this.health -= reduced; if (this.health < 0) this.health = 0; this.invulnerable = true; this.iframeTimer = this.iframeDuration; }
    addWeapon(type) { const found = this.weapons.find(w => w.type === type); if (found) { found.level = (found.level || 1) + 1; return; } this.weapons.push({ type, level: 1 }); }
    levelUp() { try { if (this.game && this.game.audioManager) this.game.audioManager.playSound('level-up'); } catch (e) {} this.level++; this.xp -= this.xpToLevel; this.xpToLevel = Math.floor(this.xpToLevel * 1.5); if (typeof this.showLevelUpScreen === 'function') this.showLevelUpScreen(); }
    showLevelUpScreen() { const game = this.game || (typeof window !== 'undefined' && window.game); if (game) game.isPaused = true; const levelUpScreen = (typeof document !== 'undefined') && document.getElementById('levelUpScreen'); const upgradeOptions = (typeof document !== 'undefined') && document.getElementById('upgradeOptions'); if (!levelUpScreen || !upgradeOptions) return; const upgrades = [ { icon: '❤️', name: 'Max Health +20', desc: 'Increase maximum health', apply: () => { this.maxHealth += 20; this.health += 20; } }, { icon: '⚡', name: 'Speed +15%', desc: 'Move faster', apply: () => { this.speed *= 1.15; } } ]; upgradeOptions.innerHTML = ''; upgrades.slice(0,3).forEach(u => { const opt = document.createElement('div'); opt.className = 'upgrade-option'; opt.innerHTML = `<div class="upgrade-icon">${u.icon}</div><div class="upgrade-name">${u.name}</div><div class="upgrade-desc">${u.desc}</div>`; opt.addEventListener('click', () => { try { if (game && game.audioManager) game.audioManager.playSound('button-click'); } catch(e){} u.apply.call(this); levelUpScreen.classList.remove('active'); if (game) game.isPaused = false; }); upgradeOptions.appendChild(opt); }); levelUpScreen.classList.add('active'); }
  }

  if (typeof window !== 'undefined') window.Player = Player; if (typeof module !== 'undefined' && module.exports) module.exports = Player;
})();
