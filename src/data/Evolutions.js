// Evolutions.js — weapon evolutions.
//
// A weapon evolves when ALL of these hold and a treasure chest is opened:
//   1. the weapon is at max level (GAME_CONFIG.weapons.maxLevel)
//   2. the player owns the required passive item
// Only one weapon evolves per chest. Evolution replaces the base weapon.
//
// Everything here is data. EvolutionSystem reads `stats` and `traits` generically,
// so adding an evolution means adding an entry — no new branching code.

const EVOLUTIONS = [
    {
        id: 'storm_crown',
        base: 'lightning',
        requires: 'spellbook',
        name: 'Storm Crown',
        icon: '👑',
        color: '#7bdff2',
        desc: 'A crown of thunder. Far more bolts, striking twice as often.',
        stats: { damageMultiplier: 2.2, attackSpeedMultiplier: 2.0, radiusMultiplier: 1.5, orbsBonus: 3 },
        traits: { glow: true }
    },
    {
        id: 'infernal_halo',
        base: 'fire',
        requires: 'iron_heart',
        name: 'Infernal Halo',
        icon: '☄️',
        color: '#ff7b00',
        desc: 'A ring of living fire that feeds you as it burns.',
        stats: { damageMultiplier: 2.4, radiusMultiplier: 1.9 },
        traits: { glow: true, healOnHit: 0.35 }
    },
    {
        id: 'glacial_volley',
        base: 'ice',
        requires: 'wind_boots',
        name: 'Glacial Volley',
        icon: '🌨️',
        color: '#a5d8ff',
        desc: 'Shatters outward in eight directions instead of four.',
        stats: { damageMultiplier: 2.0, attackSpeedMultiplier: 1.8, directions: 8 },
        traits: { glow: true }
    },
    {
        id: 'sunderer',
        base: 'boomerang',
        requires: 'power_stone',
        name: 'Sunderer',
        icon: '🪃',
        color: '#ffd43b',
        desc: 'A blade that carves a far wider arc and returns hungrier.',
        stats: { damageMultiplier: 2.6, attackSpeedMultiplier: 1.6, rangeMultiplier: 1.7 },
        traits: { glow: true }
    },
    {
        id: 'astral_sentinels',
        base: 'orbs',
        requires: 'magnet_charm',
        name: 'Astral Sentinels',
        icon: '🌌',
        color: '#b197fc',
        desc: 'Six guardians wheel around you at a far greater distance.',
        stats: { damageMultiplier: 2.2, radiusMultiplier: 1.8, orbsBonus: 3 },
        traits: { glow: true }
    },
    {
        id: 'plaguebloom',
        base: 'poison',
        requires: 'clover_coin',
        name: 'Plaguebloom',
        icon: '☠️',
        color: '#8ce99a',
        desc: 'Venom spreads from the dying to everything near them.',
        stats: { damageMultiplier: 2.3, attackSpeedMultiplier: 1.7, poisonDurationBonus: 3 },
        traits: { glow: true, spreadRadius: 140 }
    },
    {
        id: 'cataclysm',
        base: 'bomb',
        requires: 'power_stone',
        name: 'Cataclysm',
        icon: '🌋',
        color: '#ff4444',
        desc: 'The sky falls on command, and far more often.',
        stats: { cooldownMultiplier: 0.4 },
        traits: { glow: true, screenShake: 30 }
    }
];

function getEvolutionForWeapon(weaponType) {
    return EVOLUTIONS.find(e => e.base === weaponType) || null;
}

function getEvolutionById(id) {
    return EVOLUTIONS.find(e => e.id === id) || null;
}
