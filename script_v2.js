// Survivor Arena - Game Code

// Achievement Definitions
const ACHIEVEMENTS = [
    // Kill Achievements
    { id: 'first_blood', name: 'First Blood', desc: 'Defeat your first enemy', icon: '⚔️', requirement: { type: 'kills', value: 1 } },
    { id: 'killer', name: 'Killer', desc: 'Defeat 100 enemies', icon: '💀', requirement: { type: 'kills', value: 100 } },
    { id: 'assassin', name: 'Assassin', desc: 'Defeat 500 enemies', icon: '🗡️', requirement: { type: 'kills', value: 500 } },
    { id: 'legend', name: 'Legend', desc: 'Defeat 1000 enemies', icon: '👑', requirement: { type: 'kills', value: 1000 } },
    
    // Survival Achievements
    { id: 'survivor', name: 'Survivor', desc: 'Survive for 5 minutes', icon: '⏱️', requirement: { type: 'time', value: 300 } },
    { id: 'veteran', name: 'Veteran', desc: 'Survive for 10 minutes', icon: '🛡️', requirement: { type: 'time', value: 600 } },
    { id: 'master', name: 'Master', desc: 'Survive for 20 minutes', icon: '🏆', requirement: { type: 'time', value: 1200 } },
    
    // Boss Achievements
    { id: 'boss_hunter', name: 'Boss Hunter', desc: 'Defeat your first boss', icon: '👹', requirement: { type: 'bosses', value: 1 } },
    { id: 'boss_slayer', name: 'Boss Slayer', desc: 'Defeat 5 bosses', icon: '🔥', requirement: { type: 'bosses', value: 5 } },
    { id: 'boss_nemesis', name: 'Boss Nemesis', desc: 'Defeat 10 bosses', icon: '⚡', requirement: { type: 'bosses', value: 10 } },
    
    // Level Achievements
    { id: 'power_up', name: 'Power Up', desc: 'Reach level 10', icon: '⬆️', requirement: { type: 'level', value: 10 } },
    { id: 'elite', name: 'Elite', desc: 'Reach level 25', icon: '✨', requirement: { type: 'level', value: 25 } },
    { id: 'legendary_hero', name: 'Legendary Hero', desc: 'Reach level 50', icon: '🌟', requirement: { type: 'level', value: 50 } },
    
    // Character Achievements
    { id: 'warrior_master', name: 'Warrior Master', desc: 'Win a game as Warrior', icon: '🗡️', requirement: { type: 'character', value: 'warrior' } },
    { id: 'ranger_master', name: 'Ranger Master', desc: 'Win a game as Ranger', icon: '🏹', requirement: { type: 'character', value: 'ranger' } },
    { id: 'mage_master', name: 'Mage Master', desc: 'Win a game as Mage', icon: '🔮', requirement: { type: 'character', value: 'mage' } },
    { id: 'assassin_master', name: 'Assassin Master', desc: 'Win a game as Assassin', icon: '🥷', requirement: { type: 'character', value: 'assassin' } },
    { id: 'tank_master', name: 'Tank Master', desc: 'Win a game as Tank', icon: '🛡️', requirement: { type: 'character', value: 'tank' } },
    { id: 'all_rounder', name: 'All-Rounder', desc: 'Win with all characters', icon: '🎯', requirement: { type: 'all_characters', value: 5 } },
    
    // Special Achievements
    { id: 'speed_demon', name: 'Speed Demon', desc: 'Kill 10 enemies in 5 seconds', icon: '💨', requirement: { type: 'speed_kills', value: 10 } },
    { id: 'weapon_master', name: 'Weapon Master', desc: 'Max out a weapon to Legendary', icon: '⚔️', requirement: { type: 'legendary_weapon', value: 1 } },
];

// Equipment Definitions
const EQUIPMENT_TYPES = {
    WEAPON: 'weapon',
    ARMOR: 'armor',
    ACCESSORY: 'accessory',
    RING: 'ring'
};

const EQUIPMENT_RARITY = {
    COMMON: { name: 'Common', color: '#888888', statMultiplier: 1.0, dropRate: 0.6 },
    UNCOMMON: { name: 'Uncommon', color: '#4CAF50', statMultiplier: 1.3, dropRate: 0.25 },
    RARE: { name: 'Rare', color: '#2196F3', statMultiplier: 1.6, dropRate: 0.1 },
    EPIC: { name: 'Epic', color: '#9C27B0', statMultiplier: 2.0, dropRate: 0.04 },
    LEGENDARY: { name: 'Legendary', color: '#FFD700', statMultiplier: 2.5, dropRate: 0.01 }
};

const EQUIPMENT_POOL = [
    // Weapons
    { id: 'sword_of_fury', name: 'Sword of Fury', type: EQUIPMENT_TYPES.WEAPON, baseStats: { damage: 15, attackSpeed: 0.1 }, effect: 'crit_chance', effectValue: 10, icon: '⚔️' },
    { id: 'vampiric_blade', name: 'Vampiric Blade', type: EQUIPMENT_TYPES.WEAPON, baseStats: { damage: 10, lifesteal: 5 }, effect: 'lifesteal', effectValue: 5, icon: '🩸' },
    { id: 'lightning_staff', name: 'Lightning Staff', type: EQUIPMENT_TYPES.WEAPON, baseStats: { damage: 20, range: 50 }, effect: 'chain_lightning', effectValue: 2, icon: '⚡' },
    { id: 'frost_bow', name: 'Frost Bow', type: EQUIPMENT_TYPES.WEAPON, baseStats: { damage: 12, attackSpeed: 0.15 }, effect: 'slow_enemies', effectValue: 30, icon: '❄️' },
    
    // Armor
    { id: 'dragon_scale', name: 'Dragon Scale Armor', type: EQUIPMENT_TYPES.ARMOR, baseStats: { health: 50, armor: 10 }, effect: 'fire_resistance', effectValue: 25, icon: '🛡️' },
    { id: 'shadow_cloak', name: 'Shadow Cloak', type: EQUIPMENT_TYPES.ARMOR, baseStats: { health: 30, speed: 20 }, effect: 'dodge_chance', effectValue: 15, icon: '🦇' },
    { id: 'titan_plate', name: 'Titan Plate', type: EQUIPMENT_TYPES.ARMOR, baseStats: { health: 100, armor: 20 }, effect: 'knockback_immunity', effectValue: 1, icon: '🏔️' },
    
    // Accessories
    { id: 'berserker_charm', name: 'Berserker Charm', type: EQUIPMENT_TYPES.ACCESSORY, baseStats: { damage: 25 }, effect: 'damage_boost_low_hp', effectValue: 50, icon: '💢' },
    { id: 'phoenix_feather', name: 'Phoenix Feather', type: EQUIPMENT_TYPES.ACCESSORY, baseStats: { health: 40 }, effect: 'auto_revive', effectValue: 1, icon: '🔥' },
    { id: 'lucky_clover', name: 'Lucky Clover', type: EQUIPMENT_TYPES.ACCESSORY, baseStats: { xpGain: 25 }, effect: 'xp_boost', effectValue: 25, icon: '🍀' },
    
    // Rings
    { id: 'ring_of_haste', name: 'Ring of Haste', type: EQUIPMENT_TYPES.RING, baseStats: { attackSpeed: 0.3, speed: 15 }, effect: 'time_slow', effectValue: 10, icon: '💨' },
    { id: 'ring_of_regeneration', name: 'Ring of Regeneration', type: EQUIPMENT_TYPES.RING, baseStats: { health: 20 }, effect: 'health_regen', effectValue: 2, icon: '💚' },
    { id: 'ring_of_power', name: 'Ring of Power', type: EQUIPMENT_TYPES.RING, baseStats: { damage: 30 }, effect: 'ultimate_charge', effectValue: 50, icon: '💍' },

    // --- Expanded pool ---------------------------------------------------
    // The original thirteen were collected within a couple of minutes, after
    // which every drop was a duplicate. These deliberately use only stats that
    // are actually wired up (damage, health, speed, attackSpeed, armor, xpGain)
    // rather than declaring effects that do nothing.

    // Weapons
    { id: 'ruinblade',    name: 'Ruinblade',     type: EQUIPMENT_TYPES.WEAPON, baseStats: { damage: 22 }, icon: '🗡️' },
    { id: 'whisperfang',  name: 'Whisperfang',   type: EQUIPMENT_TYPES.WEAPON, baseStats: { damage: 8, attackSpeed: 0.25 }, icon: '🐍' },
    { id: 'emberbrand',   name: 'Emberbrand',    type: EQUIPMENT_TYPES.WEAPON, baseStats: { damage: 16, attackSpeed: 0.08 }, icon: '🔥' },
    { id: 'gravecaller',  name: 'Gravecaller',   type: EQUIPMENT_TYPES.WEAPON, baseStats: { damage: 19, health: 15 }, icon: '⚰️' },
    { id: 'stormpike',    name: 'Stormpike',     type: EQUIPMENT_TYPES.WEAPON, baseStats: { damage: 14, speed: 25 }, icon: '🔱' },

    // Armor
    { id: 'bonewrought',  name: 'Bonewrought Mail', type: EQUIPMENT_TYPES.ARMOR, baseStats: { health: 60, armor: 8 }, icon: '🦴' },
    { id: 'runed_shell',  name: 'Runed Carapace',   type: EQUIPMENT_TYPES.ARMOR, baseStats: { health: 35, armor: 14 }, icon: '🐢' },
    { id: 'wardens_aegis',name: "Warden's Aegis",   type: EQUIPMENT_TYPES.ARMOR, baseStats: { health: 80, armor: 6 }, icon: '🛡️' },
    { id: 'cinderplate',  name: 'Cinderplate',      type: EQUIPMENT_TYPES.ARMOR, baseStats: { health: 45, armor: 10 }, icon: '🌋' },
    { id: 'veilweave',    name: 'Veilweave',        type: EQUIPMENT_TYPES.ARMOR, baseStats: { health: 25, speed: 30, armor: 4 }, icon: '🕸️' },

    // Accessories
    { id: 'oath_token',   name: 'Oath Token',     type: EQUIPMENT_TYPES.ACCESSORY, baseStats: { damage: 18, health: 20 }, icon: '🎖️' },
    { id: 'ravener_fang', name: "Ravener's Fang", type: EQUIPMENT_TYPES.ACCESSORY, baseStats: { damage: 30 }, icon: '🦷' },
    { id: 'scholars_sigil', name: "Scholar's Sigil", type: EQUIPMENT_TYPES.ACCESSORY, baseStats: { xpGain: 40 }, icon: '📜' },
    { id: 'hollow_idol',  name: 'Hollow Idol',    type: EQUIPMENT_TYPES.ACCESSORY, baseStats: { health: 55, armor: 5 }, icon: '🗿' },

    // Rings
    { id: 'band_of_embers', name: 'Band of Embers',    type: EQUIPMENT_TYPES.RING, baseStats: { damage: 22, attackSpeed: 0.12 }, icon: '🔴' },
    { id: 'coil_of_years',  name: 'Coil of Years',     type: EQUIPMENT_TYPES.RING, baseStats: { xpGain: 30, health: 15 }, icon: '🌀' },
    { id: 'signet_onslaught', name: 'Signet of Onslaught', type: EQUIPMENT_TYPES.RING, baseStats: { attackSpeed: 0.35 }, icon: '⚡' },
    { id: 'loop_of_stone',  name: 'Loop of Stone',     type: EQUIPMENT_TYPES.RING, baseStats: { armor: 12, health: 25 }, icon: '🪨' },
];

// Audio Manager Class — Web Audio API
// Uses AudioContext.decodeAudioData() which decodes on a background thread,
// so playback never blocks the game loop (fixes iOS Safari stutter).
class AudioManager {
    constructor() {
        // AudioContext + gain graph (created on first user gesture — iOS autoplay policy)
        this.audioContext = null;
        this.soundGainNode = null;
        this.musicGainNode = null;

        // Decoded AudioBuffers — populated async via fetch + decodeAudioData
        this.soundBuffers = {};
        this.musicBuffers = {};

        // Music state
        this.currentMusicSource = null;
        this.currentMusicName = null;
        this._pendingMusic = null; // music to start once context / buffer is ready

        // Volume + enabled flags
        this.soundVolume = 0.5;
        this.musicVolume = 0.3;
        this.soundEnabled = true;
        this.musicEnabled = true;

        // Per-sound cooldowns (ms) to prevent rapid-fire spam
        // Tighter values for combat sounds — creating AudioBufferSourceNodes at
        // 10+ Hz still causes overhead when surrounded by a large group.
        this.soundCooldownMs = {
            'enemy-hit':   240,  // max ~4/sec — was 80ms (too spammy in groups)
            'player-hit':  200,
            'pickup-xp':   80,
            'shoot':       60,
            'enemy-death': 260,  // ~4/sec; a full horde wipe used to fire 6.6/sec
            'coin':          80,
            'bomber-fuse':  300,  // several bombers can light up at once
            'charger-windup': 300,
        };

        // Per-sound level trim, applied on top of the master effects volume.
        //
        // The set is deliberately NOT auto-normalised: a button click SHOULD be
        // quieter than a bomb, and flattening every clip to the same peak would
        // destroy the dynamics the sounds were designed with. This is only for
        // outliers that came back at the wrong level. Measured peaks: most
        // clips sit between 0.23 and 1.0, but event-cache arrived at 0.05 —
        // 26dB down, inaudible under combat, for a cue whose whole job is to
        // tell you a timed treasure exists.
        //
        // This is the right place to balance levels by ear without
        // regenerating anything.
        this.soundGain = {
            'event-cache': 6.0,

            // enemy-death came back at peak 1.0 — the same level as the bomb
            // and the boss dying — while firing on EVERY kill, several times a
            // second, for the whole run. A routine kill has no business being
            // the loudest thing in the mix. Pulled well down and given a longer
            // gate below; the two together are what stop it grinding.
            'enemy-death': 0.38,
            'enemy-hit':   0.6,
            'shoot':       0.75,
        };
        this.soundLastPlayed = {};

        // Load user settings from localStorage
        this.loadSettings();

        // Resume / create the AudioContext on the first user gesture.
        // iOS Safari suspends AudioContext until a touch or click occurs.
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
            // Remove once running
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

    // Create AudioContext and gain node graph
    _initContext() {
        if (this.audioContext) return;
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();

            // SFX chain: bufferSource → soundGainNode → destination
            this.soundGainNode = this.audioContext.createGain();
            this.soundGainNode.gain.value = this.soundEnabled ? this.soundVolume : 0;
            this.soundGainNode.connect(this.audioContext.destination);

            // Music chain: bufferSource → musicGainNode → destination
            this.musicGainNode = this.audioContext.createGain();
            this.musicGainNode.gain.value = this.musicEnabled ? this.musicVolume : 0;
            this.musicGainNode.connect(this.audioContext.destination);
        } catch (e) {
            console.warn('Web Audio API unavailable:', e);
        }
    }

    // Strip silence from both ends of a decoded effect.
    //
    // Silence at the FRONT is the one that matters: the sound starts playing on
    // the frame of the hit, so any lead-in is heard as the hit landing late,
    // and it makes the whole game feel mushy without being obvious why.
    // Generated audio routinely carries some — player-hit.mp3 arrived with
    // 48ms of it.
    //
    // Silence at the END costs nothing in timing but sits in memory for the
    // life of the page, and generated clips are padded to a requested duration
    // rather than to their content: shoot.mp3 is 0.24s of sound inside a 0.91s
    // file. Trimming here rather than re-encoding the files keeps it lossless
    // and means any file dropped in later gets the same treatment for free.
    trimSilence(buffer, threshold = 0.01) {
        const channels = buffer.numberOfChannels;
        const length = buffer.length;
        let first = length, last = 0;

        for (let c = 0; c < channels; c++) {
            const data = buffer.getChannelData(c);
            let i = 0;
            while (i < length && Math.abs(data[i]) <= threshold) i++;
            if (i < first) first = i;
            let j = length - 1;
            while (j > i && Math.abs(data[j]) <= threshold) j--;
            if (j > last) last = j;
        }

        // Silent or already tight — hand the original back untouched.
        if (first >= last) return buffer;
        // A couple of milliseconds of head start avoids clipping the very
        // first part of a soft attack, which would add a click.
        const pad = Math.round(buffer.sampleRate * 0.002);
        first = Math.max(0, first - pad);
        const newLength = last - first + 1;
        if (newLength >= length) return buffer;

        const out = this.audioContext.createBuffer(channels, newLength, buffer.sampleRate);
        for (let c = 0; c < channels; c++) {
            out.getChannelData(c).set(buffer.getChannelData(c).subarray(first, first + newLength));
        }
        return out;
    }

    // Load a sound effect asynchronously (fetch + background-thread decode)
    loadSound(name, path) {
        this._initContext();
        if (!this.audioContext) return;
        fetch(path)
            .then(r => r.arrayBuffer())
            .then(buf => this.audioContext.decodeAudioData(buf))
            .then(decoded => { this.soundBuffers[name] = this.trimSilence(decoded); })
            .catch(err => console.warn(`Audio load failed [${name}]:`, err));
    }

    // Load background music asynchronously
    loadMusic(name, path) {
        this._initContext();
        if (!this.audioContext) return;
        fetch(path)
            .then(r => r.arrayBuffer())
            .then(buf => this.audioContext.decodeAudioData(buf))
            .then(decoded => {
                this.musicBuffers[name] = decoded;
                // If this track was queued before the buffer was ready, play it now
                if (this._pendingMusic === name && this.audioContext.state === 'running') {
                    this.playMusic(name);
                    this._pendingMusic = null;
                }
            })
            .catch(err => console.warn(`Music load failed [${name}]:`, err));
    }

    // Play a sound effect — near-zero cost, runs off main thread
    playSound(name) {
        if (!this.soundEnabled) return;
        if (!this.audioContext || !this.soundBuffers[name]) return;

        // Per-sound cooldown to prevent spam
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

                const trim = this.soundGain[name];
                if (trim && trim !== 1) {
                    const gain = this.audioContext.createGain();
                    gain.gain.value = trim;
                    source.connect(gain);
                    gain.connect(this.soundGainNode);
                } else {
                    source.connect(this.soundGainNode);
                }
                source.start(0);
            } catch (e) {}
        };

        // If context is suspended (e.g. before first user gesture) resume then play.
        // This handles the case where the click handler fires before the document-level
        // resumeCtx listener, which is the common case on first tap/click.
        if (this.audioContext.state === 'suspended') {
            this.audioContext.resume().then(doPlay).catch(() => {});
        } else {
            doPlay();
        }
    }

    // Play looping background music
    playMusic(name) {
        if (!this.musicEnabled) return;
        if (!this.audioContext) return;

        // Stop whatever is currently playing
        this._stopMusicSource();

        if (!this.musicBuffers[name]) {
            // Buffer still downloading/decoding — defer until ready
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
            } catch (e) {
                console.warn('playMusic error:', e);
            }
        };

        if (this.audioContext.state === 'suspended') {
            // Resume the context (requires being called from a user-gesture handler),
            // then play. Store as pending so resumeCtx can also pick it up as fallback.
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

    stopMusic() {
        this._stopMusicSource();
        this._pendingMusic = null;
    }

    setSoundVolume(volume) {
        this.soundVolume = Math.max(0, Math.min(1, volume));
        if (this.soundGainNode) this.soundGainNode.gain.value = this.soundEnabled ? this.soundVolume : 0;
        this.saveSettings();
    }

    setMusicVolume(volume) {
        this.musicVolume = Math.max(0, Math.min(1, volume));
        if (this.musicGainNode) this.musicGainNode.gain.value = this.musicEnabled ? this.musicVolume : 0;
        this.saveSettings();
    }

    toggleSound() {
        this.soundEnabled = !this.soundEnabled;
        if (this.soundGainNode) this.soundGainNode.gain.value = this.soundEnabled ? this.soundVolume : 0;
        this.saveSettings();
    }

    toggleMusic() {
        this.musicEnabled = !this.musicEnabled;
        if (this.musicGainNode) this.musicGainNode.gain.value = this.musicEnabled ? this.musicVolume : 0;
        if (!this.musicEnabled) {
            this._stopMusicSource();
        } else if (this.currentMusicName) {
            this.playMusic(this.currentMusicName);
        }
        this.saveSettings();
    }

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
        localStorage.setItem('audioSettings', JSON.stringify({
            soundVolume: this.soundVolume,
            musicVolume: this.musicVolume,
            soundEnabled: this.soundEnabled,
            musicEnabled: this.musicEnabled
        }));
    }
}

class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();

        // World space (the playfield) is separate from screen space (the
        // viewport). The camera is the only thing that maps between them.
        this.setupWorld();
        this.camera = new Camera(this);
        
        // Game state
        this.isRunning = false;
        this.isPaused = false;
        this.gameTime = 0;
        this.lastTime = 0;
        this.animationFrameId = null; // Track rAF to cancel on restart
        this.activeTimers = []; // Track setInterval/setTimeout for cleanup
        
        // HUD throttle — update DOM only every 100ms, not every frame
        this.lastHUDUpdate = 0;
        this.hudUpdateInterval = 0.1; // seconds
        
        // Player
        this.player = null;
        this.selectedCharacter = null;
        
        // Co-op mode
        this.coopMode = false;
        this.player2 = null;
        this.selectedCharacter2 = null;
        this.keys2 = {}; // P2 key state (IJKL + U for ultimate)
        
        // Game objects
        this.projectiles = [];
        this.enemies = [];
        this.xpOrbs = [];
        this.healthPickups = [];
        this.equipmentDrops = [];
        this.particles = [];
        this.effects = new EffectLayer(this);
        // Punctuates the long flat stretch between bosses. See ArenaEvents.js.
        this.eventDirector = new ArenaEventDirector(this);
        this.screenShake = 0;
        // Hit-stop: seconds of frozen simulation remaining. Rendering keeps
        // running, so the frame an impact lands on is held on screen. Nothing
        // moves, so the eye reads the collision instead of skating past it.
        this.hitStop = 0;
        this.bossLull = 0;
        // Slow motion. Hit-stop stops time dead; this stretches it, which is
        // what a cinematic beat wants — the player still sees movement.
        this.timeScale = 1;
        // While set, the camera looks here instead of at the players.
        this.cameraOverride = null;
        this.bossEntrance = 0;
        this.zoom = 1;
        this.zoomFocus = null;
        this.ultimateFocus = 0;
        this.ultimateFocusPlayer = null;
        this.stageIntro = 0;
        
        // Cache DOM references to avoid getElementById every frame
        this._hudElements = null;
        
        // Input
        this.keys = {};
        this.setupInputHandlers();
        this.setupTouchControls();
        
        // UI Elements
        this.setupUI();
        
        // Image loading
        this.images = {};
        this.imagesLoaded = false;
        this.loadImages();
        
        // Audio Manager
        this.audioManager = new AudioManager();
        
        // Mobile detection and performance settings
        this.isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        this.performanceMode = this.isMobile; // Auto-enable performance mode on mobile
        this.lastFrameTime = 0;
        this.targetFrameTime = this.isMobile ? 1000 / 30 : 1000 / 60; // 30fps on mobile, 60fps on desktop
        
        // Load audio on all devices — Web Audio API decodes on background thread (no stutter)
        this.loadAudio();
        
        // Game settings
        this.waveMultiplier = 1.0;
        
        // Stage System
        this.currentStage = 1;
        this.stageTimeLimit = 90; // 90 seconds per stage before boss
        this.stageStartTime = 0;
        this.coins = 0; // Currency for shop
        // Scrap: the upgrade currency. Coins BUY gear, scrap IMPROVES it, and
        // scrap comes only from selling gear you have outgrown — so the two
        // economies feed different things and a hoard of one cannot solve the
        // other. Levelling used to cost coins, which meant shop purchases and
        // upgrades competed for the same pile.
        this.scrap = 0;
        
        // Boss system
        this.bossActive = false;
        this.bossWarning = false;
        this.bossWarningTime = 0;
this.currentBoss = null;

        // Minimap starts on; the preference survives between runs.
        this.minimapVisible = true;
        try {
            const saved = localStorage.getItem('vitalisArenaMinimap');
            if (saved !== null) this.minimapVisible = saved === '1';
        } catch (err) {}
        this.pendingLevelUp = false;
        
        // Equipment system
        this.availableEquipment = []; // Equipment available in shop
        this.pendingEquipment = null; // Equipment to show after boss defeat
        this.playerInventory = []; // All equipment owned by player
        this.savedEquipment = { weapon: null, armor: null, accessory: null, ring: null }; // Equipment loadout
        
        // Separate spawn timers for each enemy type
        this.enemySpawnTimers = {
            basic: { lastSpawn: 0, cooldown: this.isMobile ? 1200 : 800 },   // Slower on mobile
            fast: { lastSpawn: 0, cooldown: this.isMobile ? 2800 : 1800 },   // Slower on mobile
            tank: { lastSpawn: 0, cooldown: this.isMobile ? 6000 : 4000 }    // Slower on mobile
        };
        
        // Chests, coin pickups and floating damage numbers
        this.chests = [];
        this.coinPickups = [];
        this.damageNumbers = [];

        // Wave director state
        this.currentWaveId = 0;
        this.currentWaveName = '';

        // Only one level-up screen may be open at a time (matters in co-op)
        this.levelUpScreenOwner = null;

        // Chest reward flow
        this.pendingChestReward = null;

        // Permanent (meta) upgrades bought between runs
        this.metaUpgradeLevels = this.loadMetaUpgrades();

        // Per-run tallies used by the game over summary
        this.runStats = this.createRunStats();

        // Debug performance overlay (toggle with F3)
        this.showDebug = false;
        this.fps = 0;

        // Achievement System
        this.achievements = this.loadAchievements();
        this.sessionStats = {
            bosses: 0,
            recentKills: [],
            characterWins: new Set()
        };
        this.achievementQueue = [];
        
        // Load saved data
        this.loadInventory();
        this.loadCoins();
        this.loadScrap();
        this.loadSavedEquipment();
        
        window.addEventListener('resize', () => this.resizeCanvas());
        
        // Listen for visual viewport resize only (NOT scroll - scroll fires constantly during gameplay)
        if (window.visualViewport) {
            window.visualViewport.addEventListener('resize', () => this.resizeCanvas());
        }
        
        // Animated title backdrop (no-op on mobile / reduced motion)
        this.titleBackground = new TitleBackground('video/title-loop.mp4');
        this.titleBackground.start();

        // Mobile orientation and fullscreen handling
        this.setupMobileDisplay();
    }
    
    setupMobileDisplay() {
        // Detect if on mobile
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        if (isMobile) {
            // Request fullscreen when game starts
            const requestFullscreen = () => {
                const elem = document.documentElement;
                if (elem.requestFullscreen) {
                    elem.requestFullscreen().catch(err => console.log('Fullscreen error:', err));
                } else if (elem.webkitRequestFullscreen) {
                    elem.webkitRequestFullscreen();
                } else if (elem.msRequestFullscreen) {
                    elem.msRequestFullscreen();
                }
                
                // Lock to landscape orientation
                if (screen.orientation && screen.orientation.lock) {
                    screen.orientation.lock('landscape').catch(err => console.log('Orientation lock error:', err));
                }
            };
            
            // Request fullscreen once, on the first touch. The previous code
            // re-requested it a second after every exit, which fights both the
            // player and itch.io's own fullscreen control inside its iframe.
            document.addEventListener('touchstart', () => {
                if (!document.fullscreenElement && !document.webkitFullscreenElement) {
                    requestFullscreen();
                }
            }, { once: true });
        }
    }

    // World size is fixed by config, not by the viewport, so resizing the
    // window never changes the size of the playfield. The only exception is a
    // viewport larger than the configured world, which would otherwise show
    // empty space outside it.
    setupWorld() {
        const cfg = GAME_CONFIG.world;
        if (!cfg.scroll) {
            // Classic arena: world == viewport, camera clamps to identity.
            this.world = { width: this.canvas.width, height: this.canvas.height };
            return;
        }
        this.world = {
            width: Math.max(cfg.width, this.canvas.width),
            height: Math.max(cfg.height, this.canvas.height)
        };
    }

    // Point the camera should centre on. In co-op that is the midpoint between
    // the players; solo it degenerates to the player's own position.
    getCameraFocus() {
        // A cinematic can take the camera off the players entirely.
        if (this.cameraOverride) return this.cameraOverride;

        const alive = [this.player, this.player2].filter(p => p && p.health > 0);
        if (alive.length === 0) return { x: this.world.width / 2, y: this.world.height / 2 };
        if (alive.length === 1) return { x: alive[0].x, y: alive[0].y };
        return {
            x: (alive[0].x + alive[1].x) / 2,
            y: (alive[0].y + alive[1].y) / 2
        };
    }

    // One camera, two players: past a maximum separation, ease both back toward
    // their midpoint so neither can walk off the edge of the shared view.
    enforceCoopLeash(deltaTime) {
        const p1 = this.player;
        const p2 = this.player2;
        if (!p1 || !p2 || p1.health <= 0 || p2.health <= 0) return;

        const max = GAME_CONFIG.world.coopMaxSeparation;
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        const dist = Math.hypot(dx, dy);
        if (dist <= max || dist === 0) return;

        // Pull each player halfway to the allowed radius. Eased rather than
        // snapped so it reads as resistance, not a teleport.
        const overshoot = (dist - max) / 2;
        const pull = Math.min(overshoot, 400 * deltaTime);
        const nx = dx / dist;
        const ny = dy / dist;

        if (!p1.downed) { p1.x += nx * pull; p1.y += ny * pull; }
        if (!p2.downed) { p2.x -= nx * pull; p2.y -= ny * pull; }
    }

    resizeCanvas() {
        // Use visual viewport for mobile browsers (accounts for browser chrome)
        const viewport = window.visualViewport;
        let width, height;
        
        if (viewport) {
            width = viewport.width;
            height = viewport.height;
        } else {
            width = window.innerWidth || document.documentElement.clientWidth;
            height = window.innerHeight || document.documentElement.clientHeight;
        }
        
        // Set canvas to full resolution - game ran fine at native res before optimizations
        this.canvas.width = width;
        this.canvas.height = height;
        this.canvas.style.width = width + 'px';
        this.canvas.style.height = height + 'px';
        
        // A viewport larger than the configured world would show empty space
        // past its edges, so re-derive the world whenever the canvas changes.
        if (this.world) this.setupWorld();

        // Resize ALL screens to match viewport (fixes Safari browser chrome issue)
        const screens = document.querySelectorAll('.screen');
        screens.forEach(screen => {
            screen.style.width = width + 'px';
            screen.style.height = height + 'px';
        });
        
        // Ensure game screen container is also sized correctly
        const gameScreen = document.getElementById('gameScreen');
        if (gameScreen && gameScreen.classList.contains('active')) {
            gameScreen.style.width = width + 'px';
            gameScreen.style.height = height + 'px';
        }
    }
    
    setupInputHandlers() {
        window.addEventListener('keydown', (e) => {
            this.keys[e.key.toLowerCase()] = true;
            
            // P2 keys: IJKL for movement, U for ultimate
            if (this.coopMode) {
                const p2KeyMap = { 'i': 'w', 'j': 'a', 'k': 's', 'l': 'd' };
                if (p2KeyMap[e.key.toLowerCase()]) {
                    this.keys2[p2KeyMap[e.key.toLowerCase()]] = true;
                }
                if (e.key.toLowerCase() === 'u' && this.player2 && this.player2.ultimateReady && this.isRunning && !this.isPaused) {
                    this.player2.useUltimate(this);
                }
            }
            
            // M toggles the minimap. Some players want the screen clean, and
            // co-op in particular is already busy in that corner.
            if (e.key.toLowerCase() === 'm' && this.isRunning) {
                this.minimapVisible = !this.minimapVisible;
                document.getElementById('minimapWrap')
                    ?.classList.toggle('hidden', !this.minimapVisible);
                try { localStorage.setItem('vitalisArenaMinimap', this.minimapVisible ? '1' : '0'); } catch (err) {}
            }

            // ESC key toggles pause
            if (e.key === 'Escape' && this.isRunning) {
                this.togglePause();
            }

            // F3 toggles the performance overlay
            if (e.key === 'F3') {
                e.preventDefault();
                this.showDebug = !this.showDebug;
            }
        });
        
        window.addEventListener('keyup', (e) => {
            this.keys[e.key.toLowerCase()] = false;
            
            // P2 keys
            if (this.coopMode) {
                const p2KeyMap = { 'i': 'w', 'j': 'a', 'k': 's', 'l': 'd' };
                if (p2KeyMap[e.key.toLowerCase()]) {
                    this.keys2[p2KeyMap[e.key.toLowerCase()]] = false;
                }
            }
        });
    }
    
    setupTouchControls() {
        // Touch state
        this.touchState = {
            joystick: { active: false, x: 0, y: 0, touchId: null },
            fire: { active: false, touchId: null }
        };
        
        const joystickContainer = document.getElementById('joystickContainer');
        const joystickStick = document.getElementById('joystickStick');
        const fireButton = document.getElementById('fireButton');
        
        if (!joystickContainer || !fireButton) return; // Desktop mode
        
        // Virtual Joystick
        joystickContainer.addEventListener('touchstart', (e) => {
            const touch = e.touches[0];
            this.touchState.joystick.active = true;
            this.touchState.joystick.touchId = touch.identifier;
            this.updateJoystick(touch, joystickContainer, joystickStick);
        }, { passive: true });
        
        joystickContainer.addEventListener('touchmove', (e) => {
            const touch = Array.from(e.touches).find(t => t.identifier === this.touchState.joystick.touchId);
            if (touch && this.touchState.joystick.active) {
                this.updateJoystick(touch, joystickContainer, joystickStick);
            }
        }, { passive: true });
        
        joystickContainer.addEventListener('touchend', (e) => {
            e.preventDefault();
            this.touchState.joystick.active = false;
            this.touchState.joystick.x = 0;
            this.touchState.joystick.y = 0;
            joystickStick.style.transform = 'translate(-50%, -50%)';
            // Clear movement keys
            this.keys['w'] = false;
            this.keys['a'] = false;
            this.keys['s'] = false;
            this.keys['d'] = false;
        });
        
        // Ultimate Button (Mobile)
        fireButton.addEventListener('touchstart', (e) => {
            // Trigger ultimate ability if ready
            if (this.player && this.player.ultimateReady && this.isRunning && !this.isPaused) {
                this.player.useUltimate(this);
            }
        }, { passive: true });
        
        fireButton.addEventListener('touchend', () => {}, { passive: true });
        
        // touch-action: none on joystick/fire-button CSS handles scroll prevention
        // No passive:false listeners needed
    }
    
    updateJoystick(touch, container, stick) {
        const rect = container.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        let deltaX = touch.clientX - centerX;
        let deltaY = touch.clientY - centerY;
        
        // Limit movement to joystick radius
        const maxDistance = rect.width / 2 - 30; // 30px for stick size
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        
        if (distance > maxDistance) {
            const angle = Math.atan2(deltaY, deltaX);
            deltaX = Math.cos(angle) * maxDistance;
            deltaY = Math.sin(angle) * maxDistance;
        }
        
        // Update stick position
        stick.style.transform = `translate(calc(-50% + ${deltaX}px), calc(-50% + ${deltaY}px))`;
        
        // Normalize to -1 to 1 range
        this.touchState.joystick.x = deltaX / maxDistance;
        this.touchState.joystick.y = deltaY / maxDistance;
        
        // Update key states based on joystick direction (with dead zone)
        const deadZone = 0.2;
        this.keys['w'] = this.touchState.joystick.y < -deadZone;
        this.keys['s'] = this.touchState.joystick.y > deadZone;
        this.keys['a'] = this.touchState.joystick.x < -deadZone;
        this.keys['d'] = this.touchState.joystick.x > deadZone;
    }
    
    loadImages() {
        const imagesToLoad = {
            warrior: 'images/warrior.png',
            ranger: 'images/ranger.png',
            mage: 'images/mage.png',
            assassin: 'images/assassin.png',
            tank: 'images/tank.png',
            enemy_basic: 'images/enemy_basic.png',
            enemy_fast: 'images/enemy_fast.png',
            enemy_tank: 'images/enemy_tank.png',
            enemy_crawler: 'images/demon_grunt.png',
            enemy_elite: 'images/demon.png',
            enemy_boss: 'images/demon_boss.png',

            // The five behavioural enemies used to borrow an ordinary enemy's
            // sprite, so a Bomber (detonates for 24 in a 118px radius) was
            // pixel-identical to a Stalker (harmless when it dies). The player
            // could not learn the rule because there was nothing to see.
            enemy_bomber: 'images/enemy_bomber.png',
            enemy_charger: 'images/enemy_charger.png',
            enemy_spitter: 'images/enemy_spitter.png',
            enemy_splitter: 'images/enemy_splitter.png',
            enemy_spawnling: 'images/enemy_spawnling.png',

            // Each boss archetype now has its own art too — the Emberlord was
            // sharing the elite sprite and the Colossus the generic boss one.
            boss_warden: 'images/boss_warden.png',
            boss_emberlord: 'images/boss_emberlord.png',
            boss_colossus: 'images/boss_colossus.png'
        };
        
        let loadedCount = 0;
        const totalImages = Object.keys(imagesToLoad).length;
        
        for (const [key, src] of Object.entries(imagesToLoad)) {
            const img = new Image();
            img.onload = () => {
                loadedCount++;
                if (loadedCount === totalImages) {
                    this.imagesLoaded = true;
                    console.log('All sprites loaded successfully!');
                }
            };
            img.onerror = () => {
                console.warn(`Failed to load sprite: ${src} - using fallback circles`);
                loadedCount++;
                if (loadedCount === totalImages) {
                    this.imagesLoaded = true;
                }
            };
            img.src = src;
            this.images[key] = img;
        }
    }
    
    loadAudio() {
        // Load sound effects (small files - safe to preload)
        this.audioManager.loadSound('shoot', 'sounds/shoot.mp3');
        this.audioManager.loadSound('enemy-hit', 'sounds/enemy-hit.mp3');
        this.audioManager.loadSound('enemy-death', 'sounds/enemy-death.mp3');
        this.audioManager.loadSound('player-hit', 'sounds/player-hit.mp3');
        this.audioManager.loadSound('level-up', 'sounds/level-up.mp3');
        this.audioManager.loadSound('boss-warning', 'sounds/boss-warning.mp3');
        this.audioManager.loadSound('boss-defeat', 'sounds/boss-defeat.mp3');
        this.audioManager.loadSound('pickup-xp', 'sounds/pickup-xp.mp3');
        this.audioManager.loadSound('pickup-health', 'sounds/pickup-health.mp3');
        this.audioManager.loadSound('pickup-equipment', 'sounds/pickup-equipment.mp3');
        this.audioManager.loadSound('equip-item', 'sounds/equip-item.mp3');
        this.audioManager.loadSound('ultimate', 'sounds/ultimate.mp3');
        this.audioManager.loadSound('button-click', 'sounds/button-click.mp3');

        // Events that had no voice of their own. Until the files exist these
        // resolve to nothing and playSound is a no-op, so shipping the calls
        // ahead of the audio is safe.
        this.audioManager.loadSound('boss-phase', 'sounds/boss-phase.mp3');
        this.audioManager.loadSound('player-death', 'sounds/player-death.mp3');
        this.audioManager.loadSound('bomber-fuse', 'sounds/bomber-fuse.mp3');
        this.audioManager.loadSound('charger-windup', 'sounds/charger-windup.mp3');
        this.audioManager.loadSound('event-pack', 'sounds/event-pack.mp3');
        this.audioManager.loadSound('event-surge', 'sounds/event-surge.mp3');
        this.audioManager.loadSound('event-cache', 'sounds/event-cache.mp3');
        this.audioManager.loadSound('chest-open', 'sounds/chest-open.mp3');
        this.audioManager.loadSound('bomb', 'sounds/bomb.mp3');
        this.audioManager.loadSound('evolution', 'sounds/evolution.mp3');
        this.audioManager.loadSound('stage-complete', 'sounds/stage-complete.mp3');
        this.audioManager.loadSound('boss-slam', 'sounds/boss-slam.mp3');
        this.audioManager.loadSound('coin', 'sounds/coin.mp3');
        
        // Register music paths (lazy-loaded on demand to save memory)
        this.audioManager.loadMusic('menu-theme', 'sounds/menu-theme.mp3');
        this.audioManager.loadMusic('game-theme', 'sounds/game-theme.mp3');
        this.audioManager.loadMusic('boss-theme', 'sounds/boss-theme.mp3');
    }
    
    setupUI() {
        // Title screen - press start
        const titleScreen = document.getElementById('titleScreen');
        const pressStartHandler = () => {
            // Enable audio on first user interaction (browser autoplay policy)
            this.audioManager.playSound('button-click');
            
            // Small delay to ensure audio context is unlocked before playing music
            setTimeout(() => {
                this.showCharacterSelect();
            }, 100);
        };
        
        // Click to start
        titleScreen.addEventListener('click', pressStartHandler);
        
        // Any key to start (but only when title screen is active)
        const keyStartHandler = (e) => {
            if (titleScreen.classList.contains('active')) {
                this.audioManager.playSound('button-click');
                pressStartHandler();
            }
        };
        window.addEventListener('keydown', keyStartHandler, { once: true });
        
        // Character selection — P1 click starts game (or picks P1 in co-op)
        const characterCards = document.querySelectorAll('.character-card');
        characterCards.forEach(card => {
            card.addEventListener('click', () => {
                this.audioManager.playSound('button-click');
                
                if (this.coopMode && !this.selectedCharacter) {
                    // Co-op: first click picks P1
                    this.selectedCharacter = card.dataset.character;
                    card.classList.add('selected');
                    // Update subtitle to prompt P2
                    document.querySelector('.game-subtitle').textContent = 'P2 — Pick Your Hero!';
                } else if (this.coopMode && this.selectedCharacter && !this.selectedCharacter2) {
                    // Co-op: second click picks P2
                    this.selectedCharacter2 = card.dataset.character;
                    card.classList.add('p2-selected');
                    document.getElementById('p2SelectedChar').textContent = card.querySelector('h2').textContent;
                    // Start the game
                    this.startGame();
                } else {
                    // Solo mode
                    this.selectCharacter(card.dataset.character);
                }
            });
        });
        
        // Co-op toggle button
        const coopBtn = document.getElementById('coopToggleBtn');
        if (coopBtn) {
            coopBtn.addEventListener('click', () => {
                this.audioManager.playSound('button-click');
                this.coopMode = !this.coopMode;
                coopBtn.classList.toggle('active', this.coopMode);
                coopBtn.querySelector('.coop-icon').textContent = this.coopMode ? '👥' : '👤';
                coopBtn.querySelector('.coop-label').textContent = this.coopMode ? 'Co-op Mode' : 'Solo Mode';
                
                const p2Banner = document.getElementById('p2SelectBanner');
                p2Banner.style.display = this.coopMode ? 'block' : 'none';
                
                // Update subtitle
                document.querySelector('.game-subtitle').textContent = this.coopMode
                    ? 'P1 — Pick Your Hero First!'
                    : 'Select Your Hero';
                
                // Reset any partial selection
                this.selectedCharacter = null;
                this.selectedCharacter2 = null;
                document.querySelectorAll('.character-card').forEach(c => {
                    c.classList.remove('selected', 'p2-selected');
                });
                document.getElementById('p2SelectedChar').textContent = 'None';
            });
        }
        
        // Game over buttons
        document.getElementById('restartBtn').addEventListener('click', () => {
            this.audioManager.playSound('button-click');
            this.restart();
        });
        
        document.getElementById('backToSelectBtn').addEventListener('click', () => {
            this.audioManager.playSound('button-click');
            this.backToSelect();
        });
        
        // Ultimate button
        document.getElementById('ultimateButton').addEventListener('click', () => {
            if (this.player && this.player.ultimateReady && this.isRunning && !this.isPaused) {
                this.player.useUltimate(this);
            }
        });
        
        // Pause button
        document.getElementById('pauseButton').addEventListener('click', () => {
            this.audioManager.playSound('button-click');
            this.togglePause();
        });
        
        // Resume button
        document.getElementById('resumeBtn').addEventListener('click', () => {
            this.audioManager.playSound('button-click');
            this.togglePause();
        });
        
        // Quit button (from pause screen)
        document.getElementById('quitBtn').addEventListener('click', () => {
            this.audioManager.playSound('button-click');
            this.backToSelect();
        });
        
        // View Full Inventory button (from pause screen)
        document.getElementById('viewFullInventoryBtn')?.addEventListener('click', () => {
            this.audioManager.playSound('button-click');
            this.openInventory();
        });
        
        // Achievements button
        document.getElementById('achievementsBtn')?.addEventListener('click', () => {
            this.audioManager.playSound('button-click');
            this.showAchievements();
        });
        
        // Close achievements button
        document.getElementById('closeAchievements')?.addEventListener('click', () => {
            this.audioManager.playSound('button-click');
            document.getElementById('achievementsPanel').classList.remove('active');
        });
        
        // Stage complete - next stage button
        document.getElementById('nextStageBtn')?.addEventListener('click', () => {
            this.audioManager.playSound('button-click');
            this.advanceStage();
        });
        
        // Shop button
        document.getElementById('shopButton')?.addEventListener('click', () => {
            this.audioManager.playSound('button-click');
            this.openShop();
        });
        
        // Menu shop button
        document.getElementById('menuShopBtn')?.addEventListener('click', () => {
            this.audioManager.playSound('button-click');
            this.openShop();
        });
        
        // Close shop button
        document.getElementById('closeShopBtn')?.addEventListener('click', () => {
            this.audioManager.playSound('button-click');
            this.closeShop();
        });
        
        // Refresh shop button
        document.getElementById('refreshShopBtn')?.addEventListener('click', () => {
            this.audioManager.playSound('button-click');
            if (this.coins >= 50) {
                this.coins -= 50;
                this.saveCoins();
                this.refreshShopInventory();
            }
        });
        
        // Inventory button
        document.getElementById('inventoryBtn')?.addEventListener('click', () => {
            this.audioManager.playSound('button-click');
            this.openInventory();
        });
        
        // Optimise equipment button
        document.getElementById('optimizeEquipmentBtn')?.addEventListener('click', () => {
            this.audioManager.playSound('button-click');
            this.optimizeEquipment();
        });

        // Same optimiser, offered at the moment it is most useful: a stage has
        // just handed you a new item, so the loadout is most likely stale here.
        document.getElementById('stageOptimizeBtn')?.addEventListener('click', () => {
            this.audioManager.playSound('button-click');
            this.optimizeEquipment();
        });

        // Close inventory button
        document.getElementById('closeInventoryBtn')?.addEventListener('click', () => {
            this.audioManager.playSound('button-click');
            this.closeInventory();
        });

        // Victory screen
        document.getElementById('victoryEndlessBtn')?.addEventListener('click', () => {
            this.audioManager.playSound('button-click');
            document.getElementById('victoryScreen').classList.remove('active');
            this.endlessMode = true;
            this.startGame();
        });
        document.getElementById('victoryMenuBtn')?.addEventListener('click', () => {
            this.audioManager.playSound('button-click');
            document.getElementById('victoryScreen').classList.remove('active');
            this.endlessMode = false;
            this.backToSelect();
        });

        // Endless toggle — only meaningful once the campaign has been cleared.
        document.getElementById('endlessToggleBtn')?.addEventListener('click', () => {
            this.audioManager.playSound('button-click');
            this.endlessMode = !this.endlessMode;
            this.refreshEndlessToggle();
        });

        // Permanent upgrade shop
        document.getElementById('metaShopBtn')?.addEventListener('click', () => {
            this.audioManager.playSound('button-click');
            this.openMetaShop();
        });
        document.getElementById('closeMetaShopBtn')?.addEventListener('click', () => {
            this.audioManager.playSound('button-click');
            this.closeMetaShop();
        });
        document.getElementById('resetSaveBtn')?.addEventListener('click', () => {
            if (confirm('Erase ALL saved progress \u2014 coins, equipment, achievements and permanent upgrades? This cannot be undone.')) {
                this.resetSaveData();
            }
        });
    }
    
    // The toggle stays hidden until there is something to toggle.
    refreshEndlessToggle() {
        const btn = document.getElementById('endlessToggleBtn');
        if (!btn) return;
        if (!this.isEndlessUnlocked()) { btn.style.display = 'none'; return; }
        btn.style.display = '';
        btn.textContent = this.endlessMode ? '\u267e\ufe0f Endless: On' : '\u267e\ufe0f Endless: Off';
        btn.classList.toggle('active', !!this.endlessMode);
    }

    showCharacterSelect() {
        // Leaving the title screen — release the video decoder.
        if (this.titleBackground) this.titleBackground.stop();
        document.getElementById('titleScreen').classList.remove('active');
        document.getElementById('characterSelect').classList.add('active');
        this.refreshEndlessToggle();
        
        // Start menu music
        this.audioManager.playMusic('menu-theme');
    }
    
    selectCharacter(characterType) {
        this.selectedCharacter = characterType;
        this.startGame();
    }
    
    startGame() {
        // Hide character select, show game screen
        document.getElementById('characterSelect').classList.remove('active');
        document.getElementById('gameScreen').classList.add('active');
        
        // Start game music
        this.audioManager.playMusic('game-theme');
        
        // Initialize player
        this.player = new Player(
            this.world.width / 2,
            this.world.height / 2,
            this.selectedCharacter,
            this
        );
        
        // Initialize Player 2 in co-op mode
        if (this.coopMode && this.selectedCharacter2) {
            this.player2 = new Player(
                this.world.width / 2 + 60,
                this.world.height / 2,
                this.selectedCharacter2,
                this
            );
            this.player2.isP2 = true; // Flag for rendering differences
            document.getElementById('p2Hud').style.display = 'block';
        } else {
            this.player2 = null;
            document.getElementById('p2Hud').style.display = 'none';
        }
        
        // Apply saved equipment loadout
        Object.entries(this.savedEquipment).forEach(([slot, equipment]) => {
            if (equipment) {
                this.player.equipItem(equipment);
            }
        });
        
        // Reset game state
        this.projectiles = [];
        this.enemies = [];
        this.xpOrbs = [];
        this.healthPickups = [];
        this.equipmentDrops = [];
        this.particles = [];
        this.effects.clear();
        this.eventDirector.reset();
        this.hitStop = 0;
        this.bossLull = 0;
        this.timeScale = 1;
        this.cameraOverride = null;
        this.bossEntrance = 0;
        this.zoom = 1;
        this.zoomFocus = null;
        this.ultimateFocus = 0;
        this.ultimateFocusPlayer = null;
        this.stageIntro = 0;
        // A run that ended mid-ultimate left timeScale slowed; without this the
        // next run starts in slow motion.
        this.timeScale = 1;
        document.getElementById('bossEntrance')?.classList.remove('active');
        document.getElementById('stageIntro')?.classList.remove('active');
        this.chests = [];
        this.coinPickups = [];
        this.damageNumbers = [];
        this.gameTime = 0;
        this.waveMultiplier = 1.0;

        // Endless is opt-in and only offered once the campaign has been won.
        if (this.endlessMode && !this.isEndlessUnlocked()) this.endlessMode = false;

        // Wave director / chest / level-up flow state
        this.currentWaveId = 0;
        this.currentWaveName = '';
        this.levelUpScreenOwner = null;
        this.chestRewardReady = false;
        this.runStats = this.createRunStats();
        this._loadoutSignature = null;

        // Close any panel that could still be open from a previous run.
        // Those panels own the pause flag while they are up, and a run that ends
        // underneath one (the chest close handler bails out on !isRunning) can
        // leave isPaused stuck true — which would start the next run frozen,
        // since update() early-returns on it. Clear it with them.
        ['levelUpScreen', 'chestPanel', 'stageCompletePanel'].forEach(id => {
            document.getElementById(id)?.classList.remove('active');
        });
        this.isPaused = false;

        // The saved minimap preference has to reach the DOM at run start too,
        // not only when the key is pressed — otherwise a player who turned it
        // off last session sees it again every time they start.
        document.getElementById('minimapWrap')
            ?.classList.toggle('hidden', !this.minimapVisible);

        // Permanent upgrade: bonus coins at the start of every run
        const startCoins = this.getMetaBonuses().startCoins;
        if (startCoins > 0) this.addCoins(startCoins);
        
        // Reset stage system
        this.currentStage = 1;
        this.stageStartTime = 0;
        // Keep coins persistent - don't reset
        this.bossActive = false;
        this.bossWarning = false;
        // A run that ends mid-boss-fight (death, or quit to menu) never reaches
        // defeatBoss(), which is the only place this is cleared. Left set, it
        // keeps the previous run's boss alive as the health-bar and camera
        // target until the next boss happens to overwrite it.
        this.currentBoss = null;
        this.pendingEquipment = null;
        
        // Spawn timers are created on demand by the wave director.
        this.enemySpawnTimers = {};
        
        // Reset ultimate button
        document.getElementById('ultimateButton').classList.remove('ready');
        // Also reset mobile ultimate button
        const fireBtn = document.getElementById('fireButton');
        if (fireBtn) fireBtn.classList.remove('ready');
        
        // Reset session stats
        this.sessionStats = {
            bosses: 0,
            recentKills: [],
            characterWins: new Set()
        };
        
        // Cancel any previous game loop to prevent stacking
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
        // Clear any lingering timers from previous run (ultimate abilities etc.)
        this.clearActiveTimers();
        
        // Place the camera on the player before the first frame renders.
        this.setupWorld();
        this.camera.snapTo(this.player.x, this.player.y);

        // Cache HUD DOM references
        this._cacheHUDElements();
        
        // Start game loop
        this.isRunning = true;
        this.lastTime = performance.now();
        this.animationFrameId = requestAnimationFrame((time) => this.gameLoop(time));
    }
    
    gameLoop(currentTime) {
        if (!this.isRunning) return;
        
        // Cap deltaTime to 100ms max — prevents physics/collision spiral if browser
        // pauses (GC, audio decode, tab switch) and resumes with a huge gap
        const rawDelta = (currentTime - this.lastTime) / 1000;
        let deltaTime = Math.min(rawDelta, 0.1);

        // Smoothed FPS so the debug readout is stable enough to read.
        if (rawDelta > 0) this.fps = this.fps * 0.9 + (1 / rawDelta) * 0.1;
        this.lastTime = currentTime;
        this.lastFrameTime = currentTime;
        
        // Freeze the simulation, not the render loop. gameTime is held with
        // it, so waves, boss timers and stage length are unaffected by juice.
        if (this.hitStop > 0) {
            this.hitStop = Math.max(0, this.hitStop - rawDelta);
            this.render();
            this.animationFrameId = requestAnimationFrame((time) => this.gameLoop(time));
            return;
        }

        // Cinematic slow motion. Applied after the hit-stop gate so the two
        // never fight: hit-stop is a hard freeze, this is a stretch.
        deltaTime *= this.timeScale;

        this.gameTime += deltaTime;
        
        // Throttle achievement checks - only run once per second
        if (!this.lastAchievementCheck) this.lastAchievementCheck = 0;
        this.lastAchievementCheck += deltaTime;
        
        // Aggressive memory cleanup on mobile every 3 seconds
        // (now handled more efficiently via swap-remove in update())
        
        // Decay screen shake
        if (this.screenShake > 0) {
            this.screenShake -= deltaTime * 30;
            if (this.screenShake < 0) this.screenShake = 0;
        }
        
        // Update
        this.update(deltaTime);
        
        // Check achievements only once per second (not every frame)
        if (!this.performanceMode || this.lastAchievementCheck >= 1.0) {
            this.lastAchievementCheck = 0;
            this.checkAchievements();
        }
        
        // Update achievement notifications
        this.updateAchievementNotifications(deltaTime);
        
        // Render
        this.render();
        
        // Continue loop (store id so we can cancel on restart/quit)
        this.animationFrameId = requestAnimationFrame((time) => this.gameLoop(time));
    }
    
    update(deltaTime) {
        if (this.isPaused) return;
        
        // Update player
        this.player.update(deltaTime, this.keys, this.world.width, this.world.height);
        
        // Update Player 2 in co-op mode
        if (this.player2 && this.player2.health > 0 && !this.player2.downed) {
            this.player2.update(deltaTime, this.keys2, this.world.width, this.world.height);
            this.player2.attack(this, deltaTime);
            this.player2.updateWeapons(deltaTime, this);
        }
        
        // Co-op revive system
        if (this.coopMode && this.player2) {
            this.updateReviveSystem(deltaTime);
            // One camera, two players — keep them within a shared view.
            this.enforceCoopLeash(deltaTime);
        }

        this.effects.update(deltaTime);

        // Camera follows once both players have finished moving this frame,
        // so it never lags a frame behind the thing it is tracking.
        const focus = this.getCameraFocus();
        this.camera.update(deltaTime, focus.x, focus.y);
        
        // Check for ultimate activation (Q key for P1)
        if (this.keys['q'] && this.player.ultimateReady) {
            this.player.useUltimate(this);
            this.keys['q'] = false; // Prevent multiple activations
        }
        
        // Mid-stage events run before the ordinary spawner so anything an
        // event creates is subject to the same enemy cap as everything else.
        this.eventDirector.update(deltaTime);

        // Spawn enemies
        this.spawnEnemies(deltaTime);
        
        // Boss system
        this.updateBossSystem(deltaTime);
        
        // Update enemies
        {
            let writeIdx = 0;
            for (let i = 0; i < this.enemies.length; i++) {
                const enemy = this.enemies[i];
                // In co-op, enemies target the nearest living (non-downed) player
                let target = this.player;
                const p1Alive = this.player.health > 0 && !this.player.downed;
                const p2Alive = this.player2 && this.player2.health > 0 && !this.player2.downed;
                if (p2Alive) {
                    if (!p1Alive) {
                        target = this.player2;
                    } else {
                        const d1 = (enemy.x - this.player.x) ** 2 + (enemy.y - this.player.y) ** 2;
                        const d2 = (enemy.x - this.player2.x) ** 2 + (enemy.y - this.player2.y) ** 2;
                        target = d2 < d1 ? this.player2 : this.player;
                    }
                }
                enemy.update(deltaTime, target);
                
                // Check collision with player 1 (skip if downed)
                if (!this.player.downed && this.checkCollision(enemy, this.player)) {
                    this.resolveContact(enemy, this.player, deltaTime);
                    
                    // In co-op: game over only when BOTH players are truly dead (not just downed)
                    if (this.player.health <= 0 && !this.player.downed) {
                        if (!this.player2 || (this.player2.health <= 0 && !this.player2.downed)) {
                            this.gameOver();
                            return;
                        }
                    }
                }
                
                // Check collision with player 2 (co-op, skip if downed)
                if (this.player2 && !this.player2.downed && this.player2.health > 0 && this.checkCollision(enemy, this.player2)) {
                    this.resolveContact(enemy, this.player2, deltaTime);
                    
                    if (this.player2.health <= 0 && !this.player2.downed && this.player.health <= 0 && !this.player.downed) {
                        this.gameOver();
                        return;
                    }
                }
                
                // Recycle enemies the players have long outrun. Without this a
                // scrolling world leaves a trail of stragglers that fill the
                // enemy cap and starve spawning around the actual fight.
                if (enemy.type !== 'boss' &&
                    this.distanceToNearestPlayer(enemy.x, enemy.y) > GAME_CONFIG.world.despawnDistance) {
                    continue;   // dropped: not written back to the array
                }

                // Remove dead enemies
                if (enemy.health <= 0) {
                    // A bomber killed at point-blank still detonates — clearing
                    // one off your face is supposed to cost something.
                    if (enemy.behavior === 'exploder') enemy.detonate();

                    // Splitters seed their children, so area damage matters.
                    if (enemy.stats && enemy.stats.splitsInto) {
                        this.spawnSplitChildren(enemy);
                    }

                    this.audioManager.playSound('enemy-death');
                    // A boss is worth a level, and a level's worth of XP in a
                    // single gem reads as one pickup. Scatter it so the payout
                    // is something you collect rather than something you step
                    // on without noticing.
                    if (enemy.type === 'boss') {
                        this.spawnXPBurst(enemy.x, enemy.y, enemy.xpValue, 14, 140);
                    } else if (enemy.type === 'elite') {
                        this.spawnXPBurst(enemy.x, enemy.y, enemy.xpValue, 4, 70);
                    } else {
                        this.spawnXP(enemy.x, enemy.y, enemy.xpValue);
                    }
                    this.player.addKill(enemy);
                    
                    // Health is a comeback mechanic, not income: it only drops
                    // while someone is hurt, and heals a share of max HP so it
                    // scales with the build instead of the kill count.
                    const pk = GAME_CONFIG.pickups;
                    if (this.lowestPlayerHealthFraction() < pk.healthDropThreshold &&
                        Math.random() < pk.healthDropChance) {
                        let pct = pk.healthDropPercent;
                        if (enemy.type === 'boss') pct = pk.bossHealthDropPercent;
                        else if (enemy.type === 'elite') pct = pk.eliteHealthDropPercent;
                        else if (enemy.type === 'tank') pct = pk.tankHealthDropPercent;

                        const healAmount = Math.max(pk.minHealthDrop, Math.round(this.player.maxHealth * pct));
                        const angle = Math.random() * Math.PI * 2;
                        this.spawnHealth(enemy.x + Math.cos(angle) * 40, enemy.y + Math.sin(angle) * 40, healAmount);
                    }
                    
                    // Per-enemy drop chance. A flat 10% of every kill meant the
                    // drop rate tracked kill rate, which tracks build power — so
                    // the stronger you got, the more meaningless each drop became.
                    const equipChance = (enemy.stats && enemy.stats.equipChance !== undefined)
                        ? enemy.stats.equipChance
                        : 0.004;
                    const luckBonus = this.player.getLuck ? this.player.getLuck() : 0;
                    if (enemy.type !== 'boss' && Math.random() < equipChance * (1 + luckBonus)) {
                        this.dropEquipment(enemy.x, enemy.y);
                    }

                    // Coin drops — Clover Coin (luck) makes them more frequent.
                    const luck = this.player.getLuck ? this.player.getLuck() : 0;
                    const coinCfg = GAME_CONFIG.enemy;
                    if (Math.random() < coinCfg.coinDropChance * (1 + luck)) {
                        const span = coinCfg.coinDropAmount.max - coinCfg.coinDropAmount.min;
                        let amount = coinCfg.coinDropAmount.min + Math.floor(Math.random() * (span + 1));
                        if (enemy.type === 'elite') amount += coinCfg.eliteCoinBonus;
                        const cp = this.clampToWorld(enemy.x, enemy.y, 20);
                        this.coinPickups.push(new CoinPickup(cp.x, cp.y, amount));
                    }

                    // Elites are the main source of chests between bosses.
                    if (enemy.chestChance && Math.random() < enemy.chestChance * (1 + luck)) {
                        this.dropChest(enemy.x, enemy.y, 'normal');
                    }

                    // Bosses always leave a chest behind.
                    if (enemy.type === 'boss') {
                        this.dropChest(enemy.x, enemy.y, 'boss');
                        this.screenShake = GAME_CONFIG.juice.shake.bossDeath;
                    }
                    
                    // Plaguebloom: a slain enemy splashes venom onto its neighbours.
                    const plague = this.player.weapons.find(w => w.type === 'poison' && w.isEvolved);
                    if (plague) {
                        const spread = (plague.evolution.traits || {}).spreadRadius || 0;
                        if (spread > 0) {
                            for (const other of this.enemies) {
                                if (other === enemy || other.health <= 0) continue;
                                if (Math.hypot(other.x - enemy.x, other.y - enemy.y) < spread) {
                                    other.takeDamage(plague.damage * 0.6);
                                }
                            }
                        }
                    }

                    this.createParticles(enemy.x, enemy.y, enemy.color, enemy.type);
                    // Don't write to array (effectively removes it)
                } else {
                    this.enemies[writeIdx++] = enemy;
                }
            }
            this.enemies.length = writeIdx;
        }
        
        // Update projectiles (swap-remove pattern — O(1) per removal instead of O(n) splice)
        {
            let writeIdx = 0;
            for (let i = 0; i < this.projectiles.length; i++) {
                const projectile = this.projectiles[i];
                projectile.update(deltaTime);
                
                // Check collision with enemies
                if (projectile.active) {
                    for (let j = 0; j < this.enemies.length; j++) {
                        const enemy = this.enemies[j];
                        if (this.checkCollision(projectile, enemy)) {
                            enemy.takeDamage(projectile.damage);
                            enemy.applyKnockback(projectile.x, projectile.y, GAME_CONFIG.enemy.knockbackOnHit * 0.1);
                            projectile.hit();
                            if (!projectile.piercing) break;
                        }
                    }
                }
                
                // Keep active projectiles
                if (projectile.active && projectile.lifetime > 0) {
                    this.projectiles[writeIdx++] = projectile;
                }
            }
            this.projectiles.length = writeIdx;
        }
        
        // Cap projectiles on mobile to prevent memory overload
        if (this.performanceMode && this.projectiles.length > 15) {
            this.projectiles.length = 15;
        }
        
        // Update XP orbs (swap-remove) — P2 can also pick up
        {
            let writeIdx = 0;
            for (let i = 0; i < this.xpOrbs.length; i++) {
                const orb = this.xpOrbs[i];
                // Attract to the nearest living player
                if (this.player2 && this.player2.health > 0 && this.player.health > 0) {
                    const d1 = (orb.x - this.player.x) ** 2 + (orb.y - this.player.y) ** 2;
                    const d2 = (orb.x - this.player2.x) ** 2 + (orb.y - this.player2.y) ** 2;
                    orb.update(deltaTime, d2 < d1 ? this.player2 : this.player);
                } else if (this.player2 && this.player2.health > 0) {
                    orb.update(deltaTime, this.player2);
                } else {
                    orb.update(deltaTime, this.player);
                }
                
                let collected = false;
                if (this.checkCollision(orb, this.player)) {
                    this.audioManager.playSound('pickup-xp');
                    this.spawnPickupSparkle(orb.x, orb.y, orb.color);
                    this.player.addXP(orb.value);
                    // Share XP with P2 (50%)
                    if (this.player2 && this.player2.health > 0) {
                        this.player2.addXP(Math.floor(orb.value * 0.5));
                    }
                    collected = true;
                } else if (this.player2 && this.player2.health > 0 && this.checkCollision(orb, this.player2)) {
                    this.audioManager.playSound('pickup-xp');
                    this.player2.addXP(orb.value);
                    this.player.addXP(Math.floor(orb.value * 0.5));
                    collected = true;
                }
                
                if (!collected) {
                    this.xpOrbs[writeIdx++] = orb;
                }
            }
            this.xpOrbs.length = writeIdx;
        }
        
        // Cap XP orbs on mobile
        if (this.performanceMode && this.xpOrbs.length > 10) {
            this.xpOrbs.length = 10;
        }
        
        // Update Health Pickups (swap-remove) — P2 can also pick up
        {
            let writeIdx = 0;
            for (let i = 0; i < this.healthPickups.length; i++) {
                const pickup = this.healthPickups[i];
                // Attract to the nearest living player
                if (this.player2 && this.player2.health > 0 && this.player.health > 0) {
                    const d1 = (pickup.x - this.player.x) ** 2 + (pickup.y - this.player.y) ** 2;
                    const d2 = (pickup.x - this.player2.x) ** 2 + (pickup.y - this.player2.y) ** 2;
                    pickup.update(deltaTime, d2 < d1 ? this.player2 : this.player);
                } else if (this.player2 && this.player2.health > 0) {
                    pickup.update(deltaTime, this.player2);
                } else {
                    pickup.update(deltaTime, this.player);
                }
                
                let collected = false;
                if (this.checkCollision(pickup, this.player)) {
                    this.audioManager.playSound('pickup-health');
                    const healAmount = pickup.healAmount;
                    this.player.health = Math.min(this.player.maxHealth, this.player.health + healAmount);
                    this.showNotification(`+${healAmount} HP`, '#2ecc71');
                    collected = true;
                } else if (this.player2 && this.player2.health > 0 && this.checkCollision(pickup, this.player2)) {
                    this.audioManager.playSound('pickup-health');
                    const healAmount = pickup.healAmount;
                    this.player2.health = Math.min(this.player2.maxHealth, this.player2.health + healAmount);
                    this.showNotification(`P2 +${healAmount} HP`, '#63b3ed');
                    collected = true;
                }
                
                if (!collected) {
                    this.healthPickups[writeIdx++] = pickup;
                }
            }
            this.healthPickups.length = writeIdx;
        }
        
        // Cap health pickups on mobile
        if (this.performanceMode && this.healthPickups.length > 8) {
            this.healthPickups.length = 8;
        }
        
        // Update Equipment Drops (swap-remove) — P2 pickup goes to shared inventory
        {
            let writeIdx = 0;
            for (let i = 0; i < this.equipmentDrops.length; i++) {
                const drop = this.equipmentDrops[i];
                // Attract to the nearest living player
                if (this.player2 && this.player2.health > 0 && this.player.health > 0) {
                    const d1 = (drop.x - this.player.x) ** 2 + (drop.y - this.player.y) ** 2;
                    const d2 = (drop.x - this.player2.x) ** 2 + (drop.y - this.player2.y) ** 2;
                    drop.update(deltaTime, d2 < d1 ? this.player2 : this.player);
                } else if (this.player2 && this.player2.health > 0) {
                    drop.update(deltaTime, this.player2);
                } else {
                    drop.update(deltaTime, this.player);
                }
                
                let collected = false;
                if (this.checkCollision(drop, this.player)) {
                    collected = true;
                } else if (this.player2 && this.player2.health > 0 && this.checkCollision(drop, this.player2)) {
                    collected = true;
                }
                
                if (collected) {
                    this.audioManager.playSound('pickup-equipment');
                    this.collectEquipment(drop.equipment);
                } else {
                    this.equipmentDrops[writeIdx++] = drop;
                }
            }
            this.equipmentDrops.length = writeIdx;
        }
        
        // Cap equipment drops on mobile
        if (this.performanceMode && this.equipmentDrops.length > 5) {
            this.equipmentDrops.length = 5;
        }
        
        // Update coin pickups (swap-remove)
        {
            let writeIdx = 0;
            for (let i = 0; i < this.coinPickups.length; i++) {
                const coin = this.coinPickups[i];
                coin.update(deltaTime, this.nearestPlayerTo(coin));

                let collected = false;
                for (const p of [this.player, this.player2]) {
                    if (!p || p.health <= 0 || p.downed) continue;
                    if (this.checkCollision(coin, p)) {
                        this.addCoins(coin.value);
                        this.audioManager.playSound('coin');
                        collected = true;
                        break;
                    }
                }
                if (!collected) this.coinPickups[writeIdx++] = coin;
            }
            this.coinPickups.length = writeIdx;
        }

        // Update chests (swap-remove). Dropped chests wait forever; a cache
        // chest carries an `expires` clock, which is the whole point of it.
        {
            let writeIdx = 0;
            for (let i = 0; i < this.chests.length; i++) {
                const chest = this.chests[i];
                chest.update(deltaTime);

                if (chest.expires !== undefined) {
                    chest.expires -= deltaTime;
                    if (chest.expires <= 0) {
                        this.effects.add(new RingEffect(chest.x, chest.y, {
                            fromRadius: 30, toRadius: 120, life: 0.5,
                            color: '#6b7280', width: 3, endWidth: 1
                        }));
                        continue;   // dropped from the array by not being kept
                    }
                }

                let taken = false;
                for (const p of [this.player, this.player2]) {
                    if (!p || p.health <= 0 || p.downed) continue;
                    if (this.checkCollision(chest, p)) {
                        this.collectChest(chest);
                        taken = true;
                        break;
                    }
                }
                if (!taken) this.chests[writeIdx++] = chest;
            }
            this.chests.length = writeIdx;
        }

        // Update floating damage numbers (swap-remove)
        {
            let writeIdx = 0;
            for (let i = 0; i < this.damageNumbers.length; i++) {
                const dn = this.damageNumbers[i];
                dn.update(deltaTime);
                if (dn.life > 0) this.damageNumbers[writeIdx++] = dn;
            }
            this.damageNumbers.length = writeIdx;
        }

        // Update particles and boss projectiles (swap-remove)
        // Hard cap on mobile BEFORE updating to keep memory low
        if (this.performanceMode && this.particles.length > 20) {
            // Keep only BossProjectiles + most recent cosmetic particles
            let kept = 0;
            let writeIdx = 0;
            for (let i = 0; i < this.particles.length; i++) {
                if (this.particles[i] instanceof BossProjectile || kept < 20) {
                    this.particles[writeIdx++] = this.particles[i];
                    kept++;
                }
            }
            this.particles.length = writeIdx;
        }
        {
            let writeIdx = 0;
            for (let i = 0; i < this.particles.length; i++) {
                this.particles[i].update(deltaTime);
                if (this.particles[i].lifetime > 0) {
                    this.particles[writeIdx++] = this.particles[i];
                }
            }
            this.particles.length = writeIdx;
        }
        
        // Player auto-attack
        this.player.attack(this, deltaTime);
        
        // Update player weapons
        this.player.updateWeapons(deltaTime, this);
        
        // Throttle HUD updates — DOM manipulation is expensive, especially on iOS Safari
        this.lastHUDUpdate += deltaTime;
        if (this.lastHUDUpdate >= this.hudUpdateInterval) {
            this.lastHUDUpdate = 0;
            this.updateHUD();
            this.updateLoadoutHUD();
        }
    }
    
    // Hold the simulation for a moment so an impact registers. Stacking is
    // deliberately a max, not a sum: a dozen enemies dying in the same frame
    // must not compound into a visible stall.
    applyHitStop(seconds) {
        const cap = GAME_CONFIG.juice.maxHitStop ?? 0.12;
        this.hitStop = Math.min(cap, Math.max(this.hitStop, seconds));
    }

    updateBossSystem(deltaTime) {
        const stageTime = this.gameTime - this.stageStartTime;
        
        // Check for boss warning (10 seconds before boss spawn)
        if (!this.bossWarning && !this.bossActive && stageTime >= this.stageTimeLimit - 10) {
            this.bossWarning = true;
            this.bossWarningTime = 10;
            document.getElementById('bossWarning').classList.add('active');
        }
        
        // Update warning timer
        if (this.bossWarning) {
            this.bossWarningTime -= deltaTime;
            const warningText = document.getElementById('bossWarningText');
            const incoming = (typeof getBossForStage === 'function')
            ? getBossForStage(this.currentStage).name
            : 'BOSS';
        warningText.textContent = `${incoming.toUpperCase()} INCOMING IN ${Math.ceil(this.bossWarningTime)}...`;
            
            if (this.bossWarningTime <= 0) {
                this.bossWarning = false;
                document.getElementById('bossWarning').classList.remove('active');
                // The boss used to spawn straight into an ongoing horde, so its
                // arrival never registered as an event. Clear the field and hold
                // silence instead — the absence is what makes the entrance land.
                if (!this.bossActive) this.beginBossLull();
            }
        }
        
        if (this.stageIntro > 0) {
            this.stageIntro -= deltaTime;
            if (this.stageIntro <= 0) this.endStageIntro();
        }

        // Run the entrance down in REAL time, not scaled time — the beat is
        // two seconds on a wall clock regardless of how slow the world is.
        if (this.bossEntrance > 0) {
            this.bossEntrance -= deltaTime / Math.max(0.0001, this.timeScale);
            if (this.currentBoss) {
                // Ease the push so the camera arrives with the card, rather
                // than snapping and then waiting.
                this.cameraOverride = { x: this.currentBoss.x, y: this.currentBoss.y };
            }
            if (this.bossEntrance <= 0) this.endBossEntrance();
        }

        // Ultimate camera punch. Same beat as the boss entrance, pointed at
        // the player: the world slows, the camera settles on them, and the
        // screen closes in and releases. Run in REAL time for the same reason
        // the entrance is — the beat is a fixed length on a wall clock.
        if (this.ultimateFocus > 0) {
            const j = GAME_CONFIG.juice;
            this.ultimateFocus -= deltaTime / Math.max(0.0001, this.timeScale);

            const p = this.ultimateFocusPlayer;
            if (p) {
                this.zoomFocus = { x: p.x, y: p.y };
                this.cameraOverride = { x: p.x, y: p.y };
            }

            // In and back out on one arc, so it never lands on a hard cut.
            const t = 1 - Math.max(0, this.ultimateFocus) / j.ultimateFocusSeconds;
            this.zoom = 1 + (j.ultimateZoom - 1) * Math.sin(Math.max(0, Math.min(1, t)) * Math.PI);

            if (this.ultimateFocus <= 0) this.endUltimateFocus();
        }

        // Hold the quiet, then bring the boss in.
        if (this.bossLull > 0) {
            this.bossLull -= deltaTime;
            if (this.bossLull <= 0) {
                this.bossLull = 0;
                this.spawnBoss();
            }
        }

        // Check if boss is defeated
        if (this.bossActive && this.currentBoss && this.currentBoss.health <= 0) {
            this.defeatBoss();
        }
    }
    
    // Three seconds of nothing. Spawning stops, the field is swept, and the
    // music drops out. Silence is the cheapest tension there is, and an arena
    // that has been loud for ninety seconds makes it very loud indeed.
    beginBossLull() {
        this.bossLull = GAME_CONFIG.juice.bossLullSeconds ?? 3.0;

        // Dissolve whatever is still alive rather than letting it chase the
        // player through the pause. Each one pops on its own beat so the field
        // empties as a wave instead of blinking out.
        const doomed = this.enemies.filter(e => e !== this.currentBoss);
        doomed.forEach((enemy) => {
            this.createParticles(enemy.x, enemy.y, '#6f8496', enemy.type);
            this.effects.add(new RingEffect(enemy.x, enemy.y, {
                fromRadius: 4, toRadius: enemy.radius * 2.4,
                color: '#8fa3b5', width: 3, endWidth: 1, life: 0.35
            }));
        });
        this.enemies.length = 0;

        this.audioManager.stopMusic();
        this.screenShake = 0;
    }

    spawnBoss() {
        this.bossActive = true;
        document.getElementById('bossHealthBar').classList.add('active');
        const bArch = (typeof getBossForStage === 'function') ? getBossForStage(this.currentStage) : null;
        const nameEl = document.getElementById('bossHpName');
        const epEl = document.getElementById('bossHpEpithet');
        if (nameEl) nameEl.textContent = bArch?.name || 'The Boss';
        if (epEl) epEl.textContent = bArch?.epithet || '';
        // Force the bar back to phase 1 for the new boss.
        this._bossHpPhase = null;
        
        // Start boss music
        this.audioManager.playMusic('boss-theme');
        
        // Enter from just above whatever the camera is currently showing
        const view = this.camera.getBounds();
        const x = (view.left + view.right) / 2;
        const y = view.top - 100;
        
        this.currentBoss = new Enemy(x, y, 'boss', this.waveMultiplier, this);
        this.enemies.push(this.currentBoss);
        
        this.beginBossEntrance();

        // Screen shake and effects
        this.screenShake = 30;
        
        // Spawn dramatic particles (reduced count on mobile)
        const particleCount = this.performanceMode ? 8 : 100;
        for (let i = 0; i < particleCount; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 100 + Math.random() * 200;
            this.particles.push(new Particle(
                x, view.top + 100, angle, speed, '#8b0000', 2
            ));
        }
    }
    
    // Two seconds of ceremony: time stretches, the camera leaves the player
    // and pushes onto the boss, and the name is held on screen. The field was
    // already swept by the lull, so there is nothing competing for attention.
    beginStageIntro() {
        this.stageIntro = GAME_CONFIG.juice.stageIntroSeconds ?? 2.2;

        const wave = (typeof getWaveForTime === 'function')
            ? getWaveForTime(this.gameTime)
            : null;
        const numEl = document.getElementById('stageIntroNumber');
        const subEl = document.getElementById('stageIntroSub');
        if (numEl) numEl.textContent = String(this.currentStage);
        if (subEl) subEl.textContent = wave?.announce || 'The horde thickens';
        document.getElementById('stageIntro')?.classList.add('active');
    }

    endStageIntro() {
        this.stageIntro = 0;
        document.getElementById('stageIntro')?.classList.remove('active');
    }

    // Two seconds of ceremony: time stretches, the camera leaves the player
    // and pushes onto the boss, and the name is held on screen. The field was
    // already swept by the lull, so there is nothing competing for attention.
    // The ultimate is the biggest thing the player does and it looked the same
    // as everything else. Never starts during a boss entrance — the two both
    // own timeScale and the camera, and would fight over both.
    beginUltimateFocus(player) {
        if (this.bossEntrance > 0 || this.stageIntro > 0) return;
        const j = GAME_CONFIG.juice;
        this.ultimateFocus = j.ultimateFocusSeconds;
        this.ultimateFocusPlayer = player || this.player;
        this.timeScale = j.ultimateTimeScale;
    }

    endUltimateFocus() {
        this.ultimateFocus = 0;
        this.ultimateFocusPlayer = null;
        this.zoom = 1;
        this.zoomFocus = null;
        this.cameraOverride = null;
        this.timeScale = 1;
    }

    beginBossEntrance() {
        const cfg = GAME_CONFIG.juice;
        this.bossEntrance = cfg.bossEntranceSeconds ?? 2.0;
        this.timeScale = cfg.bossEntranceTimeScale ?? 0.35;

        const archetype = (typeof getBossForStage === 'function')
            ? getBossForStage(this.currentStage)
            : null;
        const nameEl = document.getElementById('bossEntranceName');
        const epithetEl = document.getElementById('bossEntranceEpithet');
        if (nameEl) nameEl.textContent = (archetype?.name || 'BOSS').toUpperCase();
        if (epithetEl) epithetEl.textContent = archetype?.epithet || '';
        document.getElementById('bossEntrance')?.classList.add('active');

        // A ring blooming out of the boss marks where the camera is taking you.
        if (this.currentBoss) {
            this.effects.add(new RingEffect(this.currentBoss.x, this.currentBoss.y, {
                fromRadius: 20, toRadius: 340,
                color: archetype?.color || '#ff8f3c',
                width: 12, endWidth: 2, life: 1.1
            }));
        }
    }

    endBossEntrance() {
        this.bossEntrance = 0;
        this.timeScale = 1;
        this.cameraOverride = null;
        document.getElementById('bossEntrance')?.classList.remove('active');
        // The drop back to full speed is the cue that the fight has started.
        this.screenShake = Math.max(this.screenShake, 14);
    }

    defeatBoss() {
        // If the boss somehow died mid-entrance, do not leave the world in
        // slow motion with the camera parked off the player.
        if (this.bossEntrance > 0) this.endBossEntrance();

        this.audioManager.playSound('boss-defeat');
        this.bossActive = false;
        this.currentBoss = null;
        
        // Return to game music after boss
        this.audioManager.playMusic('game-theme');
        
        document.getElementById('bossHealthBar').classList.remove('active');
        
        // Track boss defeat for achievements and the run summary
        this.sessionStats.bosses++;
        this.runStats.bossesDefeated++;
        
        // Victory rewards - defer level up until after stage complete screen
        this.pendingLevelUp = true;
        
        // Award coins based on stage
        const coinsEarned = 50 + (this.currentStage * 25);
        this.coins += coinsEarned;
        this.saveCoins();
        
        // Generate equipment reward
        const equipment = this.generateEquipmentDrop(this.currentStage);
        this.pendingEquipment = equipment;
        
        // Massive screen shake
        this.screenShake = 40;
        
        // Show stage complete screen
        this.showStageComplete(coinsEarned, equipment);
        
        // Victory message
        const bossWarning = document.getElementById('bossWarning');
        const warningText = document.getElementById('bossWarningText');
        warningText.textContent = `🎉 STAGE ${this.currentStage} COMPLETE! 🎉`;
        bossWarning.classList.add('active', 'victory');
        setTimeout(() => {
            bossWarning.classList.remove('active', 'victory');
        }, 3000);
    }
    
    generateEquipmentDrop(stage) {
        // Higher stages have better drop rates
        const stagebonus = Math.min(stage * 0.05, 0.5); // Max 50% bonus
        const roll = Math.random() - stagebonus;
        
        let rarity;
        if (roll < EQUIPMENT_RARITY.LEGENDARY.dropRate) rarity = 'LEGENDARY';
        else if (roll < 0.05) rarity = 'EPIC';
        else if (roll < 0.15) rarity = 'RARE';
        else if (roll < 0.40) rarity = 'UNCOMMON';
        else rarity = 'COMMON';
        
        // Pick random equipment
        const baseEquipment = EQUIPMENT_POOL[Math.floor(Math.random() * EQUIPMENT_POOL.length)];
        const rarityData = EQUIPMENT_RARITY[rarity];
        
        // Create equipment with stats scaled by rarity
        return {
            ...baseEquipment,
            rarity: rarity,
            rarityData: rarityData,
            level: 1, // All equipment starts at level 1
            stats: this.scaleEquipmentStats(baseEquipment.baseStats, rarityData.statMultiplier)
        };
    }

    // Alias kept for backwards compatibility (old cached scripts may call this name)
    generateRandomEquipment(level) {
        return this.generateEquipmentDrop(this.currentStage);
    }
    
    scaleEquipmentStats(baseStats, multiplier) {
        const scaled = {};
        for (const [key, value] of Object.entries(baseStats)) {
            const raw = value * multiplier;
            // Fractional stats must keep their precision. attackSpeed values
            // are 0.1-0.3, so flooring silently zeroed them at every rarity and
            // every level - three items had a stat that never did anything.
            scaled[key] = Number.isInteger(value)
                ? Math.floor(raw)
                : Math.round(raw * 100) / 100;
        }
        return scaled;
    }
    
    getLevelMultiplier(level) {
        // Level 1: 1.0x, Level 2: 1.3x, Level 3: 1.6x, Level 4: 2.0x, Level 5: 2.5x
        const multipliers = [1.0, 1.3, 1.6, 2.0, 2.5];
        return multipliers[Math.min(level, 5) - 1] || 1.0;
    }
    
    getLevelUpCost(equipment) {
        if (equipment.level >= 5) return null; // Max level
        
        // Base cost by rarity
        const baseCosts = {
            'COMMON': 100,
            'UNCOMMON': 200,
            'RARE': 400,
            'EPIC': 800,
            'LEGENDARY': 1500
        };
        
        const baseCost = baseCosts[equipment.rarity] || 100;
        // Cost increases exponentially per level
        return Math.floor(baseCost * Math.pow(1.5, equipment.level - 1));
    }
    
    levelUpEquipment(inventoryIndex) {
        const equipment = this.playerInventory[inventoryIndex];
        if (!equipment || equipment.level >= 5) return;
        
        const cost = this.getLevelUpCost(equipment);
        if (this.scrap < cost) {
            this.showNotification(`Need ${cost - this.scrap} more scrap \u2014 sell gear you have outgrown.`);
            return;
        }

        this.scrap -= cost;
        this.saveScrap();

        // The live player has to let go of the item BEFORE its stats change.
        // Inventory entries and player.equipment are the SAME object, so
        // mutating stats first made unequipItem subtract the new values
        // instead of the old ones. Measured before the fix: the item went
        // 30 -> 39 damage and the player gained nothing at all.
        const wasEquipped = this.player &&
            this.player.equipment[equipment.type] === equipment;
        if (wasEquipped) this.player.unequipItem(equipment.type);

        equipment.level++;
        const levelMultiplier = this.getLevelMultiplier(equipment.level);
        equipment.stats = this.scaleEquipmentStats(
            equipment.baseStats,
            equipment.rarityData.statMultiplier * levelMultiplier
        );

        this.saveInventory();
        if (wasEquipped) this.player.equipItem(equipment);
        
        // Update saved equipment loadout
        if (this.savedEquipment[equipment.type]?.name === equipment.name) {
            this.savedEquipment[equipment.type] = equipment;
            this.saveSavedEquipment();
        }
        
        this.audioManager.playSound('equip-item');
        this.audioManager.playSound('equip-item');
        this.showNotification(`${equipment.name} upgraded to ⭐${'⭐'.repeat(equipment.level - 1)}!`);
        this.updateInventoryEquippedSlots();
        this.renderInventoryItems();
    }
    
    showStageComplete(coinsEarned, equipment) {
        this.isPaused = true;
        this.audioManager.playSound('stage-complete');
        const optResult = document.getElementById('stageOptimizeResult');
        if (optResult) { optResult.textContent = ''; optResult.classList.remove('shown'); }
        
        const panel = document.getElementById('stageCompletePanel');
        const stageNum = document.getElementById('stageCompleteNumber');
        const coinsText = document.getElementById('stageCoinsEarned');
        const equipInfo = document.getElementById('stageEquipmentInfo');
        
        stageNum.textContent = this.currentStage;
        coinsText.textContent = `+${coinsEarned} Coins`;
        
        // Show equipment reward
        const rarityColor = equipment.rarityData.color;
        equipInfo.innerHTML = `
            <div class="equipment-reward" style="border-color: ${rarityColor}">
                <div class="equipment-level-display">${this.getStarsDisplay(equipment.level || 1)}</div>
                <div class="equipment-icon">${equipment.icon}</div>
                <div class="equipment-details">
                    <div class="equipment-name" style="color: ${rarityColor}">${equipment.name}</div>
                    <div class="equipment-rarity">${equipment.rarityData.name}</div>
                    <div class="equipment-stats">${this.formatEquipmentStats(equipment.stats)}</div>
                </div>
            </div>
        `;
        
        panel.classList.add('active');
    }
    
    formatEquipmentStats(statsOrEquipment) {
        // Handle both stats object and equipment object
        const stats = statsOrEquipment.stats || statsOrEquipment;
        const statStrings = [];
        for (const [key, value] of Object.entries(stats)) {
            const formatted = key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1');
            // attackSpeed lands on a base of 1.0 and armor is applied as
            // value/100, so the raw number reads as meaningless on the card.
            // Show what the stat actually does instead.
            if (key === 'attackSpeed') {
                statStrings.push(`+${Math.round(value * 100)}% Attack Speed`);
            } else if (key === 'armor') {
                statStrings.push(`+${value}% Damage Reduction`);
            } else {
                statStrings.push(`+${value} ${formatted}`);
            }
        }
        return statStrings.join(' • ');
    }
    
    getStarsDisplay(level) {
        const filledStars = '⭐'.repeat(level || 1);
        const emptyStars = '☆'.repeat(5 - (level || 1));
        return filledStars + emptyStars;
    }
    
    advanceStage() {
        if (!this.isRunning || !this.player) return;

        // Campaign runs end. Endless keeps going.
        if (!this.endlessMode && this.currentStage >= GAME_CONFIG.progression.finalStage) {
            document.getElementById('stageCompletePanel').classList.remove('active');
            this.victory();
            return;
        }

        // Equip the reward equipment if player accepts it
        if (this.pendingEquipment) {
            // Add to inventory
            const existingItem = this.playerInventory.find(item => item.name === this.pendingEquipment.name);
            if (!existingItem) {
                this.playerInventory.push({ ...this.pendingEquipment });
                this.saveInventory();
            }
            
            // Auto-equip for now
            this.player.equipItem(this.pendingEquipment);
            
            // Save to loadout for persistence
            this.savedEquipment[this.pendingEquipment.type] = this.pendingEquipment;
            this.saveSavedEquipment();
            
            this.pendingEquipment = null;
        }
        
        // Advance to next stage
        this.currentStage++;
        this.stageStartTime = this.gameTime;
        this.bossWarning = false;
        
        // Scale difficulty
        this.waveMultiplier = 1.0 + (this.currentStage * 0.2);
        
        // Heal player partially
        this.player.health = Math.min(this.player.maxHealth, this.player.health + (this.player.maxHealth * 0.3));
        
        // Close stage complete panel
        document.getElementById('stageCompletePanel').classList.remove('active');
        this.isPaused = false;
        
        // Show level up screen if pending from boss defeat
        if (this.pendingLevelUp) {
            this.pendingLevelUp = false;
            this.player.levelUp(this);
        }
        
        // The stage used to change with a toast that faded out mid-fight.
        // Hold the arena empty instead, stamp the number, then let the next
        // wave bleed in.
        this.beginStageIntro();
    }
    
    // An event announcement. Deliberately not showNotification: notifications
    // stack in the corner and are read as flavour, and an event the player is
    // expected to react to cannot be flavour. This lands across the upper
    // arena, holds, and leaves — without dimming the field, because unlike the
    // stage card this plays while enemies are still moving.
    announceEvent(title, sub) {
        const banner = document.getElementById('eventBanner');
        if (!banner) return;
        const t = document.getElementById('eventBannerTitle');
        const s = document.getElementById('eventBannerSub');
        if (t) t.textContent = title;
        if (s) s.textContent = sub || '';

        // Restart the animation even if a previous banner is still on screen.
        banner.classList.remove('active');
        void banner.offsetWidth;
        banner.classList.add('active');

        clearTimeout(this._eventBannerTimer);
        this._eventBannerTimer = setTimeout(() => {
            banner.classList.remove('active');
        }, 2600);
        this.activeTimers.push(this._eventBannerTimer);
    }

    showNotification(message) {
        // Create temporary notification element
        const notification = document.createElement('div');
        notification.className = 'game-notification';
        notification.textContent = message;
        document.getElementById('gameScreen').appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 500);
        }, 2500);
    }
    
    openShop() {
        this.isPaused = true;
        this.refreshShopInventory();
        document.getElementById('shopPanel').classList.add('active');
    }
    
    closeShop() {
        this.isPaused = false;
        document.getElementById('shopPanel').classList.remove('active');
    }
    
    refreshShopInventory() {
        // Generate 6 random equipment items for shop
        this.availableEquipment = [];
        for (let i = 0; i < 6; i++) {
            const equipment = this.generateEquipmentDrop(this.currentStage);
            const price = this.calculateEquipmentPrice(equipment);
            this.availableEquipment.push({ ...equipment, price });
        }
        
        this.renderShopItems();
    }
    
    calculateEquipmentPrice(equipment) {
        const basePrice = 100;
        const rarityMultipliers = { 'COMMON': 1, 'UNCOMMON': 2, 'RARE': 4, 'EPIC': 8, 'LEGENDARY': 15 };
        return basePrice * rarityMultipliers[equipment.rarity];
    }
    
    renderShopItems() {
        const grid = document.getElementById('shopItemsGrid');
        const coinsDisplay = document.getElementById('playerCoins');
        coinsDisplay.textContent = this.coins;
        
        grid.innerHTML = '';
        
        this.availableEquipment.forEach((equipment, index) => {
            const canAfford = this.coins >= equipment.price;
            const div = document.createElement('div');
            div.className = `shop-item ${!canAfford ? 'unaffordable' : ''}`;
            div.style.borderColor = equipment.rarityData.color;
            
            div.innerHTML = `
                <div class="shop-item-level">${this.getStarsDisplay(equipment.level || 1)}</div>
                <div class="shop-item-icon">${equipment.icon}</div>
                <div class="shop-item-name" style="color: ${equipment.rarityData.color}">${equipment.name}</div>
                <div class="shop-item-rarity">${equipment.rarityData.name}</div>
                <div class="shop-item-stats">${this.formatEquipmentStats(equipment.stats)}</div>
                <button class="shop-buy-btn ${!canAfford ? 'disabled' : ''}" data-index="${index}">
                    Buy (${equipment.price} 🪙)
                </button>
            `;
            
            grid.appendChild(div);
        });
        
        // Add event listeners to buy buttons
        document.querySelectorAll('.shop-buy-btn:not(.disabled)').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.audioManager.playSound('button-click');
                const index = parseInt(e.target.dataset.index);
                this.purchaseEquipment(index);
            });
        });
    }
    
    purchaseEquipment(index) {
        const equipment = this.availableEquipment[index];
        if (this.coins >= equipment.price) {
            this.coins -= equipment.price;
            this.saveCoins();
            
            // Add to inventory if not already owned
            const existingItem = this.playerInventory.find(item => item.name === equipment.name);
            if (!existingItem) {
                this.playerInventory.push({ ...equipment });
                this.saveInventory();
            }
            
            // Auto-equip the purchased item
            this.player.equipItem(equipment);
            
            // Save to loadout for persistence
            this.savedEquipment[equipment.type] = equipment;
            this.saveSavedEquipment();
            
            this.availableEquipment.splice(index, 1);
            this.renderShopItems();
            this.showNotification(`Equipped ${equipment.name}!`);
        }
    }
    
    openInventory() {
        // Update coins display
        document.getElementById('inventoryCoins').textContent = this.coins;
        const scrapEl = document.getElementById('inventoryScrap');
        if (scrapEl) scrapEl.textContent = this.scrap;
        
        // Update equipped slots
        this.updateInventoryEquippedSlots();
        
        // Render inventory items
        this.renderInventoryItems();
        
        // Show inventory panel
        document.getElementById('inventoryPanel').classList.add('active');
    }
    
    closeInventory() {
        document.getElementById('inventoryPanel').classList.remove('active');
    }
    
    updateInventoryEquippedSlots() {
        const slots = ['weapon', 'armor', 'accessory', 'ring'];
        slots.forEach(slot => {
            const slotElement = document.getElementById(`inv-${slot}`);
            // Check active player first, then saved equipment
            const equippedItem = this.player?.equipment?.[slot] || this.savedEquipment?.[slot];
            
            if (equippedItem) {
                // Ensure equipment has level property
                if (!equippedItem.level) equippedItem.level = 1;
                
                slotElement.innerHTML = `
                    <div style="font-size: 0.8em; margin-bottom: 4px;">${this.getStarsDisplay(equippedItem.level)}</div>
                    <div style="color: ${this.getRarityColor(equippedItem.rarity)}; font-weight: bold;">${equippedItem.name}</div>
                    <div style="font-size: 0.85em; color: rgba(255,255,255,0.6);">${this.formatEquipmentStats(equippedItem)}</div>
                `;
                slotElement.style.cursor = 'pointer';
                slotElement.onclick = () => this.unequipFromInventory(slot);
            } else {
                slotElement.innerHTML = 'Empty';
                slotElement.style.cursor = 'default';
                slotElement.onclick = null;
            }
        });
    }
    
    renderInventoryItems() {
        const inventoryGrid = document.getElementById('inventoryGrid');
        inventoryGrid.innerHTML = '';
        
        if (this.playerInventory.length === 0) {
            inventoryGrid.innerHTML = '<p style="text-align: center; color: rgba(255,255,255,0.5); grid-column: 1/-1;">No equipment yet. Defeat bosses or visit the shop!</p>';
            return;
        }
        
        this.playerInventory.forEach((equipment, index) => {
            // Ensure equipment has level property (for old saves)
            if (!equipment.level) equipment.level = 1;
            
            // Check if equipped on active player or in saved loadout
            const isEquipped = (this.player?.equipment?.[equipment.type]?.name === equipment.name) ||
                              (this.savedEquipment?.[equipment.type]?.name === equipment.name);
            
            const levelUpCost = this.getLevelUpCost(equipment);
            const canLevelUp = equipment.level < 5;
            
            const itemDiv = document.createElement('div');
            itemDiv.className = `inventory-item ${isEquipped ? 'equipped' : ''}`;
            itemDiv.style.borderColor = this.getRarityColor(equipment.rarity);
            itemDiv.onclick = () => this.equipFromInventory(index);
            
            const sellValue = this.getSellValue(equipment);
            const affordable = this.scrap >= levelUpCost;

            itemDiv.innerHTML = `
                <div class="inventory-item-level">${this.getStarsDisplay(equipment.level)}</div>
                <div class="inventory-item-name" style="color: ${this.getRarityColor(equipment.rarity)};">${equipment.name}</div>
                <div class="inventory-item-type">${equipment.type}</div>
                <div class="inventory-item-stats">${this.formatEquipmentStats(equipment)}</div>
                <div class="inventory-item-actions">
                    ${canLevelUp ? `
                        <button class="level-up-btn${affordable ? '' : ' unaffordable'}" data-index="${index}"
                                title="${affordable ? 'Spend scrap to raise this item a level' : 'Not enough scrap yet'}">
                            ⬆️ ${levelUpCost} ⚙️
                        </button>
                    ` : '<div class="max-level">MAX LEVEL</div>'}
                    ${isEquipped
                        ? '<div class="sell-locked" title="Unequip it before selling">In use</div>'
                        : `<button class="sell-btn" data-index="${index}"
                                   title="Sell for scrap to upgrade something else">💰 ${sellValue} ⚙️</button>`}
                </div>
            `;

            if (canLevelUp) {
                itemDiv.querySelector('.level-up-btn').onclick = (e) => {
                    e.stopPropagation();          // clicking the card equips it
                    this.levelUpEquipment(index);
                };
            }
            const sellBtn = itemDiv.querySelector('.sell-btn');
            if (sellBtn) {
                sellBtn.onclick = (e) => {
                    e.stopPropagation();
                    this.sellEquipment(index);
                };
            }
            
            inventoryGrid.appendChild(itemDiv);
        });
    }
    
    // Resolve a picked-up item against what is already owned.
    //
    // The old rule matched on name alone, so a Legendary 5-star was thrown away
    // if you happened to hold the Common level-1 of the same item. Now the
    // better one is kept, and a genuine duplicate is converted to coins rather
    // than silently evaporating.
    collectEquipment(equipment) {
        const index = this.playerInventory.findIndex(item => item.name === equipment.name);

        if (index === -1) {
            this.playerInventory.push({ ...equipment });
            this.saveInventory();
            this.showNotification(`Found: ${equipment.name}!`, this.getRarityColor(equipment.rarity));
            return;
        }

        const owned = this.playerInventory[index];
        if (this.scoreEquipment(equipment) > this.scoreEquipment(owned)) {
            this.playerInventory[index] = { ...equipment };
            this.saveInventory();

            // If the weaker copy was equipped, swap the upgrade straight in.
            for (const slot of ['weapon', 'armor', 'accessory', 'ring']) {
                const worn = this.player ? this.player.equipment[slot] : this.savedEquipment[slot];
                if (worn && worn.name === equipment.name) {
                    if (this.player) this.player.equipItem(equipment);
                    this.savedEquipment[slot] = equipment;
                    this.saveSavedEquipment();
                    break;
                }
            }
            this.showNotification(`Upgraded: ${equipment.name}!`, this.getRarityColor(equipment.rarity));
            return;
        }

        // Strictly worse copy — pay it out instead of discarding it.
        const value = Math.max(10, Math.round(this.calculateEquipmentPrice(equipment) * 0.15));
        this.addCoins(value);
        this.showNotification(`Duplicate ${equipment.name} \u2192 ${value} \U0001fa99`);
    }

    // ---- Equipment optimiser ------------------------------------------

    // Score an item by what it is actually worth in play. Weights are per point
    // of the stat, calibrated against how each one is applied in
    // Player.applyEquipmentBonuses:
    //   armor       value/100 -> a point is 1% damage reduction (very strong)
    //   attackSpeed added to a base of 1.0 -> a point is +100% attack rate
    //   speed       added to a base of 120-300 -> a point is worth little
    // `lifesteal` and `range` are deliberately weighted 0: neither is wired up
    // to anything yet, so scoring them would produce confidently wrong picks.
    scoreEquipment(equipment) {
        if (!equipment || !equipment.stats) return 0;
        const WEIGHTS = {
            damage: 10,
            armor: 12,
            attackSpeed: 300,
            health: 1,
            speed: 0.8,
            xpGain: 2,
            lifesteal: 0,
            range: 0
        };
        let score = 0;
        for (const [stat, value] of Object.entries(equipment.stats)) {
            score += (WEIGHTS[stat] || 0) * value;
        }
        return score;
    }

    // Best owned item for each slot, by score.
    getOptimalLoadout() {
        const best = { weapon: null, armor: null, accessory: null, ring: null };
        const bestScore = { weapon: -1, armor: -1, accessory: -1, ring: -1 };

        this.playerInventory.forEach(item => {
            if (!item || !(item.type in best)) return;
            const score = this.scoreEquipment(item);
            if (score > bestScore[item.type]) {
                bestScore[item.type] = score;
                best[item.type] = item;
            }
        });
        return best;
    }

    // Equip the best owned item in every slot. Works both in a run (applies to
    // the live player) and from the menu (writes the saved loadout only).
    optimizeEquipment() {
        if (this.playerInventory.length === 0) {
            this.showNotification('No equipment to optimise yet.');
            return;
        }

        const best = this.getOptimalLoadout();
        const changed = [];

        for (const slot of ['weapon', 'armor', 'accessory', 'ring']) {
            const item = best[slot];
            if (!item) continue;

            // Skip slots already holding the best item, so the summary only
            // reports real changes.
            const current = this.player ? this.player.equipment[slot] : this.savedEquipment[slot];
            if (current && current.name === item.name && (current.level || 1) === (item.level || 1)) continue;

            if (this.player) this.player.equipItem(item);
            this.savedEquipment[slot] = item;
            changed.push(item.name);
        }

        this.saveSavedEquipment();
        this.updateInventoryEquippedSlots();
        this.renderInventoryItems();
        if (this.updatePauseMenuEquipment) this.updatePauseMenuEquipment();

        const message = changed.length === 0
            ? 'Already wearing your best gear.'
            : `Equipped ${changed.join(', ')}`;

        if (changed.length > 0) this.audioManager.playSound('equip-item');
        this.showNotification(changed.length === 0 ? message : `Optimised: ${changed.join(', ')}`);

        // The stage-complete panel has its own inline readout, because a
        // toast that appears behind a full-screen panel is a toast nobody sees.
        const out = document.getElementById('stageOptimizeResult');
        if (out) {
            out.textContent = message;
            out.classList.add('shown');
        }
        return changed;
    }

    equipFromInventory(index) {
        const equipment = this.playerInventory[index];
        if (this.player) {
            this.audioManager.playSound('equip-item');
            // In-game: equip to active player
            this.player.equipItem(equipment);
            this.savedEquipment[equipment.type] = equipment;
            this.saveSavedEquipment();
            this.showNotification(`Equipped ${equipment.name}!`);
            this.updateInventoryEquippedSlots();
            this.renderInventoryItems();
        } else {
            // In menu: save to loadout
            this.savedEquipment[equipment.type] = equipment;
            this.saveSavedEquipment();
            this.showNotification(`${equipment.name} will be equipped on game start!`);
            this.updateInventoryEquippedSlots();
            this.renderInventoryItems();
        }
    }
    
    unequipFromInventory(slot) {
        if (this.player) {
            // In-game: unequip from active player
            const item = this.player.equipment[slot];
            if (item) {
                this.player.unequipItem(slot);
                this.savedEquipment[slot] = null;
                this.saveSavedEquipment();
                this.showNotification(`Unequipped ${item.name}!`);
                this.updateInventoryEquippedSlots();
                this.renderInventoryItems();
            }
        } else {
            // In menu: remove from loadout
            const item = this.savedEquipment[slot];
            if (item) {
                this.savedEquipment[slot] = null;
                this.saveSavedEquipment();
                this.showNotification(`Unequipped ${item.name}!`);
                this.updateInventoryEquippedSlots();
                this.renderInventoryItems();
            }
        }
    }
    
    updatePauseMenuEquipment() {
        const slots = ['weapon', 'armor', 'accessory', 'ring'];
        slots.forEach(slot => {
            const slotElement = document.getElementById(`pause-${slot}`);
            const equippedItem = this.player?.equipment?.[slot];
            
            if (equippedItem) {
                slotElement.innerHTML = `
                    <div style="color: ${this.getRarityColor(equippedItem.rarity)}; font-weight: bold; font-size: 0.9em;">${equippedItem.name}</div>
                    <div style="font-size: 0.75em; color: rgba(255,255,255,0.5);">(Click to unequip)</div>
                `;
                slotElement.classList.add('equipped');
                slotElement.style.cursor = 'pointer';
                slotElement.onclick = () => {
                    this.unequipFromInventory(slot);
                    this.updatePauseMenuEquipment();
                };
            } else {
                slotElement.innerHTML = 'Empty';
                slotElement.classList.remove('equipped');
                slotElement.style.cursor = 'default';
                slotElement.onclick = null;
            }
        });
    }
    
    getRarityColor(rarity) {
        const colors = {
            'Common': '#9CA3AF',
            'Uncommon': '#10B981',
            'Rare': '#3B82F6',
            'Epic': '#A855F7',
            'Legendary': '#F59E0B',
            // Also support uppercase enum keys used in equipment data
            'COMMON': '#9CA3AF',
            'UNCOMMON': '#10B981',
            'RARE': '#3B82F6',
            'EPIC': '#A855F7',
            'LEGENDARY': '#F59E0B'
        };
        return colors[rarity] || '#fff';
    }
    
    render() {
        // Clear the FULL canvas pixel buffer first (before any transforms)
        // Must reset transform temporarily to ensure the entire buffer is wiped
        this.ctx.save();
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        // A flat slab reads as "no background". A vertical grade alone is
        // enough to give the arena a floor and a horizon.
        const bgGrad = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        bgGrad.addColorStop(0, '#171429');
        bgGrad.addColorStop(0.55, '#1a1a2e');
        bgGrad.addColorStop(1, '#221a33');
        this.ctx.fillStyle = bgGrad;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.restore();

        // The art is pixel art. Bilinear filtering is the default and it
        // softens every sprite edge in the game; nearest-neighbour is what
        // keeps the pixels reading as pixels. Set per frame because canvas
        // state is not guaranteed across a context resize.
        this.ctx.imageSmoothingEnabled = false;
        
        // Screen shake first (outer), so it jitters the whole view in screen
        // space, then the camera. Order matters: swapping them makes the shake
        // fight the camera's follow-smoothing.
        this.ctx.save();
        if (this.screenShake > 0) {
            const shakeX = (Math.random() - 0.5) * this.screenShake;
            const shakeY = (Math.random() - 0.5) * this.screenShake;
            this.ctx.translate(shakeX, shakeY);
        }

        // Everything drawn from here until restore() is in WORLD space.
        //
        // Zoom scales about a world-space focus point so that point stays put
        // on screen while everything else pushes outward. Deliberately applied
        // to the RENDER only: camera.getBounds() stays unzoomed, so spawning
        // and culling are unaffected by a camera effect, which is the one way
        // a flourish like this could quietly change the game.
        if (this.zoom !== 1 && this.zoomFocus) {
            const f = this.zoomFocus;
            this.ctx.translate(f.x - this.camera.x, f.y - this.camera.y);
            this.ctx.scale(this.zoom, this.zoom);
            this.ctx.translate(-f.x, -f.y);
        } else {
            this.ctx.translate(-Math.round(this.camera.x), -Math.round(this.camera.y));
        }
        
        // Draw the arena floor (skip on mobile for performance)
        if (!this.performanceMode) {
            this.drawParallax();
            this.drawArenaFloor();
        }
        // The world boundary is drawn on every device — without it the player
        // has no way to tell where the playfield ends.
        this.drawWorldBounds();
        
        // Ground effects are painted on the floor, beneath anything standing
        // on it — a telegraph the player can walk across, not a sprite.
        this.effects.draw(this.ctx, 'ground');

        // Draw particles (background layer)
        this.particles.forEach(particle => particle.draw(this.ctx));
        
        // Draw XP orbs
        this.xpOrbs.forEach(orb => orb.draw(this.ctx));
        
        // Draw Health Pickups
        this.healthPickups.forEach(pickup => pickup.draw(this.ctx));
        
        // Draw Equipment Drops
        this.equipmentDrops.forEach(drop => drop.draw(this.ctx));

        // Draw coin pickups and chests
        this.coinPickups.forEach(coin => coin.draw(this.ctx));
        this.chests.forEach(chest => chest.draw(this.ctx));
        
        // Draw enemies
        this.enemies.forEach(enemy => enemy.draw(this.ctx));
        
        // Draw projectiles
        this.projectiles.forEach(projectile => projectile.draw(this.ctx));
        
        // Draw player weapons
        this.player.drawWeapons(this.ctx);
        
        // Draw player
        this.player.draw(this.ctx);
        
        // Draw Player 2 (co-op)
        if (this.player2 && this.player2.health > 0 && !this.player2.downed) {
            this.player2.drawWeapons(this.ctx);
            this.player2.draw(this.ctx);
        }
        // Air effects wash over everything in the world — a shockwave passes
        // in front of the player, not behind them.
        this.effects.draw(this.ctx, 'air');

        // Draw P1 revive indicator if P1 is downed
        if (this.player && this.player.downed) {
            this.drawReviveIndicator(this.ctx, this.player, 'P1');
        }
        // Draw P2 revive indicator if P2 is downed
        if (this.player2 && this.player2.downed) {
            this.drawReviveIndicator(this.ctx, this.player2, 'P2');
        }
        // Draw permanent death marker (no longer revivable)
        if (this.player2 && this.player2.health <= 0 && !this.player2.downed && this.player.health > 0) {
            this.ctx.globalAlpha = 0.3;
            this.ctx.font = '20px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillStyle = '#ff4444';
            this.ctx.fillText('💀 P2', this.player2.x, this.player2.y);
            this.ctx.globalAlpha = 1.0;
        }
        
        // Draw floating damage numbers above everything in the world layer
        this.damageNumbers.forEach(dn => dn.draw(this.ctx));

        this.ctx.restore();

        // --- Screen space from here down ---
        // These are positioned against the viewport, not the world, so they must
        // be drawn after the camera transform is restored or they scroll away.
        this.drawVignette();
        this.drawMinimap();
        this.drawAchievementNotifications();
        this.drawLowHealthWarning();
        if (this.showDebug) this.drawDebugOverlay();
    }

    // Red vignette that pulses when the player is nearly dead.
    drawLowHealthWarning() {
        const player = this.player;
        if (!player || player.health <= 0) return;
        const ratio = player.health / player.maxHealth;
        const threshold = GAME_CONFIG.juice.lowHealthThreshold;
        if (ratio > threshold) return;

        // Stronger the closer to death, and gently pulsing.
        const severity = 1 - (ratio / threshold);
        const pulse = 0.5 + 0.5 * Math.sin(this.gameTime * 6);
        const alpha = 0.18 + severity * 0.42 * pulse;

        const ctx = this.ctx;
        const w = this.canvas.width;
        const h = this.canvas.height;
        const grad = ctx.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.32, w / 2, h / 2, Math.max(w, h) * 0.62);
        grad.addColorStop(0, 'rgba(255,0,0,0)');
        grad.addColorStop(1, `rgba(255,0,0,${alpha.toFixed(3)})`);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
    }

    // F3 overlay: the counters that actually matter when hunting a slowdown.
    drawDebugOverlay() {
        const ctx = this.ctx;
        const lines = [
            `FPS ${Math.round(this.fps)}`,
            `Enemies ${this.enemies.length}`,
            `Projectiles ${this.projectiles.length}`,
            `Particles ${this.particles.length}`,
            `Pickups ${this.xpOrbs.length + this.healthPickups.length + this.coinPickups.length + this.equipmentDrops.length}`,
            `Chests ${this.chests.length}`,
            `Wave ${this.currentWaveId} \u00b7 ${this.currentWaveName}`,
            `Multiplier x${this.waveMultiplier.toFixed(2)}`
        ];

        // Bottom-left: the top-left corner belongs to the loadout HUD.
        const boxHeight = lines.length * 18 + 14;
        const top = this.canvas.height - boxHeight - 10;

        ctx.save();
        ctx.fillStyle = 'rgba(0,0,0,0.65)';
        ctx.fillRect(10, top, 230, boxHeight);
        ctx.font = '13px monospace';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        ctx.fillStyle = '#8ce99a';
        lines.forEach((line, i) => ctx.fillText(line, 20, top + 7 + i * 18));
        ctx.restore();
    }
    
    drawAchievementNotifications() {
        if (this.achievementQueue.length === 0) return;
        
        const notification = this.achievementQueue[0];
        const progress = Math.min(notification.showTime / 4, 1);
        
        // Slide in from right
        const startX = this.canvas.width;
        const endX = this.canvas.width - 320;
        const x = startX - (startX - endX) * this.easeOut(progress);
        const y = 80;
        
        // Background
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
        this.ctx.strokeStyle = '#FFD700';
        this.ctx.lineWidth = 3;
        
        this.ctx.fillRect(x, y, 300, 80);
        this.ctx.strokeRect(x, y, 300, 80);
        
        // Icon
        this.ctx.font = 'bold 36px Arial';
        this.ctx.fillStyle = '#FFD700';
        this.ctx.fillText(notification.icon, x + 20, y + 50);
        
        // Text
        this.ctx.font = 'bold 12px Arial';
        this.ctx.fillStyle = '#FFD700';
        this.ctx.fillText('ACHIEVEMENT UNLOCKED', x + 70, y + 25);
        
        this.ctx.font = 'bold 16px Arial';
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.fillText(notification.name, x + 70, y + 45);
        
        this.ctx.font = '12px Arial';
        this.ctx.fillStyle = '#CCCCCC';
        this.ctx.fillText(notification.desc, x + 70, y + 62);
    }
    
    easeOut(t) {
        return 1 - Math.pow(1 - t, 3);
    }
    
    // A far layer of motes that slides slower than the world. Without it the
    // arena floor is uniform in every direction, so moving through it gives no
    // sense of travel — the grid alone is too regular to read as motion.
    //
    // Positions come from a hash of the tile coordinates rather than a stored
    // array, so the field is effectively infinite, stable frame to frame, and
    // costs no memory.
    drawParallax() {
        const ctx = this.ctx;
        const view = this.camera.getBounds();
        const TILE = 400;
        const PER_TILE = 3;
        // Below 1 the layer lags the camera, which is what sells the depth.
        const depth = 0.55;

        // Shift the sampled region so the motes trail the camera, then draw
        // them back in world space at the same shift.
        const ox = this.camera.x * (1 - depth);
        const oy = this.camera.y * (1 - depth);

        const left = view.left - ox, right = view.right - ox;
        const top = view.top - oy, bottom = view.bottom - oy;

        ctx.save();
        ctx.translate(ox, oy);
        for (let tx = Math.floor(left / TILE); tx <= Math.floor(right / TILE); tx++) {
            for (let ty = Math.floor(top / TILE); ty <= Math.floor(bottom / TILE); ty++) {
                for (let k = 0; k < PER_TILE; k++) {
                    // Cheap integer hash -> three stable pseudo-randoms.
                    let hsh = (tx * 73856093) ^ (ty * 19349663) ^ (k * 83492791);
                    hsh = (hsh ^ (hsh >>> 13)) >>> 0;
                    const rx = (hsh % 1000) / 1000;
                    const ry = ((hsh >>> 10) % 1000) / 1000;
                    const rr = ((hsh >>> 20) % 1000) / 1000;

                    const x = tx * TILE + rx * TILE;
                    const y = ty * TILE + ry * TILE;
                    const r = 1 + rr * 2.4;
                    // Slow breathing so the field is never completely static.
                    const tw = 0.35 + 0.3 * Math.sin(this.gameTime * 0.6 + rr * 9);

                    ctx.fillStyle = `rgba(168, 148, 255, ${(tw * 0.5).toFixed(3)})`;
                    ctx.beginPath();
                    ctx.arc(x, y, r, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
        }
        ctx.restore();
    }

    // The minimap.
    //
    // The world is 3456x1944 and the camera shows well under a third of it, so
    // most of what matters is off-screen most of the time: the boss you are
    // running from, the cache with twelve seconds on it, the pack that just
    // landed behind you. None of that was knowable without walking into it.
    //
    // Drawn on its own small canvas rather than into the main one, so it is
    // not subject to the camera transform, the screen shake, or the vignette.
    drawMinimap() {
        if (!this.minimapVisible) return;
        if (!this._mm) {
            const c = document.getElementById('minimap');
            if (!c) { this.minimapVisible = false; return; }
            this._mm = { canvas: c, ctx: c.getContext('2d') };
        }
        const { canvas, ctx } = this._mm;
        const W = canvas.width, H = canvas.height;
        const world = this.world;
        const sx = W / world.width, sy = H / world.height;

        // Device pixels per CSS pixel. The backing store is deliberately larger
        // than the displayed size so the dots stay crisp on Retina, which means
        // every radius below has to be expressed in CSS pixels and scaled up,
        // or the whole map draws at half the intended weight. Read from the
        // live element rather than hardcoded, because the CSS width changes at
        // the mobile breakpoint while the backing store does not.
        const u = W / (canvas.clientWidth || 168);

        ctx.clearRect(0, 0, W, H);

        // Floor, so the map reads as the same place as the arena.
        ctx.fillStyle = 'rgba(26, 23, 40, 0.9)';
        ctx.fillRect(0, 0, W, H);

        // The slice the player can actually see. Without it the dots have no
        // frame of reference and the map cannot be used to steer.
        const v = this.camera.getBounds();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.28)';
        ctx.lineWidth = 1.5 * u;
        ctx.strokeRect(v.left * sx, v.top * sy,
                       (v.right - v.left) * sx, (v.bottom - v.top) * sy);

        const dot = (x, y, r, fill) => {
            ctx.fillStyle = fill;
            ctx.beginPath();
            ctx.arc(x * sx, y * sy, r * u, 0, Math.PI * 2);
            ctx.fill();
        };

        // Ordinary enemies first and smallest, so nothing important is buried
        // under the horde. A cap keeps a 90-enemy screen cheap.
        const cap = 90;
        let drawn = 0;
        for (const e of this.enemies) {
            if (drawn >= cap) break;
            if (e.type === 'boss' || e.isElite || e.type === 'elite') continue;
            drawn++;
            dot(e.x, e.y, 1.5, 'rgba(224, 49, 49, 0.72)');
        }

        // Then the things worth crossing the arena for, or away from.
        for (const c of this.chests) {
            const expiring = c.expires !== undefined;
            // A timed cache blinks, and blinks faster as it runs out — the map
            // has to carry the urgency, not just the position.
            let show = true;
            if (expiring && c.maxExpires) {
                const frac = Math.max(0, c.expires / c.maxExpires);
                show = Math.sin(this.gameTime * (6 + (1 - frac) * 14)) > -0.35;
            }
            if (!show) continue;
            ctx.fillStyle = '#ffd43b';
            ctx.fillRect(c.x * sx - 2.5 * u, c.y * sy - 2.5 * u, 5 * u, 5 * u);
        }

        for (const e of this.enemies) {
            if (e.isElite || e.type === 'elite') dot(e.x, e.y, 2.6, ELITE_MARK_COLOR);
        }

        if (this.bossActive && this.currentBoss && this.currentBoss.health > 0) {
            const b = this.currentBoss;
            const pulse = 0.55 + 0.45 * Math.sin(this.gameTime * 5);
            ctx.strokeStyle = `rgba(255, 80, 80, ${pulse.toFixed(2)})`;
            ctx.lineWidth = 1.5 * u;
            ctx.beginPath();
            ctx.arc(b.x * sx, b.y * sy, 6.5 * u, 0, Math.PI * 2);
            ctx.stroke();
            dot(b.x, b.y, 3.5, '#ff4444');
        }

        // Players last so they are never covered.
        const me = this.player;
        if (me && me.health > 0) {
            dot(me.x, me.y, 4, '#ffffff');
            dot(me.x, me.y, 2.4, me.color || '#4dabf7');
        }
        if (this.player2 && this.player2.health > 0) {
            dot(this.player2.x, this.player2.y, 4, '#ffffff');
            dot(this.player2.x, this.player2.y, 2.4, this.player2.color || '#51cf66');
        }
    }

    // Darkens the corners so the action sits in a pool of light. It is the
    // cheapest way to stop a flat field from reading as empty space.
    drawVignette() {
        const ctx = this.ctx;
        const w = this.canvas.width, h = this.canvas.height;
        const grad = ctx.createRadialGradient(
            w / 2, h / 2, Math.min(w, h) * 0.42,
            w / 2, h / 2, Math.max(w, h) * 0.78
        );
        grad.addColorStop(0, 'rgba(0,0,0,0)');
        grad.addColorStop(1, 'rgba(0,0,0,0.55)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
    }

    // Deterministic pseudo-random from a pair of integers. Same input always
    // gives the same output, so the floor is stable frame to frame and between
    // runs without storing a single tile.
    static hash2(x, y, k) {
        let h = (x * 73856093) ^ (y * 19349663) ^ (k * 83492791);
        h = Math.imul(h ^ (h >>> 15), 2246822519);
        h = Math.imul(h ^ (h >>> 13), 3266489917);
        return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
    }

    // The arena floor.
    //
    // This used to be a flat fill plus a uniform 50px grid at 5% white, which
    // read as a black void with graph paper on it — nothing to navigate by and
    // no sense of place. It is now cracked flagstone with the occasional
    // buried rune, which is the same world the title art already establishes.
    //
    // Everything is derived from a hash of the tile coordinates rather than
    // stored, so the floor is effectively infinite, identical every frame, and
    // costs no memory. Only tiles inside the camera view are touched.
    drawArenaFloor() {
        const ctx = this.ctx;
        const view = this.camera.getBounds();
        const T = 192;

        const x0 = Math.floor(view.left / T), x1 = Math.floor(view.right / T);
        const y0 = Math.floor(view.top / T), y1 = Math.floor(view.bottom / T);

        ctx.save();

        for (let tx = x0; tx <= x1; tx++) {
            for (let ty = y0; ty <= y1; ty++) {
                const px = tx * T, py = ty * T;
                const r = Game.hash2(tx, ty, 1);

                // Slab shade. The spread is deliberately narrow: the sprites
                // have to stay the highest-contrast thing on screen.
                const lift = Math.floor(r * 10);
                ctx.fillStyle = `rgb(${26 + lift}, ${23 + lift}, ${40 + lift})`;
                ctx.fillRect(px, py, T, T);

                // Mortar. Drawn per slab rather than as one big grid stroke so
                // each seam can sit at its own weight.
                ctx.strokeStyle = 'rgba(8, 6, 14, 0.55)';
                ctx.lineWidth = 2 + r * 1.5;
                ctx.strokeRect(px, py, T, T);

                // A highlight along the top and left of each slab reads as
                // relief — the single cheapest thing that stops a tiled floor
                // looking like a flat colour chart.
                ctx.strokeStyle = 'rgba(150, 130, 220, 0.05)';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(px + 1, py + T - 1);
                ctx.lineTo(px + 1, py + 1);
                ctx.lineTo(px + T - 1, py + 1);
                ctx.stroke();

                this.drawFloorDetail(tx, ty, px, py, T);
            }
        }

        ctx.restore();
    }

    // Per-slab decoration. One bucket per slab, so the floor stays sparse —
    // decoration on every tile would be texture, and texture competes with the
    // enemies for attention.
    drawFloorDetail(tx, ty, px, py, T) {
        const ctx = this.ctx;
        const pick = Game.hash2(tx, ty, 7);

        if (pick < 0.40) return;                       // most slabs stay bare

        if (pick < 0.62) {
            // Rubble: a few chips of stone.
            ctx.fillStyle = 'rgba(10, 8, 18, 0.5)';
            for (let i = 0; i < 4; i++) {
                const a = Game.hash2(tx, ty, 20 + i);
                const b = Game.hash2(tx, ty, 40 + i);
                const sz = 2 + a * 4;
                ctx.fillRect(px + 20 + a * (T - 50), py + 20 + b * (T - 50), sz, sz);
            }
            return;
        }

        if (pick < 0.86) {
            // A crack. Walked as a short polyline across the slab so it reads
            // as a fracture with direction rather than a scratch.
            const steps = 5;
            const sx = px + 20 + Game.hash2(tx, ty, 3) * (T - 40);
            const sy = py + 20 + Game.hash2(tx, ty, 4) * (T - 40);
            let cx = sx, cy = sy;
            const dir = Game.hash2(tx, ty, 5) * Math.PI * 2;

            ctx.strokeStyle = 'rgba(6, 4, 10, 0.72)';
            ctx.lineWidth = 1 + Game.hash2(tx, ty, 6) * 2;
            ctx.lineCap = 'round';
            ctx.beginPath();
            ctx.moveTo(cx, cy);
            for (let i = 0; i < steps; i++) {
                const wob = (Game.hash2(tx, ty, 60 + i) - 0.5) * 1.5;
                const len = 14 + Game.hash2(tx, ty, 80 + i) * 22;
                cx += Math.cos(dir + wob) * len;
                cy += Math.sin(dir + wob) * len;
                ctx.lineTo(cx, cy);
            }
            ctx.stroke();
            return;
        }

        // A buried rune. Rare on purpose: at roughly one slab in seven it is a
        // landmark the player can steer by, which is the thing a uniform grid
        // could never provide.
        const cx = px + T / 2, cy = py + T / 2;
        const rad = 34 + Game.hash2(tx, ty, 9) * 20;
        // Each ring breathes on its own offset so a screen holding several of
        // them never pulses in unison.
        const phase = Game.hash2(tx, ty, 10) * Math.PI * 2;
        const pulse = 0.45 + 0.55 * (0.5 + 0.5 * Math.sin(this.gameTime * 1.1 + phase));

        ctx.save();
        ctx.globalCompositeOperation = 'lighter';
        ctx.strokeStyle = `rgba(34, 184, 207, ${(0.16 * pulse).toFixed(3)})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(cx, cy, rad, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = `rgba(34, 184, 207, ${(0.10 * pulse).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(cx, cy, rad * 0.62, 0, Math.PI * 2);
        ctx.stroke();

        // Spokes, so it reads as carved rather than as a lens flare.
        const spokes = 6;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        for (let i = 0; i < spokes; i++) {
            const a = phase + (i / spokes) * Math.PI * 2;
            ctx.moveTo(cx + Math.cos(a) * rad * 0.62, cy + Math.sin(a) * rad * 0.62);
            ctx.lineTo(cx + Math.cos(a) * rad, cy + Math.sin(a) * rad);
        }
        ctx.stroke();
        ctx.restore();
    }

    // With a scrolling world the screen edge is no longer the arena edge, so
    // the boundary has to be drawn or the player cannot tell where it is.
    drawWorldBounds() {
        const world = this.world;
        const view = this.camera.getBounds();

        const t = GAME_CONFIG.world.edgeThickness;

        // The border is in view whenever the camera is clamped against an edge
        // (view.left reaches 0), not only when the view spills past the world —
        // clamping means it never spills, so a strict test would never fire.
        const edgeVisible = view.left <= t || view.top <= t ||
                            view.right >= world.width - t ||
                            view.bottom >= world.height - t;
        if (!edgeVisible) return;

        const ctx = this.ctx;
        ctx.save();

        // Dim the dead space beyond the world so the edge reads as solid.
        ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
        if (view.left < 0) ctx.fillRect(view.left, view.top, -view.left, view.bottom - view.top);
        if (view.top < 0) ctx.fillRect(view.left, view.top, view.right - view.left, -view.top);
        if (view.right > world.width) ctx.fillRect(world.width, view.top, view.right - world.width, view.bottom - view.top);
        if (view.bottom > world.height) ctx.fillRect(view.left, world.height, view.right - view.left, view.bottom - world.height);

        // Inset by half the stroke so the whole line sits inside the world and
        // none of it is hidden under the dimmed dead space.
        ctx.strokeStyle = 'rgba(150, 115, 255, 0.75)';
        ctx.lineWidth = t;
        ctx.strokeRect(t / 2, t / 2, world.width - t, world.height - t);

        // Faint inner halo so the wall reads as solid rather than as a hairline.
        ctx.strokeStyle = 'rgba(150, 115, 255, 0.18)';
        ctx.lineWidth = t * 2.5;
        ctx.strokeRect(t * 1.75, t * 1.75, world.width - t * 3.5, world.height - t * 3.5);
        ctx.restore();
    }

    spawnEnemies(deltaTime) {
        // The pre-boss lull and the stage intro must both actually be empty.
        if (this.bossLull > 0 || this.stageIntro > 0) return;

        const cfg = GAME_CONFIG;
        const minutes = this.gameTime / 60;

        // Enemy health drifts up with elapsed time (used as the Enemy multiplier).
        this.waveMultiplier = 1 + minutes * cfg.enemy.healthGrowthPerMinute;

        // Wave director: which enemies spawn, and how fast, is a function of time.
        const wave = getWaveForTime(this.gameTime);
        if (wave.id !== this.currentWaveId) {
            this.currentWaveId = wave.id;
            this.currentWaveName = wave.name;
            if (this.gameTime > 1) this.showNotification(`\u2694\ufe0f ${wave.name} \u2014 ${wave.announce}`);
        }

        // Hard ceiling on live enemies. When it is hit we delay spawning rather
        // than letting the count run away.
        let maxEnemies = this.performanceMode
            ? cfg.spawn.maxEnemiesMobile
            : Math.min(cfg.spawn.maxEnemiesDesktop, Math.floor(20 + minutes * 12));
        if (this.bossActive) maxEnemies = Math.floor(maxEnemies * 0.35);
        if (this.enemies.length >= maxEnemies) return;

        const deltaMs = deltaTime * 1000;
        // Spawn rate accelerates over the run, on top of the wave's own rate.
        const rateScale = wave.rateScale * Math.max(0.45, 1 - minutes * 0.06);
        const mobileFactor = this.performanceMode ? 1.6 : 1;

        // Rarest types first. When the field is near the enemy cap the loop
        // breaks early, and the interesting enemies should not be the ones that
        // get starved out by a crowd of grunts.
        const types = Object.keys(wave.spawns).sort((a, b) => wave.spawns[b] - wave.spawns[a]);

        for (const type of types) {
            if (this.enemies.length >= maxEnemies) break;

            let timer = this.enemySpawnTimers[type];
            if (!timer) timer = this.enemySpawnTimers[type] = { lastSpawn: 0 };
            timer.lastSpawn += deltaMs;

            const floor = WAVE_MIN_COOLDOWNS[type] || 300;
            const cooldown = Math.max(floor, wave.spawns[type] * rateScale * mobileFactor);
            if (timer.lastSpawn < cooldown) continue;

            timer.lastSpawn = 0;
            const pos = this.pickSpawnPoint();
            this.enemies.push(new Enemy(pos.x, pos.y, type, this.waveMultiplier, this));
        }
    }

    // Choose an off-screen spawn point, preferring the candidate furthest from
    // any living player. Always returns a point — on a small screen every edge
    // may be close to the player, and starving spawns would stall the run.
    pickSpawnPoint() {
        const m = GAME_CONFIG.spawn.offscreenMargin;
        const wanted = GAME_CONFIG.spawn.minDistanceFromPlayer;
        let best = null;
        let bestDist = -1;

        // Spawn just outside what the camera can see, in world coordinates.
        const view = this.camera.getBounds();
        const world = this.world;

        for (let attempt = 0; attempt < 10; attempt++) {
            const side = Math.floor(Math.random() * 4);
            let x, y;
            switch (side) {
                case 0:  x = view.left + Math.random() * (view.right - view.left); y = view.top - m; break;
                case 1:  x = view.right + m; y = view.top + Math.random() * (view.bottom - view.top); break;
                case 2:  x = view.left + Math.random() * (view.right - view.left); y = view.bottom + m; break;
                default: x = view.left - m;  y = view.top + Math.random() * (view.bottom - view.top); break;
            }

            // Keep spawns inside the world. Near a world edge the ideal ring
            // point can fall outside it, which would look like enemies walking
            // in through the wall.
            x = Math.max(m, Math.min(world.width - m, x));
            y = Math.max(m, Math.min(world.height - m, y));

            const d = this.distanceToNearestPlayer(x, y);
            // Prefer a point that is both far enough away AND out of sight, so
            // enemies do not pop into existence in front of the player.
            if (d >= wanted && this.camera.isOffscreen(x, y, 0)) return { x, y };
            if (d > bestDist) { bestDist = d; best = { x, y }; }
        }
        return best;
    }

    // Called once per enemy per frame, so it deliberately avoids allocating.
    distanceToNearestPlayer(x, y) {
        let nearest = Infinity;
        const p1 = this.player;
        const p2 = this.player2;
        if (p1 && p1.health > 0) nearest = Math.hypot(p1.x - x, p1.y - y);
        if (p2 && p2.health > 0) {
            const d = Math.hypot(p2.x - x, p2.y - y);
            if (d < nearest) nearest = d;
        }
        return nearest === Infinity ? 9999 : nearest;
    }

    // Tiny burst when a gem is absorbed. Skipped on mobile and when the
    // particle budget is already spent.
    spawnPickupSparkle(x, y, color) {
        if (this.performanceMode) return;
        if (this.particles.length >= GAME_CONFIG.juice.maxParticlesDesktop) return;
        for (let i = 0; i < 5; i++) {
            const angle = (Math.PI * 2 * i) / 5 + Math.random();
            this.particles.push(new Particle(x, y, angle, 90 + Math.random() * 60, color, 0.6));
        }
    }

    // Children inherit the parent's difficulty multiplier so a late-run
    // splitter does not seed trivially weak spawn.
    spawnSplitChildren(parent) {
        const childType = parent.stats.splitsInto;
        const count = parent.stats.splitCount || 2;
        // Respect the live enemy cap; a splitter should never be the thing
        // that blows past it.
        const cap = this.performanceMode
            ? GAME_CONFIG.spawn.maxEnemiesMobile
            : GAME_CONFIG.spawn.maxEnemiesDesktop;

        for (let i = 0; i < count; i++) {
            if (this.enemies.length >= cap) break;
            const angle = (Math.PI * 2 * i) / count + Math.random();
            const pos = this.clampToWorld(
                parent.x + Math.cos(angle) * 26,
                parent.y + Math.sin(angle) * 26,
                20
            );
            this.enemies.push(new Enemy(pos.x, pos.y, childType, parent.multiplier, this));
        }
    }

    spawnXP(x, y, value) {
        const p = this.clampToWorld(x, y, 15);
        this.xpOrbs.push(new XPOrb(p.x, p.y, value));
    }

    // One payout split across several gems in a ring. The total is preserved
    // exactly — the remainder goes on the first gem rather than being rounded
    // away, so a burst is never worth less than the same kill would have been.
    spawnXPBurst(x, y, total, count, spread) {
        const each = Math.floor(total / count);
        for (let i = 0; i < count; i++) {
            const a = (i / count) * Math.PI * 2 + Math.random() * 0.4;
            const d = spread * (0.45 + Math.random() * 0.55);
            const value = each + (i === 0 ? total - each * count : 0);
            this.spawnXP(x + Math.cos(a) * d, y + Math.sin(a) * d, value);
        }
    }
    
    spawnHealth(x, y, healAmount) {
        const p = this.clampToWorld(x, y, 20);
        this.healthPickups.push(new HealthPickup(p.x, p.y, healAmount));
    }
    
    dropEquipment(x, y) {
        // Generate random equipment
        const equipment = this.generateEquipmentDrop(this.currentStage);
        const p = this.clampToWorld(x, y, 30);
        this.equipmentDrops.push(new EquipmentDrop(p.x, p.y, equipment));
    }
    
    createParticles(x, y, color, enemyType = 'basic') {
        // Hard particle budget — a big pack dying at once must not cost frames.
        const cap = this.performanceMode
            ? GAME_CONFIG.juice.maxParticlesMobile
            : GAME_CONFIG.juice.maxParticlesDesktop;
        if (this.particles.length >= cap) return;

        // Different particle effects based on enemy type
        let particleCount = 8;
        let particleSpeed = 100;
        let particleSize = 1;
        
        if (enemyType === 'fast') {
            particleCount = 12; // More particles for fast enemies
            particleSpeed = 200; // Faster explosion
            particleSize = 0.8;
        } else if (enemyType === 'tank') {
            particleCount = 20; // Large explosion
            particleSpeed = 80; // Slower but more particles
            particleSize = 1.5;
        }
        
        // Reduce particle count on mobile
        if (this.performanceMode) {
            particleCount = Math.floor(particleCount * 0.3); // 70% reduction on mobile
            // Hard cap: don't add particles if we're close to max
            if (this.particles.length > 15) {
                return; // Skip creating particles entirely
            }
        }
        
        for (let i = 0; i < particleCount; i++) {
            const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.5;
            const speed = particleSpeed + Math.random() * 100;
            this.particles.push(new Particle(x, y, angle, speed, color, particleSize));
        }
        
        // Add screen shake for tank deaths
        if (enemyType === 'tank') {
            this.screenShake = 10;
        }
    }
    
    // An enemy is touching a player. Both players resolve it the same way, and
    // the class decides how hard the contact answers back: takeDamage owns the
    // player's i-frames, so this runs every frame of contact but only actually
    // hurts once per i-frame window.
    resolveContact(enemy, player, deltaTime) {
        player.takeDamage(enemy.damage);

        // Per second, not per frame, so frame rate never changes the total.
        // Routed through the dot channel for the same reason the aura weapons
        // are: batched damage numbers and no machine-gunned hit sound.
        if (player.contactDamage > 0 && enemy.health > 0) {
            enemy.takeDamage(player.projectileDamage * player.contactDamage * deltaTime, { dot: true });
        }

        const dx = enemy.x - player.x;
        const dy = enemy.y - player.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > 0) {
            enemy.x += (dx / dist) * player.contactKnockback * deltaTime;
            enemy.y += (dy / dist) * player.contactKnockback * deltaTime;
        }
    }

    checkCollision(obj1, obj2) {
        const dx = obj1.x - obj2.x;
        const dy = obj1.y - obj2.y;
        // Use squared distance to avoid expensive sqrt
        const distSq = dx * dx + dy * dy;
        const radii = obj1.radius + obj2.radius;
        return distSq < radii * radii;
    }
    
    // Cache HUD DOM references once so we don't call getElementById every frame
    _cacheHUDElements() {
        this._hudElements = {
            stage: document.getElementById('stageText'),
            coins: document.getElementById('coinsText'),
            healthBar: document.getElementById('healthBar'),
            healthText: document.getElementById('healthText'),
            level: document.getElementById('levelText'),
            xpBar: document.getElementById('xpBar'),
            time: document.getElementById('timeText'),
            kills: document.getElementById('killText'),
            ultimateBar: document.getElementById('ultimateBar'),
            ultimateText: document.getElementById('ultimateText'),
        };
    }
    
    // The boss health bar markup existed but nothing ever filled it — the
    // container was an empty div with a "rendered in canvas" note, and the
    // canvas never drew one either. So a boss fight had no visible progress at
    // all: the only feedback was the boss eventually falling over.
    updateBossHealthBar() {
        if (!this.bossActive || !this.currentBoss) return;
        if (!this._bossHpEls) {
            this._bossHpEls = {
                fill: document.getElementById('bossHpFill'),
                chip: document.getElementById('bossHpChip'),
                value: document.getElementById('bossHpValue'),
                track: document.getElementById('bossHpTrack'),
                pips: document.getElementById('bossHpPips')
            };
        }
        const e = this._bossHpEls;
        if (!e.fill) return;

        const b = this.currentBoss;
        const pct = Math.max(0, Math.min(1, b.health / b.maxHealth)) * 100;
        e.fill.style.width = pct + '%';
        e.chip.style.width = pct + '%';
        if (e.value) {
            e.value.textContent =
                `${Math.max(0, Math.ceil(b.health)).toLocaleString()} / ${Math.ceil(b.maxHealth).toLocaleString()}`
                + `  \u00b7  PHASE ${b.phase}/${b.phaseCount}`;
        }

        // Phase colour, and pips for how many bars are already spent. A single
        // draining bar cannot say "two more of these to go".
        if (e.track && b.phase !== this._bossHpPhase) {
            this._bossHpPhase = b.phase;
            e.track.classList.remove('phase-1', 'phase-2', 'phase-3');
            e.track.classList.add('phase-' + Math.min(b.phase, 3));
            if (e.pips) {
                [...e.pips.children].forEach((pip, i) => {
                    pip.classList.toggle('spent', i < b.phase - 1);
                });
            }
        }
    }

    updateHUD() {
        if (!this._hudElements) this._cacheHUDElements();
        const h = this._hudElements;
        
        h.stage.textContent = this.currentStage;
        h.coins.textContent = this.coins;

        this.updateBossHealthBar();
        
        // Health
        const healthPercent = (this.player.health / this.player.maxHealth) * 100;
        h.healthBar.style.width = healthPercent + '%';
        h.healthText.textContent = `${Math.ceil(this.player.health)}/${this.player.maxHealth}`;
        
        // Level
        h.level.textContent = this.player.level;
        
        // XP
        const xpPercent = (this.player.xp / this.player.xpToLevel) * 100;
        h.xpBar.style.width = xpPercent + '%';
        
        // Time
        const stageTime = this.gameTime - this.stageStartTime;
        const minutes = Math.floor(stageTime / 60);
        const seconds = Math.floor(stageTime % 60);
        h.time.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        
        // Kills
        h.kills.textContent = this.player.kills;
        
        // Ultimate charge
        const ultimatePercent = this.player.getUltimateReadiness() * 100;
        h.ultimateBar.style.width = ultimatePercent + '%';
        h.ultimateText.textContent = this.player.ultimateReady
            ? 'READY'
            : `${Math.floor(ultimatePercent)}%`;
        
        // Player 2 HUD (co-op)
        if (this.player2) {
            const p2HealthPercent = Math.max(0, (this.player2.health / this.player2.maxHealth) * 100);
            const p2HealthBar = document.getElementById('p2HealthBar');
            const p2HealthText = document.getElementById('p2HealthText');
            const p2UltBar = document.getElementById('p2UltimateBar');
            const p2StatusEl = document.getElementById('p2ReviveStatus');
            if (p2HealthBar) {
                p2HealthBar.style.width = p2HealthPercent + '%';
                if (this.player2.downed) {
                    p2HealthBar.style.background = 'repeating-linear-gradient(45deg, #ff4444, #ff4444 4px, #cc0000 4px, #cc0000 8px)';
                } else {
                    p2HealthBar.style.background = '';
                }
            }
            if (p2HealthText) {
                if (this.player2.downed) {
                    const secs = Math.ceil(this.player2.reviveTimer);
                    p2HealthText.textContent = `⚠️ DOWN (${secs}s)`;
                } else if (this.player2.health <= 0) {
                    p2HealthText.textContent = '💀 DEAD';
                } else {
                    p2HealthText.textContent = `${Math.ceil(this.player2.health)}/${this.player2.maxHealth}`;
                }
            }
            if (p2UltBar) p2UltBar.style.width = (this.player2.getUltimateReadiness() * 100) + '%';
            // Show revive status text
            if (p2StatusEl) {
                if (this.player2.downed) {
                    const pct = Math.floor(this.player2.reviveProgress * 100);
                    p2StatusEl.textContent = pct > 0 ? `Reviving... ${pct}%` : 'Get close to revive!';
                    p2StatusEl.style.display = 'block';
                } else {
                    p2StatusEl.style.display = 'none';
                }
            }
        }
        // Player 1 downed HUD (show warning on main health bar)
        if (this.player && this.player.downed) {
            const secs = Math.ceil(this.player.reviveTimer);
            if (h.healthText) h.healthText.textContent = `⚠️ DOWN (${secs}s)`;
            if (h.healthBar) h.healthBar.style.background = 'repeating-linear-gradient(45deg, #ff4444, #ff4444 4px, #cc0000 4px, #cc0000 8px)';
        } else {
            if (h.healthBar) h.healthBar.style.background = '';
        }
    }
    
    // Co-op revive system — called each frame when coopMode is active
    updateReviveSystem(deltaTime) {
        const players = [
            { downed: this.player, rescuer: this.player2, label: 'P1' },
            { downed: this.player2, rescuer: this.player, label: 'P2' }
        ];
        
        for (const pair of players) {
            const dp = pair.downed;   // potentially downed player
            const rp = pair.rescuer;  // potential rescuer
            
            if (!dp || !dp.downed) continue;
            
            // Count down the revive window
            dp.reviveTimer -= deltaTime;
            
            // If timer expires → permanent death
            if (dp.reviveTimer <= 0) {
                dp.downed = false;
                dp.health = 0;
                dp.reviveTimer = 0;
                dp.reviveProgress = 0;
                this.showNotification(`${pair.label} has fallen!`, '#ff4444');
                
                // Check if both players are now truly dead
                const p1Dead = this.player.health <= 0 && !this.player.downed;
                const p2Dead = !this.player2 || (this.player2.health <= 0 && !this.player2.downed);
                if (p1Dead && p2Dead) {
                    this.gameOver();
                    return;
                }
                continue;
            }
            
            // Check if rescuer is alive and close enough
            if (rp && rp.health > 0 && !rp.downed) {
                const dx = dp.x - rp.x;
                const dy = dp.y - rp.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                if (dist <= dp.reviveRange) {
                    // Revive progress increases
                    dp.reviveProgress += deltaTime / dp.reviveTime;
                    
                    if (dp.reviveProgress >= 1) {
                        // Revived!
                        dp.downed = false;
                        dp.health = Math.floor(dp.maxHealth * 0.4); // Revive at 40% HP
                        dp.reviveProgress = 0;
                        dp.timesRevived++;
                        dp.invulnerable = true;
                        dp.iframeTimer = 3.0; // 3s of invulnerability after revive
                        
                        this.showNotification(`${pair.label} revived!`, '#2ecc71');
                        this.audioManager.playSound('pickup-health');
                        
                        // Celebration particles
                        for (let i = 0; i < 12; i++) {
                            const angle = (i / 12) * Math.PI * 2;
                            this.particles.push(new Particle(
                                dp.x, dp.y, angle, 120 + Math.random() * 80,
                                '#2ecc71', 1.5
                            ));
                        }
                    }
                } else {
                    // Decay progress slowly when out of range (doesn't reset fully)
                    dp.reviveProgress = Math.max(0, dp.reviveProgress - deltaTime * 0.3);
                }
            } else {
                // No rescuer available — progress decays
                dp.reviveProgress = Math.max(0, dp.reviveProgress - deltaTime * 0.3);
            }
        }
    }
    
    // Draw the revive indicator on canvas for a downed player
    drawReviveIndicator(ctx, player, label) {
        const px = player.x;
        const py = player.y;
        const t = this.gameTime;
        
        // Pulsing red glow behind
        const pulseAlpha = 0.3 + Math.sin(t * 4) * 0.15;
        ctx.globalAlpha = pulseAlpha;
        ctx.fillStyle = '#ff4444';
        ctx.beginPath();
        ctx.arc(px, py, 30, 0, Math.PI * 2);
        ctx.fill();
        
        // Downed player icon (skull + label)
        ctx.globalAlpha = 0.7 + Math.sin(t * 3) * 0.2;
        ctx.font = '20px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#ff6666';
        ctx.fillText(`💀 ${label}`, px, py - 2);
        
        // Revive progress arc (green ring)
        if (player.reviveProgress > 0) {
            ctx.globalAlpha = 0.9;
            ctx.strokeStyle = '#2ecc71';
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.arc(px, py, 35, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * player.reviveProgress);
            ctx.stroke();
            
            // Progress percentage
            ctx.fillStyle = '#2ecc71';
            ctx.font = 'bold 12px Arial';
            ctx.fillText(`${Math.floor(player.reviveProgress * 100)}%`, px, py + 22);
        }
        
        // Countdown timer ring (red, shrinking)
        const timerFrac = player.reviveTimer / Math.max(5, player.reviveWindowMax - player.timesRevived * 3);
        ctx.globalAlpha = 0.5;
        ctx.strokeStyle = timerFrac > 0.3 ? '#ffaa00' : '#ff0000';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(px, py, 40, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * timerFrac);
        ctx.stroke();
        
        // Timer text
        ctx.globalAlpha = 0.8;
        ctx.fillStyle = timerFrac > 0.3 ? '#ffcc00' : '#ff4444';
        ctx.font = '10px Arial';
        ctx.fillText(`${Math.ceil(player.reviveTimer)}s`, px, py + 34);
        
        // "Get close!" prompt if no progress
        if (player.reviveProgress === 0) {
            const bobY = Math.sin(t * 2) * 3;
            ctx.globalAlpha = 0.6 + Math.sin(t * 3) * 0.2;
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 11px Arial';
            ctx.fillText('REVIVE!', px, py - 30 + bobY);
        }
        
        ctx.globalAlpha = 1.0;
        ctx.lineWidth = 1;
    }
    
    // Clear all tracked timers (called on restart/quit)
    clearActiveTimers() {
        if (this.activeTimers) {
            this.activeTimers.forEach(id => clearTimeout(id));
            this.activeTimers = [];
        }
    }
    
    // Winning the campaign. Deliberately shares gameOver's teardown so a run
    // always ends the same way, then shows a different face.
    victory() {
        // A run can end mid-cinematic. Never leave the world slowed, the
        // camera parked off the player, or a card stuck on screen.
        this.timeScale = 1;
        this.cameraOverride = null;
        this.hitStop = 0;
        this.bossEntrance = 0;
        this.stageIntro = 0;
        this.bossLull = 0;
        document.getElementById('bossEntrance')?.classList.remove('active');
        document.getElementById('stageIntro')?.classList.remove('active');

        this.isRunning = false;
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
        this.clearActiveTimers();
        this.isPaused = false;

        localStorage.setItem(GAME_CONFIG.progression.endlessUnlockKey, 'true');
        this.audioManager.playSound('boss-defeat');
        this.screenShake = 0;

        const minutes = Math.floor(this.gameTime / 60);
        const seconds = Math.floor(this.gameTime % 60);
        const weapons = this.player.weapons.length
            ? this.player.weapons.map(w => `${w.getIcon()} ${w.getDisplayName()} Lv${w.level}`).join(', ')
            : 'None';
        const evolutions = this.runStats.evolutions.length
            ? this.runStats.evolutions.join(', ')
            : 'None';

        const stats = document.getElementById('victoryStats');
        if (stats) {
            stats.innerHTML = `
                <div class="final-stat">\u23f1\ufe0f Cleared in: ${minutes}:${seconds.toString().padStart(2, '0')}</div>
                <div class="final-stat">\u2b50 Level Reached: ${this.player.level}</div>
                <div class="final-stat">\U0001f480 Enemies Killed: ${this.player.kills}</div>
                <div class="final-stat">\U0001f479 Bosses Defeated: ${this.runStats.bossesDefeated}</div>
                <div class="final-stat">\U0001fa99 Coins Earned: ${this.runStats.coinsEarned}</div>
                <div class="final-stat final-stat-wide">\u2694\ufe0f Weapons: ${weapons}</div>
                <div class="final-stat final-stat-wide">\u2728 Evolutions: ${evolutions}</div>
            `;
        }
        document.getElementById('victoryScreen')?.classList.add('active');
    }

    isEndlessUnlocked() {
        return localStorage.getItem(GAME_CONFIG.progression.endlessUnlockKey) === 'true';
    }

    gameOver() {
        this.audioManager.playSound('player-death');
        // A run can end mid-cinematic. Never leave the world slowed, the
        // camera parked off the player, or a card stuck on screen.
        this.timeScale = 1;
        this.cameraOverride = null;
        this.hitStop = 0;
        this.bossEntrance = 0;
        this.stageIntro = 0;
        this.bossLull = 0;
        document.getElementById('bossEntrance')?.classList.remove('active');
        document.getElementById('stageIntro')?.classList.remove('active');

        this.isRunning = false;
        
        // Cancel the game loop and clear active timers
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
        this.clearActiveTimers();
        
        // Save persistent stats for achievements
        const totalBosses = this.getTotalBossesDefeated();
        localStorage.setItem('vitalisArenaTotalBosses', totalBosses.toString());
        
        // Check character win achievements
        this.getCharacterWins();
        
        // Show game over screen
        const gameOverScreen = document.getElementById('gameOverScreen');
        const finalStats = document.getElementById('finalStats');
        
        const minutes = Math.floor(this.gameTime / 60);
        const seconds = Math.floor(this.gameTime % 60);
        
        const weaponList = this.player.weapons.length
            ? this.player.weapons.map(w => `${w.getIcon()} ${w.getDisplayName()} Lv${w.level}`).join(', ')
            : 'None';
        const evolutionList = this.runStats.evolutions.length
            ? this.runStats.evolutions.join(', ')
            : 'None';

        finalStats.innerHTML = `
            <div class="final-stat">⏱️ Survived: ${minutes}:${seconds.toString().padStart(2, '0')}</div>
            <div class="final-stat">⭐ Level Reached: ${this.player.level}</div>
            <div class="final-stat">💀 Enemies Killed: ${this.player.kills}</div>
            <div class="final-stat">👹 Bosses Defeated: ${this.runStats.bossesDefeated}</div>
            <div class="final-stat">🎁 Chests Opened: ${this.runStats.chestsOpened}</div>
            <div class="final-stat">🪙 Coins Earned: ${this.runStats.coinsEarned}</div>
            <div class="final-stat final-stat-wide">⚔️ Weapons: ${weaponList}</div>
            <div class="final-stat final-stat-wide">✨ Evolutions: ${evolutionList}</div>
            <div class="final-stat final-stat-total">🪙 Total Coins: ${this.coins}</div>
        `;
        
        gameOverScreen.classList.add('active');
    }
    
    restart() {
        document.getElementById('gameOverScreen').classList.remove('active');
        this.startGame();
    }
    
    togglePause() {
        if (!this.isRunning) return;
        
        this.isPaused = !this.isPaused;
        const pauseScreen = document.getElementById('pauseScreen');
        
        if (this.isPaused) {
            pauseScreen.classList.add('active');
            this.updatePauseMenuEquipment();
        } else {
            pauseScreen.classList.remove('active');
        }
    }
    
    backToSelect() {
        // Close any overlays
        document.getElementById('pauseScreen').classList.remove('active');
        document.getElementById('gameOverScreen').classList.remove('active');
        document.getElementById('levelUpScreen').classList.remove('active');
        
        document.getElementById('gameScreen').classList.remove('active');
        document.getElementById('titleScreen').classList.add('active');
        
        // Return to menu music
        this.audioManager.playMusic('menu-theme');
        this.isRunning = false;
        this.isPaused = false;
        
        // Cancel game loop and clear timers
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
        this.clearActiveTimers();
        
        // Reset co-op state
        this.coopMode = false;
        this.player2 = null;
        this.selectedCharacter2 = null;
        const coopBtn = document.getElementById('coopToggleBtn');
        if (coopBtn) coopBtn.textContent = '🎮 Co-Op: OFF';
        const p2Banner = document.getElementById('p2SelectBanner');
        if (p2Banner) p2Banner.style.display = 'none';
        const p2Hud = document.getElementById('p2Hud');
        if (p2Hud) p2Hud.style.display = 'none';
        // Remove P2 selected styling from character cards
        document.querySelectorAll('.character-card.p2-selected').forEach(card => {
            card.classList.remove('p2-selected');
        });
        
        // Re-enable any key to start
        const titleScreen = document.getElementById('titleScreen');
        const keyStartHandler = (e) => {
            if (titleScreen.classList.contains('active')) {
                this.showCharacterSelect();
            }
        };
        window.addEventListener('keydown', keyStartHandler, { once: true });
    }
    
    // Achievement System Methods
    // Nearest living player to a world point, used by magnetised pickups.
    // ---- Loadout HUD ----------------------------------------------------

    // Weapon and passive list on the HUD. Rebuilt only when the loadout really
    // changes, so it is safe to call from the throttled HUD update.
    updateLoadoutHUD() {
        const container = document.getElementById('loadoutDisplay');
        if (!container || !this.player) return;

        const weapons = this.player.weapons;
        const passives = this.player.passives || {};
        const passiveIds = Object.keys(passives).sort();

        const signature =
            weapons.map(w => `${w.type}:${w.level}:${w.evolutionId || ''}`).join('|') +
            '#' + passiveIds.map(id => `${id}:${passives[id]}`).join('|');
        if (signature === this._loadoutSignature) return;
        this._loadoutSignature = signature;

        const weaponHTML = weapons.map(w => {
            const tier = w.getDisplayTier();
            const maxed = w.isMaxLevel && !w.isEvolved;
            return `<div class="loadout-item${w.isEvolved ? ' evolved' : ''}${maxed ? ' maxed' : ''}"
                        title="${w.getDisplayName()} \u2014 Level ${w.level}"
                        style="border-color:${tier.color}">
                        <span class="loadout-icon">${w.getIcon()}</span>
                        <span class="loadout-level">${w.isEvolved ? '\u2605' : w.level}</span>
                    </div>`;
        }).join('');

        const passiveHTML = passiveIds.map(id => {
            const p = getPassiveById(id);
            if (!p) return '';
            const lvl = passives[id];
            return `<div class="loadout-item passive${lvl >= PASSIVE_MAX_LEVEL ? ' maxed' : ''}"
                        title="${p.name} \u2014 ${p.format(passiveValue(p, lvl))}"
                        style="border-color:${p.color}">
                        <span class="loadout-icon">${p.icon}</span>
                        <span class="loadout-level">${lvl}</span>
                    </div>`;
        }).join('');

        container.innerHTML =
            `<div class="loadout-row">${weaponHTML}</div>` +
            (passiveHTML ? `<div class="loadout-row">${passiveHTML}</div>` : '');
    }

    // ---- Permanent upgrade shop ------------------------------------------

    openMetaShop() {
        this.renderMetaUpgrades();
        document.getElementById('metaShopPanel')?.classList.add('active');
    }

    closeMetaShop() {
        document.getElementById('metaShopPanel')?.classList.remove('active');
    }

    renderMetaUpgrades() {
        const grid = document.getElementById('metaUpgradeGrid');
        if (!grid) return;

        const coinsLabel = document.getElementById('metaShopCoins');
        if (coinsLabel) coinsLabel.textContent = this.coins;

        grid.innerHTML = META_UPGRADES.map(u => {
            const level = this.getMetaUpgradeLevel(u.id);
            const cost = metaUpgradeCost(u, level);
            const maxed = cost === null;
            const affordable = !maxed && this.coins >= cost;
            const current = level > 0 ? u.format(metaUpgradeValue(u, level)) : 'Not purchased';

            return `<div class="meta-item${maxed ? ' maxed' : ''}">
                <div class="meta-item-icon">${u.icon}</div>
                <div class="meta-item-name">${u.name}</div>
                <div class="meta-item-desc">${u.desc}</div>
                <div class="meta-item-level">Level ${level} / ${u.maxLevel}</div>
                <div class="meta-item-current">${current}</div>
                <button class="meta-buy-btn${affordable ? '' : ' disabled'}" data-meta="${u.id}"
                        ${affordable ? '' : 'disabled'}>
                    ${maxed ? 'MAXED' : `Buy (${cost} 🪙)`}
                </button>
            </div>`;
        }).join('');

        grid.querySelectorAll('.meta-buy-btn:not(.disabled)').forEach(btn => {
            btn.addEventListener('click', () => {
                this.audioManager.playSound('button-click');
                this.purchaseMetaUpgrade(btn.dataset.meta);
            });
        });
    }

    purchaseMetaUpgrade(id) {
        const upgrade = META_UPGRADES.find(u => u.id === id);
        if (!upgrade) return;

        const level = this.getMetaUpgradeLevel(id);
        const cost = metaUpgradeCost(upgrade, level);
        if (cost === null || this.coins < cost) return;

        this.coins -= cost;
        this.saveCoins();
        this.metaUpgradeLevels[id] = level + 1;
        this.saveMetaUpgrades();
        this.audioManager.playSound('level-up');
        this.renderMetaUpgrades();
    }

    // Testing aid: wipe every saved key this game owns, then reload.
    resetSaveData() {
        const keys = [
            'vitalisArenaAchievements', 'vitalisArenaInventory', 'vitalisArenaCoins',
            'vitalisArenaSavedEquipment', 'vitalisArenaTotalBosses',
            'vitalisArenaCharacterWins', 'vitalisArenaMetaUpgrades'
        ];
        keys.forEach(k => localStorage.removeItem(k));
        window.location.reload();
    }

    // Health fraction of whichever living player is worst off. In co-op a
    // hurt partner should still pull drops even if the other is untouched.
    lowestPlayerHealthFraction() {
        let lowest = 1;
        for (const p of [this.player, this.player2]) {
            if (!p || p.health <= 0 || !p.maxHealth) continue;
            lowest = Math.min(lowest, p.health / p.maxHealth);
        }
        return lowest;
    }

    nearestPlayerTo(obj) {
        const p1 = this.player;
        const p2 = this.player2;
        if (p2 && p2.health > 0 && p1 && p1.health > 0) {
            const d1 = (obj.x - p1.x) ** 2 + (obj.y - p1.y) ** 2;
            const d2 = (obj.x - p2.x) ** 2 + (obj.y - p2.y) ** 2;
            return d2 < d1 ? p2 : p1;
        }
        if (p2 && p2.health > 0) return p2;
        return p1;
    }

    // ---- Treasure chests ------------------------------------------------

    // Enemies (especially bosses, which enter from off-screen) can die outside
    // the playfield. Anything the player has to walk onto must be pulled back
    // inside the arena or it is unreachable forever.
    clampToWorld(x, y, margin) {
        return {
            x: Math.max(margin, Math.min(this.world.width - margin, x)),
            y: Math.max(margin, Math.min(this.world.height - margin, y))
        };
    }

    dropChest(x, y, quality = 'normal') {
        const pos = this.clampToWorld(x, y, 60);
        this.chests.push(new Chest(pos.x, pos.y, quality));
    }

    collectChest(chest) {
        if (chest.collected) return;
        chest.collected = true;
        this.runStats.chestsOpened++;
        this.audioManager.playSound('chest-open');
        this.screenShake = GAME_CONFIG.juice.shake.chestOpen;
        this.showChestScreen(this.rollChestReward(chest));
    }

    // A weapon evolves when it is at max level AND its required passive is owned.
    // Purely data-driven — see src/data/Evolutions.js.
    getEvolvableWeapons(player) {
        const result = [];
        player.weapons.forEach(weapon => {
            if (weapon.isEvolved || !weapon.isMaxLevel) return;
            const evo = getEvolutionForWeapon(weapon.type);
            if (!evo) return;
            if (player.getPassiveLevel(evo.requires) <= 0) return;
            result.push({ weapon, evolution: evo });
        });
        return result;
    }

    // Decide what a chest gives. Evolution wins whenever it is possible — it is
    // the headline reward and the reason to hold a weapon at max level.
    rollChestReward(chest) {
        const player = this.player;
        const luck = player.getLuck ? player.getLuck() : 0;

        const evolvable = this.getEvolvableWeapons(player);
        if (evolvable.length > 0) {
            const pick = evolvable[Math.floor(Math.random() * evolvable.length)];
            return { type: 'evolution', weapon: pick.weapon, evolution: pick.evolution };
        }

        const weapons = player.weapons.filter(w => !w.isMaxLevel);
        const passives = PASSIVE_POOL.filter(p => {
            const l = player.getPassiveLevel(p.id);
            return l > 0 && l < PASSIVE_MAX_LEVEL;
        });

        const options = [];
        if (weapons.length) options.push('weapon');
        if (passives.length) options.push('passive');

        // Nothing left to upgrade — fall back to coins or a full heal.
        if (options.length === 0) {
            if (Math.random() < 0.5) {
                const base = chest.quality === 'boss' ? 250 : 150;
                return { type: 'coins', amount: Math.floor(base * (1 + luck)) };
            }
            return { type: 'heal' };
        }

        if (options[Math.floor(Math.random() * options.length)] === 'weapon') {
            return { type: 'weapon_level', weapon: weapons[Math.floor(Math.random() * weapons.length)] };
        }
        return { type: 'passive_level', passive: passives[Math.floor(Math.random() * passives.length)] };
    }

    applyChestReward(reward) {
        const player = this.player;
        switch (reward.type) {
            case 'evolution':
                reward.weapon.evolve(reward.evolution.id);
                this.runStats.evolutions.push(reward.evolution.name);
                this.screenShake = GAME_CONFIG.juice.shake.evolution;
                this.audioManager.playSound('evolution');
                this.audioManager.playSound('ultimate');
                break;
            case 'weapon_level':
                reward.weapon.levelUpWeapon();
                break;
            case 'passive_level':
                player.addPassive(reward.passive.id);
                break;
            case 'coins':
                this.addCoins(reward.amount);
                break;
            case 'heal':
                player.health = player.maxHealth;
                break;
        }
        this.updateLoadoutHUD();
    }

    formatChestReward(reward) {
        switch (reward.type) {
            case 'evolution': {
                const e = reward.evolution;
                return `<div class="chest-evolved">\u2728 WEAPON EVOLVED! \u2728</div>
                    <div class="chest-reward-icon">${e.icon}</div>
                    <div class="chest-reward-name" style="color:${e.color}">${e.name}</div>
                    <div class="chest-reward-desc">${e.desc}</div>`;
            }
            case 'weapon_level':
                return `<div class="chest-reward-icon">${reward.weapon.getIcon()}</div>
                    <div class="chest-reward-name">${reward.weapon.getDisplayName()}</div>
                    <div class="chest-reward-desc">Weapon level ${reward.weapon.level} \u00b7 ${reward.weapon.getDisplayTier().name}</div>`;
            case 'passive_level': {
                const p = reward.passive;
                const lvl = this.player.getPassiveLevel(p.id);
                return `<div class="chest-reward-icon">${p.icon}</div>
                    <div class="chest-reward-name" style="color:${p.color}">${p.name}</div>
                    <div class="chest-reward-desc">Level ${lvl} \u00b7 ${p.format(passiveValue(p, lvl))}</div>`;
            }
            case 'coins':
                return `<div class="chest-reward-icon">🪙</div>
                    <div class="chest-reward-name">${reward.amount} Coins</div>
                    <div class="chest-reward-desc">Spend them in the shop between runs.</div>`;
            default:
                return `<div class="chest-reward-icon">\u2764\ufe0f</div>
                    <div class="chest-reward-name">Fully Healed</div>
                    <div class="chest-reward-desc">Back to full health.</div>`;
        }
    }

    // Chest flow: shake, burst, reveal. The reward is applied at the reveal so
    // the animation and the effect land together.
    showChestScreen(reward) {
        const panel = document.getElementById('chestPanel');
        if (!panel) { this.applyChestReward(reward); return; }

        this.isPaused = true;
        const anim = document.getElementById('chestAnimation');
        const result = document.getElementById('chestResult');
        const hint = document.getElementById('chestHint');

        panel.classList.add('active');
        anim.className = 'chest-animation shaking';
        result.innerHTML = '';
        result.classList.remove('visible');
        hint.classList.remove('visible');
        this.chestRewardReady = false;

        const revealTimer = setTimeout(() => {
            anim.className = 'chest-animation burst';
            this.applyChestReward(reward);
            result.innerHTML = this.formatChestReward(reward);
            result.classList.add('visible');
            hint.classList.add('visible');
            this.chestRewardReady = true;
        }, 900);
        this.activeTimers.push(revealTimer);

        const close = () => {
            if (!this.chestRewardReady) return;   // let the reveal finish first
            this.chestRewardReady = false;
            panel.classList.remove('active');
            document.removeEventListener('keydown', keyHandler);
            panel.removeEventListener('click', close);

            if (!this.isRunning) return;          // run ended while the chest was open
            const next = [this.player, this.player2].find(p => p && p.pendingLevelUps > 0);
            if (next) next.processPendingLevelUps();
            else this.isPaused = false;
        };
        const keyHandler = (e) => {
            if (e.code === 'Space' || e.key === 'Enter') { e.preventDefault(); close(); }
        };
        document.addEventListener('keydown', keyHandler);
        panel.addEventListener('click', close);
    }

    createRunStats() {
        return { bossesDefeated: 0, chestsOpened: 0, coinsEarned: 0, evolutions: [] };
    }

    // ---- Permanent upgrades -------------------------------------------

    loadMetaUpgrades() {
        try {
            const saved = localStorage.getItem('vitalisArenaMetaUpgrades');
            return saved ? JSON.parse(saved) : {};
        } catch (e) {
            console.warn('Could not read permanent upgrades:', e);
            return {};
        }
    }

    saveMetaUpgrades() {
        localStorage.setItem('vitalisArenaMetaUpgrades', JSON.stringify(this.metaUpgradeLevels));
    }

    getMetaUpgradeLevel(id) {
        return this.metaUpgradeLevels[id] || 0;
    }

    // Resolve every purchased permanent upgrade into a flat bonus object that
    // Player reads once at spawn.
    getMetaBonuses() {
        const bonuses = { maxHealth: 0, damage: 0, moveSpeed: 0, xpGain: 0, pickupRange: 0, startCoins: 0 };
        META_UPGRADES.forEach(u => {
            const level = this.getMetaUpgradeLevel(u.id);
            if (level > 0) bonuses[u.stat] += metaUpgradeValue(u, level);
        });
        return bonuses;
    }

    // ---- Coins ---------------------------------------------------------

    addCoins(amount) {
        this.coins += amount;
        this.runStats.coinsEarned += amount;
        this.saveCoins();
    }

    // ---- Floating damage numbers ---------------------------------------

    spawnDamageNumber(x, y, amount, color = '#ffffff', big = false) {
        // Cosmetic only — drop them rather than let them cost frames.
        if (this.performanceMode) return;
        if (this.damageNumbers.length >= GAME_CONFIG.juice.maxDamageNumbers) return;
        this.damageNumbers.push(new DamageNumber(x, y, amount, color, big));
    }

    loadAchievements() {
        const saved = localStorage.getItem('vitalisArenaAchievements');
        if (saved) {
            return JSON.parse(saved);
        }
        // Initialize all achievements as locked
        const achievements = {};
        ACHIEVEMENTS.forEach(ach => {
            achievements[ach.id] = { unlocked: false, unlockedAt: null };
        });
        return achievements;
    }
    
    saveAchievements() {
        localStorage.setItem('vitalisArenaAchievements', JSON.stringify(this.achievements));
    }
    
    loadInventory() {
        const saved = localStorage.getItem('vitalisArenaInventory');
        if (saved) {
            this.playerInventory = JSON.parse(saved);
            // Ensure all items have level property (for old saves)
            this.playerInventory.forEach(item => {
                if (!item.level) item.level = 1;
            });
        }
    }
    
    saveInventory() {
        localStorage.setItem('vitalisArenaInventory', JSON.stringify(this.playerInventory));
    }
    
    loadCoins() {
        const saved = localStorage.getItem('vitalisArenaCoins');
        if (saved) {
            this.coins = parseInt(saved);
        }
    }
    
    saveCoins() {
        localStorage.setItem('vitalisArenaCoins', this.coins.toString());
    }

    loadScrap() {
        const saved = localStorage.getItem('vitalisArenaScrap');
        if (saved !== null) this.scrap = parseInt(saved) || 0;
    }

    saveScrap() {
        localStorage.setItem('vitalisArenaScrap', this.scrap.toString());
    }

    // What an item is worth on the rack. Scales with rarity and with the
    // levels already invested in it, so selling an upgraded item returns a
    // fair share of what went into it rather than punishing the investment.
    getSellValue(equipment) {
        if (!equipment) return 0;
        const base = this.calculateEquipmentPrice(equipment);
        const level = Math.max(1, equipment.level || 1);
        return Math.max(10, Math.round(base * 0.5 * (1 + 0.5 * (level - 1))));
    }

    sellEquipment(inventoryIndex) {
        const equipment = this.playerInventory[inventoryIndex];
        if (!equipment) return;

        // Selling what you are wearing is almost always a misclick, and it
        // silently strips a slot mid-run. Compared by name and slot, matching
        // both the card that renders the button and every other equipment
        // comparison in the codebase — an identity check here would disagree
        // with the UI about what counts as "worn".
        const wornName = (this.player && this.player.equipment[equipment.type]?.name)
            || this.savedEquipment[equipment.type]?.name;
        if (wornName === equipment.name) {
            this.showNotification('Unequip it first \u2014 that one is in use.');
            return;
        }

        const value = this.getSellValue(equipment);
        this.playerInventory.splice(inventoryIndex, 1);
        this.scrap += value;
        this.saveInventory();
        this.saveScrap();

        this.audioManager.playSound('pickup-equipment');
        this.showNotification(`Sold ${equipment.name} \u2192 ${value} scrap`);
        this.updateInventoryEquippedSlots();
        this.renderInventoryItems();
    }
    
    loadSavedEquipment() {
        const saved = localStorage.getItem('vitalisArenaSavedEquipment');
        if (saved) {
            this.savedEquipment = JSON.parse(saved);
            // Ensure all items have level property (for old saves)
            Object.values(this.savedEquipment).forEach(item => {
                if (item && !item.level) item.level = 1;
            });
        }
    }
    
    saveSavedEquipment() {
        localStorage.setItem('vitalisArenaSavedEquipment', JSON.stringify(this.savedEquipment));
    }
    
    checkAchievements() {
        if (!this.player) return;
        
        // Cache these values - don't re-read localStorage inside the loop
        const totalBosses = this.getTotalBossesDefeated();
        const characterWins = this.getCharacterWins();
        
        ACHIEVEMENTS.forEach(achievement => {
            if (this.achievements[achievement.id].unlocked) return;
            
            let unlocked = false;
            const req = achievement.requirement;
            
            switch (req.type) {
                case 'kills':
                    unlocked = this.player.kills >= req.value;
                    break;
                case 'time':
                    unlocked = this.gameTime >= req.value;
                    break;
                case 'bosses':
                    unlocked = totalBosses >= req.value;
                    break;
                case 'level':
                    unlocked = this.player.level >= req.value;
                    break;
                case 'character':
                    unlocked = this.selectedCharacter === req.value && this.gameTime >= 1200;
                    break;
                case 'all_characters':
                    unlocked = characterWins.size >= req.value;
                    break;
                case 'speed_kills':
                    unlocked = this.sessionStats.recentKills.length >= req.value;
                    break;
                case 'legendary_weapon':
                    unlocked = this.player.weapons.some(w => w.tier >= 3);
                    break;
            }
            
            if (unlocked) {
                this.unlockAchievement(achievement.id);
            }
        });
    }
    
    unlockAchievement(id) {
        if (this.achievements[id].unlocked) return;
        
        this.achievements[id] = {
            unlocked: true,
            unlockedAt: Date.now()
        };
        this.saveAchievements();
        
        // Add to notification queue
        const achievement = ACHIEVEMENTS.find(a => a.id === id);
        if (achievement) {
            this.achievementQueue.push({
                ...achievement,
                showTime: 0
            });
        }
    }
    
    updateAchievementNotifications(deltaTime) {
        if (this.achievementQueue.length === 0) return;
        
        const notification = this.achievementQueue[0];
        notification.showTime += deltaTime;
        
        // Show for 4 seconds
        if (notification.showTime >= 4) {
            this.achievementQueue.shift();
        }
    }
    
    getTotalBossesDefeated() {
        const saved = localStorage.getItem('vitalisArenaTotalBosses');
        const savedCount = saved ? parseInt(saved) : 0;
        return savedCount + this.sessionStats.bosses;
    }
    
    getCharacterWins() {
        const saved = localStorage.getItem('vitalisArenaCharacterWins');
        const wins = saved ? new Set(JSON.parse(saved)) : new Set();
        // Check if current character should be added (20 min survival)
        if (this.gameTime >= 1200 && this.selectedCharacter) {
            wins.add(this.selectedCharacter);
            localStorage.setItem('vitalisArenaCharacterWins', JSON.stringify([...wins]));
        }
        return wins;
    }
    
    showAchievements() {
        const panel = document.getElementById('achievementsPanel');
        const grid = document.getElementById('achievementsGrid');
        
        grid.innerHTML = '';
        
        ACHIEVEMENTS.forEach(achievement => {
            const unlocked = this.achievements[achievement.id].unlocked;
            const div = document.createElement('div');
            div.className = `achievement-card ${unlocked ? 'unlocked' : 'locked'}`;
            
            div.innerHTML = `
                <div class="achievement-icon">${unlocked ? achievement.icon : '🔒'}</div>
                <div class="achievement-info">
                    <div class="achievement-name">${achievement.name}</div>
                    <div class="achievement-desc">${achievement.desc}</div>
                </div>
            `;
            
            grid.appendChild(div);
        });
        
        // Show unlock count
        const unlocked = Object.values(this.achievements).filter(a => a.unlocked).length;
        const total = ACHIEVEMENTS.length;
        document.getElementById('achievementProgress').textContent = `${unlocked}/${total} Unlocked`;
        
        panel.classList.add('active');
    }
}

// Player Class
class Player {
    constructor(x, y, type, game) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.game = game;
        this.radius = 20;
        
        // Permanent upgrades bought between runs, resolved once at spawn.
        this.metaBonuses = (game && game.getMetaBonuses)
            ? game.getMetaBonuses()
            : { maxHealth: 0, damage: 0, moveSpeed: 0, xpGain: 0, pickupRange: 0, startCoins: 0 };

        // Generic attack defaults. These MUST be assigned before
        // setupCharacter(), because that is what gives each class its defining
        // trait — the Ranger's multi-shot, the Mage's piercing, the Assassin's
        // attack speed, the Warrior's armour. Setting them afterwards silently
        // erased all four.
        this.attackCooldown = 0;
        this.attackSpeed = 1.0;
        this.projectileSpeed = 400;
        this.projectileDamage = 10;
        this.projectileCount = 1;
        this.piercing = false;
        this.armor = 0;

        // Stats based on character type
        this.maxHealthBonus = 0; // Resets on new game, persists only within a run
        this.setupCharacter();
        
        // State
        this.health = this.maxHealth;
        this.xp = 0;
        this.level = 1;
        this.xpToLevel = 10;
        this.kills = 0;
        
        // Special ability
        this.abilityCooldown = 0;
        
        // Ultimate ability (fills with kills)
        this.ultimateCharge = 0;
        this.ultimateMax = GAME_CONFIG.ultimate.max;
        this.ultimateReady = false;
        // Charge is earned per kill, so on its own it tracks kill rate rather
        // than time. The cooldown is what actually paces the ultimate.
        this.ultimateCooldownTime = GAME_CONFIG.ultimate.minCooldown;
        this.ultimateCooldown = this.ultimateCooldownTime * (1 - GAME_CONFIG.ultimate.startCooldownProgress);
        
        // Invulnerability frames (i-frames)
        this.invulnerable = false;
        this.iframeTimer = 0;
        this.iframeDuration = 2.0; // 2 seconds of invulnerability after being hit
        
        // Special weapons
        this.weapons = [];
        
        // Co-op revive system
        this.downed = false;           // True when in revivable state
        this.reviveTimer = 0;          // Countdown until permanently dead
        this.reviveWindowMax = 15;     // Seconds to revive before permanent death
        this.reviveProgress = 0;       // 0-1 progress toward being revived
        this.reviveTime = 3.0;         // Seconds of proximity needed to revive
        this.reviveRange = 70;         // Pixels — how close the other player must be
        this.timesRevived = 0;         // Each revive shortens next window

        // Equipment System
        this.equipment = {
            weapon: null,
            armor: null,
            accessory: null,
            ring: null
        };
        this.equipmentBonuses = {
            damage: 0,
            health: 0,
            speed: 0,
            attackSpeed: 0,
            armor: 0,
            xpGain: 0,
            lifesteal: 0
        };

        // Passive items: id -> level (1..PASSIVE_MAX_LEVEL)
        this.passives = {};

        // A single large gem can cross several XP thresholds, so level-ups queue
        // instead of firing one screen and silently dropping the rest.
        this.pendingLevelUps = 0;
    }

    // ---- Passive items ------------------------------------------------

    getPassiveLevel(id) {
        return this.passives[id] || 0;
    }

    // Combined bonus for one passive stat across everything the player owns.
    getPassiveStat(stat) {
        let total = 0;
        for (const id in this.passives) {
            const p = getPassiveById(id);
            if (p && p.stat === stat) total += passiveValue(p, this.passives[id]);
        }
        return total;
    }

    addPassive(id) {
        const p = getPassiveById(id);
        if (!p) return false;
        const current = this.getPassiveLevel(id);
        if (current >= PASSIVE_MAX_LEVEL) return false;
        this.passives[id] = current + 1;

        // Flat health applies immediately, matching the +Max Health level-up.
        // Multiplier stats are read live, so they need no bookkeeping here.
        if (p.stat === 'maxHealth') {
            this.maxHealth += p.perLevel;
            this.health = Math.min(this.maxHealth, this.health + p.perLevel);
        }
        // Weapons bake damage and cooldown modifiers into their stats, so any
        // change to those has to re-run weapon setup.
        if (p.stat === 'damageMultiplier' || p.stat === 'cooldownReduction') {
            this.weapons.forEach(w => w.setupWeapon());
        }
        return true;
    }

    // ---- Derived modifiers --------------------------------------------

    getDamageMultiplier() {
        return 1 + this.getPassiveStat('damageMultiplier') + this.metaBonuses.damage;
    }

    // Below 1.0 means faster.
    getCooldownMultiplier() {
        return Math.max(0.4, 1 - this.getPassiveStat('cooldownReduction'));
    }

    getMoveSpeedMultiplier() {
        return 1 + this.getPassiveStat('moveSpeed') + this.metaBonuses.moveSpeed;
    }

    getPickupRange() {
        const base = GAME_CONFIG.player.basePickupRange;
        return base * (1 + this.getPassiveStat('pickupRange') + this.metaBonuses.pickupRange);
    }

    getLuck() {
        return this.getPassiveStat('luck');
    }

    getXPMultiplier() {
        return 1 + this.metaBonuses.xpGain + (this.equipmentBonuses.xpGain || 0) / 100;
    }
    
    setupCharacter() {
        const stats = {
            warrior: {
                maxHealth: 120,
                speed: 230,
                damage: 15,
                armor: 0.25,
                color: '#ff6b6b',
                icon: '⚔️'
            },
            ranger: {
                maxHealth: 80,
                speed: 250,
                damage: 10,
                color: '#51cf66',
                icon: '🏹'
            },
            mage: {
                maxHealth: 70,
                speed: 150,
                damage: 20,
                color: '#845ef7',
                icon: '🔮'
            },
            assassin: {
                maxHealth: 75,
                speed: 300,
                damage: 18,
                color: '#ffd43b',
                icon: '🗡️'
            },
            // The tank was strictly dominated by the warrior: 150 flat HP is
            // LESS effective HP than the warrior's 120 behind 25% armor, and it
            // paid for that with half the damage and half the speed. Armor is
            // what the slowness is supposed to buy, so the tank gets the most
            // of it in the game (150/0.55 = 273 EHP, ~1.7x the warrior).
            tank: {
                maxHealth: 150,
                speed: 120,
                damage: 12,
                armor: 0.45,
                color: '#74c0fc',
                icon: '🛡️'
            }
        };
        
        const stat = stats[this.type];
        // Always apply bonus upgrades after base
        this.maxHealth = stat.maxHealth + (this.maxHealthBonus || 0) + (this.metaBonuses ? this.metaBonuses.maxHealth : 0);
        this.speed = stat.speed;
        this.baseDamage = stat.damage;
        // baseDamage was previously stored and never read — every class fired
        // for a flat 10. The class damage figure is the real starting value.
        this.projectileDamage = stat.damage;
        this.color = stat.color;
        this.icon = stat.icon;
        this.armor = stat.armor || 0;

        // Contact response, read by Game.resolveContact when an enemy touches
        // this player. Multiple of projectileDamage per second; 0 = no answer.
        this.contactDamage = 0;
        this.contactKnockback = 100;

        // Character-specific modifiers
        switch(this.type) {
            case 'warrior':
                this.contactKnockback = 200;
                break;
            case 'ranger':
                this.projectileCount = 3; // Multi-shot
                break;
            case 'mage':
                this.piercing = true; // Projectiles pierce
                break;
            case 'assassin':
                this.attackSpeed = 1.5; // Faster attacks
                break;
            case 'tank':
                // The tank was the only class with no perk at all, which is why
                // it read as a worse warrior. This is the one that fits: it is
                // the only class that wants to be INSIDE the horde. Standing in
                // a crowd becomes offence, so the low weapon damage stops being
                // a death spiral without inflating the damage number itself.
                this.contactDamage = 0.8;
                this.contactKnockback = 420;
                break;
        }
    }
    
    update(deltaTime, keys, worldWidth, worldHeight) {
        // Movement
        let dx = 0;
        let dy = 0;
        
        if (keys['w'] || keys['arrowup']) dy -= 1;
        if (keys['s'] || keys['arrowdown']) dy += 1;
        if (keys['a'] || keys['arrowleft']) dx -= 1;
        if (keys['d'] || keys['arrowright']) dx += 1;
        
        // Normalize diagonal movement
        if (dx !== 0 && dy !== 0) {
            dx *= 0.707;
            dy *= 0.707;
        }
        
        // Apply movement (passives and permanent upgrades scale the base speed)
        const moveSpeed = this.speed * this.getMoveSpeedMultiplier();
        this.x += dx * moveSpeed * deltaTime;
        this.y += dy * moveSpeed * deltaTime;
        
        // Keep inside the world (not the viewport — the camera scrolls)
        this.x = Math.max(this.radius, Math.min(worldWidth - this.radius, this.x));
        this.y = Math.max(this.radius, Math.min(worldHeight - this.radius, this.y));
        
        // Update cooldowns
        if (this.attackCooldown > 0) {
            this.attackCooldown -= deltaTime;
        }
        if (this.abilityCooldown > 0) {
            this.abilityCooldown -= deltaTime;
        }
        
        // Ultimate cooldown
        if (this.ultimateCooldown > 0) {
            this.ultimateCooldown -= deltaTime;
            if (this.ultimateCooldown < 0) this.ultimateCooldown = 0;
        }
        this.refreshUltimateReady();

        // Update invulnerability frames
        if (this.iframeTimer > 0) {
            this.iframeTimer -= deltaTime;
            if (this.iframeTimer <= 0) {
                this.iframeTimer = 0;
                this.invulnerable = false;
            }
        }
    }
    
    attack(game, deltaTime) {
        if (this.attackCooldown <= 0 && game.enemies.length > 0) {
            // Find nearest enemy
            let nearest = null;
            let nearestDist = Infinity;
            
            for (const enemy of game.enemies) {
                const dx = enemy.x - this.x;
                const dy = enemy.y - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < nearestDist) {
                    nearestDist = dist;
                    nearest = enemy;
                }
            }
            
            if (nearest) {
                const angle = Math.atan2(nearest.y - this.y, nearest.x - this.x);
                
                // Fire projectiles
                if (this.projectileCount === 1) {
                    game.audioManager.playSound('shoot');
                    game.projectiles.push(new Projectile(
                        this.x, this.y, angle, 
                        this.projectileSpeed, 
                        this.projectileDamage,
                        this.color,
                        this.piercing,
                        this.type
                    ));
                } else {
                    // Multi-shot (for Ranger)
                    game.audioManager.playSound('shoot');
                    const spreadAngle = 0.3;
                    for (let i = 0; i < this.projectileCount; i++) {
                        const offset = (i - (this.projectileCount - 1) / 2) * spreadAngle;
                        game.projectiles.push(new Projectile(
                            this.x, this.y, angle + offset,
                            this.projectileSpeed,
                            this.projectileDamage,
                            this.color,
                            this.piercing,
                            this.type
                        ));
                    }
                }
                
                this.attackCooldown = 1.0 / this.attackSpeed;
            }
        }
        
        // Special abilities
        this.useAbility(game, deltaTime);
    }
    
    useAbility(game, deltaTime) {
        if (this.abilityCooldown > 0) return;
        
        switch(this.type) {
            case 'warrior':
                // Whirlwind attack
                if (game.enemies.length > 0) {
                    this.whirlwindAttack(game);
                    this.abilityCooldown = 8;
                }
                break;
                
            case 'mage':
                // Homing missiles
                if (game.enemies.length >= 3) {
                    this.homingMissiles(game);
                    this.abilityCooldown = 10;
                }
                break;
                
            case 'assassin':
                // Shadow strike (teleport)
                if (game.enemies.length > 0) {
                    this.shadowStrike(game);
                    this.abilityCooldown = 12;
                }
                break;
                
            case 'tank':
                // Shockwave
                if (game.enemies.length > 0) {
                    this.shockwave(game);
                    this.abilityCooldown = 10;
                }
                break;
        }
    }
    
    whirlwindAttack(game) {
        // Create circular projectiles
        for (let i = 0; i < 12; i++) {
            const angle = (Math.PI * 2 * i) / 12;
            game.projectiles.push(new Projectile(
                this.x, this.y, angle,
                300, this.projectileDamage * 1.5,
                this.color, false, this.type
            ));
        }
        
        // Also knockback and stun nearby enemies
        const knockbackRadius = 150;
        game.enemies.forEach(enemy => {
            const dx = enemy.x - this.x;
            const dy = enemy.y - this.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < knockbackRadius) {
                // Strong knockback
                const knockbackForce = 300;
                enemy.x += (dx / dist) * knockbackForce * 0.1;
                enemy.y += (dy / dist) * knockbackForce * 0.1;
            }
        });
    }
    
    homingMissiles(game) {
        // Fire at 3 different enemies
        const targets = [...game.enemies].slice(0, 3);
        targets.forEach(enemy => {
            const angle = Math.atan2(enemy.y - this.y, enemy.x - this.x);
            game.projectiles.push(new Projectile(
                this.x, this.y, angle,
                500, this.projectileDamage * 2,
                this.color, true, this.type
            ));
        });
    }
    
    shadowStrike(game) {
        // Find nearest enemy and teleport behind it
        let nearest = null;
        let nearestDist = Infinity;
        
        for (const enemy of game.enemies) {
            const dx = enemy.x - this.x;
            const dy = enemy.y - this.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < nearestDist && dist < 300) {
                nearestDist = dist;
                nearest = enemy;
            }
        }
        
        if (nearest) {
            const angle = Math.atan2(nearest.y - this.y, nearest.x - this.x);
            this.x = nearest.x - Math.cos(angle) * 50;
            this.y = nearest.y - Math.sin(angle) * 50;
            
            // Deal damage to nearby enemies
            game.enemies.forEach(enemy => {
                const dx = enemy.x - this.x;
                const dy = enemy.y - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 100) {
                    enemy.takeDamage(this.projectileDamage * 3);
                }
            });
        }
    }
    
    shockwave(game) {
        // Damage and stun nearby enemies
        game.enemies.forEach(enemy => {
            const dx = enemy.x - this.x;
            const dy = enemy.y - this.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 150) {
                enemy.takeDamage(this.projectileDamage * 2);
                enemy.stunned = 2; // Stun for 2 seconds
            }
        });
        
        // Visual effect
        for (let i = 0; i < 24; i++) {
            const angle = (Math.PI * 2 * i) / 24;
            game.particles.push(new Particle(
                this.x, this.y, angle, 200, this.color
            ));
        }
    }
    
    useUltimate(game) {
        if (!this.canUseUltimate()) return;
        
        game.audioManager.playSound('ultimate');
        game.beginUltimateFocus(this);

        // Spend the charge and start the cooldown.
        this.ultimateCharge = 0;
        this.ultimateCooldown = this.ultimateCooldownTime;
        this.ultimateReady = false;
        document.getElementById('ultimateButton').classList.remove('ready');
        // Also reset mobile ultimate button
        const fireBtn = document.getElementById('fireButton');
        if (fireBtn) fireBtn.classList.remove('ready');
        
        // Character-specific ultimate abilities
        switch(this.type) {
            case 'warrior':
                // Berserker Rage: Massive AOE explosion + knockback
                game.screenShake = 25;
                for (let i = 0; i < 50; i++) {
                    const angle = (Math.PI * 2 * i) / 50;
                    game.projectiles.push(new Projectile(
                        this.x, this.y, angle,
                        400, this.projectileDamage * 3,
                        '#ff0000', true, this.type
                    ));
                }
                // Large knockback
                game.enemies.forEach(enemy => {
                    const dx = enemy.x - this.x;
                    const dy = enemy.y - this.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 400 && dist > 0) {
                        enemy.x += (dx / dist) * 400;
                        enemy.y += (dy / dist) * 400;
                        enemy.takeDamage(this.projectileDamage * 5);
                    }
                });
                break;
                
            case 'ranger':
                // Arrow Storm: Spawn arrows in tracked batches (no setInterval leak)
                {
                    const totalArrows = game.performanceMode ? 40 : 100;
                    const batchSize = game.performanceMode ? 8 : 20;
                    const batches = Math.ceil(totalArrows / batchSize);
                    for (let b = 0; b < batches; b++) {
                        const timerId = setTimeout(() => {
                            if (!game.isRunning || game.isPaused) return;
                            for (let a = 0; a < batchSize; a++) {
                                const angle = Math.random() * Math.PI * 2;
                                game.projectiles.push(new Projectile(
                                    this.x, this.y, angle,
                                    600, this.projectileDamage * 2,
                                    this.color, true, this.type
                                ));
                            }
                        }, b * 80);
                        game.activeTimers.push(timerId);
                    }
                }
                break;
                
            case 'mage':
                // Meteor Strike: Summon meteors with tracked timers
                {
                    const meteors = Math.min(game.enemies.length, 20);
                    const meteorDamage = this.projectileDamage * 10;
                    for (let i = 0; i < meteors; i++) {
                        const enemy = game.enemies[i];
                        if (enemy) {
                            const timerId = setTimeout(() => {
                                if (!game.isRunning) return;
                                const particleCount = game.performanceMode ? 4 : 8;
                                for (let j = 0; j < particleCount; j++) {
                                    const angle = (Math.PI * 2 * j) / particleCount;
                                    game.particles.push(new Particle(
                                        enemy.x, enemy.y, angle, 200, '#ff4500', 1.5
                                    ));
                                }
                                enemy.takeDamage(meteorDamage);
                            }, i * 50);
                            game.activeTimers.push(timerId);
                        }
                    }
                }
                break;
                
            case 'assassin':
                // Time Stop: Freeze and damage all enemies
                game.enemies.forEach(enemy => {
                    enemy.takeDamage(this.projectileDamage * 8);
                    // Slash effect
                    for (let i = 0; i < 12; i++) {
                        const angle = (Math.PI * 2 * i) / 12;
                        game.particles.push(new Particle(
                            enemy.x, enemy.y, angle, 250, this.color, 2
                        ));
                    }
                });
                game.screenShake = 15;
                break;
                
            case 'tank':
                // Fortress: Heal + damage aura
                this.health = Math.min(this.maxHealth, this.health + this.maxHealth * 0.5);
                game.screenShake = 20;
                
                // Damage pulse
                game.enemies.forEach(enemy => {
                    const dx = enemy.x - this.x;
                    const dy = enemy.y - this.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 300) {
                        enemy.takeDamage(this.projectileDamage * 6);
                        // Knockback
                        if (dist > 0) {
                            enemy.x += (dx / dist) * 200;
                            enemy.y += (dy / dist) * 200;
                        }
                    }
                });
                
                // Visual ring
                for (let i = 0; i < 32; i++) {
                    const angle = (Math.PI * 2 * i) / 32;
                    const radius = 300;
                    game.particles.push(new Particle(
                        this.x + Math.cos(angle) * radius,
                        this.y + Math.sin(angle) * radius,
                        angle, 150, '#74c0fc', 2
                    ));
                }
                break;
        }
    }
    
    // The ultimate needs a full charge AND an elapsed cooldown.
    canUseUltimate() {
        return this.ultimateCharge >= this.ultimateMax && this.ultimateCooldown <= 0;
    }

    // How close the ultimate is to available, 0-1, using whichever gate is
    // furthest from being satisfied. The HUD shows this so the bar never sits
    // full while the ultimate refuses to fire.
    getUltimateReadiness() {
        const charge = this.ultimateCharge / this.ultimateMax;
        const cooldown = this.ultimateCooldownTime > 0
            ? 1 - (this.ultimateCooldown / this.ultimateCooldownTime)
            : 1;
        return Math.max(0, Math.min(1, Math.min(charge, cooldown)));
    }

    // Keep the ready flag and its button styling in sync with both gates.
    refreshUltimateReady() {
        const ready = this.canUseUltimate();
        if (ready === this.ultimateReady) return;
        this.ultimateReady = ready;

        if (this.isP2) return;   // P2 has no dedicated button
        const btn = document.getElementById('ultimateButton');
        const fireBtn = document.getElementById('fireButton');
        if (ready) {
            btn?.classList.add('ready');
            fireBtn?.classList.add('ready');
        } else {
            btn?.classList.remove('ready');
            fireBtn?.classList.remove('ready');
        }
    }

    takeDamage(amount) {
        // Skip damage if invulnerable or already downed
        if (this.invulnerable || this.downed) return;
        
        // Apply armor damage reduction, clamped. See GAME_CONFIG.player.maxArmor:
        // stacked armor can exceed 1.0, at which point this expression turns
        // negative and a hit would heal the player.
        const dr = Math.min(GAME_CONFIG.player.maxArmor, Math.max(0, this.armor));
        const reducedDamage = amount * (1 - dr);
        this.health -= reducedDamage;

        // player-hit.mp3 was loaded and rate-limited from the start but nothing
        // ever played it, so the single most important feedback moment in the
        // game — being hit — was silent.
        if (this.game && reducedDamage > 0) this.game.audioManager.playSound('player-hit');
        if (this.health < 0) this.health = 0;

        // Getting hit is the moment the player most needs to notice. Scale the
        // freeze with the size of the hit so a chip and a boss slam do not feel
        // the same, and mark the impact on the floor.
        if (this.game && reducedDamage > 0) {
            const severity = Math.min(1, reducedDamage / (this.maxHealth * 0.18));
            this.game.applyHitStop(0.035 + severity * 0.06);
            this.game.effects.add(new FlashEffect(this.x, this.y, {
                radius: 60 + severity * 70,
                color: '#ff6b6b',
                life: 0.25
            }));
        }
        
        // In co-op, enter downed state instead of dying
        if (this.health <= 0 && this.isP2 !== undefined && this.game.coopMode) {
            this.downed = true;
            // Revive window shrinks each time: 15s, 10s, 7s, 5s...
            this.reviveTimer = Math.max(5, this.reviveWindowMax - this.timesRevived * 3);
            this.reviveProgress = 0;
            this.health = 0;
        }
        
        // Activate invulnerability frames
        this.invulnerable = true;
        this.iframeTimer = this.iframeDuration;
    }
    
    addXP(amount) {
        this.xp += amount * this.getXPMultiplier();

        // Consume every threshold this pickup crossed, not just the first.
        while (this.xp >= this.xpToLevel) {
            this.xp -= this.xpToLevel;
            this.level++;
            this.xpToLevel = Math.floor(this.xpToLevel * GAME_CONFIG.player.xpCurveMultiplier);
            this.pendingLevelUps++;
        }
        this.processPendingLevelUps();
    }

    // Show one queued level-up screen. Only one screen may be open at a time
    // across both players, so the rest stay queued until it is dismissed.
    processPendingLevelUps() {
        const game = this.game || window.game;
        if (!game || !game.isRunning) return;
        if (this.pendingLevelUps <= 0) return;
        if (game.levelUpScreenOwner) return;

        this.pendingLevelUps--;
        game.levelUpScreenOwner = this;
        game.audioManager.playSound('level-up');
        this.showLevelUpScreen();
    }
    
    addKill() {
        this.kills++;
        
        // Track recent kills for speed achievements
        const now = Date.now();
        this.game.sessionStats.recentKills.push(now);
        // Keep only kills from last 5 seconds
        this.game.sessionStats.recentKills = this.game.sessionStats.recentKills.filter(time => now - time < 5000);
        
        // Charge the ultimate. How much each enemy is worth lives in ENEMY_TYPES.
        const enemy = arguments[0];
        const chargeGain = (enemy && enemy.ultCharge) ? enemy.ultCharge : 5;
        
        this.ultimateCharge = Math.min(this.ultimateMax, this.ultimateCharge + chargeGain);
        this.refreshUltimateReady();
    }
    
    equipItem(equipment) {
        const slot = equipment.type;
        
        // Unequip old item if present
        if (this.equipment[slot]) {
            this.unequipItem(slot);
        }
        
        // Equip new item
        this.equipment[slot] = equipment;
        this.applyEquipmentBonuses(equipment);
        
        // Update equipment display
        this.updateEquipmentDisplay();
    }
    
    unequipItem(slot) {
        const equipment = this.equipment[slot];
        if (!equipment) return;
        
        // Remove bonuses
        for (const [stat, value] of Object.entries(equipment.stats)) {
            if (stat === 'health') {
                this.maxHealth -= value;
                this.health = Math.min(this.health, this.maxHealth);
            } else if (stat === 'damage') {
                this.projectileDamage -= value;
                this.equipmentBonuses.damage -= value;
            } else if (stat === 'speed') {
                this.speed -= value;
                this.equipmentBonuses.speed -= value;
            } else if (stat === 'attackSpeed') {
                this.attackSpeed -= value;
                this.equipmentBonuses.attackSpeed -= value;
            } else if (stat === 'armor') {
                this.armor -= value / 100;
                this.equipmentBonuses.armor -= value;
            } else if (stat === 'xpGain') {
                this.equipmentBonuses.xpGain -= value;
            } else if (stat === 'lifesteal') {
                this.equipmentBonuses.lifesteal -= value;
            }
        }
        
        this.equipment[slot] = null;
    }
    
    applyEquipmentBonuses(equipment) {
        for (const [stat, value] of Object.entries(equipment.stats)) {
            if (stat === 'health') {
                this.maxHealth += value;
                this.health += value;
                this.equipmentBonuses.health += value;
            } else if (stat === 'damage') {
                this.projectileDamage += value;
                this.equipmentBonuses.damage += value;
            } else if (stat === 'speed') {
                this.speed += value;
                this.equipmentBonuses.speed += value;
            } else if (stat === 'attackSpeed') {
                this.attackSpeed += value;
                this.equipmentBonuses.attackSpeed += value;
            } else if (stat === 'armor') {
                this.armor += value / 100;
                this.equipmentBonuses.armor += value;
            } else if (stat === 'xpGain') {
                this.equipmentBonuses.xpGain += value;
            } else if (stat === 'lifesteal') {
                this.equipmentBonuses.lifesteal += value;
            } else if (stat === 'range') {
                // Range bonus could be applied to weapons
            }
        }
    }
    
    updateEquipmentDisplay() {
        // Update equipment slots in UI
        for (const [slot, equipment] of Object.entries(this.equipment)) {
            const slotElement = document.getElementById(`equipment-${slot}`);
            if (slotElement) {
                if (equipment) {
                    slotElement.innerHTML = `
                        <div class="equipped-item" style="border-color: ${equipment.rarityData.color}">
                            <div class="equipped-icon">${equipment.icon}</div>
                        </div>
                    `;
                } else {
                    slotElement.innerHTML = '<div class="empty-slot">Empty</div>';
                }
            }
        }
    }
    
    // A granted level (e.g. a boss reward). Unlike addXP this does not consume
    // banked XP — the level is a gift, not a purchase.
    levelUp() {
        this.level++;
        this.xpToLevel = Math.floor(this.xpToLevel * GAME_CONFIG.player.xpCurveMultiplier);
        this.pendingLevelUps++;
        this.processPendingLevelUps();
    }
    
    // Plain stat upgrades. Always available, so the pool can never run dry.
    getStatUpgrades() {
        return [
            { icon: '\u2764\ufe0f', name: 'Max Health +20', desc: 'Increase maximum health', detail: 'Stat', apply: () => {
                this.maxHealthBonus = (this.maxHealthBonus || 0) + 20;
                this.maxHealth += 20;
                this.health += 20;
            }},
            { icon: '\u26a1', name: 'Speed +15%', desc: 'Move faster', detail: 'Stat', apply: () => {
                this.speed *= 1.15;
            }},
            { icon: '🗡\ufe0f', name: 'Damage +20%', desc: 'Deal more damage', detail: 'Stat', apply: () => {
                this.projectileDamage *= 1.2;
            }},
            { icon: '\u2694\ufe0f', name: 'Attack Speed +25%', desc: 'Attack more frequently', detail: 'Stat', apply: () => {
                this.attackSpeed *= 1.25;
            }},
            { icon: '💨', name: 'Projectile Speed +20%', desc: 'Faster projectiles', detail: 'Stat', apply: () => {
                this.projectileSpeed *= 1.2;
            }},
            { icon: '\u2795', name: 'Extra Projectile', desc: 'Shoot one more projectile', detail: 'Stat', apply: () => {
                this.projectileCount += 1;
            }},
            { icon: '🛡\ufe0f', name: 'Armor +10%', desc: 'Reduce incoming damage', detail: 'Stat', apply: () => {
                this.armor = Math.min(0.75, this.armor + 0.10); // Cap at 75% reduction
            }},
            { icon: '🔄', name: 'Full Heal', desc: 'Restore all health', detail: 'Stat', apply: () => {
                this.health = this.maxHealth;
            }}
        ];
    }

    // Every offer available this level-up. Adding a weapon or passive means
    // adding a data entry, not editing this method.
    buildUpgradePool() {
        const offers = [];

        offers.push(...this.getStatUpgrades());

        // New weapons the player does not own yet.
        const owned = this.weapons.map(w => w.type);
        for (const type in SpecialWeapon.NAMES) {
            if (owned.includes(type)) continue;
            offers.push({
                kind: 'new_weapon',
                icon: SpecialWeapon.ICONS[type],
                name: SpecialWeapon.NAMES[type],
                desc: SpecialWeapon.DESCRIPTIONS[type],
                detail: 'New weapon',
                apply: () => this.addWeapon(type)
            });
        }

        // Level-ups for owned weapons. Maxed weapons are never offered.
        this.weapons.forEach(weapon => {
            if (weapon.isMaxLevel) return;
            const tier = weapon.getDisplayTier();
            offers.push({
                kind: 'weapon_level',
                icon: weapon.getIcon(),
                color: tier.color,
                name: weapon.getDisplayName(),
                desc: 'More damage, shorter cooldown.',
                detail: `Lv ${weapon.level} \u2192 ${weapon.level + 1} \u00b7 ${tier.name}`,
                apply: () => weapon.levelUpWeapon()
            });
        });

        // Passives \u2014 new ones and upgrades. Maxed passives are never offered.
        PASSIVE_POOL.forEach(p => {
            const lvl = this.getPassiveLevel(p.id);
            if (lvl >= PASSIVE_MAX_LEVEL) return;
            offers.push({
                kind: lvl === 0 ? 'new_passive' : 'passive_level',
                icon: p.icon,
                color: p.color,
                name: p.name,
                desc: p.desc,
                detail: lvl === 0
                    ? `New passive \u00b7 ${p.format(passiveValue(p, 1))}`
                    : `Lv ${lvl} \u2192 ${lvl + 1} \u00b7 ${p.format(passiveValue(p, lvl + 1))}`,
                apply: () => this.addPassive(p.id)
            });
        });

        // Fallback if literally nothing is left to offer.
        if (offers.length === 0) {
            offers.push({
                icon: '🔄', name: 'Full Heal', desc: 'Restore all health', detail: 'Fallback',
                apply: () => { this.health = this.maxHealth; }
            });
            offers.push({
                icon: '🪙', name: '+100 Coins', desc: 'Nothing left to learn', detail: 'Fallback',
                apply: () => { const g = this.game || window.game; g.addCoins(100); }
            });
        }

        return offers;
    }

    showLevelUpScreen() {
        const game = this.game || window.game;
        game.isPaused = true;

        const levelUpScreen = document.getElementById('levelUpScreen');
        const upgradeOptions = document.getElementById('upgradeOptions');

        // Unbiased shuffle, then take the first three distinct offers.
        const pool = this.buildUpgradePool();
        for (let i = pool.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [pool[i], pool[j]] = [pool[j], pool[i]];
        }
        const selected = pool.slice(0, 3);

        // Label the screen with whose level-up this is (matters in co-op).
        const title = document.getElementById('levelUpTitle');
        if (title) {
            const who = this.isP2 ? 'Player 2' : (game.coopMode ? 'Player 1' : '');
            title.textContent = who ? `🎉 ${who} \u2014 Level ${this.level}!` : `🎉 Level ${this.level}!`;
        }

        upgradeOptions.innerHTML = '';
        selected.forEach((upgrade, index) => {
            const option = document.createElement('div');
            option.className = 'upgrade-option';
            if (upgrade.color) option.style.borderColor = upgrade.color;
            option.innerHTML = `
                <div class="upgrade-key">${index + 1}</div>
                <div class="upgrade-icon">${upgrade.icon}</div>
                <div class="upgrade-name"${upgrade.color ? ` style="color:${upgrade.color}"` : ''}>${upgrade.name}</div>
                <div class="upgrade-desc">${upgrade.desc}</div>
                <div class="upgrade-detail">${upgrade.detail || ''}</div>
            `;
            option.addEventListener('click', () => choose(index));
            upgradeOptions.appendChild(option);
        });

        const self = this;
        function choose(index) {
            const upgrade = selected[index];
            if (!upgrade) return;

            document.removeEventListener('keydown', keyHandler);
            game.audioManager.playSound('button-click');
            upgrade.apply.call(self);

            levelUpScreen.classList.remove('active');
            game.levelUpScreenOwner = null;
            if (game.updateLoadoutHUD) game.updateLoadoutHUD();

            // Chain straight into the next queued level-up, if any.
            const next = [game.player, game.player2].find(p => p && p.pendingLevelUps > 0);
            if (next) next.processPendingLevelUps();
            else game.isPaused = false;
        }

        // Keyboard picks: 1, 2, 3.
        function keyHandler(e) {
            const n = parseInt(e.key, 10);
            if (n >= 1 && n <= selected.length) {
                e.preventDefault();
                choose(n - 1);
            }
        }
        document.addEventListener('keydown', keyHandler);

        levelUpScreen.classList.add('active');
    }

    draw(ctx) {
        const size = this.radius * 2.5; // Slightly larger than circle for better visibility
        
        // Blink effect during invulnerability
        if (this.invulnerable && Math.floor(this.iframeTimer * 5) % 2 === 0) {
            return; // Skip drawing every other frame for blink effect
        }
        
        // Check if sprite is loaded
        if (this.game.imagesLoaded && this.game.images[this.type] && this.game.images[this.type].complete) {
            // Draw shadow
            ctx.globalAlpha = 0.3;
            ctx.drawImage(
                this.game.images[this.type],
                this.x - size/2 + 3,
                this.y - size/2 + 3,
                size,
                size
            );
            ctx.globalAlpha = 1.0;
            
            // Draw sprite
            ctx.drawImage(
                this.game.images[this.type],
                this.x - size/2,
                this.y - size/2,
                size,
                size
            );
        } else {
            // Fallback to circles
            // Shadow
            ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
            ctx.beginPath();
            ctx.arc(this.x + 3, this.y + 3, this.radius, 0, Math.PI * 2);
            ctx.fill();
            
            // Character
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fill();
            
            // Border
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 3;
            ctx.stroke();
            
            // Icon
            ctx.font = '20px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(this.icon, this.x, this.y);
        }
    }
    
    addWeapon(type) {
        // Check if weapon already exists
        if (this.weapons.some(w => w.type === type)) {
            // Upgrade existing weapon
            const weapon = this.weapons.find(w => w.type === type);
            weapon.level++;
            return;
        }
        
        // Add new weapon
        this.weapons.push(new SpecialWeapon(type, this));
    }
    
    updateWeapons(deltaTime, game) {
        this.weapons.forEach(weapon => weapon.update(deltaTime, game));
    }
    
    drawWeapons(ctx) {
        this.weapons.forEach(weapon => weapon.draw(ctx));
    }
}

// Special Weapon Class
class SpecialWeapon {
    constructor(type, player) {
        this.type = type;
        this.player = player;
        this.level = 1;               // 1..GAME_CONFIG.weapons.maxLevel
        this.evolutionId = null;      // set when this weapon evolves
        this.cooldown = 0;
        this.time = 0;
        
        // Weapon-specific properties
        this.setupWeapon();
    }
    
    // Tier is derived from level: every `levelsPerTier` levels promotes a tier.
    get tier() {
        const per = GAME_CONFIG.weapons.levelsPerTier;
        return Math.min(3, Math.floor((this.level - 1) / per));
    }

    get maxLevel() { return GAME_CONFIG.weapons.maxLevel; }
    get isMaxLevel() { return this.level >= this.maxLevel; }
    get evolution() { return this.evolutionId ? getEvolutionById(this.evolutionId) : null; }
    get isEvolved() { return !!this.evolutionId; }

    // Display name — evolved weapons take the evolution's identity.
    getDisplayName() {
        const evo = this.evolution;
        if (evo) return evo.name;
        return SpecialWeapon.NAMES[this.type] || this.type;
    }

    getIcon() {
        const evo = this.evolution;
        if (evo) return evo.icon;
        return SpecialWeapon.ICONS[this.type] || '\u2694\ufe0f';
    }

    // Stat multipliers for the weapon's current tier. Evolutions build ON TOP of
    // this — replacing it would make evolving a downgrade at Legendary.
    getTierInfo() {
        const tiers = [
            { name: 'Common', color: '#9e9e9e', damageMultiplier: 1.0, sizeMultiplier: 1.0 },
            { name: 'Rare', color: '#2196f3', damageMultiplier: 1.5, sizeMultiplier: 1.2 },
            { name: 'Epic', color: '#9c27b0', damageMultiplier: 2.0, sizeMultiplier: 1.4 },
            { name: 'Legendary', color: '#ff9800', damageMultiplier: 3.0, sizeMultiplier: 1.6 }
        ];
        return tiers[this.tier];
    }

    // Same multipliers, but wearing the evolution's name and colour. Used for
    // anything the player looks at: HUD, upgrade cards, weapon rendering.
    getDisplayTier() {
        const evo = this.evolution;
        const tier = this.getTierInfo();
        if (!evo) return tier;
        return Object.assign({}, tier, { name: 'Evolved', color: evo.color });
    }
    
    levelUpWeapon() {
        if (this.isMaxLevel) return false;
        this.level++;
        this.setupWeapon();
        return true;
    }

    // Turn this weapon into its evolved form. Data-driven: the stat changes come
    // from the evolution entry, applied generically in setupWeapon().
    evolve(evolutionId) {
        this.evolutionId = evolutionId;
        this.setupWeapon();
    }
    
    setupWeapon() {
        const tierInfo = this.getTierInfo();
        const dmgMult = tierInfo.damageMultiplier;
        const sizeMult = tierInfo.sizeMultiplier;
        
        switch(this.type) {
            case 'lightning':
                this.damage = 15 * dmgMult;
                this.attackSpeed = 2;
                this.radius = 80 * sizeMult;
                this.orbs = 2;
                this.speed = 3;
                break;
            case 'fire':
                this.damage = 8 * dmgMult;
                this.radius = 60 * sizeMult;
                break;
            case 'ice':
                // Ice fires in every cardinal direction at once, so its damage
                // has to be read as x4: at 20/1.5 it was putting out ~120 dps
                // surrounded, against ~20 for the boomerang and ~60 for
                // lightning. It was the strongest weapon in the game by a
                // distance while costing nothing to aim.
                this.damage = 11 * dmgMult;
                this.attackSpeed = 1.1;
                this.projectileSpeed = 300;
                break;
            case 'boomerang':
                this.damage = 25 * dmgMult;
                this.attackSpeed = 0.8;
                this.range = 200 * sizeMult;
                this.state = 'ready';
                this.distance = 0;
                this.angle = 0;
                break;
            case 'orbs':
                this.damage = 12 * dmgMult;
                this.orbs = 3;
                this.radius = 60 * sizeMult;
                this.speed = 2;
                break;
            case 'poison':
                this.damage = 10 * dmgMult;
                this.attackSpeed = 2;
                this.poisonDuration = 3;
                break;
            case 'bomb':
                this.damage = 999; // Instant kill
                this.cooldownTime = 60 / (1 + this.tier * 0.3); // Faster cooldown at higher tiers
                // Only start ready the first time — re-running setup on level-up
                // must not hand out a free bomb.
                if (!this._initialised) this.cooldown = 0;
                break;
        }

        this.applyEvolutionStats();
        this.applyScaling();
        this._initialised = true;
    }

    // Evolutions overwrite the base profile. Every field is optional, so adding
    // a new evolution never requires touching this method.
    applyEvolutionStats() {
        const evo = this.evolution;
        if (!evo) return;
        const st = evo.stats || {};
        if (st.damageMultiplier) this.damage *= st.damageMultiplier;
        if (st.attackSpeedMultiplier && this.attackSpeed) this.attackSpeed *= st.attackSpeedMultiplier;
        if (st.radiusMultiplier && this.radius) this.radius *= st.radiusMultiplier;
        if (st.rangeMultiplier && this.range) this.range *= st.rangeMultiplier;
        if (st.orbsBonus && this.orbs) this.orbs += st.orbsBonus;
        if (st.poisonDurationBonus && this.poisonDuration) this.poisonDuration += st.poisonDurationBonus;
        if (st.cooldownMultiplier && this.cooldownTime) this.cooldownTime *= st.cooldownMultiplier;
        if (st.directions) this.directions = st.directions;
    }

    // Per-level growth plus the player's global damage / cooldown modifiers
    // (passives, permanent upgrades). Baked in here so the hot path stays cheap.
    applyScaling() {
        const w = GAME_CONFIG.weapons;
        const levelBonus = 1 + (this.level - 1) * w.damagePerLevel;
        // Cooldown multiplier: below 1 means faster.
        let cdMult = Math.max(0.35, 1 - (this.level - 1) * w.cooldownReductionPerLevel);

        const player = this.player;
        if (player && player.getCooldownMultiplier) {
            cdMult *= player.getCooldownMultiplier();
        }

        this.damage *= levelBonus;
        if (player && player.getDamageMultiplier) {
            this.damage *= player.getDamageMultiplier();
        }

        // attackSpeed is shots-per-second, so dividing by the cooldown
        // multiplier makes a lower multiplier fire faster.
        if (this.attackSpeed) this.attackSpeed /= cdMult;
        if (this.cooldownTime) this.cooldownTime *= cdMult;
    }
    
    update(deltaTime, game) {
        this.time += deltaTime;
        this.cooldown -= deltaTime;
        
        switch(this.type) {
            case 'lightning':
                this.updateLightning(deltaTime, game);
                break;
            case 'fire':
                this.updateFire(deltaTime, game);
                break;
            case 'ice':
                this.updateIce(deltaTime, game);
                break;
            case 'boomerang':
                this.updateBoomerang(deltaTime, game);
                break;
            case 'orbs':
                this.updateOrbs(deltaTime, game);
                break;
            case 'poison':
                this.updatePoison(deltaTime, game);
                break;
            case 'bomb':
                this.updateBomb(deltaTime, game);
                break;
        }
    }
    
    updateLightning(deltaTime, game) {
        // Lightning ring orbits and damages enemies
        const orbCount = this.orbs + this.level - 1;
        for (let i = 0; i < orbCount; i++) {
            const angle = (this.time * this.speed + (i * Math.PI * 2 / orbCount));
            const x = this.player.x + Math.cos(angle) * this.radius;
            const y = this.player.y + Math.sin(angle) * this.radius;
            
            // Check enemy collision
            game.enemies.forEach(enemy => {
                const dx = enemy.x - x;
                const dy = enemy.y - y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 20) {
                    enemy.takeDamage(this.damage * deltaTime * 2);
                }
            });
        }
    }
    
    updateFire(deltaTime, game) {
        // Fire aura damages nearby enemies
        const range = this.radius + (this.level - 1) * 10;
        const traits = (this.evolution && this.evolution.traits) || {};
        let healed = 0;

        game.enemies.forEach(enemy => {
            const dx = enemy.x - this.player.x;
            const dy = enemy.y - this.player.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < range) {
                enemy.takeDamage(this.damage * deltaTime, { dot: true });
                if (traits.healOnHit) healed += traits.healOnHit * deltaTime;
            }
        });

        // Infernal Halo feeds the wearer, but only up to a modest trickle so it
        // cannot outheal being surrounded.
        if (healed > 0 && this.player.health > 0) {
            const cap = 6 * deltaTime;
            this.player.health = Math.min(this.player.maxHealth, this.player.health + Math.min(healed, cap));
        }
    }
    
    updateIce(deltaTime, game) {
        if (this.cooldown <= 0) {
            // Cardinal directions by default; evolutions can widen the spread.
            const dirCount = this.directions || 4;
            const directions = [];
            for (let i = 0; i < dirCount; i++) directions.push((Math.PI * 2 * i) / dirCount);
            directions.forEach(angle => {
                game.projectiles.push(new Projectile(
                    this.player.x, this.player.y, angle,
                    this.projectileSpeed, this.damage,
                    '#4FC3F7', false, 'mage'
                ));
            });
            this.cooldown = 1 / this.attackSpeed;
        }
    }
    
    updateBoomerang(deltaTime, game) {
        if (this.state === 'ready' && this.cooldown <= 0) {
            // Find nearest enemy
            let nearest = null;
            let nearestDist = Infinity;
            game.enemies.forEach(enemy => {
                const dx = enemy.x - this.player.x;
                const dy = enemy.y - this.player.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < nearestDist) {
                    nearestDist = dist;
                    nearest = enemy;
                }
            });
            
            if (nearest) {
                this.angle = Math.atan2(nearest.y - this.player.y, nearest.x - this.player.x);
                this.state = 'out';
                this.distance = 0;
            }
        }
        
        if (this.state === 'out') {
            this.distance += 400 * deltaTime;
            if (this.distance >= this.range) {
                this.state = 'return';
            }
            
            const x = this.player.x + Math.cos(this.angle) * this.distance;
            const y = this.player.y + Math.sin(this.angle) * this.distance;
            
            // Damage enemies
            game.enemies.forEach(enemy => {
                const dx = enemy.x - x;
                const dy = enemy.y - y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 25) {
                    enemy.takeDamage(this.damage * deltaTime * 3);
                }
            });
        }
        
        if (this.state === 'return') {
            this.distance -= 500 * deltaTime;
            if (this.distance <= 0) {
                this.state = 'ready';
                this.cooldown = 1 / this.attackSpeed;
            }
            
            const x = this.player.x + Math.cos(this.angle) * this.distance;
            const y = this.player.y + Math.sin(this.angle) * this.distance;
            
            // Damage enemies on return
            game.enemies.forEach(enemy => {
                const dx = enemy.x - x;
                const dy = enemy.y - y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 25) {
                    enemy.takeDamage(this.damage * deltaTime * 3);
                }
            });
        }
    }
    
    updateOrbs(deltaTime, game) {
        // Rotating orbs that block/damage enemies
        const orbCount = this.orbs + this.level - 1;
        const rotationSpeed = this.speed + this.tier * 0.8; // Spin faster as tier increases
        for (let i = 0; i < orbCount; i++) {
            const angle = (-this.time * rotationSpeed + (i * Math.PI * 2 / orbCount));
            const x = this.player.x + Math.cos(angle) * this.radius;
            const y = this.player.y + Math.sin(angle) * this.radius;
            
            game.enemies.forEach(enemy => {
                const dx = enemy.x - x;
                const dy = enemy.y - y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 25) {
                    enemy.takeDamage(this.damage * deltaTime * 2);
                }
            });
        }
    }
    
    updatePoison(deltaTime, game) {
        if (this.cooldown <= 0 && game.enemies.length > 0) {
            // Find nearest enemy
            let nearest = null;
            let nearestDist = Infinity;
            game.enemies.forEach(enemy => {
                const dx = enemy.x - this.player.x;
                const dy = enemy.y - this.player.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < nearestDist) {
                    nearestDist = dist;
                    nearest = enemy;
                }
            });
            
            if (nearest) {
                const angle = Math.atan2(nearest.y - this.player.y, nearest.x - this.player.x);
                game.projectiles.push(new Projectile(
                    this.player.x, this.player.y, angle,
                    500, this.damage,
                    '#7CB342', false, 'assassin'
                ));
                this.cooldown = 1 / this.attackSpeed;
            }
        }
    }
    
    updateBomb(deltaTime, game) {
        // Bomb triggers automatically when off cooldown
        if (this.cooldown <= 0 && game.enemies.length > 0) {
            // Create massive explosion effect
            game.enemies.forEach(enemy => {
                // Create explosion particles at each enemy position
                game.createParticles(enemy.x, enemy.y, enemy.color, 'tank');
                enemy.takeDamage(this.damage);
            });
            
            // Screen shake
            game.screenShake = 20;
            game.audioManager.playSound('bomb');

            // Add central explosion flash
            for (let i = 0; i < 50; i++) {
                const angle = Math.random() * Math.PI * 2;
                const speed = 50 + Math.random() * 300;
                game.particles.push(new Particle(
                    this.player.x, this.player.y, angle, speed, '#ff6b00', 2
                ));
            }
            
            // cooldownTime already accounts for level and modifiers.
            this.cooldown = this.cooldownTime;
        }
    }
    
    draw(ctx) {
        switch(this.type) {
            case 'lightning':
                this.drawLightning(ctx);
                break;
            case 'fire':
                this.drawFire(ctx);
                break;
            case 'boomerang':
                this.drawBoomerang(ctx);
                break;
            case 'orbs':
                this.drawOrbs(ctx);
                break;
            case 'bomb':
                this.drawBomb(ctx);
                break;
        }
    }
    
    // A jagged arc tethered to the player, not a floating ball. The old
    // version was a yellow radial gradient in a circle — identical in
    // construction to the purple one used for orbs, which is why every
    // revolving weapon read as "an orb" regardless of what it was.
    drawLightning(ctx) {
        const orbCount = this.orbs + this.level - 1;
        const tierInfo = this.getDisplayTier();
        const tierColor = tierInfo.color;

        ctx.save();
        ctx.globalCompositeOperation = 'lighter';
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        for (let i = 0; i < orbCount; i++) {
            const angle = (this.time * this.speed + (i * Math.PI * 2 / orbCount));
            const x = this.player.x + Math.cos(angle) * this.radius;
            const y = this.player.y + Math.sin(angle) * this.radius;

            // Jitter is driven by time and index rather than Math.random so the
            // bolt flickers steadily instead of strobing a new shape per frame.
            const seed = this.time * 22 + i * 7.3;
            const segs = 5;
            const pts = [];
            for (let k = 0; k <= segs; k++) {
                const t = k / segs;
                const px = this.player.x + (x - this.player.x) * t;
                const py = this.player.y + (y - this.player.y) * t;
                // Perpendicular offset, pinched to zero at both ends so the
                // bolt stays anchored to the player and to the tip.
                const wob = Math.sin(seed + k * 2.1) * 11 * Math.sin(t * Math.PI);
                pts.push([px + Math.cos(angle + Math.PI / 2) * wob,
                          py + Math.sin(angle + Math.PI / 2) * wob]);
            }

            const trace = () => {
                ctx.beginPath();
                ctx.moveTo(pts[0][0], pts[0][1]);
                for (let k = 1; k < pts.length; k++) ctx.lineTo(pts[k][0], pts[k][1]);
                ctx.stroke();
            };

            // Outer halo, then the hot core: two passes of the same path.
            ctx.strokeStyle = this.tier > 0 ? tierColor + '55' : '#FFD70055';
            ctx.lineWidth = 7;
            trace();
            ctx.strokeStyle = '#FFF4B0';
            ctx.lineWidth = 2;
            trace();

            // The tip is a four-point spark, not a ball.
            const flick = 0.75 + 0.25 * Math.sin(this.time * 18 + i);
            const r = (7 + this.tier * 1.6) * flick;
            ctx.strokeStyle = '#FFFFFF';
            ctx.lineWidth = 2;
            ctx.beginPath();
            for (let k = 0; k < 4; k++) {
                const a = angle + k * Math.PI / 2 + this.time * 3;
                ctx.moveTo(x, y);
                ctx.lineTo(x + Math.cos(a) * r, y + Math.sin(a) * r);
            }
            ctx.stroke();
        }
        ctx.restore();
    }

    drawFire(ctx) {
        const range = this.radius + (this.level - 1) * 10;
        const tierInfo = this.getDisplayTier();
        const tierColor = tierInfo.color;
        
        // Add tier glow ring if upgraded
        if (this.tier > 0) {
            const tierPulse = Math.sin(this.time * 4) * 0.3 + 0.7;
            const tierGradient = ctx.createRadialGradient(
                this.player.x, this.player.y, range * 0.8,
                this.player.x, this.player.y, range * 1.2
            );
            // Parse hex color to rgb for alpha
            const r = parseInt(tierColor.slice(1, 3), 16);
            const g = parseInt(tierColor.slice(3, 5), 16);
            const b = parseInt(tierColor.slice(5, 7), 16);
            tierGradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${0.4 * tierPulse})`);
            tierGradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
            ctx.fillStyle = tierGradient;
            ctx.beginPath();
            ctx.arc(this.player.x, this.player.y, range * 1.2, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Pulsing fire aura
        const pulse = Math.sin(this.time * 3) * 0.2 + 0.8;
        const gradient = ctx.createRadialGradient(
            this.player.x, this.player.y, 0,
            this.player.x, this.player.y, range
        );
        gradient.addColorStop(0, `rgba(255, 69, 0, ${0.3 * pulse})`);
        gradient.addColorStop(0.7, `rgba(255, 140, 0, ${0.2 * pulse})`);
        gradient.addColorStop(1, 'rgba(255, 69, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.player.x, this.player.y, range, 0, Math.PI * 2);
        ctx.fill();
    }
    
    drawBoomerang(ctx) {
        if (this.state !== 'ready') {
            const x = this.player.x + Math.cos(this.angle) * this.distance;
            const y = this.player.y + Math.sin(this.angle) * this.distance;
            const tierInfo = this.getDisplayTier();
            const tierColor = tierInfo.color;
            
            // Tier glow (before rotation)
            if (this.tier > 0) {
                const tierSize = 20 + this.tier * 8;
                const tierGradient = ctx.createRadialGradient(x, y, 0, x, y, tierSize);
                tierGradient.addColorStop(0, tierColor + '80');
                tierGradient.addColorStop(0.5, tierColor + '40');
                tierGradient.addColorStop(1, tierColor + '00');
                ctx.fillStyle = tierGradient;
                ctx.beginPath();
                ctx.arc(x, y, tierSize, 0, Math.PI * 2);
                ctx.fill();
            }
            
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(this.time * 10);
            
            // Boomerang shape
            ctx.fillStyle = '#FFD700';
            ctx.beginPath();
            ctx.arc(0, -10, 8, 0, Math.PI);
            ctx.arc(0, 10, 8, Math.PI, 0);
            ctx.fill();
            
            ctx.strokeStyle = this.tier > 0 ? tierColor : '#FFA500';
            ctx.lineWidth = 3;
            ctx.stroke();
            
            ctx.restore();
        }
    }
    
    // Spinning crystal shards with a motion trail. Sharing the circle-plus-
    // gradient recipe with lightning was what made two mechanically different
    // weapons look like the same effect in two colours.
    drawOrbs(ctx) {
        const orbCount = this.orbs + this.level - 1;
        const tierInfo = this.getDisplayTier();
        const tierColor = tierInfo.color;
        const rotationSpeed = this.speed + this.tier * 0.8;

        ctx.save();
        for (let i = 0; i < orbCount; i++) {
            const angle = (-this.time * rotationSpeed + (i * Math.PI * 2 / orbCount));
            const x = this.player.x + Math.cos(angle) * this.radius;
            const y = this.player.y + Math.sin(angle) * this.radius;

            // Trail: a short arc along the orbit path behind the shard, which
            // is what actually communicates that this thing is revolving.
            ctx.globalCompositeOperation = 'lighter';
            ctx.strokeStyle = this.tier > 0 ? tierColor + '40' : '#9C27B040';
            ctx.lineWidth = 7;
            ctx.beginPath();
            ctx.arc(this.player.x, this.player.y, this.radius, angle + 0.55, angle, true);
            ctx.stroke();
            ctx.globalCompositeOperation = 'source-over';

            // The shard itself: an elongated diamond, tumbling on its own axis
            // so it catches the eye separately from the orbit.
            const spin = this.time * 4 + i;
            const long = 15 + this.tier * 2.5;
            const wide = 6 + this.tier;
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(spin);
            ctx.beginPath();
            ctx.moveTo(0, -long);
            ctx.lineTo(wide, 0);
            ctx.lineTo(0, long);
            ctx.lineTo(-wide, 0);
            ctx.closePath();

            const grd = ctx.createLinearGradient(-wide, -long, wide, long);
            grd.addColorStop(0, '#F3E5F5');
            grd.addColorStop(0.5, '#CE93D8');
            grd.addColorStop(1, '#7B1FA2');
            ctx.fillStyle = grd;
            ctx.fill();
            ctx.strokeStyle = this.tier > 0 ? tierColor : '#EDE7F6';
            ctx.lineWidth = 2;
            ctx.stroke();

            // Facet line, so it reads as cut crystal rather than a flat kite.
            ctx.strokeStyle = 'rgba(255,255,255,0.75)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(0, -long);
            ctx.lineTo(0, long);
            ctx.stroke();
            ctx.restore();
        }
        ctx.restore();
    }

    drawBomb(ctx) {
        // Draw a cooldown indicator at the top of the screen
        const centerX = this.player.x;
        const centerY = this.player.y - 80;
        const tierInfo = this.getDisplayTier();
        const tierColor = tierInfo.color;
        
        // Tier ring (if upgraded)
        if (this.tier > 0) {
            ctx.strokeStyle = tierColor;
            ctx.lineWidth = 3 + this.tier;
            ctx.beginPath();
            ctx.arc(centerX, centerY, 28, 0, Math.PI * 2);
            ctx.stroke();
        }
        
        // Background circle
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.beginPath();
        ctx.arc(centerX, centerY, 25, 0, Math.PI * 2);
        ctx.fill();
        
        // Cooldown arc
        const cooldownPercent = Math.max(0, this.cooldown / this.cooldownTime);
        if (cooldownPercent > 0) {
            ctx.fillStyle = 'rgba(255, 100, 100, 0.6)';
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, 25, -Math.PI / 2, -Math.PI / 2 + (Math.PI * 2 * cooldownPercent));
            ctx.closePath();
            ctx.fill();
        }
        
        // Bomb icon
        ctx.font = 'bold 20px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = this.cooldown <= 0 ? '#ff6b00' : '#666';
        ctx.fillText('💣', centerX, centerY);
        
        // Ready indicator
        if (this.cooldown <= 0) {
            const readyColor = this.tier > 0 ? tierColor : '#ff6b00';
            ctx.fillStyle = readyColor;
            ctx.shadowColor = readyColor;
            ctx.shadowBlur = 10;
            ctx.font = 'bold 12px Arial';
            ctx.fillText('READY!', centerX, centerY + 35);
            ctx.shadowBlur = 0;
        }
    }
}

// Enemy Class
SpecialWeapon.NAMES = {
    lightning: 'Lightning Ring', fire: 'Fire Aura', ice: 'Ice Shards',
    boomerang: 'Boomerang', orbs: 'Magic Orbs', poison: 'Poison Dagger', bomb: 'Mega Bomb'
};
SpecialWeapon.DESCRIPTIONS = {
    lightning: 'Orbiting bolts that shock what they touch.',
    fire: 'A burning aura that scorches anything close.',
    ice: 'Shards fired outward in every cardinal direction.',
    boomerang: 'A spinning blade that carves out and returns.',
    orbs: 'Protective orbs wheeling around you.',
    poison: 'Venom that keeps working after the hit.',
    bomb: 'Clears the screen. Long cooldown.'
};
SpecialWeapon.ICONS = {
    lightning: '\u26a1', fire: '🔥', ice: '\u2744\ufe0f',
    boomerang: '🌪\ufe0f', orbs: '🔮', poison: '💚', bomb: '💣'
};

class Enemy {
    constructor(x, y, type, multiplier, game) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.multiplier = multiplier;
        this.game = game;
        
        this.setupType();
        
        this.health = this.maxHealth * multiplier;
        this.maxHealth = this.health;
        this.stunned = 0;
        this.hitFlash = 0;   // seconds remaining on the white damage flash
    }
    
    setupType() {
        // Stats come from ENEMY_TYPES (src/data/Waves.js) so new enemies are
        // added as data, not as new branches here.
        const types = (typeof ENEMY_TYPES !== 'undefined') ? ENEMY_TYPES : {};
        const stats = types[this.type] || types.basic;
        this.stats = stats;
        this.radius = stats.radius;
        this.drawScale = stats.drawScale || 1.0;
        this.label = stats.label || this.type;
        this.ultCharge = stats.ultCharge || 5;
        this.chestChance = stats.chestChance || 0;
        this.behavior = stats.behavior || 'chase';
        this.spriteKey = stats.sprite || ('enemy_' + this.type);

        // Per-behaviour runtime state
        this.fireTimer = (stats.fireCooldown || 0) * Math.random();  // desync the volley
        this.chargeState = 'approach';   // approach -> windup -> dash -> recover
        this.chargeTimer = 0;
        this.dashX = 0;
        this.dashY = 0;
        this.fuseTimer = 0;
        this.fuseLit = false;
        this.baseSpeed = stats.speed;  // Store base speed
        this.speed = stats.speed;
        this.maxHealth = stats.maxHealth;
        this.damage = stats.damage;
        this.xpValue = stats.xpValue;
        this.color = stats.color;
        
        // Boss-specific properties. Which archetype is decided by the stage,
        // so a long run keeps meeting different fights.
        if (this.type === 'boss') {
            const archetype = (typeof getBossForStage === 'function')
                ? getBossForStage(this.game.currentStage)
                : null;
            this.archetype = archetype;

            // Front-loaded HP correction: see GAME_CONFIG.boss for why the
            // first boss needs it and the later ones do not.
            const bcfg = GAME_CONFIG.boss;
            const stage = Math.max(1, this.game.currentStage);
            this.maxHealth *= 1 + bcfg.firstStageBonus * Math.pow(bcfg.decay, stage - 1);

            // maxHealth now means ONE PHASE, which keeps every existing health
            // bar and percentage calculation correct without touching them.
            this.maxHealth *= bcfg.phases.healthScale;

            // Contact and projectile damage both read this.damage.
            this.damage *= bcfg.damageScale;

            this.attackCooldown = 2;   // brief entry delay before the first attack
            this.attackPattern = 0;
            // Enrage is no longer a health threshold; it IS the final phase.
            this.enraged = false;

            const ph = GAME_CONFIG.boss.phases;
            this.phase = 1;
            this.phaseCount = ph.count;
            this.phaseBreak = 0;

            if (archetype) {
                this.bossPattern = archetype.pattern;
                this.bossName = archetype.name;
                this.spriteKey = archetype.sprite;
                this.color = archetype.color;
                this.maxHealth *= archetype.healthMultiplier;
                this.baseSpeed *= archetype.speedMultiplier;
                this.speed = this.baseSpeed;
                this.damage *= archetype.damageMultiplier;
            } else {
                this.bossPattern = 'warden';
            }

            // Phase escalation multiplies these, so they have to be captured
            // before the first phase is applied or each phase would compound
            // on the last one's already-multiplied value.
            this.phaseBaseSpeed = this.baseSpeed;
            this.phaseBaseDamage = this.damage;

            // Pattern timers
            this.summonTimer = 3;
            this.spiralTimer = 0;
            this.spiralAngle = Math.random() * Math.PI * 2;
            this.slamTimer = 3;
            this.slamState = 'idle';        // idle -> windup -> recover
            this.pendingGapIndex = 0;
            this.pendingGapCount = 0;
            this.pendingGapSlots = 0;
        }
    }
    
    update(deltaTime, player) {
        if (this.hitFlash > 0) this.hitFlash -= deltaTime;
        if (this.stunned > 0) {
            this.stunned -= deltaTime;
            return;
        }
        
        // Speed scales with player level AND elapsed run time, hard-capped so
        // late-run enemies stay outrunnable.
        const cfg = GAME_CONFIG.enemy;
        const levelPart = (this.game.player.level - 1) * cfg.speedGrowthPerPlayerLevel;
        const timePart = (this.game.gameTime / 60) * cfg.speedGrowthPerMinute;
        const speedMultiplier = Math.min(cfg.maxSpeedMultiplier, 1 + levelPart + timePart);
        const currentSpeed = this.baseSpeed * speedMultiplier;
        
        // Behaviour dispatch. Adding an enemy means adding a data entry with a
        // `behavior` key, not another branch here.
        switch (this.behavior) {
            case 'boss':     this.updateBoss(deltaTime, player, currentSpeed); return;
            case 'ranged':   this.updateRanged(deltaTime, player, currentSpeed); return;
            case 'charger':  this.updateCharger(deltaTime, player, currentSpeed); return;
            case 'exploder': this.updateExploder(deltaTime, player, currentSpeed); return;
            default:         this.moveToward(player, currentSpeed, deltaTime);
        }
    }

    // Shared straight-line pursuit.
    moveToward(target, speed, deltaTime, sign = 1) {
        const dx = target.x - this.x;
        const dy = target.y - this.y;
        const dist = Math.hypot(dx, dy);
        if (dist > 0) {
            this.x += (dx / dist) * speed * deltaTime * sign;
            this.y += (dy / dist) * speed * deltaTime * sign;
        }
        return dist;
    }

    // Ranged: hold a preferred distance and shoot. Backs away if crowded, so
    // the player cannot solve it by either fleeing or charging in blindly.
    updateRanged(deltaTime, player, currentSpeed) {
        const s = this.stats;
        const dist = Math.hypot(player.x - this.x, player.y - this.y);

        if (dist > s.preferredRange) {
            this.moveToward(player, currentSpeed, deltaTime);
        } else if (dist < s.retreatRange) {
            this.moveToward(player, currentSpeed * 0.9, deltaTime, -1);
        }

        this.fireTimer -= deltaTime;
        if (this.fireTimer <= 0 && dist < s.preferredRange * 1.35) {
            this.fireTimer = s.fireCooldown;
            const angle = Math.atan2(player.y - this.y, player.x - this.x);
            const shot = new BossProjectile(
                this.x, this.y, angle, s.projectileSpeed, s.projectileDamage, this.game
            );
            shot.color = this.color;
            shot.radius = 7;
            this.game.particles.push(shot);
        }
    }

    // Charger: telegraph, then commit to a straight line. The direction locks
    // when the wind-up ends, which is what makes a sideways dodge work.
    updateCharger(deltaTime, player, currentSpeed) {
        const s = this.stats;
        this.chargeTimer -= deltaTime;

        switch (this.chargeState) {
            case 'approach': {
                const dist = this.moveToward(player, currentSpeed, deltaTime);
                if (dist < s.chargeRange && this.chargeTimer <= 0) {
                    this.chargeState = 'windup';
                    this.game.audioManager.playSound('charger-windup');
                    this.chargeTimer = s.windupTime;
                }
                break;
            }
            case 'windup':
                // Rooted while winding up — that pause is the player's cue.
                if (this.chargeTimer <= 0) {
                    const angle = Math.atan2(player.y - this.y, player.x - this.x);
                    this.dashX = Math.cos(angle);
                    this.dashY = Math.sin(angle);
                    this.chargeState = 'dash';
                    this.chargeTimer = s.dashTime;
                }
                break;
            case 'dash':
                this.x += this.dashX * s.dashSpeed * deltaTime;
                this.y += this.dashY * s.dashSpeed * deltaTime;
                if (this.chargeTimer <= 0) {
                    this.chargeState = 'recover';
                    this.chargeTimer = s.rechargeTime;
                }
                break;
            default:
                if (this.chargeTimer <= 0) this.chargeState = 'approach';
        }
    }

    // Exploder: rush in, light a fuse when close, detonate. Also detonates on
    // death, so killing one in your face still costs you.
    updateExploder(deltaTime, player, currentSpeed) {
        const s = this.stats;
        const dist = this.moveToward(player, currentSpeed, deltaTime);

        if (!this.fuseLit && dist < s.fuseRange) {
            this.fuseLit = true;
            this.game.audioManager.playSound('bomber-fuse');
            this.fuseTimer = s.fuseTime;
        }
        if (this.fuseLit) {
            this.fuseTimer -= deltaTime;
            if (this.fuseTimer <= 0) {
                this.detonate();
                this.health = 0;
            }
        }
    }

    // Radial blast that hits players regardless of what triggered it.
    detonate() {
        if (this.hasDetonated) return;
        this.hasDetonated = true;
        const s = this.stats;
        const radius = s.blastRadius || 100;
        const damage = s.blastDamage || 20;

        for (const p of [this.game.player, this.game.player2]) {
            if (!p || p.health <= 0 || p.downed) continue;
            if (Math.hypot(p.x - this.x, p.y - this.y) < radius + p.radius) {
                p.takeDamage(damage);
            }
        }

        this.game.screenShake = Math.max(this.game.screenShake, 14);
        this.game.createParticles(this.x, this.y, '#ff9f43', this.type);

        // The blast used to be a puff of the same circles used for every other
        // death, at a radius the player could not see. Draw the actual radius.
        const fx = this.game.effects;
        fx.add(new RingEffect(this.x, this.y, {
            fromRadius: 10, toRadius: radius,
            color: '#ff9f43', width: 10, endWidth: 2, life: 0.34
        }));
        fx.add(new FlashEffect(this.x, this.y, { radius: radius * 0.9, life: 0.26 }));
        const chunks = this.game.performanceMode ? 3 : 9;
        for (let i = 0; i < chunks; i++) {
            fx.add(new DebrisEffect(this.x, this.y, {
                speed: 130 + Math.random() * 190,
                color: '#c9772f', life: 0.5 + Math.random() * 0.4
            }));
        }
        this.game.applyHitStop(0.05);
    }
    
    // One bar cleared. Refill, escalate, and make a moment of it.
    advanceBossPhase() {
        const ph = GAME_CONFIG.boss.phases;
        const g = this.game;

        this.phase++;
        this.health = this.maxHealth;
        this.phaseBreak = ph.breakSeconds;

        // Escalate from the phase-1 baseline, never from the current value.
        const i = Math.min(this.phase - 1, ph.speed.length - 1);
        this.baseSpeed = this.phaseBaseSpeed * ph.speed[i];
        this.speed = this.baseSpeed;
        this.damage = this.phaseBaseDamage * ph.damage[i];

        // The final phase turns on the archetype's own enraged behaviour,
        // which is where the extra attack comes from.
        this.enraged = (this.phase === this.phaseCount);
        if (this.enraged) this.attackPattern = 1;

        // Reset the pattern timers so the new phase opens with an attack
        // rather than resuming mid-windup from the old one.
        this.attackCooldown = 1.2;
        this.slamState = 'idle';
        this.summonTimer = 1.5;

        // Clearing a bar should pay, not just tick a counter.
        g.spawnXPBurst(this.x, this.y, Math.round(this.xpValue * ph.phaseXpFraction), 6, 110);

        // The beat itself.
        g.applyHitStop(GAME_CONFIG.juice.maxHitStop);
        g.screenShake = 26;
        g.audioManager.playSound('boss-phase');

        const tint = this.phase >= this.phaseCount ? '#ff4444' : '#ffd43b';
        g.effects.add(new RingEffect(this.x, this.y, {
            fromRadius: 20, toRadius: 320, life: 0.65,
            color: tint, width: 8, endWidth: 1
        }));
        g.effects.add(new FlashEffect(this.x, this.y, {
            radius: 200, color: tint, life: 0.35
        }));

        const label = this.phase >= this.phaseCount ? 'FINAL STAND' : 'SECOND WIND';
        const sub = this.phase >= this.phaseCount
            ? 'It has nothing left to hold back.'
            : 'It was not fighting seriously.';
        g.announceEvent(`\u2620\ufe0f ${(this.bossName || 'THE BOSS').toUpperCase()} \u2014 ${label}`, sub);
    }

    updateBoss(deltaTime, player, currentSpeed) {
        // Between phases the boss neither moves nor attacks. The pause is what
        // makes the escalation legible — without it the bar just refills and
        // the player never registers that anything changed.
        if (this.phaseBreak > 0) {
            this.phaseBreak -= deltaTime;
            return;
        }

        // Speed escalation lives in baseSpeed, which currentSpeed is already
        // derived from, so there is deliberately no extra multiplier here —
        // applying one as well would compound to 2x by the final phase.
        const speed = currentSpeed;

        switch (this.bossPattern) {
            case 'summoner': this.updateSummonerBoss(deltaTime, player, speed); break;
            case 'colossus': this.updateColossusBoss(deltaTime, player, speed); break;
            default:         this.updateWardenBoss(deltaTime, player, speed);
        }
    }

    // Warden: relentless pursuit punctuated by a committed charge; opens up
    // with radial bursts once enraged.
    updateWardenBoss(deltaTime, player, speed) {
        const a = this.archetype || {};
        this.attackCooldown -= deltaTime;
        const dist = Math.hypot(player.x - this.x, player.y - this.y);

        if (!this.enraged) {
            if (this.attackCooldown <= 0 && dist > 100) {
                this.attackCooldown = 4;
                this.moveToward(player, speed * 3, deltaTime);   // lunge
            } else {
                this.moveToward(player, speed, deltaTime);
            }
            return;
        }

        this.moveToward(player, speed, deltaTime);
        if (this.attackCooldown <= 0) {
            this.attackCooldown = this.game.performanceMode
                ? (a.burstCooldown || 2) * 2
                : (a.burstCooldown || 2);
            this.radialBurst(a.burstCount || 8, 200);
        }
    }

    // Emberlord: hangs back, seeds bombers, and sweeps a rotating spiral. The
    // adds are the real pressure — ignoring them is what kills you.
    updateSummonerBoss(deltaTime, player, speed) {
        const a = this.archetype || {};
        const dist = Math.hypot(player.x - this.x, player.y - this.y);

        // Keep its distance rather than brawling.
        if (dist > (a.preferredRange || 380)) this.moveToward(player, speed, deltaTime);
        else if (dist < (a.preferredRange || 380) * 0.6) this.moveToward(player, speed * 0.8, deltaTime, -1);

        this.summonTimer -= deltaTime;
        if (this.summonTimer <= 0) {
            this.summonTimer = (a.summonCooldown || 7) * (this.enraged ? 0.6 : 1);
            this.summonAdds(a.summonType || 'bomber', a.summonCount || 3);
        }

        this.spiralTimer -= deltaTime;
        if (this.spiralTimer <= 0) {
            this.spiralTimer = (a.spiralCooldown || 0.28) * (this.game.performanceMode ? 2.5 : 1);
            this.spiralAngle += (a.spiralStep || 0.55);
            this.fireBossShot(this.spiralAngle, a.spiralSpeed || 210);
            if (this.enraged) this.fireBossShot(this.spiralAngle + Math.PI, a.spiralSpeed || 210);
        }
    }

    // Colossus: slow and unstoppable, and every slam throws out a ring with a
    // single gap. The fight is about finding the gap, not out-damaging it.
    updateColossusBoss(deltaTime, player, speed) {
        const a = this.archetype || {};
        this.slamTimer -= deltaTime;

        // Three phases, the same shape the Charger already uses. The slam used
        // to fire the instant a timer expired, with damage and shake landing on
        // the same frame — nothing to read, so it played as random punishment
        // rather than an attack. The windup is what makes it an attack.
        if (this.slamState === 'windup') {
            // Rooted. That pause is the player's cue, and the decal painted at
            // windup start shows exactly where the safe lane will be.
            if (this.slamTimer <= 0) {
                this.slamState = 'recover';
                this.slamTimer = 0.45;
                this.performSlam(a);
            }
            return;
        }

        if (this.slamState === 'recover') {
            if (this.slamTimer <= 0) {
                this.slamState = 'idle';
                this.slamTimer = (a.slamCooldown || 4.5) * (this.enraged ? 0.65 : 1);
            }
            return;
        }

        this.moveToward(player, speed, deltaTime);
        if (this.slamTimer <= 0) {
            this.slamState = 'windup';
            this.game.audioManager.playSound('boss-slam');
            this.slamTimer = a.slamWindup || 0.85;
            this.telegraphSlam(a);
        }
    }

    // Choose the safe lane now and show it, so the ring, the projectiles and
    // the telegraph all agree. Picking it here rather than at fire time is the
    // whole point: the player gets a beat to read it and move.
    telegraphSlam(a) {
        const count = this.game.performanceMode
            ? Math.ceil((a.ringCount || 26) / 2)
            : (a.ringCount || 26);
        const gapSlots = this.game.performanceMode
            ? Math.ceil((a.ringGap || 4) / 2)
            : (a.ringGap || 4);

        this.pendingGapIndex = Math.floor(Math.random() * count);
        this.pendingGapCount = count;
        this.pendingGapSlots = gapSlots;

        const step = (Math.PI * 2) / count;
        const gapStart = this.pendingGapIndex * step;
        const gapSize = gapSlots * step;

        const fx = this.game.effects;
        // The floor marker: holds under the boss, pulses faster as it closes.
        fx.add(new DecalEffect(this.x, this.y, {
            radius: 150,
            color: '#ff8f3c',
            life: a.slamWindup || 0.85,
            gapStart, gapSize,
            follow: this
        }));
        // A ring collapsing INWARD reads as gathering force, the opposite of
        // the outward wave that follows it.
        fx.add(new RingEffect(this.x, this.y, {
            fromRadius: 260, toRadius: 60,
            color: '#ffb066', width: 2, endWidth: 5,
            life: a.slamWindup || 0.85,
            ease: false, fade: 0.85
        }));
    }

    performSlam(a) {
        const speed = a.ringSpeed || 170;
        const count = this.pendingGapCount || (a.ringCount || 26);
        const step = (Math.PI * 2) / count;
        const gapStart = (this.pendingGapIndex || 0) * step;
        const gapSize = (this.pendingGapSlots || 0) * step;

        this.shockwaveRing(count, this.pendingGapSlots || 0, speed, this.pendingGapIndex || 0);

        const fx = this.game.effects;
        // The shockwave itself — finally an actual wave. It travels at the same
        // speed as the projectiles it accompanies, carries the same gap, and is
        // the thing the player is reading when they run for the lane.
        const reach = 900;
        fx.add(new RingEffect(this.x, this.y, {
            fromRadius: 40, toRadius: reach,
            color: '#ffd9a0', width: 14, endWidth: 2,
            life: reach / speed,
            gapStart, gapSize,
            ease: false
        }));
        // A second, faster, fainter ring gives the wave a leading edge.
        fx.add(new RingEffect(this.x, this.y, {
            fromRadius: 40, toRadius: reach,
            color: '#ff8f3c', width: 5, endWidth: 1,
            life: (reach / speed) * 0.8,
            gapStart, gapSize,
            ease: false, fade: 0.6
        }));
        fx.add(new FlashEffect(this.x, this.y, { radius: 260, life: 0.3 }));

        // Debris thrown from the impact — heavier and longer-lived than the
        // puff every ordinary death uses.
        const chunks = this.game.performanceMode ? 6 : 18;
        for (let i = 0; i < chunks; i++) {
            fx.add(new DebrisEffect(this.x, this.y, {
                angle: Math.random() * Math.PI * 2,
                speed: 160 + Math.random() * 260,
                color: i % 3 === 0 ? '#ffb066' : '#7a6f64',
                life: 0.7 + Math.random() * 0.5
            }));
        }

        this.game.screenShake = 26;
        this.game.applyHitStop(0.09);
    }

    // ---- Boss attack primitives ----------------------------------------

    fireBossShot(angle, speed) {
        const shot = new BossProjectile(this.x, this.y, angle, speed, this.damage, this.game);
        shot.color = this.color;
        this.game.particles.push(shot);
    }

    radialBurst(count, speed) {
        const n = this.game.performanceMode ? Math.ceil(count / 2) : count;
        for (let i = 0; i < n; i++) {
            this.fireBossShot((Math.PI * 2 / n) * i, speed);
        }
    }

    // A full ring minus a contiguous gap the player has to move to.
    // `gapStartSlot` is supplied by the telegraph so the drawn ring and the
    // real projectiles cannot disagree about where the safe lane is.
    shockwaveRing(count, gapWidth, speed, gapStartSlot = null) {
        const n = count;
        const gap = gapWidth;
        const gapStart = gapStartSlot !== null
            ? gapStartSlot
            : Math.floor(Math.random() * n);
        for (let i = 0; i < n; i++) {
            // Skip the gap slots, wrapping around the ring.
            const inGap = ((i - gapStart + n) % n) < gap;
            if (inGap) continue;
            this.fireBossShot((Math.PI * 2 / n) * i, speed);
        }
    }

    summonAdds(type, count) {
        const cap = this.game.performanceMode
            ? GAME_CONFIG.spawn.maxEnemiesMobile
            : GAME_CONFIG.spawn.maxEnemiesDesktop;
        for (let i = 0; i < count; i++) {
            if (this.game.enemies.length >= cap) break;
            const angle = (Math.PI * 2 * i) / count + Math.random();
            const pos = this.game.clampToWorld(
                this.x + Math.cos(angle) * 90,
                this.y + Math.sin(angle) * 90,
                30
            );
            this.game.enemies.push(new Enemy(pos.x, pos.y, type, this.multiplier, this.game));
        }
    }

    shootProjectiles() {
        // Fire projectiles in all directions (fewer on mobile for performance)
        const count = this.game.performanceMode ? 4 : 8;
        for (let i = 0; i < count; i++) {
            const angle = (Math.PI * 2 / count) * i;
            this.game.particles.push(new BossProjectile(
                this.x, this.y, angle, 200, this.damage, this.game
            ));
        }
    }
    
    takeDamage(amount, options) {
        // A boss must not be deletable by a single hit. See
        // GAME_CONFIG.boss.softHitFraction for the measurement behind this.
        if (this.type === 'boss') {
            // Untouchable while the bar refills between phases.
            if (this.phaseBreak > 0) return;
            // Resistance first, then the per-hit curve, so the curve shapes
            // what actually lands rather than what was asked for.
            const bc = GAME_CONFIG.boss;
            amount *= bc.damageTakenScale;

            const soft = this.maxHealth * bc.softHitFraction;
            if (amount > soft) {
                const hard = this.maxHealth * bc.hardHitFraction;
                const scale = soft * bc.hitSoftness;
                // Saturating curve: every point above the soft cap still adds
                // something, less and less, asymptotically approaching hard.
                amount = soft + (hard - soft) * (1 - Math.exp(-(amount - soft) / scale));
            }
        }

        this.health -= amount;

        // Intercept death here rather than letting the game's own check see
        // health <= 0: a boss with phases left does not die, it escalates.
        if (this.type === 'boss' && this.health <= 0 && this.phase < this.phaseCount) {
            this.advanceBossPhase();
            return;
        }
        this.hitFlash = 0.12;

        // Damage-over-time (fire aura, poison) ticks every frame. Batch those
        // into one number a few times a second instead of one per frame, and
        // skip the hit sound entirely so it cannot machine-gun.
        if (options && options.dot) {
            this._dotAccum = (this._dotAccum || 0) + amount;
            const now = this.game.gameTime;
            if (this._dotAccum >= 1 && now - (this._dotLast || 0) > 0.35) {
                this._dotLast = now;
                this.game.spawnDamageNumber(this.x, this.y - this.radius - 6, this._dotAccum, '#ff9f43');
                this._dotAccum = 0;
            }
            return;
        }

        this.game.audioManager.playSound('enemy-hit');
        // Big enemies get big numbers so the important hits read at a glance.
        const big = (this.type === 'boss' || this.type === 'elite');
        this.game.spawnDamageNumber(this.x, this.y - this.radius - 6, amount, big ? '#ffd43b' : '#ffffff', big);
    }

    // Push an enemy away from an impact point. Kept small so knockback reads as
    // feedback rather than crowd control.
    applyKnockback(fromX, fromY, force) {
        if (this.type === 'boss') return;   // bosses do not flinch
        const dx = this.x - fromX;
        const dy = this.y - fromY;
        const dist = Math.hypot(dx, dy);
        if (dist > 0) {
            const scale = this.type === 'elite' ? 0.35 : 1;
            this.x += (dx / dist) * force * scale;
            this.y += (dy / dist) * force * scale;
        }
    }
    
    draw(ctx) {
        // Sprite is drawn larger than the collision circle on purpose.
        const size = this.radius * 2.5 * (this.drawScale || 1);
        const imageName = this.spriteKey || `enemy_${this.type}`;

        // Phase has to be readable on the battlefield, not only on the HUD —
        // the player is watching the boss, not the top of the screen. An aura
        // in the phase colour, brighter and faster the further in you are.
        if (this.type === 'boss' && this.phase > 1) {
            const final = this.phase >= this.phaseCount;
            const beat = 0.55 + 0.45 * Math.sin(this.game.gameTime * (final ? 7 : 4));
            const r = size * 0.62;
            const g2 = ctx.createRadialGradient(this.x, this.y, r * 0.55, this.x, this.y, r);
            const tint = final ? '255, 60, 60' : '255, 200, 60';
            g2.addColorStop(0, `rgba(${tint}, 0)`);
            g2.addColorStop(1, `rgba(${tint}, ${(0.34 * beat).toFixed(3)})`);
            ctx.save();
            ctx.globalCompositeOperation = 'lighter';
            ctx.fillStyle = g2;
            ctx.beginPath();
            ctx.arc(this.x, this.y, r, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }

        // While the bar refills the boss is untouchable, and it has to LOOK
        // untouchable or the player reads the missing damage as a bug.
        if (this.type === 'boss' && this.phaseBreak > 0) {
            ctx.save();
            ctx.globalCompositeOperation = 'lighter';
            ctx.strokeStyle = `rgba(255, 255, 255, ${(0.35 + 0.45 * Math.sin(this.game.gameTime * 20)).toFixed(3)})`;
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(this.x, this.y, size * 0.5 + 10, 0, Math.PI * 2);
            ctx.stroke();
            ctx.restore();
        }
        
        // Check if sprite is loaded
        if (this.game.imagesLoaded && this.game.images[imageName] && this.game.images[imageName].complete) {
            // Draw shadow
            ctx.globalAlpha = 0.3;
            ctx.drawImage(
                this.game.images[imageName],
                this.x - size/2 + 2,
                this.y - size/2 + 2,
                size,
                size
            );
            ctx.globalAlpha = 1.0;
            
            // Draw sprite
            ctx.drawImage(
                this.game.images[imageName],
                this.x - size/2,
                this.y - size/2,
                size,
                size
            );
        } else {
            // Fallback to circles
            // Shadow
            ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
            ctx.beginPath();
            ctx.arc(this.x + 2, this.y + 2, this.radius, 0, Math.PI * 2);
            ctx.fill();
            
            // Enemy body
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Charge wind-up telegraph. The whole point of the charger is that it
        // is dodgeable, which requires the tell to be unmissable.
        if (this.chargeState === 'windup') {
            const progress = 1 - (this.chargeTimer / (this.stats.windupTime || 1));
            ctx.save();
            ctx.globalAlpha = 0.35 + 0.4 * Math.sin(progress * Math.PI * 6);
            ctx.strokeStyle = '#ff6b00';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius + 8 + progress * 10, 0, Math.PI * 2);
            ctx.stroke();
            // Show the committed line so the dodge direction is obvious.
            const angle = Math.atan2(this.game.player.y - this.y, this.game.player.x - this.x);
            ctx.globalAlpha = 0.3;
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x + Math.cos(angle) * 220, this.y + Math.sin(angle) * 220);
            ctx.stroke();
            ctx.restore();
        }

        // Lit fuse on an exploder — read as "get away from this one".
        if (this.fuseLit) {
            const blink = Math.sin(this.fuseTimer * 40) > 0;
            ctx.save();
            ctx.globalAlpha = blink ? 0.85 : 0.3;
            ctx.strokeStyle = '#ff4444';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(this.x, this.y, (this.stats.blastRadius || 100) * 0.5, 0, Math.PI * 2);
            ctx.stroke();
            ctx.restore();
        }

        // White flash on hit — drawn over the body, clipped to the sprite box.
        if (this.hitFlash > 0) {
            ctx.save();
            ctx.globalAlpha = Math.min(0.8, this.hitFlash * 5);
            ctx.globalCompositeOperation = 'lighter';
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }

        // Health bar (always shown)
        const barWidth = this.radius * 2;
        const barHeight = 4;
        const healthPercent = this.health / this.maxHealth;
        
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(this.x - barWidth/2, this.y - this.radius - 8, barWidth, barHeight);
        
        ctx.fillStyle = '#4ade80';
        ctx.fillRect(this.x - barWidth/2, this.y - this.radius - 8, barWidth * healthPercent, barHeight);
        
        // Stunned indicator
        if (this.stunned > 0) {
            ctx.fillStyle = '#ffd43b';
            ctx.font = '16px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('⚡', this.x, this.y - this.radius - 20);
        }

        // Named elite: a ring in a colour no ordinary enemy wears, and a
        // nameplate. The ring is what the player reads mid-fight; the name is
        // what they remember afterwards.
        if (this.isElite) {
            const pulse = 0.55 + 0.45 * Math.sin(this.game.gameTime * 3);
            ctx.save();
            ctx.globalAlpha = 0.5 + 0.4 * pulse;
            ctx.strokeStyle = ELITE_MARK_COLOR;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius + 7, 0, Math.PI * 2);
            ctx.stroke();

            ctx.globalAlpha = 0.95;
            ctx.fillStyle = ELITE_MARK_COLOR;
            ctx.font = 'bold 12px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'bottom';
            ctx.shadowColor = 'rgba(0,0,0,0.9)';
            ctx.shadowBlur = 4;
            ctx.fillText(this.eliteFullName, this.x, this.y - this.radius - 12);
            ctx.restore();
        }
    }
}

// Projectile Class
class Projectile {
    constructor(x, y, angle, speed, damage, color, piercing = false, type = 'warrior') {
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.speed = speed;
        this.damage = damage;
        this.color = color;
        this.piercing = piercing;
        this.type = type;
        this.radius = 6;
        this.active = true;
        this.lifetime = 3; // 3 seconds
        this.hitCount = 0;
        this.maxHits = piercing ? 3 : 1;
    }
    
    update(deltaTime) {
        this.x += Math.cos(this.angle) * this.speed * deltaTime;
        this.y += Math.sin(this.angle) * this.speed * deltaTime;
        this.lifetime -= deltaTime;
    }
    
    hit() {
        this.hitCount++;
        if (this.hitCount >= this.maxHits) {
            this.active = false;
        }
    }
    
    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        
        switch(this.type) {
            case 'warrior':
                // Sword slash / throwing axe
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.moveTo(10, 0);
                ctx.lineTo(-5, -6);
                ctx.lineTo(-8, 0);
                ctx.lineTo(-5, 6);
                ctx.closePath();
                ctx.fill();
                ctx.strokeStyle = '#fff';
                ctx.lineWidth = 2;
                ctx.stroke();
                break;
                
            case 'ranger':
                // Arrow
                ctx.fillStyle = '#8b4513';
                ctx.fillRect(-8, -1, 12, 2); // shaft
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.moveTo(8, 0);
                ctx.lineTo(4, -4);
                ctx.lineTo(4, 4);
                ctx.closePath();
                ctx.fill(); // arrowhead
                ctx.strokeStyle = '#fff';
                ctx.lineWidth = 1.5;
                ctx.stroke();
                break;
                
            case 'mage':
                // Magic orb with particle effect
                const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.radius * 2);
                gradient.addColorStop(0, this.color);
                gradient.addColorStop(0.5, this.color + 'cc');
                gradient.addColorStop(1, this.color + '00');
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(0, 0, this.radius * 2, 0, Math.PI * 2);
                ctx.fill();
                
                ctx.fillStyle = '#fff';
                ctx.beginPath();
                ctx.arc(0, 0, this.radius * 0.8, 0, Math.PI * 2);
                ctx.fill();
                
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(0, 0, this.radius * 0.6, 0, Math.PI * 2);
                ctx.fill();
                break;
                
            case 'assassin':
                // Kunai / dagger
                ctx.fillStyle = '#333';
                ctx.fillRect(-6, -1, 8, 2); // handle
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.moveTo(8, 0);
                ctx.lineTo(2, -3);
                ctx.lineTo(2, 3);
                ctx.closePath();
                ctx.fill(); // blade
                ctx.strokeStyle = '#fff';
                ctx.lineWidth = 1;
                ctx.stroke();
                break;
                
            case 'tank':
                // Heavy projectile / hammer
                ctx.fillStyle = '#666';
                ctx.fillRect(-6, -2, 8, 4); // handle
                ctx.fillStyle = this.color;
                ctx.fillRect(2, -6, 8, 12); // head
                ctx.strokeStyle = '#fff';
                ctx.lineWidth = 2;
                ctx.strokeRect(2, -6, 8, 12);
                break;
                
            default:
                // Default circle
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
                ctx.fill();
                ctx.strokeStyle = '#fff';
                ctx.lineWidth = 2;
                ctx.stroke();
        }
        
        ctx.restore();
        
        // Trail effect (only for certain types)
        if (this.type === 'mage' || this.type === 'assassin') {
            ctx.fillStyle = this.color + '40';
            ctx.beginPath();
            ctx.arc(
                this.x - Math.cos(this.angle) * 15,
                this.y - Math.sin(this.angle) * 15,
                this.radius * 0.7,
                0, Math.PI * 2
            );
            ctx.fill();
        }
    }
}

// XP Orb Class
class XPOrb {
    constructor(x, y, value) {
        this.x = x;
        this.y = y;
        this.value = value;
        this.attractSpeed = 300;

        // Bigger XP values get a visually distinct gem so the player can read
        // what is worth walking into.
        const gems = GAME_CONFIG.xp.gems;
        let tier = gems[0];
        for (const g of gems) {
            if (value >= g.threshold) tier = g;
        }
        this.color = tier.color;
        this.glow = tier.glow;
        this.radius = tier.radius;
    }

    update(deltaTime, player) {
        const dx = player.x - this.x;
        const dy = player.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Magnet range is a player stat now (Magnet Charm, permanent upgrades).
        const range = player.getPickupRange ? player.getPickupRange() : 150;
        if (dist < range && dist > 0) {
            this.x += (dx / dist) * this.attractSpeed * deltaTime;
            this.y += (dy / dist) * this.attractSpeed * deltaTime;
        }
    }
    
    draw(ctx) {
        // Skip glow on mobile (createRadialGradient is expensive)
        if (!window.game || !window.game.performanceMode) {
            const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius * 2);
            gradient.addColorStop(0, this.glow + '0.8)');
            gradient.addColorStop(1, this.glow + '0)');
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius * 2, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Core
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();
    }
}

// Health Pickup Class
class HealthPickup {
    constructor(x, y, healAmount) {
        this.x = x;
        this.y = y;
        this.healAmount = healAmount;
        this.radius = 10;
        this.magnetRange = 150;
        this.attractSpeed = 250;
        this.pulseTime = 0;
    }
    
    update(deltaTime, player) {
        this.pulseTime += deltaTime * 3;
        
        const dx = player.x - this.x;
        const dy = player.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        // Magnetic attraction. The dist > 0 guard matters: a pickup landing
        // exactly on the player divides by zero and NaNs its position, which
        // then crashes createRadialGradient on the next draw.
        if (dist < this.magnetRange && dist > 0) {
            this.x += (dx / dist) * this.attractSpeed * deltaTime;
            this.y += (dy / dist) * this.attractSpeed * deltaTime;
        }
    }
    
    draw(ctx) {
        const pulse = Math.sin(this.pulseTime) * 0.3 + 1;
        
        // Skip glow on mobile
        if (!window.game || !window.game.performanceMode) {
            const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius * 2.5 * pulse);
            gradient.addColorStop(0, 'rgba(46, 204, 113, 0.8)');
            gradient.addColorStop(1, 'rgba(46, 204, 113, 0)');
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius * 2.5 * pulse, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Core
        ctx.fillStyle = '#2ecc71';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * pulse, 0, Math.PI * 2);
        ctx.fill();
        
        // Cross symbol
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        const crossSize = this.radius * 0.6;
        ctx.beginPath();
        ctx.moveTo(this.x - crossSize, this.y);
        ctx.lineTo(this.x + crossSize, this.y);
        ctx.moveTo(this.x, this.y - crossSize);
        ctx.lineTo(this.x, this.y + crossSize);
        ctx.stroke();
    }
}

// Equipment Drop Class
class EquipmentDrop {
    constructor(x, y, equipment) {
        this.x = x;
        this.y = y;
        this.equipment = equipment;
        this.radius = 12;
        this.magnetRange = 120;
        this.attractSpeed = 200;
        this.rotationAngle = 0;
        this.floatOffset = 0;
    }
    
    update(deltaTime, player) {
        this.rotationAngle += deltaTime * 2;
        this.floatOffset = Math.sin(this.rotationAngle * 2) * 5;
        
        const dx = player.x - this.x;
        const dy = player.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        // Magnetic attraction. The dist > 0 guard matters: a pickup landing
        // exactly on the player divides by zero and NaNs its position, which
        // then crashes createRadialGradient on the next draw.
        if (dist < this.magnetRange && dist > 0) {
            this.x += (dx / dist) * this.attractSpeed * deltaTime;
            this.y += (dy / dist) * this.attractSpeed * deltaTime;
        }
    }
    
    draw(ctx) {
        const rarityColors = {
            'Common': '#9CA3AF',
            'Uncommon': '#10B981',
            'Rare': '#3B82F6',
            'Epic': '#A855F7',
            'Legendary': '#F59E0B'
        };
        
        const color = rarityColors[this.equipment.rarity] || '#9CA3AF';
        const displayY = this.y + this.floatOffset;
        
        // Outer glow
        const gradient = ctx.createRadialGradient(this.x, displayY, 0, this.x, displayY, this.radius * 3);
        gradient.addColorStop(0, color + '60');
        gradient.addColorStop(1, color + '00');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, displayY, this.radius * 3, 0, Math.PI * 2);
        ctx.fill();
        
        // Core
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(this.x, displayY, this.radius, 0, Math.PI * 2);
        ctx.fill();
        
        // Icon or letter based on equipment type
        ctx.save();
        ctx.translate(this.x, displayY);
        ctx.rotate(this.rotationAngle);
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        const icons = { weapon: '⚔️', armor: '🛡️', accessory: '📿', ring: '💍' };
        ctx.fillText(icons[this.equipment.type] || '?', 0, 0);
        ctx.restore();
    }
}

// Particle Class
class Particle {
    constructor(x, y, angle, speed, color, sizeMultiplier = 1) {
        this.x = x;
        this.y = y;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.color = color;
        this.radius = (3 + Math.random() * 3) * sizeMultiplier;
        // Much shorter lifetime on mobile to reduce lag
        this.lifetime = window.game && window.game.performanceMode ? 0.15 : 0.5;
        this.maxLifetime = this.lifetime;
    }
    
    update(deltaTime) {
        this.x += this.vx * deltaTime;
        this.y += this.vy * deltaTime;
        this.vx *= 0.95; // Friction
        this.vy *= 0.95;
        this.lifetime -= deltaTime;
    }
    
    draw(ctx) {
        const alpha = this.lifetime / this.maxLifetime;
        ctx.fillStyle = this.color + Math.floor(alpha * 255).toString(16).padStart(2, '0');
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Boss Projectile Class
class BossProjectile {
    constructor(x, y, angle, speed, damage, game) {
        this.x = x;
        this.y = y;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.damage = damage;
        this.game = game;
        this.radius = 8;
        this.lifetime = 5;
        this.color = '#ff0000';
    }
    
    update(deltaTime) {
        this.x += this.vx * deltaTime;
        this.y += this.vy * deltaTime;
        this.lifetime -= deltaTime;
        
        // Check collision with player 1
        const dx = this.game.player.x - this.x;
        const dy = this.game.player.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < this.radius + this.game.player.radius) {
            this.game.player.takeDamage(this.damage);
            this.lifetime = 0;
        }
        
        // Check collision with player 2 (co-op)
        if (this.lifetime > 0 && this.game.player2 && this.game.player2.health > 0) {
            const dx2 = this.game.player2.x - this.x;
            const dy2 = this.game.player2.y - this.y;
            const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
            if (dist2 < this.radius + this.game.player2.radius) {
                this.game.player2.takeDamage(this.damage);
                this.lifetime = 0;
            }
        }
        
        // Remove if off screen
        if (this.game.camera.isOffscreen(this.x, this.y, 100)) {
            this.lifetime = 0;
        }
    }
    
    draw(ctx) {
        // Glowing effect (skip on mobile for performance)
        if (!this.game.performanceMode) {
            ctx.shadowBlur = 15;
            ctx.shadowColor = this.color;
        }
        
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        
        if (!this.game.performanceMode) {
            ctx.shadowBlur = 0;
        }
        
        // Inner glow
        ctx.fillStyle = '#ffaaaa';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * 0.5, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Initialize game when page loads.
// NOTE: exactly one Game may be constructed. A second instance would register a
// duplicate set of UI listeners on the same buttons, firing every action twice.
window.addEventListener('DOMContentLoaded', () => {
    window.game = new Game();
    // --- Add the sound toggle logic here ---
    const soundBtn = document.getElementById('soundToggleBtn');
    const soundIcon = document.getElementById('soundToggleIcon');
    const soundLabel = document.getElementById('soundToggleLabel');
    function updateSoundBtn() {
        if (window.game && window.game.audioManager) {
            const enabled = window.game.audioManager.soundEnabled;
            soundIcon.textContent = enabled ? '🔊' : '🔇';
            soundLabel.textContent = enabled ? 'Sound On' : 'Sound Off';
        }
    }
    if (soundBtn) {
        soundBtn.addEventListener('click', () => {
            if (window.game && window.game.audioManager) {
                window.game.audioManager.toggleSound();
                window.game.audioManager._initContext && window.game.audioManager._initContext();
                updateSoundBtn();
            }
        });
        // Resume AudioContext on first user gesture (for mobile/iOS)
        ['touchstart','mousedown','keydown'].forEach(evt => {
            window.addEventListener(evt, () => {
                if (window.game && window.game.audioManager && window.game.audioManager._initContext) {
                    window.game.audioManager._initContext();
                }
            }, { once: true });
        });
        updateSoundBtn();
    }
});

