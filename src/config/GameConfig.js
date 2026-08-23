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
        firstStageBonus: 2.0,
        decay: 0.2
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
        // Silence held between the warning ending and the boss arriving.
        bossLullSeconds: 3.0,
        // Length of the entrance card, in real seconds.
        bossEntranceSeconds: 2.0,
        // How slowly the world runs during it. Low enough to read as
        // deliberate, high enough that the boss visibly moves.
        bossEntranceTimeScale: 0.35,
        // Spawn-free hold between stages.
        stageIntroSeconds: 2.2,
        maxParticlesDesktop: 400,
        maxParticlesMobile: 60,
        maxDamageNumbers: 40,
        lowHealthThreshold: 0.25,
        shake: { playerHit: 6, bossDeath: 22, chestOpen: 12, evolution: 18 }
    }
};
