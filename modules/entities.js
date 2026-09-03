/* modules/entities.js
 * Various small entity classes: XPOrb, HealthPickup, EquipmentDrop, Particle, BossProjectile
 */
(function(){
  'use strict';

  class XPOrb {
    constructor(x, y, value) {
        this.x = x;
        this.y = y;
        this.value = value;
        this.radius = 8;
        this.magnetRange = 150;
        this.attractSpeed = 300;
    }
    update(deltaTime, player) {
        const dx = player.x - this.x;
        const dy = player.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < this.magnetRange) {
            this.x += (dx / dist) * this.attractSpeed * deltaTime;
            this.y += (dy / dist) * this.attractSpeed * deltaTime;
        }
    }
    draw(ctx) {
        if (!window.game || !window.game.performanceMode) {
            const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius * 2);
            gradient.addColorStop(0, 'rgba(74, 144, 226, 0.8)');
            gradient.addColorStop(1, 'rgba(74, 144, 226, 0)');
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius * 2, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.fillStyle = '#4a90e2';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();
    }
  }

  class HealthPickup {
    constructor(x, y, healAmount) {
        this.x = x; this.y = y; this.healAmount = healAmount; this.radius = 10;
        this.magnetRange = 150; this.attractSpeed = 250; this.pulseTime = 0;
    }
    update(deltaTime, player) {
        this.pulseTime += deltaTime * 3;
        const dx = player.x - this.x; const dy = player.y - this.y; const dist = Math.sqrt(dx*dx+dy*dy);
        if (dist < this.magnetRange) { this.x += (dx/dist)*this.attractSpeed*deltaTime; this.y += (dy/dist)*this.attractSpeed*deltaTime; }
    }
    draw(ctx) {
        const pulse = Math.sin(this.pulseTime) * 0.3 + 1;
        if (!window.game || !window.game.performanceMode) {
            const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius * 2.5 * pulse);
            gradient.addColorStop(0, 'rgba(46, 204, 113, 0.8)');
            gradient.addColorStop(1, 'rgba(46, 204, 113, 0)');
            ctx.fillStyle = gradient; ctx.beginPath(); ctx.arc(this.x, this.y, this.radius*2.5*pulse, 0, Math.PI*2); ctx.fill();
        }
        ctx.fillStyle='#2ecc71'; ctx.beginPath(); ctx.arc(this.x,this.y,this.radius*pulse,0,Math.PI*2); ctx.fill();
        ctx.strokeStyle='#fff'; ctx.lineWidth=2; const crossSize=this.radius*0.6; ctx.beginPath(); ctx.moveTo(this.x-crossSize,this.y); ctx.lineTo(this.x+crossSize,this.y); ctx.moveTo(this.x,this.y-crossSize); ctx.lineTo(this.x,this.y+crossSize); ctx.stroke();
    }
  }

  class EquipmentDrop {
    constructor(x,y,equipment) { this.x=x; this.y=y; this.equipment=equipment; this.radius=12; this.magnetRange=120; this.attractSpeed=200; this.rotationAngle=0; this.floatOffset=0; }
    update(deltaTime, player) { this.rotationAngle += deltaTime*2; this.floatOffset = Math.sin(this.rotationAngle*2)*5; const dx=player.x-this.x; const dy=player.y-this.y; const dist=Math.sqrt(dx*dx+dy*dy); if (dist < this.magnetRange) { this.x += (dx/dist)*this.attractSpeed*deltaTime; this.y += (dy/dist)*this.attractSpeed*deltaTime; } }
    draw(ctx) { const rarityColors = { 'Common': '#9CA3AF','Uncommon':'#10B981','Rare':'#3B82F6','Epic':'#A855F7','Legendary':'#F59E0B' }; const color = rarityColors[this.equipment.rarity] || '#9CA3AF'; const displayY = this.y + this.floatOffset; const gradient = ctx.createRadialGradient(this.x, displayY, 0, this.x, displayY, this.radius*3); gradient.addColorStop(0, color+'60'); gradient.addColorStop(1, color+'00'); ctx.fillStyle = gradient; ctx.beginPath(); ctx.arc(this.x, displayY, this.radius*3, 0, Math.PI*2); ctx.fill(); ctx.fillStyle = color; ctx.beginPath(); ctx.arc(this.x, displayY, this.radius, 0, Math.PI*2); ctx.fill(); ctx.save(); ctx.translate(this.x, displayY); ctx.rotate(this.rotationAngle); ctx.fillStyle = '#fff'; ctx.font='bold 16px Arial'; ctx.textAlign='center'; ctx.textBaseline='middle'; const icons = { weapon: '⚔️', armor: '🛡️', accessory: '📿', ring: '💍' }; ctx.fillText(icons[this.equipment.type] || '?', 0, 0); ctx.restore(); }
  }

  class Particle {
    constructor(x,y,angle,speed,color,sizeMultiplier=1){ this.x=x; this.y=y; this.vx=Math.cos(angle)*speed; this.vy=Math.sin(angle)*speed; this.color=color; this.radius=(3+Math.random()*3)*sizeMultiplier; this.lifetime = window.game && window.game.performanceMode ? 0.15 : 0.5; this.maxLifetime = this.lifetime; }
    update(deltaTime){ this.x+=this.vx*deltaTime; this.y+=this.vy*deltaTime; this.vx*=0.95; this.vy*=0.95; this.lifetime-=deltaTime; }
    draw(ctx){ const alpha = this.lifetime/this.maxLifetime; ctx.fillStyle = this.color + Math.floor(alpha*255).toString(16).padStart(2,'0'); ctx.beginPath(); ctx.arc(this.x,this.y,this.radius,0,Math.PI*2); ctx.fill(); }
  }

  class BossProjectile {
    constructor(x,y,angle,speed,damage,game){ this.x=x; this.y=y; this.vx=Math.cos(angle)*speed; this.vy=Math.sin(angle)*speed; this.damage=damage; this.game=game; this.radius=8; this.lifetime=5; this.color='#ff0000'; }
    update(deltaTime){ this.x+=this.vx*deltaTime; this.y+=this.vy*deltaTime; this.lifetime-=deltaTime; const dx=this.game.player.x-this.x; const dy=this.game.player.y-this.y; const dist=Math.sqrt(dx*dx+dy*dy); if (dist < this.radius + this.game.player.radius) { this.game.player.takeDamage(this.damage); this.lifetime=0; } if (this.lifetime>0 && this.game.player2 && this.game.player2.health>0) { const dx2=this.game.player2.x-this.x; const dy2=this.game.player2.y-this.y; const dist2=Math.sqrt(dx2*dx2+dy2*dy2); if (dist2 < this.radius + this.game.player2.radius) { this.game.player2.takeDamage(this.damage); this.lifetime=0; } } if (this.x < -100 || this.x > this.game.canvas.width+100 || this.y < -100 || this.y > this.game.canvas.height+100) this.lifetime=0; }
    draw(ctx){ if (!this.game.performanceMode) { ctx.shadowBlur=15; ctx.shadowColor=this.color; } ctx.fillStyle=this.color; ctx.beginPath(); ctx.arc(this.x,this.y,this.radius,0,Math.PI*2); ctx.fill(); if (!this.game.performanceMode) ctx.shadowBlur=0; ctx.fillStyle='#ffaaaa'; ctx.beginPath(); ctx.arc(this.x,this.y,this.radius*0.5,0,Math.PI*2); ctx.fill(); }
  }

  if (typeof window !== 'undefined') {
    window.XPOrb = XPOrb;
    window.HealthPickup = HealthPickup;
    window.EquipmentDrop = EquipmentDrop;
    window.Particle = Particle;
    window.BossProjectile = BossProjectile;
  }
  if (typeof module !== 'undefined' && module.exports) module.exports = { XPOrb, HealthPickup, EquipmentDrop, Particle, BossProjectile };
})();
