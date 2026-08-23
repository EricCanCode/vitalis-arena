// Chest.js — treasure chest dropped by bosses and elites.
// Sits on the ground until a player touches it, then opens a reward screen.

class Chest {
    constructor(x, y, quality = 'normal') {
        this.x = x;
        this.y = y;
        this.radius = 26;          // generous pickup circle — chests should feel easy to grab
        this.quality = quality;    // 'normal' | 'boss'
        this.bob = Math.random() * Math.PI * 2;
        this.collected = false;
    }

    update(deltaTime) {
        this.bob += deltaTime * 3;
    }

    draw(ctx) {
        const lift = Math.sin(this.bob) * 5;
        const y = this.y + lift;
        const isBoss = this.quality === 'boss';

        // Glow pool underneath so it reads against a busy field
        if (!window.game || !window.game.performanceMode) {
            const g = ctx.createRadialGradient(this.x, y, 0, this.x, y, this.radius * 2.2);
            g.addColorStop(0, isBoss ? 'rgba(255,212,59,0.55)' : 'rgba(255,212,59,0.35)');
            g.addColorStop(1, 'rgba(255,212,59,0)');
            ctx.fillStyle = g;
            ctx.beginPath();
            ctx.arc(this.x, y, this.radius * 2.2, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.save();
        ctx.font = `${isBoss ? 46 : 38}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('🎁', this.x, y);
        ctx.restore();
    }
}
