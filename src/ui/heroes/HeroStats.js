/**
 * HeroStats — the six core stats, in a fixed order so the eye can compare
 * the same row across cards without re-reading the labels.
 *
 * Speed and Damage are the two stats a player actually trades off, so they
 * get a tier label AND a five-pip meter; the meter is what makes the
 * comparison scannable at a glance. HP and Defense are exact numbers
 * because "how much can I take" is a quantity, not a feeling. Range and
 * Scaling are categorical and get neither.
 */
class HeroStats {
    constructor(hero) {
        this.hero = hero;
    }

    /** One label/value row. `tier` optional; when present a pip meter is added. */
    static row(icon, label, value, tier) {
        const row = document.createElement('div');
        row.className = 'vh-stat';

        const key = document.createElement('span');
        key.className = 'vh-stat__key';
        const ic = document.createElement('span');
        ic.className = 'vh-stat__icon';
        ic.setAttribute('aria-hidden', 'true');
        ic.textContent = icon;
        key.appendChild(ic);
        key.appendChild(document.createTextNode(label));

        const val = document.createElement('span');
        val.className = 'vh-stat__value';
        val.textContent = value;

        row.appendChild(key);
        row.appendChild(val);

        if (tier) {
            val.classList.add('vh-stat__value--tier');
            val.dataset.tier = String(tier.tier);
            row.appendChild(HeroStats.meter(tier));
            // The meter is decorative duplication of the label beside it, so
            // screen readers get one clear sentence instead of five pips.
            row.setAttribute('aria-label', `${label}: ${value}, tier ${tier.tier} of ${TierSystem.MAX_TIER}`);
        }
        return row;
    }

    static meter(tier) {
        const meter = document.createElement('span');
        meter.className = 'vh-meter';
        meter.dataset.tier = String(tier.tier);
        meter.setAttribute('aria-hidden', 'true');
        for (let i = 1; i <= TierSystem.MAX_TIER; i++) {
            const pip = document.createElement('span');
            pip.className = i <= tier.tier ? 'vh-meter__pip vh-meter__pip--on' : 'vh-meter__pip';
            meter.appendChild(pip);
        }
        return meter;
    }

    render() {
        const c = this.hero.combat;
        const speed = TierSystem.speed(c.speed);
        const damage = TierSystem.damage(c.damage);

        const el = document.createElement('div');
        el.className = 'vh-stats';
        el.appendChild(HeroStats.row('❤️', 'HP', String(c.health)));
        el.appendChild(HeroStats.row('⚡', 'Speed', speed.label, speed));
        el.appendChild(HeroStats.row('💥', 'Damage', damage.label, damage));
        el.appendChild(HeroStats.row('🛡', 'Defense', Math.round(c.armor * 100) + '%'));
        el.appendChild(HeroStats.row('🎯', 'Range', this.hero.range));
        el.appendChild(HeroStats.row('📈', 'Scaling', this.hero.scaling));
        return el;
    }
}

if (typeof module !== 'undefined' && module.exports) module.exports = HeroStats;
