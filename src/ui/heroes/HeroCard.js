/**
 * HeroCard — one hero, composed from HeroAbility and HeroStats.
 *
 * Three things about this markup are load-bearing for code elsewhere and
 * must not be renamed:
 *   .character-card   Game's constructor binds its click listener with
 *                     querySelectorAll('.character-card').
 *   data-character    read as card.dataset.character to pick the hero.
 *   <h2>              read as card.querySelector('h2').textContent for the
 *                     co-op P2 label.
 * The .selected and .p2-selected classes are applied by Game, so the
 * stylesheet has to keep honouring them too.
 */
class HeroCard {
    /**
     * @param {object} hero    entry from HERO_DATA
     * @param {object} options { locked: boolean }
     */
    constructor(hero, options = {}) {
        this.hero = hero;
        this.locked = !!options.locked;
    }

    render() {
        const card = document.createElement('div');
        // Both names on purpose: the first is the contract with Game, the
        // second is everything this stylesheet owns.
        card.className = 'character-card vh-card';
        card.dataset.character = this.hero.id;

        // Operable by keyboard, not just mouse. The old cards were plain
        // divs and could not be reached with Tab at all.
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', this.locked ? '-1' : '0');
        card.setAttribute('aria-label', `${this.hero.name}. ${this.hero.ability.name}.`);

        if (this.locked) {
            card.classList.add('is-locked');
            card.setAttribute('aria-disabled', 'true');
            card.appendChild(this.renderLockBadge());
        }

        card.appendChild(this.renderPortrait());

        const name = document.createElement('h2');
        name.className = 'vh-card__name';
        name.textContent = this.hero.name;
        card.appendChild(name);

        card.appendChild(new HeroAbility(this.hero.ability).render());

        const rule = document.createElement('div');
        rule.className = 'vh-card__rule';
        card.appendChild(rule);

        card.appendChild(new HeroStats(this.hero).render());

        // Enter/Space should do what a click does, since this is a button in
        // all but tag name.
        card.addEventListener('keydown', (e) => {
            if (this.locked) return;
            if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
                e.preventDefault();
                card.click();
            }
        });

        return card;
    }

    renderPortrait() {
        const wrap = document.createElement('div');
        wrap.className = 'vh-card__portrait';
        const img = document.createElement('img');
        img.className = 'vh-card__sprite';
        img.src = this.hero.sprite;
        img.alt = '';                       // decorative; the h2 names the hero
        img.setAttribute('aria-hidden', 'true');
        img.loading = 'lazy';
        wrap.appendChild(img);
        return wrap;
    }

    renderLockBadge() {
        const badge = document.createElement('div');
        badge.className = 'vh-card__lock';
        const icon = document.createElement('span');
        icon.setAttribute('aria-hidden', 'true');
        icon.textContent = '🔒';
        badge.appendChild(icon);
        badge.appendChild(document.createTextNode('Clear the Campaign'));
        return badge;
    }
}

if (typeof module !== 'undefined' && module.exports) module.exports = HeroCard;
