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
];

// Audio Manager Class
class AudioManager {
    constructor() {
        this.sounds = {};
        this.music = {};  // Will store paths, not audio objects
        this.musicPaths = {};  // Store music file paths for lazy loading
        this.soundVolume = 0.5;
        this.musicVolume = 0.3;
        this.soundEnabled = true;
        this.musicEnabled = true;
        this.currentMusic = null;
        this.currentMusicName = null;
        
        // Load settings from localStorage
        this.loadSettings();
    }
    
    loadSound(name, path) {
        const audio = new Audio(path);
        audio.volume = this.soundVolume;
        this.sounds[name] = audio;
    }
    
    loadMusic(name, path) {
        // On mobile: just store the path for lazy loading (don't load file yet)
        // On desktop: preload for instant playback
        if (window.game && window.game.isMobile) {
            this.musicPaths[name] = path;
        } else {
            const audio = new Audio(path);
            audio.volume = this.musicVolume;
            audio.loop = true;
            this.music[name] = audio;
        }
    }
    
    playSound(name) {
        if (!this.soundEnabled || !this.sounds[name]) return;
        
        // TEST: Skip on mobile to test performance
        if (window.game && window.game.isMobile) return;
        
        // Clone audio for overlapping sounds (small files, safe on mobile)
        const sound = this.sounds[name].cloneNode();
        sound.volume = this.soundVolume;
        sound.play().catch(err => console.log('Sound play error:', err));
    }
    
    playMusic(name) {
        if (!this.musicEnabled) return;
        
        // TEST: Skip on mobile to test performance
        if (window.game && window.game.isMobile) return;
        
        // Stop and unload current music to free memory
        if (this.currentMusic) {
            this.currentMusic.pause();
            this.currentMusic.src = '';  // Unload audio file from memory
            this.currentMusic = null;
        }
        
        // Desktop: use preloaded music
        if (!this.music[name]) return;
        this.currentMusic = this.music[name];
        this.currentMusicName = name;
        this.currentMusic.play().catch(err => console.log('Music play error:', err));
    }
    
    stopMusic() {
        if (this.currentMusic) {
            this.currentMusic.pause();
            this.currentMusic.src = '';  // Unload from memory
            this.currentMusic = null;
            this.currentMusicName = null;
        }
    }
    
    setSoundVolume(volume) {
        this.soundVolume = Math.max(0, Math.min(1, volume));
        Object.values(this.sounds).forEach(sound => {
            sound.volume = this.soundVolume;
        });
        this.saveSettings();
    }
    
    setMusicVolume(volume) {
        this.musicVolume = Math.max(0, Math.min(1, volume));
        Object.values(this.music).forEach(music => {
            music.volume = this.musicVolume;
        });
        if (this.currentMusic) {
            this.currentMusic.volume = this.musicVolume;
        }
        this.saveSettings();
    }
    
    toggleSound() {
        this.soundEnabled = !this.soundEnabled;
        this.saveSettings();
    }
    
    toggleMusic() {
        this.musicEnabled = !this.musicEnabled;
        if (!this.musicEnabled && this.currentMusic) {
            this.currentMusic.pause();
        } else if (this.musicEnabled && this.currentMusic) {
            this.currentMusic.play();
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
        
        // Game state
        this.isRunning = false;
        this.isPaused = false;
        this.gameTime = 0;
        this.lastTime = 0;
        
        // Player
        this.player = null;
        this.selectedCharacter = null;
        
        // Game objects
        this.projectiles = [];
        this.enemies = [];
        this.xpOrbs = [];
        this.healthPickups = [];
        this.equipmentDrops = [];
        this.particles = [];
        this.screenShake = 0;
        
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
        
        // TEST: Completely disable audio on mobile to test performance
        if (!this.isMobile) {
            this.loadAudio();
        }
        
        // Game settings
        this.waveMultiplier = 1.0;
        
        // Stage System
        this.currentStage = 1;
        this.stageTimeLimit = 90; // 90 seconds per stage before boss
        this.stageStartTime = 0;
        this.coins = 0; // Currency for shop
        
        // Boss system
        this.bossActive = false;
        this.bossWarning = false;
        this.bossWarningTime = 0;
        this.currentBoss = null;
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
        this.loadSavedEquipment();
        
        window.addEventListener('resize', () => this.resizeCanvas());
        
        // Listen for visual viewport changes (mobile browser chrome show/hide)
        if (window.visualViewport) {
            window.visualViewport.addEventListener('resize', () => this.resizeCanvas());
            window.visualViewport.addEventListener('scroll', () => this.resizeCanvas());
        }
        
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
            
            // Request fullscreen on any touch interaction
            document.addEventListener('touchstart', () => {
                if (!document.fullscreenElement && !document.webkitFullscreenElement) {
                    requestFullscreen();
                }
            }, { once: true });
            
            // Re-request fullscreen if user exits it
            document.addEventListener('fullscreenchange', () => {
                if (!document.fullscreenElement) {
                    // Give a short delay before re-requesting
                    setTimeout(() => {
                        if (!document.fullscreenElement) {
                            requestFullscreen();
                        }
                    }, 1000);
                }
            });
            
            // Listen for webkit fullscreen changes (Safari)
            document.addEventListener('webkitfullscreenchange', () => {
                if (!document.webkitFullscreenElement) {
                    setTimeout(() => {
                        if (!document.webkitFullscreenElement) {
                            requestFullscreen();
                        }
                    }, 1000);
                }
            });
        }
    }
    
    resizeCanvas() {
        // Use visual viewport for mobile browsers (accounts for browser chrome)
        const viewport = window.visualViewport;
        let width, height;
        
        if (viewport) {
            // Visual viewport available (modern mobile browsers)
            width = viewport.width;
            height = viewport.height;
        } else {
            // Fallback for older browsers
            width = window.innerWidth || document.documentElement.clientWidth;
            height = window.innerHeight || document.documentElement.clientHeight;
        }
        
        this.canvas.width = width;
        this.canvas.height = height;
        
        // Reduce canvas resolution on mobile for better performance
        if (this.isMobile) {
            const scale = 0.75; // 75% resolution on mobile
            this.canvas.width = Math.floor(width * scale);
            this.canvas.height = Math.floor(height * scale);
            // Reset transform before applying scale (prevent accumulation)
            this.ctx.setTransform(1, 0, 0, 1, 0, 0);
            this.ctx.scale(scale, scale);
        }
        
        // Force canvas to fill screen
        this.canvas.style.width = width + 'px';
        this.canvas.style.height = height + 'px';
        
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
            
            // ESC key toggles pause
            if (e.key === 'Escape' && this.isRunning) {
                this.togglePause();
            }
        });
        
        window.addEventListener('keyup', (e) => {
            this.keys[e.key.toLowerCase()] = false;
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
            e.preventDefault();
            const touch = e.touches[0];
            this.touchState.joystick.active = true;
            this.touchState.joystick.touchId = touch.identifier;
            this.updateJoystick(touch, joystickContainer, joystickStick);
        });
        
        joystickContainer.addEventListener('touchmove', (e) => {
            e.preventDefault();
            const touch = Array.from(e.touches).find(t => t.identifier === this.touchState.joystick.touchId);
            if (touch && this.touchState.joystick.active) {
                this.updateJoystick(touch, joystickContainer, joystickStick);
            }
        });
        
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
            e.preventDefault();
            e.stopPropagation();
            // Trigger ultimate ability if ready
            if (this.player && this.player.ultimateReady && this.isRunning && !this.isPaused) {
                this.player.useUltimate(this);
            }
        });
        
        fireButton.addEventListener('touchend', (e) => {
            e.preventDefault();
            e.stopPropagation();
        });
        
        // Prevent default touch behaviors on mobile controls
        document.getElementById('mobileControls')?.addEventListener('touchmove', (e) => {
            e.preventDefault();
        }, { passive: false });
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
            enemy_boss: 'images/demon_boss.png'
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
        
        // Character selection
        const characterCards = document.querySelectorAll('.character-card');
        characterCards.forEach(card => {
            card.addEventListener('click', () => {
                this.audioManager.playSound('button-click');
                this.selectCharacter(card.dataset.character);
            });
        });
        
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
        
        // Close inventory button
        document.getElementById('closeInventoryBtn')?.addEventListener('click', () => {
            this.audioManager.playSound('button-click');
            this.closeInventory();
        });
    }
    
    showCharacterSelect() {
        document.getElementById('titleScreen').classList.remove('active');
        document.getElementById('characterSelect').classList.add('active');
        
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
            this.canvas.width / 2,
            this.canvas.height / 2,
            this.selectedCharacter,
            this
        );
        
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
        this.gameTime = 0;
        this.waveMultiplier = 1.0;
        
        // Reset stage system
        this.currentStage = 1;
        this.stageStartTime = 0;
        // Keep coins persistent - don't reset
        this.bossActive = false;
        this.bossWarning = false;
        this.pendingEquipment = null;
        
        // Reset enemy spawn timers
        this.enemySpawnTimers = {
            basic: { lastSpawn: 0, cooldown: 800 },
            fast: { lastSpawn: 0, cooldown: 1800 },
            tank: { lastSpawn: 0, cooldown: 4000 }
        };
        
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
        
        // Start game loop
        this.isRunning = true;
        this.lastTime = performance.now();
        this.gameLoop(this.lastTime);
    }
    
    gameLoop(currentTime) {
        if (!this.isRunning) return;
        
        // Frame rate limiting for mobile
        const elapsed = currentTime - this.lastFrameTime;
        if (this.isMobile && elapsed < this.targetFrameTime) {
            requestAnimationFrame((time) => this.gameLoop(time));
            return;
        }
        
        const deltaTime = (currentTime - this.lastTime) / 1000;
        this.lastTime = currentTime;
        this.lastFrameTime = currentTime;
        
        this.gameTime += deltaTime;
        
        // Throttle achievement checks - only run once per second
        if (!this.lastAchievementCheck) this.lastAchievementCheck = 0;
        this.lastAchievementCheck += deltaTime;
        
        // Aggressive memory cleanup on mobile every 3 seconds
        if (this.performanceMode && Math.floor(this.gameTime) % 3 === 0 && Math.floor(this.gameTime) !== Math.floor(this.gameTime - deltaTime)) {
            // Force cleanup particles (keep BossProjectiles)
            for (let i = this.particles.length - 1; i >= 0 && this.particles.length > 30; i--) {
                if (!(this.particles[i] instanceof BossProjectile)) {
                    this.particles.splice(i, 1);
                }
            }
        }
        
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
        
        // Continue loop
        requestAnimationFrame((time) => this.gameLoop(time));
    }
    
    update(deltaTime) {
        if (this.isPaused) return;
        
        // Update player
        this.player.update(deltaTime, this.keys, this.canvas.width, this.canvas.height);
        
        // Check for ultimate activation (Q key)
        if (this.keys['q'] && this.player.ultimateReady) {
            this.player.useUltimate(this);
            this.keys['q'] = false; // Prevent multiple activations
        }
        
        // Spawn enemies
        this.spawnEnemies(deltaTime);
        
        // Boss system
        this.updateBossSystem(deltaTime);
        
        // Update enemies
        for (let i = this.enemies.length - 1; i >= 0; i--) {
            const enemy = this.enemies[i];
            enemy.update(deltaTime, this.player);
            
            // Check collision with player
            if (this.checkCollision(enemy, this.player)) {
                this.player.takeDamage(enemy.damage);
                
                // Knockback enemy (especially strong for warrior)
                const knockbackPower = this.player.type === 'warrior' ? 200 : 100;
                const dx = enemy.x - this.player.x;
                const dy = enemy.y - this.player.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist > 0) {
                    enemy.x += (dx / dist) * knockbackPower * deltaTime;
                    enemy.y += (dy / dist) * knockbackPower * deltaTime;
                }
                
                if (this.player.health <= 0) {
                    this.gameOver();
                }
            }
            
            // Remove dead enemies
            if (enemy.health <= 0) {
                this.audioManager.playSound('enemy-death');
                this.spawnXP(enemy.x, enemy.y, enemy.xpValue);
                this.player.addKill(enemy); // Pass enemy to track type
                
                // Random health drop (15% chance)
                if (Math.random() < 0.15) {
                    const healAmount = enemy.type === 'boss' ? 50 : (enemy.type === 'tank' ? 25 : 15);
                    this.spawnHealth(enemy.x, enemy.y, healAmount);
                }
                
                // Random equipment drop (5% chance for non-boss, 100% for boss)
                if (enemy.type === 'boss' || Math.random() < 0.05) {
                    if (enemy.type === 'boss') {
                        // Boss equipment handling is done elsewhere
                    } else {
                        // Regular enemy equipment drop
                        this.dropEquipment(enemy.x, enemy.y);
                    }
                }
                
                this.enemies.splice(i, 1);
                this.createParticles(enemy.x, enemy.y, enemy.color, enemy.type);
            }
        }
        
        // Update projectiles
        for (let i = this.projectiles.length - 1; i >= 0; i--) {
            const projectile = this.projectiles[i];
            projectile.update(deltaTime);
            
            // Check collision with enemies
            let hit = false;
            for (let j = 0; j < this.enemies.length; j++) {
                const enemy = this.enemies[j];
                if (projectile.active && this.checkCollision(projectile, enemy)) {
                    enemy.takeDamage(projectile.damage);
                    projectile.hit();
                    hit = true;
                    if (!projectile.piercing) break;
                }
            }
            
            // Remove inactive projectiles
            if (!projectile.active || projectile.lifetime <= 0) {
                this.projectiles.splice(i, 1);
            }
        }
        
        // Cap projectiles on mobile to prevent memory overload
        if (this.performanceMode && this.projectiles.length > 25) {
            this.projectiles.splice(0, this.projectiles.length - 25);
        }
        
        // Update XP orbs
        for (let i = this.xpOrbs.length - 1; i >= 0; i--) {
            const orb = this.xpOrbs[i];
            orb.update(deltaTime, this.player);
            
            // Check collision with player
            if (this.checkCollision(orb, this.player)) {
                this.audioManager.playSound('pickup-xp');
                this.player.addXP(orb.value);
                this.xpOrbs.splice(i, 1);
            }
        }
        
        // Cap XP orbs on mobile to prevent memory overload
        if (this.performanceMode && this.xpOrbs.length > 15) {
            this.xpOrbs.splice(0, this.xpOrbs.length - 15);
        }
        
        // Update Health Pickups
        for (let i = this.healthPickups.length - 1; i >= 0; i--) {
            const pickup = this.healthPickups[i];
            pickup.update(deltaTime, this.player);
            
            // Check collision with player
            if (this.checkCollision(pickup, this.player)) {
                this.audioManager.playSound('pickup-health');
                // Heal player
                const healAmount = pickup.healAmount;
                this.player.health = Math.min(this.player.maxHealth, this.player.health + healAmount);
                this.healthPickups.splice(i, 1);
                this.showNotification(`+${healAmount} HP`, '#2ecc71');
            }
        }
        
        // Cap health pickups on mobile to prevent memory overload
        if (this.performanceMode && this.healthPickups.length > 8) {
            this.healthPickups.splice(0, this.healthPickups.length - 8);
        }
        
        // Update Equipment Drops
        for (let i = this.equipmentDrops.length - 1; i >= 0; i--) {
            const drop = this.equipmentDrops[i];
            drop.update(deltaTime, this.player);
            
            // Check collision with player
            if (this.checkCollision(drop, this.player)) {
                this.audioManager.playSound('pickup-equipment');
                // Add to inventory
                const existingItem = this.playerInventory.find(item => item.name === drop.equipment.name);
                if (!existingItem) {
                    this.playerInventory.push({ ...drop.equipment });
                    this.saveInventory();
                }
                this.equipmentDrops.splice(i, 1);
                this.showNotification(`Found: ${drop.equipment.name}!`, this.getRarityColor(drop.equipment.rarity));
            }
        }
        
        // Cap equipment drops on mobile
        if (this.performanceMode && this.equipmentDrops.length > 5) {
            this.equipmentDrops.splice(0, this.equipmentDrops.length - 5);
        }
        
        // Update particles and boss projectiles (both live in particles array)
        // Hard cap on mobile BEFORE updating to keep memory low
        if (this.performanceMode && this.particles.length > 40) {
            // Remove non-BossProjectile particles first (cosmetic only)
            for (let i = this.particles.length - 1; i >= 0 && this.particles.length > 40; i--) {
                if (!(this.particles[i] instanceof BossProjectile)) {
                    this.particles.splice(i, 1);
                }
            }
        }
        for (let i = this.particles.length - 1; i >= 0; i--) {
            this.particles[i].update(deltaTime);
            if (this.particles[i].lifetime <= 0) {
                this.particles.splice(i, 1);
            }
        }
        
        // Player auto-attack
        this.player.attack(this, deltaTime);
        
        // Update player weapons
        this.player.updateWeapons(deltaTime, this);
        
        // Update HUD
        this.updateHUD();
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
            warningText.textContent = `BOSS INCOMING IN ${Math.ceil(this.bossWarningTime)}...`;
            
            if (this.bossWarningTime <= 0) {
                this.bossWarning = false;
                document.getElementById('bossWarning').classList.remove('active');
                // Spawn boss immediately when warning timer ends
                if (!this.bossActive) {
                    this.spawnBoss();
                }
            }
        }
        
        // Check if boss is defeated
        if (this.bossActive && this.currentBoss && this.currentBoss.health <= 0) {
            this.defeatBoss();
        }
    }
    
    spawnBoss() {
        this.bossActive = true;
        document.getElementById('bossHealthBar').classList.add('active');
        
        // Start boss music
        this.audioManager.playMusic('boss-theme');
        
        // Spawn from top center
        const x = this.canvas.width / 2;
        const y = -100;
        
        this.currentBoss = new Enemy(x, y, 'boss', this.waveMultiplier, this);
        this.enemies.push(this.currentBoss);
        
        // Screen shake and effects
        this.screenShake = 30;
        
        // Spawn dramatic particles (reduced count on mobile)
        const particleCount = this.performanceMode ? 20 : 100;
        for (let i = 0; i < particleCount; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 100 + Math.random() * 200;
            this.particles.push(new Particle(
                this.canvas.width / 2, 100, angle, speed, '#8b0000', 2
            ));
        }
    }
    
    defeatBoss() {
        this.audioManager.playSound('boss-defeat');
        this.bossActive = false;
        this.currentBoss = null;
        
        // Return to game music after boss
        this.audioManager.playMusic('game-theme');
        
        document.getElementById('bossHealthBar').classList.remove('active');
        
        // Track boss defeat for achievements
        this.sessionStats.bosses++;
        
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
    
    scaleEquipmentStats(baseStats, multiplier) {
        const scaled = {};
        for (const [key, value] of Object.entries(baseStats)) {
            scaled[key] = Math.floor(value * multiplier);
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
        if (this.coins < cost) {
            this.showNotification('Not enough coins!');
            return;
        }
        
        // Deduct coins
        this.coins -= cost;
        this.saveCoins();
        
        // Level up
        equipment.level++;
        
        // Recalculate stats with new level
        const levelMultiplier = this.getLevelMultiplier(equipment.level);
        equipment.stats = this.scaleEquipmentStats(
            equipment.baseStats,
            equipment.rarityData.statMultiplier * levelMultiplier
        );
        
        // Save inventory
        this.saveInventory();
        
        // Update if equipped
        if (this.player) {
            const equippedItem = this.player.equipment[equipment.type];
            if (equippedItem && equippedItem.name === equipment.name) {
                this.player.equipItem(equipment);
            }
        }
        
        // Update saved equipment loadout
        if (this.savedEquipment[equipment.type]?.name === equipment.name) {
            this.savedEquipment[equipment.type] = equipment;
            this.saveSavedEquipment();
        }
        
        this.showNotification(`${equipment.name} upgraded to ⭐${'⭐'.repeat(equipment.level - 1)}!`);
        this.updateInventoryEquippedSlots();
        this.renderInventoryItems();
    }
    
    showStageComplete(coinsEarned, equipment) {
        this.isPaused = true;
        
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
            statStrings.push(`+${value} ${formatted}`);
        }
        return statStrings.join(' • ');
    }
    
    getStarsDisplay(level) {
        const filledStars = '⭐'.repeat(level || 1);
        const emptyStars = '☆'.repeat(5 - (level || 1));
        return filledStars + emptyStars;
    }
    
    advanceStage() {
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
        
        // Show notification
        this.showNotification(`Stage ${this.currentStage} - Difficulty Increased!`);
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
            
            itemDiv.innerHTML = `
                <div class="inventory-item-level">${this.getStarsDisplay(equipment.level)}</div>
                <div class="inventory-item-name" style="color: ${this.getRarityColor(equipment.rarity)};">${equipment.name}</div>
                <div class="inventory-item-type">${equipment.type}</div>
                <div class="inventory-item-stats">${this.formatEquipmentStats(equipment)}</div>
                ${canLevelUp ? `
                    <button class="level-up-btn" data-index="${index}">
                        ⬆️ Level Up (${levelUpCost} 🪙)
                    </button>
                ` : '<div class="max-level">MAX LEVEL</div>'}
            `;
            
            // Add level-up button handler
            if (canLevelUp) {
                const levelUpBtn = itemDiv.querySelector('.level-up-btn');
                levelUpBtn.onclick = (e) => {
                    e.stopPropagation(); // Don't trigger equip
                    this.levelUpEquipment(index);
                };
            }
            
            inventoryGrid.appendChild(itemDiv);
        });
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
            'Legendary': '#F59E0B'
        };
        return colors[rarity] || '#fff';
    }
    
    render() {
        // Clear the FULL canvas pixel buffer first (before any transforms)
        // Must reset transform temporarily to ensure the entire buffer is wiped
        this.ctx.save();
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.fillStyle = '#1a1a2e';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.restore();
        
        // Apply screen shake on top of existing scale transform
        this.ctx.save();
        if (this.screenShake > 0) {
            const shakeX = (Math.random() - 0.5) * this.screenShake;
            const shakeY = (Math.random() - 0.5) * this.screenShake;
            this.ctx.translate(shakeX, shakeY);
        }
        
        // Draw grid (skip on mobile for performance)
        if (!this.performanceMode) {
            this.drawGrid();
        }
        
        // Draw particles (background layer)
        this.particles.forEach(particle => particle.draw(this.ctx));
        
        // Draw XP orbs
        this.xpOrbs.forEach(orb => orb.draw(this.ctx));
        
        // Draw Health Pickups
        this.healthPickups.forEach(pickup => pickup.draw(this.ctx));
        
        // Draw Equipment Drops
        this.equipmentDrops.forEach(drop => drop.draw(this.ctx));
        
        // Draw enemies
        this.enemies.forEach(enemy => enemy.draw(this.ctx));
        
        // Draw projectiles
        this.projectiles.forEach(projectile => projectile.draw(this.ctx));
        
        // Draw player weapons
        this.player.drawWeapons(this.ctx);
        
        // Draw player
        this.player.draw(this.ctx);
        
        // Draw achievement notifications
        this.drawAchievementNotifications();
        
        this.ctx.restore();
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
    
    drawGrid() {
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
        this.ctx.lineWidth = 1;
        
        const gridSize = 50;
        for (let x = 0; x < this.canvas.width; x += gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.canvas.height);
            this.ctx.stroke();
        }
        for (let y = 0; y < this.canvas.height; y += gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.canvas.width, y);
            this.ctx.stroke();
        }
    }
    
    spawnEnemies(deltaTime) {
        // Increase difficulty over time
        const timeFactor = 1 + (this.gameTime / 60); // Increase every minute
        this.waveMultiplier = timeFactor;
        
        // Calculate max enemies based on time (starts at 15, increases by 5 every 30 seconds)
        let maxEnemies = Math.floor(15 + (this.gameTime / 30) * 5);
        
        // Cap at lower max on mobile for better performance - prevent crash
        if (this.performanceMode) {
            maxEnemies = Math.min(maxEnemies, 8); // Hard cap at 8 enemies on mobile to prevent crash
        }
        
        // Reduce max enemies during boss fight
        if (this.bossActive) {
            maxEnemies = Math.floor(maxEnemies * 0.3); // Only 30% of normal spawns
        }
        
        // Don't spawn if we've reached the enemy limit
        if (this.enemies.length >= maxEnemies) {
            return;
        }
        
        const deltaMs = deltaTime * 1000;
        
        // Update each enemy type's spawn timer independently
        Object.entries(this.enemySpawnTimers).forEach(([type, timer]) => {
            // Check again before each spawn to prevent going over limit
            if (this.enemies.length >= maxEnemies) {
                return;
            }
            
            timer.lastSpawn += deltaMs;
            
            // Calculate adjusted cooldown (gets faster over time, but respects minimum rates)
            let adjustedCooldown = timer.cooldown / timeFactor;
            
            // Set minimum cooldowns per type to prevent overwhelming spawns
            const minCooldowns = {
                basic: 300,   // At least 0.3s between basic enemies
                fast: 800,    // At least 0.8s between fast enemies
                tank: 2000    // At least 2s between tank enemies
            };
            adjustedCooldown = Math.max(minCooldowns[type], adjustedCooldown);
            
            if (timer.lastSpawn >= adjustedCooldown) {
                timer.lastSpawn = 0;
                
                // Spawn from random edge
                const side = Math.floor(Math.random() * 4);
                let x, y;
                
                switch(side) {
                    case 0: // Top
                        x = Math.random() * this.canvas.width;
                        y = -50;
                        break;
                    case 1: // Right
                        x = this.canvas.width + 50;
                        y = Math.random() * this.canvas.height;
                        break;
                    case 2: // Bottom
                        x = Math.random() * this.canvas.width;
                        y = this.canvas.height + 50;
                        break;
                    case 3: // Left
                        x = -50;
                        y = Math.random() * this.canvas.height;
                        break;
                }
                
                this.enemies.push(new Enemy(x, y, type, this.waveMultiplier, this));
            }
        });
    }
    
    spawnXP(x, y, value) {
        this.xpOrbs.push(new XPOrb(x, y, value));
    }
    
    spawnHealth(x, y, healAmount) {
        this.healthPickups.push(new HealthPickup(x, y, healAmount));
    }
    
    dropEquipment(x, y) {
        // Generate random equipment
        const equipment = this.generateRandomEquipment(this.player.level);
        this.equipmentDrops.push(new EquipmentDrop(x, y, equipment));
    }
    
    createParticles(x, y, color, enemyType = 'basic') {
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
            if (this.particles.length > 35) {
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
    
    checkCollision(obj1, obj2) {
        const dx = obj1.x - obj2.x;
        const dy = obj1.y - obj2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance < obj1.radius + obj2.radius;
    }
    
    updateHUD() {
        // Stage
        document.getElementById('stageText').textContent = this.currentStage;
        
        // Coins
        document.getElementById('coinsText').textContent = this.coins;
        
        // Health
        const healthPercent = (this.player.health / this.player.maxHealth) * 100;
        document.getElementById('healthBar').style.width = healthPercent + '%';
        document.getElementById('healthText').textContent = 
            `${Math.ceil(this.player.health)}/${this.player.maxHealth}`;
        
        // Level
        document.getElementById('levelText').textContent = this.player.level;
        
        // XP
        const xpPercent = (this.player.xp / this.player.xpToLevel) * 100;
        document.getElementById('xpBar').style.width = xpPercent + '%';
        
        // Time
        const stageTime = this.gameTime - this.stageStartTime;
        const minutes = Math.floor(stageTime / 60);
        const seconds = Math.floor(stageTime % 60);
        document.getElementById('timeText').textContent = 
            `${minutes}:${seconds.toString().padStart(2, '0')}`;
        
        // Kills
        document.getElementById('killText').textContent = this.player.kills;
        
        // Ultimate charge
        const ultimatePercent = (this.player.ultimateCharge / this.player.ultimateMax) * 100;
        document.getElementById('ultimateBar').style.width = ultimatePercent + '%';
        document.getElementById('ultimateText').textContent = 
            `${Math.floor(this.player.ultimateCharge)}/${this.player.ultimateMax}`;
    }
    
    gameOver() {
        this.isRunning = false;
        
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
        
        finalStats.innerHTML = `
            <div class="final-stat">⏱️ Survived: ${minutes}:${seconds.toString().padStart(2, '0')}</div>
            <div class="final-stat">💀 Kills: ${this.player.kills}</div>
            <div class="final-stat">⭐ Level Reached: ${this.player.level}</div>
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
        
        // Stats based on character type
        this.setupCharacter();
        
        // State
        this.health = this.maxHealth;
        this.xp = 0;
        this.level = 1;
        this.xpToLevel = 10;
        this.kills = 0;
        
        // Attack
        this.attackCooldown = 0;
        this.attackSpeed = 1.0;
        this.projectileSpeed = 400;
        this.projectileDamage = 10;
        this.projectileCount = 1;
        this.piercing = false;
        this.armor = 0;
        
        // Special ability
        this.abilityCooldown = 0;
        
        // Ultimate ability (fills with kills)
        this.ultimateCharge = 0;
        this.ultimateMax = 100; // Requires 100 charge (about 10-15 kills depending on enemy type)
        this.ultimateReady = false;
        
        // Invulnerability frames (i-frames)
        this.invulnerable = false;
        this.iframeTimer = 0;
        this.iframeDuration = 2.0; // 2 seconds of invulnerability after being hit
        
        // Special weapons
        this.weapons = [];
        
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
            tank: {
                maxHealth: 150,
                speed: 120,
                damage: 8,
                color: '#74c0fc',
                icon: '🛡️'
            }
        };
        
        const stat = stats[this.type];
        this.maxHealth = stat.maxHealth;
        this.speed = stat.speed;
        this.baseDamage = stat.damage;
        this.color = stat.color;
        this.icon = stat.icon;
        this.armor = stat.armor || 0;
        
        // Character-specific modifiers
        switch(this.type) {
            case 'ranger':
                this.projectileCount = 3; // Multi-shot
                break;
            case 'mage':
                this.piercing = true; // Projectiles pierce
                break;
            case 'assassin':
                this.attackSpeed = 1.5; // Faster attacks
                break;
        }
    }
    
    update(deltaTime, keys, canvasWidth, canvasHeight) {
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
        
        // Apply movement
        this.x += dx * this.speed * deltaTime;
        this.y += dy * this.speed * deltaTime;
        
        // Keep in bounds
        this.x = Math.max(this.radius, Math.min(canvasWidth - this.radius, this.x));
        this.y = Math.max(this.radius, Math.min(canvasHeight - this.radius, this.y));
        
        // Update cooldowns
        if (this.attackCooldown > 0) {
            this.attackCooldown -= deltaTime;
        }
        if (this.abilityCooldown > 0) {
            this.abilityCooldown -= deltaTime;
        }
        
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
        if (!this.ultimateReady) return;
        
        game.audioManager.playSound('ultimate');
        
        // Reset ultimate charge
        this.ultimateCharge = 0;
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
                // Arrow Storm: Rapid fire barrage
                let arrowCount = 0;
                const stormInterval = setInterval(() => {
                    if (arrowCount >= 100 || !game.isRunning) {
                        clearInterval(stormInterval);
                        return;
                    }
                    const angle = Math.random() * Math.PI * 2;
                    game.projectiles.push(new Projectile(
                        this.x, this.y, angle,
                        600, this.projectileDamage * 2,
                        this.color, true, this.type
                    ));
                    arrowCount++;
                }, 30);
                break;
                
            case 'mage':
                // Meteor Strike: Summon meteors at enemy positions
                const meteors = Math.min(game.enemies.length, 20);
                for (let i = 0; i < meteors; i++) {
                    const enemy = game.enemies[i];
                    if (enemy) {
                        setTimeout(() => {
                            if (game.isRunning) {
                                for (let j = 0; j < 8; j++) {
                                    const angle = (Math.PI * 2 * j) / 8;
                                    game.particles.push(new Particle(
                                        enemy.x, enemy.y, angle, 200, '#ff4500', 1.5
                                    ));
                                }
                                enemy.takeDamage(this.projectileDamage * 10);
                            }
                        }, i * 50);
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
    
    takeDamage(amount) {
        // Skip damage if invulnerable
        if (this.invulnerable) return;
        
        // Apply armor damage reduction
        const reducedDamage = amount * (1 - this.armor);
        this.health -= reducedDamage;
        if (this.health < 0) this.health = 0;
        
        // Activate invulnerability frames
        this.invulnerable = true;
        this.iframeTimer = this.iframeDuration;
    }
    
    addXP(amount) {
        this.xp += amount;
        if (this.xp >= this.xpToLevel) {
            this.levelUp();
        }
    }
    
    addKill() {
        this.kills++;
        
        // Track recent kills for speed achievements
        const now = Date.now();
        this.game.sessionStats.recentKills.push(now);
        // Keep only kills from last 5 seconds
        this.game.sessionStats.recentKills = this.game.sessionStats.recentKills.filter(time => now - time < 5000);
        
        // Charge ultimate ability (different enemies give different charge amounts)
        const enemy = arguments[0]; // Get enemy that was killed
        let chargeGain = 5; // Default for basic
        if (enemy && enemy.type === 'fast') chargeGain = 8;
        if (enemy && enemy.type === 'tank') chargeGain = 15;
        
        this.ultimateCharge = Math.min(this.ultimateMax, this.ultimateCharge + chargeGain);
        
        if (this.ultimateCharge >= this.ultimateMax && !this.ultimateReady) {
            this.ultimateReady = true;
            // Show ultimate button
            document.getElementById('ultimateButton').classList.add('ready');
            // Also show mobile ultimate button as ready
            const fireBtn = document.getElementById('fireButton');
            if (fireBtn) fireBtn.classList.add('ready');
        }
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
    
    levelUp() {
        const game = window.game;
        game.audioManager.playSound('level-up');
        this.level++;
        this.xp -= this.xpToLevel;
        this.xpToLevel = Math.floor(this.xpToLevel * 1.5);
        
        // Show level up screen
        this.showLevelUpScreen();
    }
    
    showLevelUpScreen() {
        const game = window.game; // Access global game instance
        game.isPaused = true;
        
        const levelUpScreen = document.getElementById('levelUpScreen');
        const upgradeOptions = document.getElementById('upgradeOptions');
        
        // Generate random upgrades
        const statUpgrades = [
            { icon: '❤️', name: 'Max Health +20', desc: 'Increase maximum health', apply: () => {
                this.maxHealth += 20;
                this.health += 20;
            }},
            { icon: '⚡', name: 'Speed +15%', desc: 'Move faster', apply: () => {
                this.speed *= 1.15;
            }},
            { icon: '🗡️', name: 'Damage +20%', desc: 'Deal more damage', apply: () => {
                this.projectileDamage *= 1.2;
            }},
            { icon: '⚔️', name: 'Attack Speed +25%', desc: 'Attack more frequently', apply: () => {
                this.attackSpeed *= 1.25;
            }},
            { icon: '💨', name: 'Projectile Speed +20%', desc: 'Faster projectiles', apply: () => {
                this.projectileSpeed *= 1.2;
            }},
            { icon: '➕', name: 'Extra Projectile', desc: 'Shoot one more projectile', apply: () => {
                this.projectileCount += 1;
            }},
            { icon: '�️', name: 'Armor +10%', desc: 'Reduce incoming damage', apply: () => {
                this.armor = Math.min(0.75, this.armor + 0.10); // Cap at 75% reduction
            }},
            { icon: '�🔄', name: 'Full Heal', desc: 'Restore all health', apply: () => {
                this.health = this.maxHealth;
            }}
        ];
        
        const weaponUpgrades = [
            { icon: '⚡', name: 'Lightning Ring', desc: 'Orbiting lightning bolts', type: 'lightning', apply: () => {
                this.addWeapon('lightning');
            }},
            { icon: '🔥', name: 'Fire Aura', desc: 'Burns nearby enemies', type: 'fire', apply: () => {
                this.addWeapon('fire');
            }},
            { icon: '❄️', name: 'Ice Shards', desc: 'Shoots ice in 4 directions', type: 'ice', apply: () => {
                this.addWeapon('ice');
            }},
            { icon: '🌪️', name: 'Boomerang', desc: 'Spinning blade that returns', type: 'boomerang', apply: () => {
                this.addWeapon('boomerang');
            }},
            { icon: '🔮', name: 'Magic Orbs', desc: 'Rotating protective orbs', type: 'orbs', apply: () => {
                this.addWeapon('orbs');
            }},
            { icon: '💚', name: 'Poison Dagger', desc: 'Poisons enemies over time', type: 'poison', apply: () => {
                this.addWeapon('poison');
            }},
            { icon: '💣', name: 'Mega Bomb', desc: 'Clears all enemies (60s cooldown)', type: 'bomb', apply: () => {
                this.addWeapon('bomb');
            }}
        ];
        
        // Mix stat and weapon upgrades
        const allUpgrades = [];
        
        // Filter out weapons already owned
        const availableWeapons = weaponUpgrades.filter(w => 
            !this.weapons.some(owned => owned.type === w.type)
        );
        
        // Add tier upgrades for owned weapons
        const tierUpgrades = [];
        this.weapons.forEach(weapon => {
            if (weapon.tier < 3) { // Can upgrade to next tier
                const tierInfo = weapon.getTierInfo();
                const nextTier = [
                    { name: 'Common', color: '#9e9e9e' },
                    { name: 'Rare', color: '#2196f3' },
                    { name: 'Epic', color: '#9c27b0' },
                    { name: 'Legendary', color: '#ff9800' }
                ][weapon.tier + 1];
                
                const weaponNames = {
                    lightning: 'Lightning Ring',
                    fire: 'Fire Aura',
                    ice: 'Ice Shards',
                    boomerang: 'Boomerang',
                    orbs: 'Magic Orbs',
                    poison: 'Poison Dagger',
                    bomb: 'Mega Bomb'
                };
                
                tierUpgrades.push({
                    icon: '⭐',
                    name: `${weaponNames[weapon.type]} → ${nextTier.name}`,
                    desc: `Upgrade to ${nextTier.name} tier (+${Math.floor((weapon.getTierInfo().damageMultiplier * 0.5) * 100)}% damage)`,
                    weapon: weapon,
                    apply: () => {
                        weapon.upgradeTier();
                    }
                });
            }
        });
        
        // Add stats
        allUpgrades.push(...statUpgrades);
        
        // Add available weapons
        allUpgrades.push(...availableWeapons);
        
        // Add tier upgrades
        allUpgrades.push(...tierUpgrades);
        
        // Pick 3 random upgrades
        const shuffled = allUpgrades.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 3);
        
        upgradeOptions.innerHTML = '';
        selected.forEach(upgrade => {
            const option = document.createElement('div');
            option.className = 'upgrade-option';
            option.innerHTML = `
                <div class="upgrade-icon">${upgrade.icon}</div>
                <div class="upgrade-name">${upgrade.name}</div>
                <div class="upgrade-desc">${upgrade.desc}</div>
            `;
            option.addEventListener('click', () => {
                game.audioManager.playSound('button-click');
                upgrade.apply.call(this);
                levelUpScreen.classList.remove('active');
                game.isPaused = false;
            });
            upgradeOptions.appendChild(option);
        });
        
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
        this.level = 1;
        this.tier = 0; // 0=Common, 1=Rare, 2=Epic, 3=Legendary
        this.cooldown = 0;
        this.time = 0;
        
        // Weapon-specific properties
        this.setupWeapon();
    }
    
    getTierInfo() {
        const tiers = [
            { name: 'Common', color: '#9e9e9e', damageMultiplier: 1.0, sizeMultiplier: 1.0 },
            { name: 'Rare', color: '#2196f3', damageMultiplier: 1.5, sizeMultiplier: 1.2 },
            { name: 'Epic', color: '#9c27b0', damageMultiplier: 2.0, sizeMultiplier: 1.4 },
            { name: 'Legendary', color: '#ff9800', damageMultiplier: 3.0, sizeMultiplier: 1.6 }
        ];
        return tiers[this.tier];
    }
    
    upgradeTier() {
        if (this.tier < 3) {
            this.tier++;
            this.setupWeapon(); // Recalculate stats with new tier
            return true;
        }
        return false;
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
                this.damage = 20 * dmgMult;
                this.attackSpeed = 1.5;
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
                this.cooldown = 0; // Start ready
                break;
        }
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
        game.enemies.forEach(enemy => {
            const dx = enemy.x - this.player.x;
            const dy = enemy.y - this.player.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < range) {
                enemy.takeDamage(this.damage * deltaTime);
            }
        });
    }
    
    updateIce(deltaTime, game) {
        if (this.cooldown <= 0) {
            // Shoot ice in 4 cardinal directions
            const directions = [0, Math.PI/2, Math.PI, Math.PI*3/2];
            directions.forEach(angle => {
                game.projectiles.push(new Projectile(
                    this.player.x, this.player.y, angle,
                    this.projectileSpeed, this.damage * this.level,
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
                    500, this.damage * this.level,
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
            
            // Add central explosion flash
            for (let i = 0; i < 50; i++) {
                const angle = Math.random() * Math.PI * 2;
                const speed = 50 + Math.random() * 300;
                game.particles.push(new Particle(
                    this.player.x, this.player.y, angle, speed, '#ff6b00', 2
                ));
            }
            
            // Reset cooldown
            this.cooldown = this.cooldownTime / (1 + (this.level - 1) * 0.2);
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
    
    drawLightning(ctx) {
        const orbCount = this.orbs + this.level - 1;
        const tierInfo = this.getTierInfo();
        const tierColor = tierInfo.color;
        
        for (let i = 0; i < orbCount; i++) {
            const angle = (this.time * this.speed + (i * Math.PI * 2 / orbCount));
            const x = this.player.x + Math.cos(angle) * this.radius;
            const y = this.player.y + Math.sin(angle) * this.radius;
            
            // Tier glow (outer)
            if (this.tier > 0) {
                const glowSize = 20 + this.tier * 5;
                const tierGradient = ctx.createRadialGradient(x, y, 0, x, y, glowSize);
                tierGradient.addColorStop(0, tierColor + '60');
                tierGradient.addColorStop(0.5, tierColor + '30');
                tierGradient.addColorStop(1, tierColor + '00');
                ctx.fillStyle = tierGradient;
                ctx.beginPath();
                ctx.arc(x, y, glowSize, 0, Math.PI * 2);
                ctx.fill();
            }
            
            // Lightning glow
            const gradient = ctx.createRadialGradient(x, y, 0, x, y, 15);
            gradient.addColorStop(0, '#FFD700');
            gradient.addColorStop(0.5, '#FFD70080');
            gradient.addColorStop(1, '#FFD70000');
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(x, y, 15, 0, Math.PI * 2);
            ctx.fill();
            
            // Core
            ctx.fillStyle = '#FFFF00';
            ctx.beginPath();
            ctx.arc(x, y, 8, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    drawFire(ctx) {
        const range = this.radius + (this.level - 1) * 10;
        const tierInfo = this.getTierInfo();
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
            const tierInfo = this.getTierInfo();
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
    
    drawOrbs(ctx) {
        const orbCount = this.orbs + this.level - 1;
        const tierInfo = this.getTierInfo();
        const tierColor = tierInfo.color;
        const rotationSpeed = this.speed + this.tier * 0.8; // Spin faster as tier increases
        
        for (let i = 0; i < orbCount; i++) {
            const angle = (-this.time * rotationSpeed + (i * Math.PI * 2 / orbCount));
            const x = this.player.x + Math.cos(angle) * this.radius;
            const y = this.player.y + Math.sin(angle) * this.radius;
            
            // Tier glow (if upgraded)
            if (this.tier > 0) {
                const tierSize = 25 + this.tier * 5;
                const tierGradient = ctx.createRadialGradient(x, y, 0, x, y, tierSize);
                tierGradient.addColorStop(0, tierColor + '80');
                tierGradient.addColorStop(0.5, tierColor + '40');
                tierGradient.addColorStop(1, tierColor + '00');
                ctx.fillStyle = tierGradient;
                ctx.beginPath();
                ctx.arc(x, y, tierSize, 0, Math.PI * 2);
                ctx.fill();
            }
            
            // Glow
            const gradient = ctx.createRadialGradient(x, y, 0, x, y, 18);
            gradient.addColorStop(0, '#9C27B0');
            gradient.addColorStop(0.5, '#9C27B080');
            gradient.addColorStop(1, '#9C27B000');
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(x, y, 18, 0, Math.PI * 2);
            ctx.fill();
            
            // Core
            ctx.fillStyle = '#E1BEE7';
            ctx.beginPath();
            ctx.arc(x, y, 10, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.strokeStyle = this.tier > 0 ? tierColor : '#fff';
            ctx.lineWidth = 2;
            ctx.stroke();
        }
    }
    
    drawBomb(ctx) {
        // Draw a cooldown indicator at the top of the screen
        const centerX = this.player.x;
        const centerY = this.player.y - 80;
        const tierInfo = this.getTierInfo();
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
    }
    
    setupType() {
        const types = {
            basic: {
                radius: 15,
                speed: 60,  // Reduced from 100
                maxHealth: 20,
                damage: 5,
                xpValue: 5,
                color: '#e03131'
            },
            fast: {
                radius: 12,
                speed: 110,  // Reduced from 180
                maxHealth: 15,
                damage: 8,
                xpValue: 8,
                color: '#fd7e14'
            },
            tank: {
                radius: 25,
                speed: 40,  // Reduced from 60
                maxHealth: 60,
                damage: 15,
                xpValue: 15,
                color: '#c92a2a'
            },
            boss: {
                radius: 50,
                speed: 45,  // Reduced from 70
                maxHealth: 500,
                damage: 25,
                xpValue: 100,
                color: '#8b0000'
            }
        };
        
        const stats = types[this.type];
        this.radius = stats.radius;
        this.baseSpeed = stats.speed;  // Store base speed
        this.speed = stats.speed;
        this.maxHealth = stats.maxHealth;
        this.damage = stats.damage;
        this.xpValue = stats.xpValue;
        this.color = stats.color;
        
        // Boss-specific properties
        if (this.type === 'boss') {
            this.attackCooldown = 0;
            this.attackPattern = 0;
            this.phaseChangeThreshold = 0.5; // Changes attack at 50% health
        }
    }
    
    update(deltaTime, player) {
        if (this.stunned > 0) {
            this.stunned -= deltaTime;
            return;
        }
        
        // Apply level-based speed scaling
        // Speed increases by 5% per level (starts at 100% at level 1)
        const levelSpeedMultiplier = 1 + ((this.game.player.level - 1) * 0.05);
        const currentSpeed = this.baseSpeed * levelSpeedMultiplier;
        
        // Boss special behavior
        if (this.type === 'boss') {
            this.updateBoss(deltaTime, player, currentSpeed);
            return;
        }
        
        // Move toward player
        const dx = player.x - this.x;
        const dy = player.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist > 0) {
            this.x += (dx / dist) * currentSpeed * deltaTime;
            this.y += (dy / dist) * currentSpeed * deltaTime;
        }
    }
    
    updateBoss(deltaTime, player, currentSpeed) {
        this.attackCooldown -= deltaTime;
        
        const dx = player.x - this.x;
        const dy = player.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        // Change pattern based on health
        const healthPercent = this.health / this.maxHealth;
        let bossSpeed = currentSpeed;
        if (healthPercent < this.phaseChangeThreshold && this.attackPattern === 0) {
            this.attackPattern = 1; // Enraged phase
            bossSpeed = currentSpeed * 1.5; // 50% faster when low health
            this.game.screenShake = 20;
        }
        
        // Pattern 0: Slow pursuit with periodic charges
        if (this.attackPattern === 0) {
            if (this.attackCooldown <= 0 && dist > 100) {
                // Charge attack
                this.attackCooldown = 4;
                if (dist > 0) {
                    this.x += (dx / dist) * bossSpeed * 3 * deltaTime; // 3x speed charge
                    this.y += (dy / dist) * bossSpeed * 3 * deltaTime;
                }
            } else {
                // Normal movement
                if (dist > 0) {
                    this.x += (dx / dist) * bossSpeed * deltaTime;
                    this.y += (dy / dist) * bossSpeed * deltaTime;
                }
            }
        }
        // Pattern 1: Aggressive phase - faster movement and spawns projectiles
        else {
            // Fast pursuit
            if (dist > 0) {
                this.x += (dx / dist) * bossSpeed * deltaTime;
                this.y += (dy / dist) * bossSpeed * deltaTime;
            }
            
            // Shoot projectiles
            if (this.attackCooldown <= 0) {
                this.attackCooldown = 2;
                this.shootProjectiles();
            }
        }
    }
    
    shootProjectiles() {
        // Fire 8 projectiles in all directions
        for (let i = 0; i < 8; i++) {
            const angle = (Math.PI * 2 / 8) * i;
            this.game.particles.push(new BossProjectile(
                this.x, this.y, angle, 200, this.damage, this.game
            ));
        }
    }
    
    takeDamage(amount) {
        this.health -= amount;
        this.game.audioManager.playSound('enemy-hit');
    }
    
    draw(ctx) {
        const size = this.radius * 2.5; // Slightly larger for sprites
        const imageName = `enemy_${this.type}`;
        
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
        this.radius = 8;
        this.magnetRange = 150;
        this.attractSpeed = 300;
    }
    
    update(deltaTime, player) {
        const dx = player.x - this.x;
        const dy = player.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        // Magnetic attraction
        if (dist < this.magnetRange) {
            this.x += (dx / dist) * this.attractSpeed * deltaTime;
            this.y += (dy / dist) * this.attractSpeed * deltaTime;
        }
    }
    
    draw(ctx) {
        // Glow
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius * 2);
        gradient.addColorStop(0, 'rgba(74, 144, 226, 0.8)');
        gradient.addColorStop(1, 'rgba(74, 144, 226, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * 2, 0, Math.PI * 2);
        ctx.fill();
        
        // Core
        ctx.fillStyle = '#4a90e2';
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
        
        // Magnetic attraction
        if (dist < this.magnetRange) {
            this.x += (dx / dist) * this.attractSpeed * deltaTime;
            this.y += (dy / dist) * this.attractSpeed * deltaTime;
        }
    }
    
    draw(ctx) {
        const pulse = Math.sin(this.pulseTime) * 0.3 + 1;
        
        // Glow
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius * 2.5 * pulse);
        gradient.addColorStop(0, 'rgba(46, 204, 113, 0.8)');
        gradient.addColorStop(1, 'rgba(46, 204, 113, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * 2.5 * pulse, 0, Math.PI * 2);
        ctx.fill();
        
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
        
        // Magnetic attraction
        if (dist < this.magnetRange) {
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
        
        // Check collision with player
        const dx = this.game.player.x - this.x;
        const dy = this.game.player.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < this.radius + this.game.player.radius) {
            this.game.player.takeDamage(this.damage);
            this.lifetime = 0;
        }
        
        // Remove if off screen
        if (this.x < -100 || this.x > this.game.canvas.width + 100 ||
            this.y < -100 || this.y > this.game.canvas.height + 100) {
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

// Initialize game when page loads
window.addEventListener('DOMContentLoaded', () => {
    window.game = new Game();
});
