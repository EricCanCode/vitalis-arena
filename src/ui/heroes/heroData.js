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
        combat: { health: 120, speed: 230, damage: 15, armor: 0.25, attackRange: 260 },
        scaling: 'Strength',
        requiresEndless: false
    },
    {
        id: 'ranger',
        name: 'Ranger',
        sprite: 'images/ranger.png',
        ability: { icon: '🏹', name: 'Multi-Shot', description: 'Fires three arrows at once in a widening spread.' },
        combat: { health: 80, speed: 250, damage: 10, armor: 0, attackRange: 820 },
        scaling: 'Dexterity',
        requiresEndless: false
    },
    {
        id: 'mage',
        name: 'Mage',
        sprite: 'images/mage.png',
        ability: { icon: '🔮', name: 'Arcane Missiles', description: 'Launches homing bolts that seek the nearest enemy.' },
        combat: { health: 70, speed: 150, damage: 20, armor: 0, attackRange: 520 },
        scaling: 'Intelligence',
        requiresEndless: false
    },
    {
        id: 'assassin',
        name: 'Assassin',
        sprite: 'images/assassin.png',
        ability: { icon: '🗡️', name: 'Shadow Strike', description: 'Blinks behind a target and strikes for a critical hit.' },
        combat: { health: 75, speed: 300, damage: 18, armor: 0, attackRange: 300 },
        scaling: 'Dexterity',
        requiresEndless: false
    },
    {
        id: 'tank',
        name: 'Tank',
        sprite: 'images/tank.png',
        ability: { icon: '🛡️', name: 'Shockwave', description: 'Slams the ground, stunning every enemy in reach.' },
        combat: { health: 150, speed: 120, damage: 12, armor: 0.45, attackRange: 240 },
        scaling: 'Vitality',
        requiresEndless: false
    }
];

if (typeof module !== 'undefined' && module.exports) module.exports = HERO_DATA;
