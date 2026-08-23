// CoinPickup.js — coins dropped by enemies. Magnetised like XP, but always
// collected (coins never expire and are added to the run total).

class CoinPickup {
    constructor(x, y, value) {
        this.x = x;
        this.y = y;
        this.value = value;
        this.radius = 8;
        this.attractSpeed = 340;
        this.bob = Math.random() * Math.PI * 2;
    }

    update(deltaTime, player) {
        this.bob += deltaTime * 5;
        const dx = player.x - this.x;
        const dy = player.y - this.y;
        const dist = Math.hypot(dx, dy);
        const range = player.getPickupRange ? player.getPickupRange() : 150;
        if (dist < range && dist > 0) {
            this.x += (dx / dist) * this.attractSpeed * deltaTime;
            this.y += (dy / dist) * this.attractSpeed * deltaTime;
        }
    }

    draw(ctx) {
        const y = this.y + Math.sin(this.bob) * 2;
        ctx.fillStyle = '#ffd43b';
        ctx.beginPath();
        ctx.arc(this.x, y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#b8860b';
        ctx.lineWidth = 2;
        ctx.stroke();
    }
}
