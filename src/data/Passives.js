// Passives.js — passive items. Separate from weapons: they buff the player or
// every weapon globally. Each passive runs level 1-5.
//
// Every passive exposes `value(level)` returning the total bonus at that level,
// so nothing has to hard-code per-level numbers elsewhere.

const PASSIVE_MAX_LEVEL = 5;

const PASSIVE_POOL = [
    {
        id: 'spellbook',
        name: 'Spellbook',
        icon: '📖',
        color: '#845ef7',
        desc: 'Reduces all weapon cooldowns.',
        stat: 'cooldownReduction',
        perLevel: 0.05,
        format: (v) => `-${Math.round(v * 100)}% cooldown`
    },
    {
        id: 'power_stone',
        name: 'Power Stone',
        icon: '💠',
        color: '#ff6b6b',
        desc: 'Increases all weapon damage.',
        stat: 'damageMultiplier',
        perLevel: 0.08,
        format: (v) => `+${Math.round(v * 100)}% damage`
    },
    {
        id: 'wind_boots',
        name: 'Wind Boots',
        icon: '🥾',
        color: '#51cf66',
        desc: 'Increases movement speed.',
        stat: 'moveSpeed',
        perLevel: 0.06,
        format: (v) => `+${Math.round(v * 100)}% move speed`
    },
    {
        id: 'magnet_charm',
        name: 'Magnet Charm',
        icon: '🧲',
        color: '#4a90e2',
        desc: 'Increases XP pickup range.',
        stat: 'pickupRange',
        perLevel: 0.25,
        format: (v) => `+${Math.round(v * 100)}% pickup range`
    },
    {
        id: 'iron_heart',
        name: 'Iron Heart',
        icon: '🫀',
        color: '#e03131',
        desc: 'Increases maximum health.',
        stat: 'maxHealth',
        perLevel: 15,
        format: (v) => `+${v} max HP`
    },
    {
        id: 'clover_coin',
        name: 'Clover Coin',
        icon: '🍀',
        color: '#ffd43b',
        desc: 'Improves coin drops and chest luck.',
        stat: 'luck',
        perLevel: 0.10,
        format: (v) => `+${Math.round(v * 100)}% luck`
    }
];

// Total bonus this passive provides at `level` (0 = not owned).
function passiveValue(passive, level) {
    return passive.perLevel * level;
}

function getPassiveById(id) {
    return PASSIVE_POOL.find(p => p.id === id) || null;
}
