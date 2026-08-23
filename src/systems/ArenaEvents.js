// ArenaEvents.js — the mid-stage event director.
//
// A stage runs 90 seconds, and until now those 90 seconds were a single
// unbroken trickle whose only variable was rate. The boss at the end and the
// stage card at the seam are both events; everything between them was texture.
// That is the stretch the player spends most of their time in.
//
// The director punctuates it. On an interval it picks one event, announces it,
// and runs it. Each event asks a different question:
//
//   pack   — "can you handle a wall of them arriving at once, together?"
//   surge  — "can you read a tell and be somewhere else in time?"
//   cache  — "is the reward worth leaving the spot you are safe in?"
//
// The last one matters most. Kiting in a wide circle is the dominant strategy
// in every game of this shape, and the only reliable counter to a dominant
// strategy is to make standing still cost something.
//
// The director owns no combat rules. It spawns enemies and chests through the
// game's own methods, so anything it creates behaves exactly like the same
// thing created any other way.

const ARENA_EVENTS = ['pack', 'surge', 'cache'];

class ArenaEventDirector {
    constructor(game) {
        this.game = game;
        this.reset();
    }

    reset() {
        const cfg = this.cfg;
        this.timer = cfg.firstDelay;
        this.active = null;         // the running event, if it has a duration
        this.surge = null;          // telegraph state for an incoming surge
        this.lastPick = null;       // avoid repeating an event back to back
        this.fired = 0;
    }

    get cfg() { return GAME_CONFIG.events; }

    // The director stays quiet whenever the game is already saying something.
    // Two announcements landing at once cancel each other out.
    get suppressed() {
        const g = this.game;
        if (g.bossActive || g.bossLull > 0 || g.bossEntrance > 0 || g.stageIntro > 0) return true;
        // The boss warning is its own build-up; do not compete with it.
        if (g.bossWarning) return true;
        const untilBoss = (g.stageStartTime + g.stageTimeLimit) - g.gameTime;
        if (untilBoss <= this.cfg.bossWarningLockout) return true;
        return false;
    }

    update(deltaTime) {
        // A telegraphed surge must land even if a boss warning starts during
        // its tell — the player has already been told to move.
        if (this.surge) {
            this.surge.timer -= deltaTime;
            if (this.surge.timer <= 0) {
                this.releaseSurge(this.surge);
                this.surge = null;
            }
        }

        if (this.suppressed) return;

        this.timer -= deltaTime;
        if (this.timer > 0) return;

        this.fire();
        const c = this.cfg;
        this.timer = c.interval + (Math.random() * 2 - 1) * c.jitter;
    }

    fire() {
        // Never the same event twice running. With three events that is enough
        // to keep the sequence from clumping without needing a real shuffle bag.
        let choices = ARENA_EVENTS.filter(e => e !== this.lastPick);
        const pick = choices[Math.floor(Math.random() * choices.length)];
        this.lastPick = pick;
        this.fired++;

        if (pick === 'pack') this.startPack();
        else if (pick === 'surge') this.startSurge();
        else this.startCache();
    }

    // ---- Elite pack -------------------------------------------------------
    // Elites already existed as a type that trickled in one at a time on a long
    // cooldown, which made them a slightly bigger enemy rather than a moment.
    // Arriving five at once, named, in formation, is a different thing.

    startPack() {
        const g = this.game;
        const c = this.cfg.pack;
        const count = g.performanceMode ? c.countMobile : c.count;

        const origin = g.pickSpawnPoint();
        if (!origin) return;

        const spawned = [];
        // Shared across the pack so no two members end up with the same name.
        const taken = new Set();
        for (let i = 0; i < count; i++) {
            const a = (i / count) * Math.PI * 2;
            const p = g.clampToWorld(
                origin.x + Math.cos(a) * c.formationRadius,
                origin.y + Math.sin(a) * c.formationRadius,
                60
            );
            const e = new Enemy(p.x, p.y, 'elite', g.waveMultiplier * c.healthScale, g);
            promoteToElite(e, taken);
            g.enemies.push(e);
            spawned.push(e);

            // Each one arrives on its own ring, so the formation reads as
            // several things landing rather than one effect playing.
            g.effects.add(new RingEffect(p.x, p.y, {
                fromRadius: 90, toRadius: 0, life: 0.5,
                color: ELITE_MARK_COLOR, width: 3, endWidth: 6, ease: false
            }));
        }

        // The announcement names one of them, so it points at something the
        // player can actually pick out of the crowd rather than at an abstract
        // "a pack arrived". Any member will do — they are identical in stats;
        // the name is the handle, not a claim about which one is strongest.
        const leader = spawned[0];
        g.announceEvent('⚔️ THE PACK', leader ? `${leader.eliteName} leads them.` : 'They came together.');
        g.audioManager.playSound('boss-warning');
    }

    // ---- Swarm surge ------------------------------------------------------
    // The only event with a tell, because it is the only one the player can be
    // in the wrong place for. A wall arrives from one edge; the tell says which.

    startSurge() {
        const g = this.game;
        const c = this.cfg.surge;
        const side = Math.floor(Math.random() * 4);
        const view = g.camera.getBounds();

        // Where the wall will cross, in world space — the middle of the edge it
        // comes from, at the player's own offset along that edge.
        const focus = g.getCameraFocus();
        const horizontal = (side === 0 || side === 2);
        const at = horizontal ? focus.x : focus.y;

        this.surge = { timer: c.telegraph, side, at };

        // The tell is a bar laid along the threatened edge, on the ground layer
        // so it reads as a place rather than as an object in the air.
        const margin = 40;
        const bx = horizontal ? at : (side === 1 ? view.right - margin : view.left + margin);
        const by = horizontal ? (side === 0 ? view.top + margin : view.bottom - margin) : at;
        g.effects.add(new DecalEffect(bx, by, {
            radius: 70, life: c.telegraph, color: '#ff6b6b', fillAlpha: 0.1
        }));

        g.announceEvent('🌊 THE TIDE', 'Something is coming. Not from where you are looking.');
        g.audioManager.playSound('boss-warning');
    }

    releaseSurge(surge) {
        const g = this.game;
        const c = this.cfg.surge;
        const count = g.performanceMode ? c.countMobile : c.count;
        const view = g.camera.getBounds();
        const m = GAME_CONFIG.spawn.offscreenMargin;
        const horizontal = (surge.side === 0 || surge.side === 2);

        for (let i = 0; i < count; i++) {
            // Spread along the edge, centred on where the tell was drawn.
            const along = surge.at + (Math.random() - 0.5) * c.spread;
            // Stagger depth so they arrive as a wave with a front and a back,
            // not as a single line that hits all at once.
            const depth = m + Math.random() * 260;

            let x, y;
            if (horizontal) {
                x = along;
                y = surge.side === 0 ? view.top - depth : view.bottom + depth;
            } else {
                x = surge.side === 1 ? view.right + depth : view.left - depth;
                y = along;
            }
            const p = g.clampToWorld(x, y, 20);

            // Fast and fragile. The surge is a positioning problem, not a
            // damage problem — it should be survivable by moving and lethal by
            // standing still.
            const type = Math.random() < 0.75 ? 'fast' : 'crawler';
            g.enemies.push(new Enemy(p.x, p.y, type, g.waveMultiplier, g));
        }
    }

    // ---- Treasure cache ---------------------------------------------------
    // A chest with a clock on it, placed deliberately far away. Every other
    // chest in the game is a reward for something you already did; this one is
    // a decision you have to make while enemies are still arriving.

    startCache() {
        const g = this.game;
        const c = this.cfg.cache;
        const focus = g.getCameraFocus();

        // Sample a few candidates and take the furthest that is still inside
        // the world, so the chest is a commute rather than a step.
        let best = null, bestD = -1;
        for (let i = 0; i < 12; i++) {
            const a = Math.random() * Math.PI * 2;
            const dist = c.minDistance + Math.random() * 380;
            const p = g.clampToWorld(focus.x + Math.cos(a) * dist, focus.y + Math.sin(a) * dist, 80);
            const d = Math.hypot(p.x - focus.x, p.y - focus.y);
            if (d > bestD) { bestD = d; best = p; }
        }
        if (!best) return;

        const chest = new Chest(best.x, best.y, 'boss');
        chest.expires = c.lifetime;
        chest.maxExpires = c.lifetime;
        g.chests.push(chest);

        g.effects.add(new RingEffect(best.x, best.y, {
            fromRadius: 260, toRadius: 40, life: 0.7,
            color: '#ffd43b', width: 2, endWidth: 6, ease: false
        }));

        g.announceEvent('🎁 THE CACHE', 'It will not wait for you.');
        g.audioManager.playSound('pickup-equipment');
    }
}

// Turn an ordinary enemy into a named elite. Kept as a free function rather
// than an Enemy subclass because promotion happens after construction — the
// enemy is already a valid enemy, this only adds identity and weight.
function promoteToElite(enemy, taken) {
    const id = rollEliteName(taken);
    enemy.isElite = true;
    enemy.eliteName = id.name;
    enemy.eliteTitle = id.title;
    enemy.eliteFullName = id.full;
    // Elites are always worth the detour to kill.
    enemy.chestChance = Math.max(enemy.chestChance, 0.5);
    return enemy;
}
