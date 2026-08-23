// TitleBackground.js — animated title screen backdrop.
//
// A generated video clip's last frame does not match its first, so the plain
// `loop` attribute produces a visible jump every few seconds. Two stacked
// <video> elements cross-dissolve into each other instead: while one plays out
// its final second, the other restarts from zero underneath and fades in.
//
// The video is only ever fetched when we are actually going to play it, so
// phones and reduced-motion users pay nothing for it.

class TitleBackground {
    constructor(source) {
        this.source = source;
        this.videos = [
            document.getElementById('titleVideoA'),
            document.getElementById('titleVideoB')
        ].filter(Boolean);
        this.fadeSeconds = 0.9;
        this.active = 0;
        this.handingOver = false;
        this.running = false;
        this._tick = this._tick.bind(this);
    }

    // Animate only when it is both wanted and worth it.
    static shouldAnimate() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
        // Decoding a looping video behind a menu is not worth the battery on a
        // phone, for a screen that is on display for a few seconds.
        if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) return false;
        return true;
    }

    async start() {
        if (this.running || this.videos.length < 2) return;
        if (!TitleBackground.shouldAnimate()) return;

        this.running = true;
        this.videos.forEach(v => {
            v.src = this.source;   // assigned here, not in HTML, so it is never fetched otherwise
            v.load();
        });
        this._attempt();
    }

    async _attempt() {
        if (!this.running) return;
        const first = this.videos[this.active];
        try {
            await first.play();
        } catch (err) {
            // Autoplay was refused. That happens in a backgrounded tab, and
            // under Safari's per-site "Never Auto-Play" setting. Keep the clip
            // loaded and wait for a moment when playback is allowed instead of
            // giving up permanently — the painted backdrop covers the gap.
            this._armRetry();
            return;
        }
        first.classList.add('is-visible');
        first.addEventListener('timeupdate', this._tick);
    }

    // Try again when the tab becomes visible, or on the first user gesture.
    _armRetry() {
        if (this._retryArmed) return;
        this._retryArmed = true;

        this._retry = () => {
            if (!this.running) return;
            this._disarmRetry();
            this._attempt();
        };
        this._onVisibility = () => { if (!document.hidden) this._retry(); };

        document.addEventListener('visibilitychange', this._onVisibility);
        ['pointerdown', 'keydown', 'touchstart'].forEach(ev =>
            window.addEventListener(ev, this._retry, { passive: true }));
    }

    _disarmRetry() {
        if (!this._retryArmed) return;
        this._retryArmed = false;
        document.removeEventListener('visibilitychange', this._onVisibility);
        ['pointerdown', 'keydown', 'touchstart'].forEach(ev =>
            window.removeEventListener(ev, this._retry));
    }

    _tick() {
        if (!this.running || this.handingOver) return;
        const current = this.videos[this.active];
        if (!current.duration || isNaN(current.duration)) return;
        if (current.currentTime >= current.duration - this.fadeSeconds) {
            this._handOver();
        }
    }

    _handOver() {
        this.handingOver = true;
        const outgoing = this.videos[this.active];
        const incoming = this.videos[1 - this.active];

        incoming.currentTime = 0;
        const played = incoming.play();
        if (played && played.catch) played.catch(() => {});

        incoming.classList.add('is-visible');
        outgoing.classList.remove('is-visible');

        outgoing.removeEventListener('timeupdate', this._tick);
        incoming.addEventListener('timeupdate', this._tick);

        // Park the outgoing clip once the dissolve has finished.
        setTimeout(() => {
            if (!this.running) return;
            outgoing.pause();
            outgoing.currentTime = 0;
            this.active = 1 - this.active;
            this.handingOver = false;
        }, this.fadeSeconds * 1000);
    }

    // Called when the title screen is dismissed — no reason to keep decoding.
    stop() {
        this.running = false;
        this.handingOver = false;
        this._disarmRetry();
        this.videos.forEach(v => {
            v.removeEventListener('timeupdate', this._tick);
            v.pause();
            v.classList.remove('is-visible');
            // Releasing the source lets the decoder shut down.
            v.removeAttribute('src');
            v.load();
        });
    }
}
