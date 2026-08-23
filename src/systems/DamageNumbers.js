// DamageNumbers.js — small floating numbers on hit. Purely cosmetic, and hard
// capped (GAME_CONFIG.juice.maxDamageNumbers) so a big crowd cannot tank FPS.

class DamageNumber {
    constructor(x, y, value, color = '#ffffff', big = false) {
        this.x = x + (Math.random() - 0.5) * 18;
        this.y = y;
        this.value = Math.max(1, Math.round(value));
        this.color = color;
        this.big = big;
        this.life = big ? 1.0 : 0.7;
        this.maxLife = this.life;
        this.vy = big ? -70 : -55;
    }

    update(deltaTime) {
        this.life -= deltaTime;
        this.y += this.vy * deltaTime;
        this.vy += 60 * deltaTime; // slight arc as it rises then slows
    }

    draw(ctx) {
        const t = Math.max(0, this.life / this.maxLife);
        ctx.save();
        ctx.globalAlpha = t;
        ctx.font = `bold ${this.big ? 22 : 15}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.lineWidth = 3;
        ctx.strokeStyle = 'rgba(0,0,0,0.75)';
        ctx.strokeText(this.value, this.x, this.y);
        ctx.fillStyle = this.color;
        ctx.fillText(this.value, this.x, this.y);
        ctx.restore();
    }
}
