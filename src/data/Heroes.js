/**
 * HERO_STATS — the one place a playable character's numbers are defined.
 *
 * These were inline in Player.setupCharacter() and copied again into the
 * select screen's data file. Two copies of five numbers is exactly the
 * drift that had the old cards advertising a "Critical" damage tier and
 * calling two different speeds "Fast", so there is now one copy and both
 * the game and the card read it.
 *
 * attackRange is in world px and is a real limit: Player.attack() will not
 * fire past it and the shot carries a matching travel budget. The select
 * screen turns it into Short/Medium/Long via TierSystem.range(). Measured
 * from live combat, a swarm closes to a median of 226px and never sat past
 * 318px — so 240-300 genuinely bites, while 520 and 820 are unconstrained
 * in a crowd and tell against bosses, stragglers and kiting instead.
 */
const HERO_STATS = {
    warrior: {
        maxHealth: 120,
        speed: 230,
        damage: 15,
        armor: 0.25,
        attackRange: 260,
        color: '#ff6b6b',
        icon: '⚔️'
    },
    ranger: {
        maxHealth: 80,
        speed: 250,
        damage: 10,
        attackRange: 820,
        color: '#51cf66',
        icon: '🏹'
    },
    mage: {
        maxHealth: 70,
        speed: 150,
        damage: 20,
        attackRange: 520,
        color: '#845ef7',
        icon: '🔮'
    },
    assassin: {
        maxHealth: 75,
        speed: 300,
        damage: 18,
        attackRange: 300,
        color: '#ffd43b',
        icon: '🗡️'
    },
    // The tank was strictly dominated by the warrior: 150 flat HP is LESS
    // effective HP than the warrior's 120 behind 25% armor, and it paid for
    // that with half the damage and half the speed. Armor is what the
    // slowness is supposed to buy, so the tank gets the most of it in the
    // game (150/0.55 = 273 EHP, ~1.7x the warrior).
    tank: {
        maxHealth: 150,
        speed: 120,
        damage: 12,
        armor: 0.45,
        attackRange: 240,
        color: '#74c0fc',
        icon: '🛡️'
    }
};

if (typeof module !== 'undefined' && module.exports) module.exports = HERO_STATS;
