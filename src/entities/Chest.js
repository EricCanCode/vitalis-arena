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

        // A cache chest is on a clock, and a clock the player cannot see is
        // just an unexplained disappearance. Draw it as a ring that drains,
        // so the remaining time is readable at a glance from across the arena.
        if (this.expires !== undefined && this.maxExpires) {
            const frac = Math.max(0, this.expires / this.maxExpires);
            const r = this.radius + 12;
            const start = -Math.PI / 2;

            ctx.save();
            ctx.lineWidth = 3;
            ctx.strokeStyle = 'rgba(0,0,0,0.45)';
            ctx.beginPath();
            ctx.arc(this.x, y, r, 0, Math.PI * 2);
            ctx.stroke();

            // Reddens as it runs out, so urgency is carried by colour as well
            // as by length — the last two seconds should feel different.
            ctx.strokeStyle = frac > 0.35 ? '#ffd43b' : '#ff6b6b';
            ctx.beginPath();
            ctx.arc(this.x, y, r, start, start + Math.PI * 2 * frac);
            ctx.stroke();
            ctx.restore();
        }
    }
}
