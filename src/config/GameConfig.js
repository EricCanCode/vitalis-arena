// GameConfig.js — central tuning values for Vitalis Arena.
//
// SCOPE NOTE: the arena is a screen-space scene. Its playfield is the canvas,
// which is sized responsively at runtime (see Game.resizeCanvas). The REFERENCE
// resolution below is NOT a render target — it is the resolution the balance
// numbers were tuned against, used to keep content density consistent across
// screen sizes. World-space/camera work belongs in a separate scene layer.

const GAME_CONFIG = {
    // Reference resolution the balance below was tuned at (16:9)
    REFERENCE_WIDTH: 1920,
    REFERENCE_HEIGHT: 1080,

    // Source size of character/monster sprite art
    SPRITE_SOURCE_SIZE: 182,

    // Local co-op is built and playable but held back from release: the
    // semantics still need work (shared level-ups, one camera for two players,
    // revive timing, the second player's HUD). Hidden rather than deleted, so
    // turning it back on is one flag and not an archaeology exercise.
    coopEnabled: false,

    progression: {
        // A run that never ends has no victory to chase and nothing to tell a
        // friend about. Clearing this many stages wins the campaign; Endless is
        // what you unlock by doing it.
        finalStage: 6,
        endlessUnlockKey: 'vitalisArenaEndlessUnlocked'
    },

    world: {
        // The playfield, in world units. Larger than the viewport means the
        // camera scrolls; setting scroll:false pins the world to the viewport
        // and reproduces the original fixed single-screen arena exactly.
        scroll: true,
        width: 3456,            // 1.8x the reference width
        height: 1944,           // 1.8x the reference height

        // Higher = the camera catches up to the player faster.
        cameraSmoothing: 6,

        // Co-op runs one camera for two players. Past this separation a soft
        // leash pulls them back together so neither is ever left off-screen.
        coopMaxSeparation: 820,

        // How far off-screen an enemy may drift before it is recycled. Without
        // this, stragglers left behind by a moving player fill the enemy cap
        // and starve spawning near the action.
        despawnDistance: 2600,

        // Visual boundary so the player can see where the world ends.
        edgeThickness: 10
    },

    player: {
        // Collision radius is deliberately far smaller than the sprite so the
        // game reads as fair — the art overhangs the hitbox.
        radius: 20,
        iframeDuration: 2.0,

        // Hard ceiling on damage reduction.
        //
        // Armor is applied as `amount * (1 - armor)` and stacked additively
        // from the class base plus four gear slots with no limit. Measured
        // ceiling: 231 armor points from gear alone is a fraction of 2.31, and
        // the tank adds 0.45 on top. At 1.0 the player is untouchable; past it
        // the subtraction flips sign and being hit HEALS you. Even an ordinary
        // late-run loadout sat at 0.65, which is why bosses felt harmless.
        //
        // Clamped when damage is applied rather than when armor accumulates,
        // so unequipping still subtracts exactly what equipping added.
        maxArmor: 0.6,
        ultimateMax: 100,
        baseXPToLevel: 10,
        xpCurveMultiplier: 1.5,
        basePickupRange: 150
    },

    enemy: {
        // Health/speed drift upward the longer a run lasts.
        healthGrowthPerMinute: 0.18,
        speedGrowthPerMinute: 0.06,
        speedGrowthPerPlayerLevel: 0.05,
        maxSpeedMultiplier: 2.2,
        // Chance a slain enemy leaves coins, and how many.
        coinDropChance: 0.08,
        coinDropAmount: { min: 1, max: 4 },
        eliteCoinBonus: 6,
        knockbackOnHit: 60
    },

    ultimate: {
        max: 100,
        // A hard floor between activations. Charge alone cannot gate the
        // ultimate: it is earned per kill, and kill rate scales with build
        // power, so strong builds were firing one every few seconds.
        minCooldown: 25,
        // Fraction of the cooldown already elapsed when a run starts, so the
        // first ultimate is not held back for the full duration.
        startCooldownProgress: 0.6
    },

    pickups: {
        // Health drops ONLY when someone is actually hurt. Without that gate,
        // healing income scales with kill rate — which itself scales with
        // difficulty — so the two cancel out and the run never gets harder.
        healthDropChance: 0.10,

        // Health drops are throttled hard during a boss fight.
        //
        // Measured on a geared player standing perfectly still against the
        // Emberlord: 1,038 damage taken and 732 health received back — pickups
        // were cancelling 70% of everything the boss did. The Emberlord
        // summons adds, the adds die, the adds drop health, and the fight
        // becomes a sustain race the player cannot lose by standing still.
        //
        // A boss is meant to be the fight you have to play well. Healing
        // during one should be a rare relief, not an income stream.
        bossFightDropScale: 0.15,
        healthDropThreshold: 0.75,   // only drops below this fraction of max HP
        // Healed amount is a fraction of max HP, so it stays meaningful as
        // builds grow instead of becoming rounding error.
        healthDropPercent: 0.12,
        tankHealthDropPercent: 0.18,
        eliteHealthDropPercent: 0.22,
        bossHealthDropPercent: 0.35,
        minHealthDrop: 8
    },

    spawn: {
        // Hard ceilings so a long run degrades gracefully instead of crashing.
        maxEnemiesDesktop: 90,
        maxEnemiesMobile: 8,
        // Enemies appear this far outside the visible edge.
        offscreenMargin: 50,
        // Never spawn closer than this to a player.
        minDistanceFromPlayer: 260,
        bossIntervalSeconds: 90
    },

    boss: {
        // Boss HP rode entirely on the shared enemy time-multiplier
        // (1 + healthGrowthPerMinute * minutes). At the stage-1 boss that is
        // only ~1.27x, because the boss arrives 90 seconds into the run.
        //
        // Player damage over the same stretch does not grow with time, it grows
        // with LEVEL, and the level curve is steepest at the start: the player
        // meets the first boss around level 10, already several weapon upgrades
        // deep. Measured against the real game, the stage-1 Warden (635 HP) died
        // in 2.3s on a good upgrade roll — it read as a cutscene, not a fight.
        //
        // So the correction has to be front-loaded and then get out of the way:
        // stage 1 needs roughly 3x, and by stage 3 the time multiplier has
        // caught up on its own and needs almost nothing. firstStageBonus is the
        // extra multiplier at stage 1; decay is how fast it falls off per stage.
        //
        //   stage 1: 3.00x   stage 2: 1.40x   stage 3: 1.08x   stage 4+: ~1.0x
        //
        // These are a starting point sized from one instrumented run, not a
        // tuned curve. They want playtesting.
        // Back to 2.0 now that phases carry the length. It was raised to 2.6
        // when the fight was a single bar; leaving it there on top of a
        // three-phase fight compounds to more than twice the health the fight
        // had two changes ago, which is a slog rather than a climax.
        firstStageBonus: 2.0,
        decay: 0.2,

        // No single hit may remove more than this fraction of a boss's health.
        //
        // Measured on a real stage-1 fight: the bomb weapon deals a flat 999
        // ("instant kill") to EVERY enemy in the world with no radius and no
        // falloff, which scales to ~1240 by the time it lands. Against a 1905
        // HP Warden that is 65% of the fight gone in one frame — one hit did
        // more than the other 36 hits of that fight combined.
        //
        // Capping per hit fixes the whole class of problem — the bomb, the
        // class ultimates, any burst weapon added later — without touching
        // sustained damage, which is what a boss fight should be made of. The
        // bomb still clears the screen of trash, and still takes a real bite
        // out of a boss; it just cannot end the fight on its own.
        // Per-hit damage curve, as fractions of ONE phase bar.
        //
        // A flat cap was a wall. Measured on a damage-stacking build: 49% of
        // every hit was clipped and 4,665 damage was thrown away against 827
        // that landed — the cap ate 85% of what the build produced, and going
        // from 40 to 207 damage a hit moved the applied figure from 24 to 64
        // and then stopped paying anything at all.
        //
        // So the ceiling is now a curve, not a wall. Below softHitFraction
        // nothing is touched. Above it, the excess still counts but with
        // sharply diminishing returns, approaching hardHitFraction and never
        // reaching it — so investment always buys something, and nothing can
        // delete a phase in one hit. hitSoftness sets how fast the returns
        // fall off, in multiples of the soft cap.
        softHitFraction: 0.08,
        hardHitFraction: 0.20,
        hitSoftness: 2.5,

        // Bosses shrug off a share of everything. This does the same job as
        // more health but without inflating the number on the bar — a boss
        // that visibly resists reads better than one with a bigger bar.
        // Bosses absorb half of everything. Raised from 0.6 after repeated
        // play feedback that fights still ended too fast — my harness could
        // not reproduce a real, well-built Mage, so this follows the play
        // rather than the measurement.
        damageTakenScale: 0.5,

        // Boss contact and projectile damage. The base of 25 was set before
        // armor stacking was capped and lands as single figures against any
        // geared player; i-frames then gate it to one hit per 2 seconds, so
        // the boss's entire threat is this number divided by two.
        damageScale: 2.5,

        // Second-cycle bosses.
        //
        // getBossForStage is (stage - 1) % 3, so stages 4-6 are the same three
        // archetypes again. Only the shared time multiplier separated them,
        // which meant the stage-4 Warden looked, sounded and was named exactly
        // like the stage-1 one — the player had no way to know they had earned
        // a harder version rather than repeated an easier one.
        //
        // Everything here is per completed cycle, so an Endless run at stage
        // 7-9 escalates again on the same rules.
        ascended: {
            healthScale: 1.4,
            damageScale: 1.25,
            // An attack every archetype gains on top of its own pattern, so
            // the rematch is not just bigger numbers. Fires regardless of
            // phase — being an Ascendant IS the difference.
            burstCooldown: 3.4,
            burstCount: 9,
            burstSpeed: 195,
            // Reads as "not the one you fought before" at a glance.
            auraColor: '177, 151, 252',
            epithet: 'Returned, and no longer holding back'
        },

        // Telegraphed specials.
        //
        // The Colossus already had one — a decal marking the safe lane, a
        // windup, then a gapped shockwave you run through. That is the shape
        // worth having on all three: an attack you can see coming, plan around,
        // and be punished for ignoring. The other two had nothing you could
        // read, so their fights were about damage races rather than decisions.
        //
        // Cooldown is per phase, so the pressure tightens as the fight escalates.
        special: {
            cooldown: [9.5, 7.5, 6.0],
            // How long the tell is up before the attack lands. Long enough to
            // cross the arena, which is what makes it a decision.
            telegraph: 1.25,

            // A special hits for this multiple of the boss's ordinary damage.
            // Ignoring a tell you were given more than a second to read should
            // cost far more than being brushed by the boss walking into you,
            // otherwise there is no reason to respect it.
            damageMultiplier: 3.0
        },

        // The Warden specifically. It is the stage-1 boss — the first one
        // anybody meets — and it had no attack at all outside its final phase,
        // which made it a slow object rather than a fight. These scale its
        // radial burst per phase; index 0 is phase one.
        warden: {
            burstCooldownScale: [1.9, 1.35, 1.0],
            burstCountScale:    [0.7, 0.9, 1.15],
            burstSpeed: 210
        },

        // Boss phases.
        //
        // One long bar has no shape: it drains at a constant rate and the only
        // event in the whole fight is the end of it. Three bars escalate — each
        // one is a checkpoint the player has visibly earned, and the boss that
        // killed them was demonstrably harder than the one they started on.
        //
        // healthScale is per phase, not per fight: at 0.60 across 3 phases the
        // whole fight carries 1.8x the health a single bar did, so it is
        // longer, but nowhere near three times longer.
        phases: {
            count: 3,
            // 3 x 0.60 = 1.8x the health the old single bar carried, and with
            // damageTakenScale 0.5 on top a boss is roughly 3.6x as durable as
            // the pre-phase version. Deliberately generous: a boss fight is
            // supposed to be the thing the stage was building toward, and the
            // escalation between bars only lands if there is time to feel it.
            // Back from 0.60. The problem was never that bosses died too
            // fast — it was that they could not threaten, so every fight was
            // decided by attrition. With healing throttled and specials
            // hitting for 3x, the danger is real, and a fight that lasts
            // minutes is a slog rather than a climax.
            healthScale: 0.42,

            // Index 0 is phase one. The last phase also flips the boss into
            // its `enraged` behaviour, which every archetype already defines —
            // radial bursts for the Warden, faster summons for the Emberlord.
            // That is the extra attack, and it costs no new combat code.
            speed: [1.0, 1.25, 1.5],
            damage: [1.0, 1.35, 1.75],

            // The boss is untouchable while the bar refills, so a burst that
            // overkills one phase cannot spill into the next and skip it.
            breakSeconds: 1.4,

            // Fraction of the boss's XP paid out at each phase break, so
            // clearing a bar is a reward and not just a milestone.
            phaseXpFraction: 0.2
        }
    },

    weapons: {
        // Special weapons run levels 1-8; every 2 levels promotes a tier
        // (Common -> Rare -> Epic -> Legendary). Level 8 unlocks evolution.
        maxLevel: 8,
        levelsPerTier: 2,
        // Per-level scaling applied on top of the tier multiplier.
        damagePerLevel: 0.12,
        cooldownReductionPerLevel: 0.03
    },

    xp: {
        // Gem tiers: value -> visual identity.
        gems: [
            { threshold: 0,  value: 1,  color: '#4a90e2', glow: 'rgba(74,144,226,',  radius: 7 },
            { threshold: 8,  value: 5,  color: '#51cf66', glow: 'rgba(81,207,102,',  radius: 9 },
            { threshold: 20, value: 10, color: '#ff6b6b', glow: 'rgba(255,107,107,', radius: 11 }
        ]
    },

    // Mid-stage events. Between bosses the run was a flat trickle of enemies
    // at a rate that only drifted upward, so the stretch before a boss felt the
    // same at the end as at the start. The director punctuates it: on an
    // interval it picks one event, announces it, and runs it.
    //
    // Timings are set against the real stage shape, not a guess: a stage runs
    // stageTimeLimit (90s), the boss warning starts at 80s, and the lockout
    // below closes the door at 78s. That leaves one usable window, and these
    // numbers put two events in it with room to breathe on either side.
    events: {
        // The stage card has just played. Let the stage open on its own terms
        // before the director starts interrupting.
        firstDelay: 26,
        interval: 27,
        // +/- this many seconds, so the beat never becomes a metronome the
        // player can set their watch by.
        jitter: 5,

        // Events are suppressed near a boss — the pre-boss warning is its own
        // build-up and must not be competing with a treasure timer.
        bossWarningLockout: 12,

        pack: {
            count: 5,
            countMobile: 3,
            // Elites spawn as a ring on one side rather than scattered, so the
            // pack reads as a formation that arrived, not as a spawn spike.
            formationRadius: 130,
            healthScale: 1.35
        },

        surge: {
            // The tell. Long enough to cross the arena away from the edge.
            telegraph: 1.8,
            count: 26,
            countMobile: 12,
            // Spread along the incoming edge, in world units.
            spread: 900
        },

        cache: {
            // How long the chest waits before it gives up and vanishes. Tuned
            // so crossing the arena is possible but not casual.
            lifetime: 12,
            // Never spawn it in the player's lap; the point is the commute.
            minDistance: 620
        }
    },

    juice: {
        // Longest the simulation may ever be frozen for. Hit-stop is felt,
        // not seen — past ~120ms it stops reading as impact and starts
        // reading as a dropped frame.
        maxHitStop: 0.12,
        // How long before the boss arrives the warning appears. The countdown
        // now means what it says: it reaches zero as the boss lands.
        bossWarningSeconds: 10,

        // Silence before the boss arrives. Runs inside the warning countdown,
        // not after it.
        bossLullSeconds: 3.0,
        // Length of the entrance card, in real seconds. Long enough to land as
        // a reveal rather than a transition — the player should have time to
        // read the name and look at the thing before it starts moving.
        bossEntranceSeconds: 3.2,

        // How far the camera pushes in on the boss during the entrance. It
        // eases in over the first third, HOLDS at full while the card is up,
        // then releases — a hold is what makes it read as a reveal, where a
        // symmetric in-and-out (which is right for the ultimate) reads as a
        // flourish and passes before it registers.
        bossEntranceZoom: 1.38,
        bossEntranceZoomIn: 0.34,
        bossEntranceZoomOut: 0.22,
        // How slowly the world runs during it. Low enough to read as
        // deliberate, high enough that the boss visibly moves.
        bossEntranceTimeScale: 0.35,
        // Spawn-free hold between stages.
        stageIntroSeconds: 2.2,

        // Ultimate camera punch. The boss entrance reads as a "zoom" because
        // it locks the camera and slows time; this is the same idea aimed at
        // the player, plus an actual scale change so the screen closes in.
        ultimateZoom: 1.22,
        ultimateFocusSeconds: 0.7,
        ultimateTimeScale: 0.45,
        maxParticlesDesktop: 400,
        maxParticlesMobile: 60,
        maxDamageNumbers: 40,
        lowHealthThreshold: 0.25,
        shake: { playerHit: 6, bossDeath: 22, chestOpen: 12, evolution: 18 }
    }
};
