/* modules/enemy.js
 * Enemy class extracted from main script.
 */
(function(){
  'use strict';

  class Enemy {
    constructor(x, y, type, multiplier, game) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.multiplier = multiplier;
        this.game = game;
        
        this.setupType();
        
        this.health = this.maxHealth * multiplier;
        this.maxHealth = this.health;
        this.stunned = 0;
    }
    
    setupType() {
        const types = {
            basic: {
                radius: 15,
                speed: 60,
                maxHealth: 20,
                damage: 5,
                xpValue: 5,
                color: '#e03131'
            },
            fast: {
                radius: 12,
                speed: 110,
                maxHealth: 15,
                damage: 8,
                xpValue: 8,
                color: '#fd7e14'
            },
            tank: {
                radius: 25,
                speed: 40,
                maxHealth: 60,
                damage: 15,
                xpValue: 15,
                color: '#c92a2a'
            },
            boss: {
                radius: 50,
                speed: 45,
                maxHealth: 500,
                damage: 25,
                xpValue: 100,
                color: '#8b0000'
            }
        };
        
        const stats = types[this.type];
        this.radius = stats.radius;
        this.baseSpeed = stats.speed;
        this.speed = stats.speed;
        this.maxHealth = stats.maxHealth;
        this.damage = stats.damage;
        this.xpValue = stats.xpValue;
        this.color = stats.color;
        
        if (this.type === 'boss') {
            this.attackCooldown = 2;
            this.attackPattern = 0;
            this.phaseChangeThreshold = 0.5;
        }
    }
    
    update(deltaTime, player) {
        if (this.stunned > 0) {
            this.stunned -= deltaTime;
            return;
        }
        
        const levelSpeedMultiplier = 1 + ((this.game.player.level - 1) * 0.05);
        const currentSpeed = this.baseSpeed * levelSpeedMultiplier;
        
        if (this.type === 'boss') {
            this.updateBoss(deltaTime, player, currentSpeed);
            return;
        }
        
        const dx = player.x - this.x;
        const dy = player.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist > 0) {
            this.x += (dx / dist) * currentSpeed * deltaTime;
            this.y += (dy / dist) * currentSpeed * deltaTime;
        }
    }
    
    updateBoss(deltaTime, player, currentSpeed) {
        this.attackCooldown -= deltaTime;
        const dx = player.x - this.x;
        const dy = player.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        const healthPercent = this.health / this.maxHealth;
        let bossSpeed = currentSpeed;
        if (healthPercent < this.phaseChangeThreshold && this.attackPattern === 0) {
            this.attackPattern = 1;
            bossSpeed = currentSpeed * 1.5;
            this.game.screenShake = 20;
        }
        
        if (this.attackPattern === 0) {
            if (this.attackCooldown <= 0 && dist > 100) {
                this.attackCooldown = 4;
                if (dist > 0) {
                    this.x += (dx / dist) * bossSpeed * 3 * deltaTime;
                    this.y += (dy / dist) * bossSpeed * 3 * deltaTime;
                }
            } else {
                if (dist > 0) {
                    this.x += (dx / dist) * bossSpeed * deltaTime;
                    this.y += (dy / dist) * bossSpeed * deltaTime;
                }
            }
        } else {
            if (dist > 0) {
                this.x += (dx / dist) * bossSpeed * deltaTime;
                this.y += (dy / dist) * bossSpeed * deltaTime;
            }
            if (this.attackCooldown <= 0) {
                this.attackCooldown = this.game.performanceMode ? 4 : 2;
                this.shootProjectiles();
            }
        }
    }
    
    shootProjectiles() {
        const count = this.game.performanceMode ? 4 : 8;
        for (let i = 0; i < count; i++) {
            const angle = (Math.PI * 2 / count) * i;
            this.game.particles.push(new BossProjectile(
                this.x, this.y, angle, 200, this.damage, this.game
            ));
        }
    }
    
    takeDamage(amount) {
        this.health -= amount;
        try { this.game.audioManager.playSound('enemy-hit'); } catch (e) {}
    }
    
    draw(ctx) {
        const size = this.radius * 2.5;
        const imageName = `enemy_${this.type}`;
        if (this.game.imagesLoaded && this.game.images[imageName] && this.game.images[imageName].complete) {
            ctx.globalAlpha = 0.3;
            ctx.drawImage(this.game.images[imageName], this.x - size/2 + 2, this.y - size/2 + 2, size, size);
            ctx.globalAlpha = 1.0;
            ctx.drawImage(this.game.images[imageName], this.x - size/2, this.y - size/2, size, size);
        } else {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
            ctx.beginPath();
            ctx.arc(this.x + 2, this.y + 2, this.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fill();
        }
        const barWidth = this.radius * 2;
        const barHeight = 4;
        const healthPercent = this.health / this.maxHealth;
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(this.x - barWidth/2, this.y - this.radius - 8, barWidth, barHeight);
        ctx.fillStyle = '#4ade80';
        ctx.fillRect(this.x - barWidth/2, this.y - this.radius - 8, barWidth * healthPercent, barHeight);
        if (this.stunned > 0) {
            ctx.fillStyle = '#ffd43b';
            ctx.font = '16px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('⚡', this.x, this.y - this.radius - 20);
        }
    }
  }

  if (typeof window !== 'undefined') window.Enemy = Enemy;
  if (typeof module !== 'undefined' && module.exports) module.exports = Enemy;
})();
