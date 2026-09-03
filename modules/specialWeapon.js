/* modules/specialWeapon.js
 * SpecialWeapon class extracted from main script.
 */
(function(){
  'use strict';

  class SpecialWeapon {
    constructor(type, player) {
        this.type = type;
        this.player = player;
        this.level = 1;
        this.tier = 0; // 0=Common, 1=Rare, 2=Epic, 3=Legendary
        this.cooldown = 0;
        this.time = 0;
        
        // Weapon-specific properties
        this.setupWeapon();
    }
    
    getTierInfo() {
        const tiers = [
            { name: 'Common', color: '#9e9e9e', damageMultiplier: 1.0, sizeMultiplier: 1.0 },
            { name: 'Rare', color: '#2196f3', damageMultiplier: 1.5, sizeMultiplier: 1.2 },
            { name: 'Epic', color: '#9c27b0', damageMultiplier: 2.0, sizeMultiplier: 1.4 },
            { name: 'Legendary', color: '#ff9800', damageMultiplier: 3.0, sizeMultiplier: 1.6 }
        ];
        return tiers[this.tier];
    }
    
    upgradeTier() {
        if (this.tier < 3) {
            this.tier++;
            this.setupWeapon(); // Recalculate stats with new tier
            return true;
        }
        return false;
    }
    
    setupWeapon() {
        const tierInfo = this.getTierInfo();
        const dmgMult = tierInfo.damageMultiplier;
        const sizeMult = tierInfo.sizeMultiplier;
        
        switch(this.type) {
            case 'lightning':
                this.damage = 15 * dmgMult;
                this.attackSpeed = 2;
                this.radius = 80 * sizeMult;
                this.orbs = 2;
                this.speed = 3;
                break;
            case 'fire':
                this.damage = 8 * dmgMult;
                this.radius = 60 * sizeMult;
                break;
            case 'ice':
                this.damage = 20 * dmgMult;
                this.attackSpeed = 1.5;
                this.projectileSpeed = 300;
                break;
            case 'boomerang':
                this.damage = 25 * dmgMult;
                this.attackSpeed = 0.8;
                this.range = 200 * sizeMult;
                this.state = 'ready';
                this.distance = 0;
                this.angle = 0;
                break;
            case 'orbs':
                this.damage = 12 * dmgMult;
                this.orbs = 3;
                this.radius = 60 * sizeMult;
                this.speed = 2;
                break;
            case 'poison':
                this.damage = 10 * dmgMult;
                this.attackSpeed = 2;
                this.poisonDuration = 3;
                break;
            case 'bomb':
                this.damage = 999; // Instant kill
                this.cooldownTime = 60 / (1 + this.tier * 0.3); // Faster cooldown at higher tiers
                this.cooldown = 0; // Start ready
                break;
        }
    }
    
    update(deltaTime, game) {
        this.time += deltaTime;
        this.cooldown -= deltaTime;
        
        switch(this.type) {
            case 'lightning':
                this.updateLightning(deltaTime, game);
                break;
            case 'fire':
                this.updateFire(deltaTime, game);
                break;
            case 'ice':
                this.updateIce(deltaTime, game);
                break;
            case 'boomerang':
                this.updateBoomerang(deltaTime, game);
                break;
            case 'orbs':
                this.updateOrbs(deltaTime, game);
                break;
            case 'poison':
                this.updatePoison(deltaTime, game);
                break;
            case 'bomb':
                this.updateBomb(deltaTime, game);
                break;
        }
    }
    
    updateLightning(deltaTime, game) {
        // Lightning ring orbits and damages enemies
        const orbCount = this.orbs + this.level - 1;
        for (let i = 0; i < orbCount; i++) {
            const angle = (this.time * this.speed + (i * Math.PI * 2 / orbCount));
            const x = this.player.x + Math.cos(angle) * this.radius;
            const y = this.player.y + Math.sin(angle) * this.radius;
            
            // Check enemy collision
            game.enemies.forEach(enemy => {
                const dx = enemy.x - x;
                const dy = enemy.y - y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 20) {
                    enemy.takeDamage(this.damage * deltaTime * 2);
                }
            });
        }
    }
    
    updateFire(deltaTime, game) {
        // Fire aura damages nearby enemies
        const range = this.radius + (this.level - 1) * 10;
        game.enemies.forEach(enemy => {
            const dx = enemy.x - this.player.x;
            const dy = enemy.y - this.player.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < range) {
                enemy.takeDamage(this.damage * deltaTime);
            }
        });
    }
    
    updateIce(deltaTime, game) {
        if (this.cooldown <= 0) {
            // Shoot ice in 4 cardinal directions
            const directions = [0, Math.PI/2, Math.PI, Math.PI*3/2];
            directions.forEach(angle => {
                game.projectiles.push(new Projectile(
                    this.player.x, this.player.y, angle,
                    this.projectileSpeed, this.damage * this.level,
                    '#4FC3F7', false, 'mage'
                ));
            });
            this.cooldown = 1 / this.attackSpeed;
        }
    }
    
    updateBoomerang(deltaTime, game) {
        if (this.state === 'ready' && this.cooldown <= 0) {
            // Find nearest enemy
            let nearest = null;
            let nearestDist = Infinity;
            game.enemies.forEach(enemy => {
                const dx = enemy.x - this.player.x;
                const dy = enemy.y - this.player.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < nearestDist) {
                    nearestDist = dist;
                    nearest = enemy;
                }
            });
            
            if (nearest) {
                this.angle = Math.atan2(nearest.y - this.player.y, nearest.x - this.player.x);
                this.state = 'out';
                this.distance = 0;
            }
        }
        
        if (this.state === 'out') {
            this.distance += 400 * deltaTime;
            if (this.distance >= this.range) {
                this.state = 'return';
            }
            
            const x = this.player.x + Math.cos(this.angle) * this.distance;
            const y = this.player.y + Math.sin(this.angle) * this.distance;
            
            // Damage enemies
            game.enemies.forEach(enemy => {
                const dx = enemy.x - x;
                const dy = enemy.y - y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 25) {
                    enemy.takeDamage(this.damage * deltaTime * 3);
                }
            });
        }
        
        if (this.state === 'return') {
            this.distance -= 500 * deltaTime;
            if (this.distance <= 0) {
                this.state = 'ready';
                this.cooldown = 1 / this.attackSpeed;
            }
            
            const x = this.player.x + Math.cos(this.angle) * this.distance;
            const y = this.player.y + Math.sin(this.angle) * this.distance;
            
            // Damage enemies on return
            game.enemies.forEach(enemy => {
                const dx = enemy.x - x;
                const dy = enemy.y - y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 25) {
                    enemy.takeDamage(this.damage * deltaTime * 3);
                }
            });
        }
    }
    
    updateOrbs(deltaTime, game) {
        // Rotating orbs that block/damage enemies
        const orbCount = this.orbs + this.level - 1;
        const rotationSpeed = this.speed + this.tier * 0.8; // Spin faster as tier increases
        for (let i = 0; i < orbCount; i++) {
            const angle = (-this.time * rotationSpeed + (i * Math.PI * 2 / orbCount));
            const x = this.player.x + Math.cos(angle) * this.radius;
            const y = this.player.y + Math.sin(angle) * this.radius;
            
            game.enemies.forEach(enemy => {
                const dx = enemy.x - x;
                const dy = enemy.y - y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 25) {
                    enemy.takeDamage(this.damage * deltaTime * 2);
                }
            });
        }
    }
    
    updatePoison(deltaTime, game) {
        if (this.cooldown <= 0 && game.enemies.length > 0) {
            // Find nearest enemy
            let nearest = null;
            let nearestDist = Infinity;
            game.enemies.forEach(enemy => {
                const dx = enemy.x - this.player.x;
                const dy = enemy.y - this.player.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < nearestDist) {
                    nearestDist = dist;
                    nearest = enemy;
                }
            });
            
            if (nearest) {
                const angle = Math.atan2(nearest.y - this.player.y, nearest.x - this.player.x);
                game.projectiles.push(new Projectile(
                    this.player.x, this.player.y, angle,
                    500, this.damage * this.level,
                    '#7CB342', false, 'assassin'
                ));
                this.cooldown = 1 / this.attackSpeed;
            }
        }
    }
    
    updateBomb(deltaTime, game) {
        // Bomb triggers automatically when off cooldown
        if (this.cooldown <= 0 && game.enemies.length > 0) {
            // Create massive explosion effect
            game.enemies.forEach(enemy => {
                // Create explosion particles at each enemy position
                game.createParticles(enemy.x, enemy.y, enemy.color, 'tank');
                enemy.takeDamage(this.damage);
            });
            
            // Screen shake
            game.screenShake = 20;
            
            // Add central explosion flash
            for (let i = 0; i < 50; i++) {
                const angle = Math.random() * Math.PI * 2;
                const speed = 50 + Math.random() * 300;
                game.particles.push(new Particle(
                    this.player.x, this.player.y, angle, speed, '#ff6b00', 2
                ));
            }
            
            // Reset cooldown
            this.cooldown = this.cooldownTime / (1 + (this.level - 1) * 0.2);
        }
    }
    
    draw(ctx) {
        switch(this.type) {
            case 'lightning':
                this.drawLightning(ctx);
                break;
            case 'fire':
                this.drawFire(ctx);
                break;
            case 'boomerang':
                this.drawBoomerang(ctx);
                break;
            case 'orbs':
                this.drawOrbs(ctx);
                break;
            case 'bomb':
                this.drawBomb(ctx);
                break;
        }
    }
    
    drawLightning(ctx) {
        const orbCount = this.orbs + this.level - 1;
        const tierInfo = this.getTierInfo();
        const tierColor = tierInfo.color;
        
        for (let i = 0; i < orbCount; i++) {
            const angle = (this.time * this.speed + (i * Math.PI * 2 / orbCount));
            const x = this.player.x + Math.cos(angle) * this.radius;
            const y = this.player.y + Math.sin(angle) * this.radius;
            
            // Tier glow (outer)
            if (this.tier > 0) {
                const glowSize = 20 + this.tier * 5;
                const tierGradient = ctx.createRadialGradient(x, y, 0, x, y, glowSize);
                tierGradient.addColorStop(0, tierColor + '60');
                tierGradient.addColorStop(0.5, tierColor + '30');
                tierGradient.addColorStop(1, tierColor + '00');
                ctx.fillStyle = tierGradient;
                ctx.beginPath();
                ctx.arc(x, y, glowSize, 0, Math.PI * 2);
                ctx.fill();
            }
            
            // Lightning glow
            const gradient = ctx.createRadialGradient(x, y, 0, x, y, 15);
            gradient.addColorStop(0, '#FFD700');
            gradient.addColorStop(0.5, '#FFD70080');
            gradient.addColorStop(1, '#FFD70000');
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(x, y, 15, 0, Math.PI * 2);
            ctx.fill();
            
            // Core
            ctx.fillStyle = '#FFFF00';
            ctx.beginPath();
            ctx.arc(x, y, 8, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    drawFire(ctx) {
        const range = this.radius + (this.level - 1) * 10;
        const tierInfo = this.getTierInfo();
        const tierColor = tierInfo.color;
        
        // Add tier glow ring if upgraded
        if (this.tier > 0) {
            const tierPulse = Math.sin(this.time * 4) * 0.3 + 0.7;
            const tierGradient = ctx.createRadialGradient(
                this.player.x, this.player.y, range * 0.8,
                this.player.x, this.player.y, range * 1.2
            );
            // Parse hex color to rgb for alpha
            const r = parseInt(tierColor.slice(1, 3), 16);
            const g = parseInt(tierColor.slice(3, 5), 16);
            const b = parseInt(tierColor.slice(5, 7), 16);
            tierGradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${0.4 * tierPulse})`);
            tierGradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
            ctx.fillStyle = tierGradient;
            ctx.beginPath();
            ctx.arc(this.player.x, this.player.y, range * 1.2, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Pulsing fire aura
        const pulse = Math.sin(this.time * 3) * 0.2 + 0.8;
        const gradient = ctx.createRadialGradient(
            this.player.x, this.player.y, 0,
            this.player.x, this.player.y, range
        );
        gradient.addColorStop(0, `rgba(255, 69, 0, ${0.3 * pulse})`);
        gradient.addColorStop(0.7, `rgba(255, 140, 0, ${0.2 * pulse})`);
        gradient.addColorStop(1, 'rgba(255, 69, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.player.x, this.player.y, range, 0, Math.PI * 2);
        ctx.fill();
    }
    
    drawBoomerang(ctx) {
        if (this.state !== 'ready') {
            const x = this.player.x + Math.cos(this.angle) * this.distance;
            const y = this.player.y + Math.sin(this.angle) * this.distance;
            const tierInfo = this.getTierInfo();
            const tierColor = tierInfo.color;
            
            // Tier glow (before rotation)
            if (this.tier > 0) {
                const tierSize = 20 + this.tier * 8;
                const tierGradient = ctx.createRadialGradient(x, y, 0, x, y, tierSize);
                tierGradient.addColorStop(0, tierColor + '80');
                tierGradient.addColorStop(0.5, tierColor + '40');
                tierGradient.addColorStop(1, tierColor + '00');
                ctx.fillStyle = tierGradient;
                ctx.beginPath();
                ctx.arc(x, y, tierSize, 0, Math.PI * 2);
                ctx.fill();
            }
            
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(this.time * 10);
            
            // Boomerang shape
            ctx.fillStyle = '#FFD700';
            ctx.beginPath();
            ctx.arc(0, -10, 8, 0, Math.PI);
            ctx.arc(0, 10, 8, Math.PI, 0);
            ctx.fill();
            
            ctx.strokeStyle = this.tier > 0 ? tierColor : '#FFA500';
            ctx.lineWidth = 3;
            ctx.stroke();
            
            ctx.restore();
        }
    }
    
    drawOrbs(ctx) {
        const orbCount = this.orbs + this.level - 1;
        const tierInfo = this.getTierInfo();
        const tierColor = tierInfo.color;
        const rotationSpeed = this.speed + this.tier * 0.8; // Spin faster as tier increases
        
        for (let i = 0; i < orbCount; i++) {
            const angle = (-this.time * rotationSpeed + (i * Math.PI * 2 / orbCount));
            const x = this.player.x + Math.cos(angle) * this.radius;
            const y = this.player.y + Math.sin(angle) * this.radius;
            
            // Tier glow (if upgraded)
            if (this.tier > 0) {
                const tierSize = 25 + this.tier * 5;
                const tierGradient = ctx.createRadialGradient(x, y, 0, x, y, tierSize);
                tierGradient.addColorStop(0, tierColor + '80');
                tierGradient.addColorStop(0.5, tierColor + '40');
                tierGradient.addColorStop(1, tierColor + '00');
                ctx.fillStyle = tierGradient;
                ctx.beginPath();
                ctx.arc(x, y, tierSize, 0, Math.PI * 2);
                ctx.fill();
            }
            
            // Glow
            const gradient = ctx.createRadialGradient(x, y, 0, x, y, 18);
            gradient.addColorStop(0, '#9C27B0');
            gradient.addColorStop(0.5, '#9C27B080');
            gradient.addColorStop(1, '#9C27B000');
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(x, y, 18, 0, Math.PI * 2);
            ctx.fill();
            
            // Core
            ctx.fillStyle = '#E1BEE7';
            ctx.beginPath();
            ctx.arc(x, y, 10, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.strokeStyle = this.tier > 0 ? tierColor : '#fff';
            ctx.lineWidth = 2;
            ctx.stroke();
        }
    }
    
    drawBomb(ctx) {
        // Draw a cooldown indicator at the top of the screen
        const centerX = this.player.x;
        const centerY = this.player.y - 80;
        const tierInfo = this.getTierInfo();
        const tierColor = tierInfo.color;
        
        // Tier ring (if upgraded)
        if (this.tier > 0) {
            ctx.strokeStyle = tierColor;
            ctx.lineWidth = 3 + this.tier;
            ctx.beginPath();
            ctx.arc(centerX, centerY, 28, 0, Math.PI * 2);
            ctx.stroke();
        }
        
        // Background circle
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.beginPath();
        ctx.arc(centerX, centerY, 25, 0, Math.PI * 2);
        ctx.fill();
        
        // Cooldown arc
        const cooldownPercent = Math.max(0, this.cooldown / this.cooldownTime);
        if (cooldownPercent > 0) {
            ctx.fillStyle = 'rgba(255, 100, 100, 0.6)';
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, 25, -Math.PI / 2, -Math.PI / 2 + (Math.PI * 2 * cooldownPercent));
            ctx.closePath();
            ctx.fill();
        }
        
        // Bomb icon
        ctx.font = 'bold 20px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = this.cooldown <= 0 ? '#ff6b00' : '#666';
        ctx.fillText('💣', centerX, centerY);
        
        // Ready indicator
        if (this.cooldown <= 0) {
            const readyColor = this.tier > 0 ? tierColor : '#ff6b00';
            ctx.fillStyle = readyColor;
            ctx.shadowColor = readyColor;
            ctx.shadowBlur = 10;
            ctx.font = 'bold 12px Arial';
            ctx.fillText('READY!', centerX, centerY + 35);
            ctx.shadowBlur = 0;
        }
    }
  }

  if (typeof window !== 'undefined') window.SpecialWeapon = SpecialWeapon;
  if (typeof module !== 'undefined' && module.exports) module.exports = SpecialWeapon;
})();
