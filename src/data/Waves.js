// Waves.js — enemy definitions and the time-based wave director.
//
// The wave director decides WHICH enemies spawn and HOW FAST, based on how long
// the run has lasted. The stage/boss system is separate and runs alongside it.

// Base stats per enemy type. `radius` is the collision circle; `drawScale`
// enlarges the sprite without enlarging the hitbox, so encounters stay fair.
const ENEMY_TYPES = {
    basic: {
        label: 'Grunt',
        behavior: 'chase', sprite: 'enemy_basic', equipChance: 0.004,
        radius: 15, drawScale: 1.0,
        speed: 60, maxHealth: 20, damage: 5, xpValue: 5,
        color: '#e03131', ultCharge: 3
    },
    fast: {
        label: 'Stalker',
        behavior: 'chase', sprite: 'enemy_fast', equipChance: 0.004,
        radius: 12, drawScale: 0.95,
        speed: 110, maxHealth: 15, damage: 8, xpValue: 8,
        color: '#fd7e14', ultCharge: 5
    },
    crawler: {
        label: 'Crawler',
        behavior: 'chase', sprite: 'enemy_crawler', equipChance: 0.006,
        // Deliberately small hitbox — reads as slippery rather than unfair.
        radius: 11, drawScale: 0.9,
        speed: 85, maxHealth: 32, damage: 7, xpValue: 10,
        color: '#9c36b5', ultCharge: 5
    },
    tank: {
        label: 'Brute',
        behavior: 'chase', sprite: 'enemy_tank', equipChance: 0.03,
        radius: 25, drawScale: 1.1,
        speed: 40, maxHealth: 60, damage: 15, xpValue: 15,
        color: '#c92a2a', ultCharge: 9
    },
    elite: {
        label: 'Elite',
        behavior: 'chase', sprite: 'enemy_elite', equipChance: 0.25,
        radius: 32, drawScale: 1.25,
        speed: 55, maxHealth: 180, damage: 20, xpValue: 45,
        color: '#f59f00', ultCharge: 15,
        // Elites are the reliable source of chests outside boss fights.
        chestChance: 0.35
    },
    // --- Behavioural enemies -------------------------------------------
    // These exist to break the dominant strategy of walking in a wide circle
    // forever. Each punishes a different lazy habit.

    spitter: {
        label: 'Spitter',
        // Holds its distance and shoots, so simply outrunning the pack stops
        // being a free answer.
        behavior: 'ranged', sprite: 'enemy_spitter', equipChance: 0.008,
        radius: 14, drawScale: 1.0,
        speed: 58, maxHealth: 26, damage: 6, xpValue: 12,
        color: '#9c36b5', ultCharge: 7,
        preferredRange: 330,      // sits here and fires
        retreatRange: 190,        // backs off if you close in
        fireCooldown: 2.4,
        projectileSpeed: 260,
        projectileDamage: 7
    },

    charger: {
        label: 'Charger',
        // Telegraphs, then commits to a straight line. Rewards dodging
        // sideways; running directly away does not work.
        behavior: 'charger', sprite: 'enemy_charger', equipChance: 0.015,
        radius: 18, drawScale: 1.05,
        speed: 50, maxHealth: 42, damage: 14, xpValue: 14,
        color: '#e8590c', ultCharge: 10,
        chargeRange: 430,
        windupTime: 0.65,         // long enough to read and react to
        dashSpeed: 620,
        // The dash runs THROUGH the locked position and out the far side, so
        // its duration is derived from the distance at lock time rather than
        // being fixed. It used to be a flat 0.42s = 260px of travel, while the
        // charge could start from anywhere inside chargeRange (430px) — so
        // from range it stopped 170px short of the target it had just spent
        // 0.65s telegraphing at, and standing still was safe.
        chargeOvershoot: 170,     // px past the locked point
        maxDashTime: 1.15,        // ceiling, so a long lock cannot dash forever
        rechargeTime: 2.6
    },

    bomber: {
        label: 'Bomber',
        // Fast and fragile. Punishes letting a crowd pile up behind you, and
        // punishes killing it at point-blank range too.
        behavior: 'exploder', sprite: 'enemy_bomber', equipChance: 0.008,
        radius: 15, drawScale: 1.0,
        speed: 128, maxHealth: 18, damage: 5, xpValue: 13,
        color: '#f08c00', ultCharge: 9,
        fuseRange: 78,
        fuseTime: 0.7,
        blastRadius: 118,
        blastDamage: 24
    },

    splitter: {
        label: 'Splitter',
        // Killing it is not free — area damage suddenly has a purpose.
        behavior: 'chase', sprite: 'enemy_splitter', equipChance: 0.015,
        radius: 22, drawScale: 1.05,
        speed: 62, maxHealth: 48, damage: 9, xpValue: 16,
        color: '#2f9e44', ultCharge: 12,
        splitsInto: 'spawnling',
        splitCount: 2
    },

    spawnling: {
        label: 'Spawnling',
        behavior: 'chase', sprite: 'enemy_spawnling', equipChance: 0,
        radius: 9, drawScale: 0.8,
        speed: 132, maxHealth: 10, damage: 5, xpValue: 3,
        color: '#69db7c', ultCharge: 2
    },

    boss: {
        label: 'Boss',
        behavior: 'boss', sprite: 'enemy_boss',
        radius: 50, drawScale: 1.0,
        speed: 45, maxHealth: 500, damage: 25, xpValue: 900,
        color: '#8b0000', ultCharge: 25
    }
};

// Each wave covers a window of run time. `spawns` maps enemy type -> spawn
// cooldown in ms (lower = more of them). `rateScale` multiplies every cooldown.
const WAVE_TABLE = [
    {
        id: 1, startTime: 0, name: 'The First Stirring',
        announce: 'They have noticed you.',
        spawns: { basic: 900 },
        rateScale: 1.0
    },
    {
        id: 2, startTime: 60, name: 'Wings in the Dark',
        announce: 'Something faster joins the hunt.',
        spawns: { basic: 700, fast: 1900 },
        rateScale: 1.0
    },
    {
        id: 3, startTime: 120, name: 'They Learn Range',
        announce: 'Running is no longer enough.',
        spawns: { basic: 640, fast: 1400, crawler: 2400, spitter: 3600 },
        rateScale: 0.95
    },
    {
        id: 4, startTime: 180, name: 'Relentless',
        announce: 'Do not let them gather behind you.',
        spawns: { basic: 560, fast: 1100, crawler: 1700, spitter: 3000, bomber: 4200 },
        rateScale: 0.85
    },
    {
        id: 5, startTime: 240, name: 'Ironhide',
        announce: 'Heavy things are coming. Watch their footing.',
        spawns: { basic: 540, fast: 1000, crawler: 1500, spitter: 2700, bomber: 3600, tank: 4600, charger: 5200 },
        rateScale: 0.8
    },
    {
        id: 6, startTime: 300, name: 'Endless Tide',
        announce: 'It does not end. Survive.',
        spawns: { basic: 500, fast: 900, crawler: 1300, spitter: 2400, bomber: 3000,
                  tank: 3600, charger: 4200, splitter: 6000, elite: 15000 },
        rateScale: 0.75
    }
];

// Floor on spawn cooldowns so late-run scaling can never produce a spawn storm.
const WAVE_MIN_COOLDOWNS = {
    basic: 300, fast: 700, crawler: 900, tank: 2000, elite: 9000,
    // The behavioural enemies are threats rather than filler, so they stay
    // comparatively rare no matter how far the run scales.
    spitter: 1800, bomber: 2200, charger: 3000, splitter: 4000
};

// The wave covering `elapsedSeconds`. Past the last entry, the final wave
// continues and difficulty keeps scaling through the time multipliers.
function getWaveForTime(elapsedSeconds) {
    let current = WAVE_TABLE[0];
    for (const wave of WAVE_TABLE) {
        if (elapsedSeconds >= wave.startTime) current = wave;
        else break;
    }
    return current;
}
