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
