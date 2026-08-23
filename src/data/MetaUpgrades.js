// MetaUpgrades.js — permanent upgrades bought with coins between runs.
// Levels persist in localStorage and are applied when a new run starts.

const META_UPGRADES = [
    {
        id: 'max_hp',   name: 'Vital Reserve', icon: '❤️',
        desc: '+5 max HP per level',
        maxLevel: 10, baseCost: 100, costGrowth: 1.5,
        stat: 'maxHealth', perLevel: 5,
        format: (v) => `+${v} max HP`
    },
    {
        id: 'damage',   name: 'Honed Edge', icon: '🗡️',
        desc: '+5% damage per level',
        maxLevel: 10, baseCost: 150, costGrowth: 1.55,
        stat: 'damage', perLevel: 0.05,
        format: (v) => `+${Math.round(v * 100)}% damage`
    },
    {
        id: 'move_speed', name: 'Swift Tread', icon: '💨',
        desc: '+3% move speed per level',
        maxLevel: 10, baseCost: 120, costGrowth: 1.5,
        stat: 'moveSpeed', perLevel: 0.03,
        format: (v) => `+${Math.round(v * 100)}% move speed`
    },
    {
        id: 'xp_gain',  name: 'Keen Insight', icon: '⭐',
        desc: '+5% XP gain per level',
        maxLevel: 10, baseCost: 140, costGrowth: 1.5,
        stat: 'xpGain', perLevel: 0.05,
        format: (v) => `+${Math.round(v * 100)}% XP gain`
    },
    {
        id: 'pickup_range', name: 'Long Reach', icon: '🧲',
        desc: '+5% pickup range per level',
        maxLevel: 10, baseCost: 110, costGrowth: 1.45,
        stat: 'pickupRange', perLevel: 0.05,
        format: (v) => `+${Math.round(v * 100)}% pickup range`
    },
    {
        id: 'start_coins', name: 'Full Purse', icon: '🪙',
        desc: 'Start each run with bonus coins',
        maxLevel: 5, baseCost: 200, costGrowth: 1.8,
        stat: 'startCoins', perLevel: 25,
        format: (v) => `+${v} coins per run`
    }
];

// Cost of buying the NEXT level. Returns null when already maxed.
function metaUpgradeCost(upgrade, currentLevel) {
    if (currentLevel >= upgrade.maxLevel) return null;
    return Math.floor(upgrade.baseCost * Math.pow(upgrade.costGrowth, currentLevel));
}

function metaUpgradeValue(upgrade, level) {
    return upgrade.perLevel * level;
}
