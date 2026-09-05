/**
 * TierSystem — the single source of truth for turning a raw combat number
 * into a label the select screen can show.
 *
 * This exists because the old cards hard-coded their own labels in
 * index.html, and they had already drifted from the game: the Assassin
 * advertised "Critical" damage, which is not a tier at all, and the Warrior
 * (230) and Ranger (250) were both "Fast" despite the Ranger being a fifth
 * quicker. Deriving the label from the number means a balance change can
 * never leave the card lying about the character.
 *
 * Thresholds are inclusive lower bounds, ordered low to high. Every scale
 * has exactly five tiers so the pip meter in HeroStats always renders the
 * same width regardless of which stat it is describing.
 */
const TierSystem = (() => {
    const SPEED_TIERS = [
        { tier: 1, label: 'Very Slow', min: 0 },
        { tier: 2, label: 'Slow',      min: 140 },
        { tier: 3, label: 'Normal',    min: 190 },
        { tier: 4, label: 'Fast',      min: 240 },
        { tier: 5, label: 'Very Fast', min: 280 }
    ];

    const DAMAGE_TIERS = [
        { tier: 1, label: 'Low',       min: 0 },
        { tier: 2, label: 'Medium',    min: 12 },
        { tier: 3, label: 'High',      min: 15 },
        { tier: 4, label: 'Very High', min: 18 },
        { tier: 5, label: 'Extreme',   min: 20 }
    ];

    const RANGE_BANDS = [
        { tier: 1, label: 'Short',  min: 0 },
        { tier: 2, label: 'Medium', min: 380 },
        { tier: 3, label: 'Long',   min: 660 }
    ];

    // Walk from the top so the first match is the highest tier the value
    // clears. Falls back to tier 1 for anything below the lowest bound.
    function resolve(scale, value) {
        for (let i = scale.length - 1; i >= 0; i--) {
            if (value >= scale[i].min) return scale[i];
        }
        return scale[0];
    }

    return {
        MAX_TIER: 5,
        SPEED_TIERS,
        DAMAGE_TIERS,
        speed: (value) => resolve(SPEED_TIERS, value),
        damage: (value) => resolve(DAMAGE_TIERS, value),

        /**
         * Range is a real number of world pixels — Player.attackRange, the
         * distance past which the character genuinely cannot hit anything.
         * Banded rather than tiered because three names is the whole scale
         * and a five-pip meter beside it would be inventing precision.
         */
        RANGE_BANDS: RANGE_BANDS,
        range: (px) => resolve(RANGE_BANDS, px).label,

        /** Scaling is pure flavour text — no number behind it. */
        SCALINGS: ['Strength', 'Dexterity', 'Intelligence', 'Vitality']
    };
})();

if (typeof module !== 'undefined' && module.exports) module.exports = TierSystem;
