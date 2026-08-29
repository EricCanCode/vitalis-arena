/**
 * heroData — pure data for the hero select screen. No logic lives here.
 *
 * Requested as heroData.json. It is a .js file holding a JSON-shaped object
 * because the game is loaded from plain <script> tags with no bundler: a
 * real .json would need fetch(), which is async (the menu would paint
 * before its own cards) and fails outright under file://. Every other data
 * file in the project — Bosses, Passives, Waves — uses this same shape.
 *
 * `combat` mirrors Player.setupCharacter(), attackRange included —
 * the Range row is derived from it, never written by hand.
 *
 * `combat` mirrors Player.setupCharacter() in script_v2.js. Those are the
 * numbers the game actually runs on; the tier labels are derived from them
 * rather than written by hand, so a card cannot disagree with the game.
 *
 * `requiresEndless` drives the locked state. All five ship unlocked — this
 * is deliberate: flipping one to true is how a hero becomes Endless-only,
 * and doing that to an existing hero would silently take it away from
 * players who already have it.
 */
const HERO_DATA = [
    {
        id: 'warrior',
        name: 'Warrior',
        sprite: 'images/warrior.png',
        ability: { icon: '⚔️', name: 'Whirlwind Attack', description: 'Spins for AOE damage and knocks nearby enemies back.' },
        scaling: 'Strength',
        requiresEndless: false
    },
    {
        id: 'ranger',
        name: 'Ranger',
        sprite: 'images/ranger.png',
        ability: { icon: '🏹', name: 'Multi-Shot', description: 'Fires three arrows at once in a widening spread.' },
        scaling: 'Dexterity',
        requiresEndless: false
    },
    {
        id: 'mage',
        name: 'Mage',
        sprite: 'images/mage.png',
        ability: { icon: '🔮', name: 'Arcane Missiles', description: 'Launches homing bolts that seek the nearest enemy.' },
        scaling: 'Intelligence',
        requiresEndless: false
    },
    {
        id: 'assassin',
        name: 'Assassin',
        sprite: 'images/assassin.png',
        ability: { icon: '🗡️', name: 'Shadow Strike', description: 'Blinks behind a target and strikes for a critical hit.' },
        scaling: 'Dexterity',
        requiresEndless: false
    },
    {
        id: 'tank',
        name: 'Tank',
        sprite: 'images/tank.png',
        ability: { icon: '🛡️', name: 'Shockwave', description: 'Slams the ground, stunning every enemy in reach.' },
        scaling: 'Vitality',
        requiresEndless: false
    }
];

// Attach the live combat numbers. `health` rather than `maxHealth` because
// the card shows a starting value, not the running one.
HERO_DATA.forEach(hero => {
    const s = (typeof HERO_STATS !== 'undefined' ? HERO_STATS : require('../../data/Heroes.js'))[hero.id];
    hero.combat = {
        health: s.maxHealth,
        speed: s.speed,
        damage: s.damage,
        armor: s.armor || 0,
        attackRange: s.attackRange
    };
});

if (typeof module !== 'undefined' && module.exports) module.exports = HERO_DATA;
