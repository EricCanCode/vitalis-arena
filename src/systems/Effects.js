// Effects.js — the game's second rendering primitive.
//
// Particle is a small filled circle with friction. It is the right shape for
// "a thing broke apart", and the wrong shape for everything else, so until now
// a basic enemy popping and a boss cracking the ground were drawn with the same
// vocabulary and read as equally important.
//
// These effects are shapes with intent: expanding rings that ARE a shockwave,
// ground decals that mark where a hit will land, blooms that mark where one
// did. They carry no gameplay state — damage still lives in the systems that
// own it — so they can be added or removed freely without touching combat.
//
// Layering matters. Ground effects draw beneath entities (a decal the player
// stands on top of); air effects draw above them (a wave washing over the
// field). Anything that reads as "painted on the floor" belongs to 'ground'.

const EFFECT_LAYERS = ['ground', 'air'];

class Effect {
    constructor(x, y, life, layer = 'air') {
        this.x = x;
        this.y = y;
        this.life = life;
        this.maxLife = life;
        this.layer = layer;
        this.dead = false;
    }

    // 0 at birth, 1 at death. Every subclass animates off this so a single
    // `life` value controls the whole shape.
    get t() { return 1 - Math.max(0, this.life) / this.maxLife; }

    update(deltaTime) {
        this.life -= deltaTime;
        if (this.life <= 0) this.dead = true;
    }

    draw() {}
}

// Utility: ease-out so rings leap outward and settle, rather than crawling at
// a constant rate. A linear expansion reads as a slow bubble; this reads as force.
function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

// An expanding stroked ring, optionally with a gap cut out of it.
//
// The gap is the important part. The Colossus fires a wall of projectiles with
// one safe lane, which is good design that was invisible — the player could not
// see the lane until it was on top of them, so surviving read as luck. Drawing
// the ring with the same gap turns it into something you can read and run for.
class RingEffect extends Effect {
    constructor(x, y, opts = {}) {
        super(x, y, opts.life ?? 0.6, opts.layer ?? 'air');
        this.fromRadius = opts.fromRadius ?? 0;
        this.toRadius = opts.toRadius ?? 200;
        this.color = opts.color ?? '#ffffff';
        this.width = opts.width ?? 6;
        this.endWidth = opts.endWidth ?? 1;
        // Gap expressed in radians, matching how the projectile ring is built.
        this.gapStart = opts.gapStart ?? null;
        this.gapSize = opts.gapSize ?? 0;
        this.ease = opts.ease !== false;
        this.fade = opts.fade ?? 1;
    }

    draw(ctx) {
        const t = this.t;
        const p = this.ease ? easeOut(t) : t;
        const radius = this.fromRadius + (this.toRadius - this.fromRadius) * p;
        if (radius <= 0) return;

        const alpha = Math.max(0, (1 - t) * this.fade);
        if (alpha <= 0.01) return;

        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.width + (this.endWidth - this.width) * t;
        ctx.lineCap = 'round';

        ctx.beginPath();
        if (this.gapStart === null || this.gapSize <= 0) {
            ctx.arc(this.x, this.y, radius, 0, Math.PI * 2);
        } else {
            // Draw the complement of the gap: start where the gap ends and
            // sweep the rest of the way round.
            ctx.arc(this.x, this.y, radius,
                    this.gapStart + this.gapSize,
                    this.gapStart + Math.PI * 2);
        }
        ctx.stroke();
        ctx.restore();
    }
}

// A telegraph painted on the floor. Holds its size, pulses, and brightens as it
// runs out — so the pulse rate itself communicates "now".
class DecalEffect extends Effect {
    constructor(x, y, opts = {}) {
        super(x, y, opts.life ?? 0.8, 'ground');
        this.radius = opts.radius ?? 120;
        this.color = opts.color ?? '#ff8f3c';
        this.gapStart = opts.gapStart ?? null;
        this.gapSize = opts.gapSize ?? 0;
        this.fillAlpha = opts.fillAlpha ?? 0.14;
        this.follow = opts.follow ?? null;   // optional entity to track
    }

    update(deltaTime) {
        super.update(deltaTime);
        if (this.follow && this.follow.health > 0) {
            this.x = this.follow.x;
            this.y = this.follow.y;
        }
    }

    draw(ctx) {
        const t = this.t;
        // Pulse accelerates toward the strike: 3 blinks stretched by easing.
        const pulse = 0.55 + 0.45 * Math.abs(Math.sin(t * Math.PI * 3));
        const alpha = pulse * (0.35 + 0.65 * t);

        ctx.save();
        ctx.globalAlpha = alpha * this.fillAlpha / 0.14 * 0.14;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();

        ctx.globalAlpha = alpha;
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 3;
        ctx.beginPath();
        if (this.gapStart === null || this.gapSize <= 0) {
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        } else {
            ctx.arc(this.x, this.y, this.radius,
                    this.gapStart + this.gapSize,
                    this.gapStart + Math.PI * 2);
        }
        ctx.stroke();

        // A short spoke on each side of the gap, so the safe lane reads as a
        // doorway rather than as a piece of missing line.
        if (this.gapStart !== null && this.gapSize > 0) {
            ctx.globalAlpha = alpha * 0.8;
            ctx.lineWidth = 2;
            for (const a of [this.gapStart, this.gapStart + this.gapSize]) {
                ctx.beginPath();
                ctx.moveTo(this.x + Math.cos(a) * (this.radius - 18),
                           this.y + Math.sin(a) * (this.radius - 18));
                ctx.lineTo(this.x + Math.cos(a) * (this.radius + 18),
                           this.y + Math.sin(a) * (this.radius + 18));
                ctx.stroke();
            }
        }
        ctx.restore();
    }
}

// A soft radial bloom. Marks the instant of an impact — very short, additive,
// gone before the player consciously registers it, which is exactly the point.
class FlashEffect extends Effect {
    constructor(x, y, opts = {}) {
        super(x, y, opts.life ?? 0.22, opts.layer ?? 'air');
        this.radius = opts.radius ?? 90;
        this.color = opts.color ?? '#ffd9a0';
    }

    draw(ctx) {
        const t = this.t;
        const r = this.radius * (0.6 + 0.4 * easeOut(t));
        const alpha = (1 - t) * 0.9;
        if (alpha <= 0.01 || r <= 0) return;

        ctx.save();
        ctx.globalCompositeOperation = 'lighter';
        ctx.globalAlpha = alpha;
        const g = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, r);
        g.addColorStop(0, this.color);
        g.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(this.x, this.y, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

// A chunk with gravity and spin. Heavier and longer-lived than a Particle, so
// a slam throws real debris instead of the same puff every other death uses.
class DebrisEffect extends Effect {
    constructor(x, y, opts = {}) {
        super(x, y, opts.life ?? 0.9, 'air');
        const angle = opts.angle ?? Math.random() * Math.PI * 2;
        const speed = opts.speed ?? (120 + Math.random() * 180);
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        // The view is top-down, so this is not really gravity — it is a slight
        // downward bias that sells weight without the chunks appearing to fall
        // off a ledge. Kept low for that reason.
        this.gravity = opts.gravity ?? 240;
        this.size = opts.size ?? (3 + Math.random() * 5);
        this.color = opts.color ?? '#8a7f74';
        this.rot = Math.random() * Math.PI;
        this.spin = (Math.random() - 0.5) * 12;
    }

    update(deltaTime) {
        super.update(deltaTime);
        this.x += this.vx * deltaTime;
        this.y += this.vy * deltaTime;
        this.vy += this.gravity * deltaTime;
        // Drag, so debris settles where it lands instead of sliding forever.
        this.vx *= 0.94;
        this.vy *= 0.97;
        this.rot += this.spin * deltaTime;
    }

    draw(ctx) {
        const alpha = 1 - this.t;
        if (alpha <= 0.02) return;
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rot);
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
        ctx.restore();
    }
}

// Owns every live effect and enforces a budget, exactly like the particle cap.
// Effects are cheap individually but a boss enrage can queue a lot at once.
// A jagged bolt between two points. Chain lightning was previously drawn — when
// it was drawn at all — as the same round particles as everything else, so the
// Lightning Staff's defining behaviour looked identical to a sword hit. A bolt
// is a line with intent: it says which enemy struck which, and it fades fast
// enough not to clutter a crowded field.
class BoltEffect extends Effect {
    constructor(x, y, opts = {}) {
        super(x, y, opts.life ?? 0.22, opts.layer ?? 'air');
        this.toX = opts.toX ?? x;
        this.toY = opts.toY ?? y;
        this.color = opts.color ?? '#74c0fc';
        this.width = opts.width ?? 3;

        // The jag is baked once at birth. Re-rolling it per frame makes the
        // bolt strobe rather than hang in the air for its brief life.
        const dx = this.toX - x;
        const dy = this.toY - y;
        const len = Math.hypot(dx, dy) || 1;
        const nx = -dy / len;
        const ny = dx / len;
        const segments = 5;
        this.points = [];
        for (let i = 0; i <= segments; i++) {
            const t = i / segments;
            const spread = (i === 0 || i === segments) ? 0 : (Math.random() - 0.5) * len * 0.14;
            this.points.push({
                x: x + dx * t + nx * spread,
                y: y + dy * t + ny * spread
            });
        }
    }

    draw(ctx) {
        const alpha = 1 - this.t;
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.width * (1 - this.t * 0.5);
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.moveTo(this.points[0].x, this.points[0].y);
        for (let i = 1; i < this.points.length; i++) {
            ctx.lineTo(this.points[i].x, this.points[i].y);
        }
        ctx.stroke();
        ctx.restore();
    }
}

class EffectLayer {
    constructor(game) {
        this.game = game;
        this.effects = [];
    }

    get cap() {
        return this.game.performanceMode ? 40 : 160;
    }

    add(effect) {
        if (!effect) return null;
        if (this.effects.length >= this.cap) return null;
        this.effects.push(effect);
        return effect;
    }

    clear() { this.effects.length = 0; }

    update(deltaTime) {
        // Swap-remove, matching how particles are culled elsewhere.
        let write = 0;
        for (let i = 0; i < this.effects.length; i++) {
            const e = this.effects[i];
            e.update(deltaTime);
            if (!e.dead) this.effects[write++] = e;
        }
        this.effects.length = write;
    }

    draw(ctx, layer) {
        for (let i = 0; i < this.effects.length; i++) {
            if (this.effects[i].layer === layer) this.effects[i].draw(ctx);
        }
    }
}
