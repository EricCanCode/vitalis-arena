// Bosses.js — boss archetypes.
//
// Previously every stage fought the same boss with a bigger health multiplier,
// which meant stage 7 played exactly like stage 1. These cycle by stage, and
// each one asks a different question of the player:
//
//   Warden   — read the charge, dodge sideways
//   Emberlord— kill the adds or drown; keep moving through the spiral
//   Colossus — find the gap in the shockwave before it reaches you

const BOSS_TYPES = [
    {
        id: 'warden',
        name: 'The Warden',
        // Shown on the entrance card, under the name.
        epithet: 'Keeper of the First Gate',
        pattern: 'warden',
        sprite: 'boss_warden',
        color: '#8b0000',
        healthMultiplier: 1.0,
        speedMultiplier: 1.0,
        damageMultiplier: 1.0,
        // Phase two opens up when health drops below this fraction.
        burstCount: 8,
        burstCooldown: 2.0
    },
    {
        id: 'emberlord',
        name: 'The Emberlord',
        // Shown on the entrance card, under the name.
        epithet: 'He Who Feeds the Pyre',
        pattern: 'summoner',
        sprite: 'boss_emberlord',
        color: '#e8590c',
        healthMultiplier: 0.85,      // lower HP; the adds are the real threat
        speedMultiplier: 0.8,
        damageMultiplier: 1.0,
        // Hangs back and lets its summons do the work.
        preferredRange: 380,
        summonCooldown: 7.0,
        summonType: 'bomber',
        summonCount: 3,
        spiralCooldown: 0.28,        // one shot at a time, rotating
        spiralSpeed: 210,
        spiralStep: 0.55             // radians added per shot
    },
    {
        id: 'colossus',
        name: 'The Colossus',
        // Shown on the entrance card, under the name.
        epithet: 'The Mountain That Walks',
        pattern: 'colossus',
        sprite: 'boss_colossus',
        color: '#495057',
        healthMultiplier: 1.5,       // slow and enormously durable
        speedMultiplier: 0.55,
        damageMultiplier: 1.3,
        slamCooldown: 4.5,
        // The tell. Long enough to read the safe lane and run for it.
        slamWindup: 0.85,
        // A full ring except for one gap — the player has to find it and move
        // there rather than just holding a direction.
        ringCount: 26,
        ringGap: 4,                  // consecutive projectiles omitted
        ringSpeed: 170
    }
];

// Bosses cycle by stage, so a long run keeps changing shape.
function getBossForStage(stage) {
    const index = Math.max(0, (stage - 1)) % BOSS_TYPES.length;
    return BOSS_TYPES[index];
}

function getBossById(id) {
    return BOSS_TYPES.find(b => b.id === id) || BOSS_TYPES[0];
}
