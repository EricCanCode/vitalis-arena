// Elites.js — names and titles for promoted enemies.
//
// An elite that is mechanically stronger but visually anonymous is just a
// tougher grunt; the player has no way to refer to it afterwards. A name and a
// title cost nothing at runtime and are the difference between "I died to an
// elite" and "I died to Vaskar the Unfed", which is a thing you tell someone.
//
// Names are generated rather than listed exhaustively so a long run keeps
// producing unfamiliar ones. The pieces are deliberately harsh-sounding and
// short enough to fit a nameplate above a moving enemy.

const ELITE_NAMES = [
    'Vaskar', 'Threnn', 'Mordax', 'Sirel', 'Ghaunt', 'Orvath', 'Kessum',
    'Draveth', 'Ulmar', 'Iskra', 'Varn', 'Torvald', 'Hexen', 'Malrek',
    'Ossian', 'Rhugal', 'Ymber', 'Zaleth', 'Corvax', 'Nhira'
];

const ELITE_TITLES = [
    'the Unfed',      'the Hollow',      'the Patient',    'Gravebound',
    'the Thrice-Bit', 'Ashmouth',        'the Unlit',      'Ironwake',
    'the Sundered',   'the Long Hunger', 'Sorrowfed',      'the Waiting',
    'Bonecold',       'the Unwilling',   'Nightcaller',    'the Last Kin'
];

// Elites are drawn with a marker colour that does not belong to any normal
// enemy, so "that one is different" is legible before the nameplate is read.
const ELITE_MARK_COLOR = '#ffd43b';

// `taken` is an optional Set of full names already in play. A pack of five in
// which two share a name reads as a bug rather than as a roster, and with 20
// names a collision inside one pack is likely enough to see regularly, so the
// caller passes what it has already rolled and this avoids it.
function rollEliteName(taken) {
    let name, title, full;
    for (let attempt = 0; attempt < 12; attempt++) {
        name = ELITE_NAMES[Math.floor(Math.random() * ELITE_NAMES.length)];
        title = ELITE_TITLES[Math.floor(Math.random() * ELITE_TITLES.length)];
        full = `${name} ${title}`;
        // Reject a repeat of either half, not just the pair: two Torvalds in
        // one pack is the thing that looks wrong, whatever their titles.
        if (!taken) break;
        if (!taken.has(name) && !taken.has(full)) break;
    }
    if (taken) { taken.add(name); taken.add(full); }
    return { name, title, full };
}
