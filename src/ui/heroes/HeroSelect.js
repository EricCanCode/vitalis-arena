/**
 * HeroSelect — builds the hero grid from data and owns the locked state.
 *
 * TIMING IS LOAD-BEARING. Game's constructor binds a click listener to each
 * .character-card element individually, at DOMContentLoaded. Cards that do
 * not exist by then are never wired, and cards replaced afterwards lose the
 * listener that starts a run — the screen would look perfect and do
 * nothing. So this file is included BEFORE script_v2.js and renders during
 * its own execution: the grid element sits at the top of the body, long
 * before the script tags at the bottom, so it is already there.
 *
 * For the same reason there is no re-render. refreshLocks() updates the
 * existing nodes in place instead of rebuilding them.
 */
const HeroSelect = (() => {
    const GRID_SELECTOR = '.character-grid';

    function isEndlessUnlocked() {
        try {
            const key = (typeof GAME_CONFIG !== 'undefined' && GAME_CONFIG.progression)
                ? GAME_CONFIG.progression.endlessUnlockKey
                : 'vitalisArenaEndlessUnlocked';
            return localStorage.getItem(key) === 'true';
        } catch (e) {
            // Private browsing can throw on localStorage access. Treat an
            // unreadable save as "not unlocked" rather than failing to draw
            // the menu at all.
            return false;
        }
    }

    function isLocked(hero) {
        return !!hero.requiresEndless && !isEndlessUnlocked();
    }

    function mount() {
        const grid = document.querySelector(GRID_SELECTOR);
        if (!grid) return false;

        grid.innerHTML = '';
        HERO_DATA.forEach(hero => {
            grid.appendChild(new HeroCard(hero, { locked: isLocked(hero) }).render());
        });

        // Locked cards must not start a run. Game binds on the card itself,
        // so this listens on the ancestor in the CAPTURE phase — that always
        // runs first, whatever order the listeners were registered in.
        grid.addEventListener('click', (e) => {
            const card = e.target.closest && e.target.closest('.character-card');
            if (card && card.classList.contains('is-locked')) {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
            }
        }, true);

        return true;
    }

    /** Re-evaluate locks without rebuilding nodes (see the note above). */
    function refreshLocks() {
        const grid = document.querySelector(GRID_SELECTOR);
        if (!grid) return;
        HERO_DATA.forEach(hero => {
            const card = grid.querySelector(`.character-card[data-character="${hero.id}"]`);
            if (!card) return;
            const locked = isLocked(hero);
            card.classList.toggle('is-locked', locked);
            card.setAttribute('tabindex', locked ? '-1' : '0');
            if (locked) {
                card.setAttribute('aria-disabled', 'true');
                if (!card.querySelector('.vh-card__lock')) {
                    card.insertBefore(new HeroCard(hero, { locked: true }).renderLockBadge(), card.firstChild);
                }
            } else {
                card.removeAttribute('aria-disabled');
                const badge = card.querySelector('.vh-card__lock');
                if (badge) badge.remove();
            }
        });
    }

    // Render now if the grid is already parsed; otherwise wait. This file is
    // loaded before script_v2.js, so a DOMContentLoaded listener registered
    // here still fires before the one that constructs Game.
    if (!mount()) {
        document.addEventListener('DOMContentLoaded', mount);
    }

    return { mount, refreshLocks, isEndlessUnlocked };
})();

if (typeof module !== 'undefined' && module.exports) module.exports = HeroSelect;
