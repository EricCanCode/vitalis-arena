/* modules/projectile.js
 * Projectile class extracted from main script.
 */
(function(){
  'use strict';

  class Projectile {
    constructor(x, y, angle, speed, damage, color, piercing = false, type = 'warrior') {
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.speed = speed;
        this.damage = damage;
        this.color = color;
        this.piercing = piercing;
        this.type = type;
        this.radius = 6;
        this.active = true;
        this.lifetime = 3;
        this.hitCount = 0;
        this.maxHits = piercing ? 3 : 1;
    }
    
    update(deltaTime) {
        this.x += Math.cos(this.angle) * this.speed * deltaTime;
        this.y += Math.sin(this.angle) * this.speed * deltaTime;
        this.lifetime -= deltaTime;
    }
    
    hit() {
        this.hitCount++;
        if (this.hitCount >= this.maxHits) this.active = false;
    }
    
    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        switch(this.type) {
            case 'warrior':
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.moveTo(10, 0);
                ctx.lineTo(-5, -6);
                ctx.lineTo(-8, 0);
                ctx.lineTo(-5, 6);
                ctx.closePath();
                ctx.fill();
                ctx.strokeStyle = '#fff';
                ctx.lineWidth = 2;
                ctx.stroke();
                break;
            case 'ranger':
                ctx.fillStyle = '#8b4513';
                ctx.fillRect(-8, -1, 12, 2);
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.moveTo(8, 0);
                ctx.lineTo(4, -4);
                ctx.lineTo(4, 4);
                ctx.closePath();
                ctx.fill();
                ctx.strokeStyle = '#fff';
                ctx.lineWidth = 1.5;
                ctx.stroke();
                break;
            case 'mage':
                const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.radius * 2);
                gradient.addColorStop(0, this.color);
                gradient.addColorStop(0.5, this.color + 'cc');
                gradient.addColorStop(1, this.color + '00');
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(0, 0, this.radius * 2, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = '#fff';
                ctx.beginPath();
                ctx.arc(0, 0, this.radius * 0.8, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(0, 0, this.radius * 0.6, 0, Math.PI * 2);
                ctx.fill();
                break;
            case 'assassin':
                ctx.fillStyle = '#333';
                ctx.fillRect(-6, -1, 8, 2);
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.moveTo(8, 0);
                ctx.lineTo(2, -3);
                ctx.lineTo(2, 3);
                ctx.closePath();
                ctx.fill();
                ctx.strokeStyle = '#fff';
                ctx.lineWidth = 1;
                ctx.stroke();
                break;
            case 'tank':
                ctx.fillStyle = '#666';
                ctx.fillRect(-6, -2, 8, 4);
                ctx.fillStyle = this.color;
                ctx.fillRect(2, -6, 8, 12);
                ctx.strokeStyle = '#fff';
                ctx.lineWidth = 2;
                ctx.strokeRect(2, -6, 8, 12);
                break;
            default:
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
                ctx.fill();
                ctx.strokeStyle = '#fff';
                ctx.lineWidth = 2;
                ctx.stroke();
        }
        ctx.restore();
        if (this.type === 'mage' || this.type === 'assassin') {
            ctx.fillStyle = this.color + '40';
            ctx.beginPath();
            ctx.arc(this.x - Math.cos(this.angle) * 15, this.y - Math.sin(this.angle) * 15, this.radius * 0.7, 0, Math.PI * 2);
            ctx.fill();
        }
    }
  }

  if (typeof window !== 'undefined') window.Projectile = Projectile;
  if (typeof module !== 'undefined' && module.exports) module.exports = Projectile;
})();
