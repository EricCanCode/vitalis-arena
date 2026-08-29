/**
 * HeroAbility — the ability name and its one-line mechanical description.
 *
 * Kept as its own component because it is the only part of the card that is
 * prose: it wraps to two lines at narrow widths while every stat row stays
 * on one, so it needs its own min-height to keep the stat block aligned
 * across cards of differing text length.
 */
class HeroAbility {
    constructor(ability) {
        this.ability = ability;
    }

    render() {
        const el = document.createElement('div');
        el.className = 'vh-ability';

        const name = document.createElement('p');
        name.className = 'vh-ability__name';
        // Icon is decorative — the ability name beside it already carries
        // the meaning, so it is hidden from assistive tech rather than read
        // out as an emoji name.
        const icon = document.createElement('span');
        icon.className = 'vh-ability__icon';
        icon.setAttribute('aria-hidden', 'true');
        icon.textContent = this.ability.icon;
        name.appendChild(icon);
        name.appendChild(document.createTextNode(this.ability.name));

        const desc = document.createElement('p');
        desc.className = 'vh-ability__desc';
        desc.textContent = this.ability.description;

        el.appendChild(name);
        el.appendChild(desc);
        return el;
    }
}

if (typeof module !== 'undefined' && module.exports) module.exports = HeroAbility;
