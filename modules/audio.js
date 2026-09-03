// AudioManager extracted from main game file to support modularization.
(function(window){
    class AudioManager {
        constructor() {
            this.audioContext = null;
            this.soundGainNode = null;
            this.musicGainNode = null;
            this.soundBuffers = {};
            this.musicBuffers = {};
            this.currentMusicSource = null;
            this.currentMusicName = null;
            this._pendingMusic = null;
            this.soundVolume = 0.5;
            this.musicVolume = 0.3;
            this.soundEnabled = true;
            this.musicEnabled = true;
            this.soundCooldownMs = {
                'enemy-hit':   200,
                'player-hit':  200,
                'pickup-xp':   80,
                'shoot':       60,
                'enemy-death': 150,
            };
            this.soundLastPlayed = {};
            this.loadSettings();

            const resumeCtx = () => {
                if (!this.audioContext) {
                    this._initContext();
                } else if (this.audioContext.state === 'suspended') {
                    this.audioContext.resume().then(() => {
                        if (this._pendingMusic) {
                            this.playMusic(this._pendingMusic);
                            this._pendingMusic = null;
                        }
                    });
                }
                if (this.audioContext && this.audioContext.state === 'running') {
                    document.removeEventListener('touchstart', resumeCtx);
                    document.removeEventListener('click', resumeCtx);
                    document.removeEventListener('keydown', resumeCtx);
                }
            };
            document.addEventListener('touchstart', resumeCtx, { passive: true });
            document.addEventListener('click', resumeCtx);
            document.addEventListener('keydown', resumeCtx);
        }

        _initContext() {
            if (this.audioContext) return;
            try {
                this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
                this.soundGainNode = this.audioContext.createGain();
                this.soundGainNode.gain.value = this.soundEnabled ? this.soundVolume : 0;
                this.soundGainNode.connect(this.audioContext.destination);
                this.musicGainNode = this.audioContext.createGain();
                this.musicGainNode.gain.value = this.musicEnabled ? this.musicVolume : 0;
                this.musicGainNode.connect(this.audioContext.destination);
            } catch (e) {
                console.warn('Web Audio API unavailable:', e);
            }
        }

        loadSound(name, path) {
            this._initContext();
            if (!this.audioContext) return;
            fetch(path)
                .then(r => r.arrayBuffer())
                .then(buf => this.audioContext.decodeAudioData(buf))
                .then(decoded => { this.soundBuffers[name] = decoded; })
                .catch(err => console.warn(`Audio load failed [${name}]:`, err));
        }

        loadMusic(name, path) {
            this._initContext();
            if (!this.audioContext) return;
            fetch(path)
                .then(r => r.arrayBuffer())
                .then(buf => this.audioContext.decodeAudioData(buf))
                .then(decoded => {
                    this.musicBuffers[name] = decoded;
                    if (this._pendingMusic === name && this.audioContext.state === 'running') {
                        this.playMusic(name);
                        this._pendingMusic = null;
                    }
                })
                .catch(err => console.warn(`Music load failed [${name}]:`, err));
        }

        playSound(name) {
            if (!this.soundEnabled) return;
            if (!this.audioContext || !this.soundBuffers[name]) return;
            const cooldown = this.soundCooldownMs[name];
            if (cooldown) {
                const now = performance.now();
                if (this.soundLastPlayed[name] && now - this.soundLastPlayed[name] < cooldown) return;
                this.soundLastPlayed[name] = now;
            }
            const doPlay = () => {
                try {
                    const source = this.audioContext.createBufferSource();
                    source.buffer = this.soundBuffers[name];
                    source.connect(this.soundGainNode);
                    source.start(0);
                } catch (e) {}
            };
            if (this.audioContext.state === 'suspended') {
                this.audioContext.resume().then(doPlay).catch(() => {});
            } else {
                doPlay();
            }
        }

        playMusic(name) {
            if (!this.musicEnabled) return;
            if (!this.audioContext) return;
            this._stopMusicSource();
            if (!this.musicBuffers[name]) {
                this._pendingMusic = name;
                return;
            }
            const doPlayMusic = () => {
                try {
                    const source = this.audioContext.createBufferSource();
                    source.buffer = this.musicBuffers[name];
                    source.loop = true;
                    source.connect(this.musicGainNode);
                    source.start(0);
                    this.currentMusicSource = source;
                    this.currentMusicName = name;
                } catch (e) { console.warn('playMusic error:', e); }
            };
            if (this.audioContext.state === 'suspended') {
                this._pendingMusic = name;
                this.audioContext.resume().then(() => {
                    if (this._pendingMusic === name) {
                        this._pendingMusic = null;
                        doPlayMusic();
                    }
                }).catch(() => {});
            } else {
                doPlayMusic();
            }
        }

        _stopMusicSource() {
            if (this.currentMusicSource) {
                try { this.currentMusicSource.stop(0); } catch (e) {}
                this.currentMusicSource = null;
            }
            this.currentMusicName = null;
        }

        stopMusic() { this._stopMusicSource(); this._pendingMusic = null; }

        setSoundVolume(volume) { this.soundVolume = Math.max(0, Math.min(1, volume)); if (this.soundGainNode) this.soundGainNode.gain.value = this.soundEnabled ? this.soundVolume : 0; this.saveSettings(); }
        setMusicVolume(volume) { this.musicVolume = Math.max(0, Math.min(1, volume)); if (this.musicGainNode) this.musicGainNode.gain.value = this.musicEnabled ? this.musicVolume : 0; this.saveSettings(); }
        toggleSound() { this.soundEnabled = !this.soundEnabled; if (this.soundGainNode) this.soundGainNode.gain.value = this.soundEnabled ? this.soundVolume : 0; this.saveSettings(); }
        toggleMusic() { this.musicEnabled = !this.musicEnabled; if (this.musicGainNode) this.musicGainNode.gain.value = this.musicEnabled ? this.musicVolume : 0; if (!this.musicEnabled) this._stopMusicSource(); else if (this.currentMusicName) this.playMusic(this.currentMusicName); this.saveSettings(); }

        loadSettings() {
            const settings = localStorage.getItem('audioSettings');
            if (settings) {
                const parsed = JSON.parse(settings);
                this.soundVolume = parsed.soundVolume || 0.5;
                this.musicVolume = parsed.musicVolume || 0.3;
                this.soundEnabled = parsed.soundEnabled !== false;
                this.musicEnabled = parsed.musicEnabled !== false;
            }
        }

        saveSettings() {
            localStorage.setItem('audioSettings', JSON.stringify({ soundVolume: this.soundVolume, musicVolume: this.musicVolume, soundEnabled: this.soundEnabled, musicEnabled: this.musicEnabled }));
        }
    }

    // Expose globally for legacy script compatibility
    window.AudioManager = AudioManager;
})(window);
