# Sound System Implementation Guide for Vitalis Arena

## Overview
This guide explains how to add sound effects and background music to the game using the Web Audio API.

## Required Audio Files

### Sound Effects (format: .mp3 or .ogg)
1. **shoot.mp3** - Player shooting projectile
2. **enemy-hit.mp3** - Enemy taking damage
3. **enemy-death.mp3** - Enemy dying
4. **player-hit.mp3** - Player taking damage
5. **level-up.mp3** - Player leveling up
6. **boss-warning.mp3** - Boss incoming alert
7. **boss-defeat.mp3** - Boss defeated
8. **pickup-xp.mp3** - Collecting XP orb
9. **pickup-health.mp3** - Collecting health pickup
10. **pickup-equipment.mp3** - Collecting equipment
11. **equip-item.mp3** - Equipping an item
12. **ultimate.mp3** - Using ultimate ability
13. **button-click.mp3** - UI button clicks

### Background Music (format: .mp3 or .ogg)
1. **menu-theme.mp3** - Title screen and character select
2. **game-theme.mp3** - Normal gameplay
3. **boss-theme.mp3** - Boss battle music

## Where to Get Audio Files

### Free Sound Resources
- **Freesound.org** - Community sound library (CC licenses)
- **OpenGameArt.org** - Game-specific audio assets
- **Incompetech.com** - Royalty-free music
- **ZapSplat.com** - Free sound effects (attribution required)
- **SoundBible.com** - Public domain sounds

### AI Sound Generation
- **ElevenLabs** - AI voice and sound effects
- **Soundraw.io** - AI music generation
- **Mubert** - AI-generated background music

## Implementation Steps

### 1. Create Audio Manager Class

Add this to your `script.js` file:

```javascript
class AudioManager {
    constructor() {
        this.sounds = {};
        this.music = {};
        this.soundVolume = 0.5;
        this.musicVolume = 0.3;
        this.soundEnabled = true;
        this.musicEnabled = true;
        this.currentMusic = null;
        
        // Load settings from localStorage
        this.loadSettings();
    }
    
    loadSound(name, path) {
        const audio = new Audio(path);
        audio.volume = this.soundVolume;
        this.sounds[name] = audio;
    }
    
    loadMusic(name, path) {
        const audio = new Audio(path);
        audio.volume = this.musicVolume;
        audio.loop = true;
        this.music[name] = audio;
    }
    
    playSound(name) {
        if (!this.soundEnabled || !this.sounds[name]) return;
        
        // Clone audio for overlapping sounds
        const sound = this.sounds[name].cloneNode();
        sound.volume = this.soundVolume;
        sound.play().catch(err => console.log('Sound play error:', err));
    }
    
    playMusic(name) {
        if (!this.musicEnabled || !this.music[name]) return;
        
        // Stop current music
        if (this.currentMusic) {
            this.currentMusic.pause();
            this.currentMusic.currentTime = 0;
        }
        
        // Play new music
        this.currentMusic = this.music[name];
        this.currentMusic.play().catch(err => console.log('Music play error:', err));
    }
    
    stopMusic() {
        if (this.currentMusic) {
            this.currentMusic.pause();
            this.currentMusic.currentTime = 0;
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
```

### 2. Initialize Audio Manager in Game Class

In your Game constructor, add:

```javascript
constructor() {
    // ... existing code ...
    
    // Audio Manager
    this.audioManager = new AudioManager();
    this.loadAudio();
}

loadAudio() {
    // Load sound effects
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
    
    // Load music
    this.audioManager.loadMusic('menu-theme', 'sounds/menu-theme.mp3');
    this.audioManager.loadMusic('game-theme', 'sounds/game-theme.mp3');
    this.audioManager.loadMusic('boss-theme', 'sounds/boss-theme.mp3');
}
```

### 3. Add Sound Triggers

Add these calls throughout your existing code:

**Player Shooting** (in Player.attack method):
```javascript
game.audioManager.playSound('shoot');
```

**Enemy Taking Damage** (in Enemy.takeDamage method):
```javascript
game.audioManager.playSound('enemy-hit');
```

**Enemy Death** (where enemies are removed):
```javascript
this.audioManager.playSound('enemy-death');
```

**Player Hit** (in collision detection):
```javascript
this.audioManager.playSound('player-hit');
```

**Level Up** (in levelUp method):
```javascript
this.audioManager.playSound('level-up');
```

**Boss Warning** (when boss warning appears):
```javascript
this.audioManager.playSound('boss-warning');
```

**Boss Defeat** (when boss is killed):
```javascript
this.audioManager.playSound('boss-defeat');
```

**XP Pickup** (in XP orb collision):
```javascript
this.audioManager.playSound('pickup-xp');
```

**Health Pickup** (in health pickup collision):
```javascript
this.audioManager.playSound('pickup-health');
```

**Equipment Pickup** (in equipment drop collision):
```javascript
this.audioManager.playSound('pickup-equipment');
```

**Equip Item** (in equipItem method):
```javascript
this.audioManager.playSound('equip-item');
```

**Ultimate Ability** (in useUltimate method):
```javascript
this.audioManager.playSound('ultimate');
```

**Button Clicks** (add to all button event listeners):
```javascript
this.audioManager.playSound('button-click');
```

### 4. Add Music Triggers

**Title Screen**:
```javascript
showTitleScreen() {
    // ... existing code ...
    this.audioManager.playMusic('menu-theme');
}
```

**Start Game**:
```javascript
startGame() {
    // ... existing code ...
    this.audioManager.playMusic('game-theme');
}
```

**Boss Battle**:
```javascript
spawnBoss() {
    // ... existing code ...
    this.audioManager.playMusic('boss-theme');
}
```

**Return to Menu**:
```javascript
backToSelect() {
    // ... existing code ...
    this.audioManager.playMusic('menu-theme');
}
```

### 5. Add Settings UI

Add to your pause menu or settings screen:

```html
<div class="audio-settings">
    <h3>Audio Settings</h3>
    
    <div class="setting-item">
        <label>Sound Effects</label>
        <input type="checkbox" id="soundToggle" checked>
        <input type="range" id="soundVolume" min="0" max="100" value="50">
    </div>
    
    <div class="setting-item">
        <label>Music</label>
        <input type="checkbox" id="musicToggle" checked>
        <input type="range" id="musicVolume" min="0" max="100" value="30">
    </div>
</div>
```

Wire up the controls in JavaScript:
```javascript
setupAudioControls() {
    document.getElementById('soundToggle').addEventListener('change', (e) => {
        this.audioManager.toggleSound();
    });
    
    document.getElementById('soundVolume').addEventListener('input', (e) => {
        this.audioManager.setSoundVolume(e.target.value / 100);
    });
    
    document.getElementById('musicToggle').addEventListener('change', (e) => {
        this.audioManager.toggleMusic();
    });
    
    document.getElementById('musicVolume').addEventListener('input', (e) => {
        this.audioManager.setMusicVolume(e.target.value / 100);
    });
}
```

## File Structure

Create this folder structure:
```
Vitalis_Arena/
├── index.html
├── script.js
├── styles.css
├── sounds/
│   ├── shoot.mp3
│   ├── enemy-hit.mp3
│   ├── enemy-death.mp3
│   ├── player-hit.mp3
│   ├── level-up.mp3
│   ├── boss-warning.mp3
│   ├── boss-defeat.mp3
│   ├── pickup-xp.mp3
│   ├── pickup-health.mp3
│   ├── pickup-equipment.mp3
│   ├── equip-item.mp3
│   ├── ultimate.mp3
│   ├── button-click.mp3
│   ├── menu-theme.mp3
│   ├── game-theme.mp3
│   └── boss-theme.mp3
```

## Browser Autoplay Policy

Modern browsers block autoplay. Handle this with a user interaction:

```javascript
// Add to title screen click handler
document.getElementById('titleScreen').addEventListener('click', () => {
    // Enable audio context on first user interaction
    if (this.audioManager.currentMusic) {
        this.audioManager.currentMusic.play().catch(() => {
            console.log('Audio needs user interaction');
        });
    }
});
```

## Testing

1. Add audio files to `/sounds/` folder
2. Test each sound trigger individually
3. Check volume controls work correctly
4. Test on mobile devices (autoplay restrictions may differ)
5. Verify localStorage persists settings

## Performance Tips

1. **Preload audio**: Load all audio files during game initialization
2. **Limit overlapping sounds**: Use `cloneNode()` for sounds that can overlap
3. **Compress audio**: Use compressed formats (MP3 at 128kbps is sufficient)
4. **Small file sizes**: Keep sound effects under 100KB, music under 3MB
5. **Mobile considerations**: iOS Safari has strict audio limitations

## Quick Start (Minimal Implementation)

If you just want basic sounds quickly:

1. Download 3-4 key sound effects (shoot, hit, level-up)
2. Add AudioManager class to script.js
3. Add only those sounds with loadSound()
4. Add playSound() calls in 3-4 key locations
5. Test and expand from there

## Troubleshooting

**Sounds not playing?**
- Check browser console for errors
- Verify file paths are correct
- Ensure user has interacted with page (autoplay policy)
- Check audio files are properly formatted

**Music cuts out?**
- Set `audio.loop = true` for background music
- Check for multiple music tracks playing simultaneously
- Verify music file isn't corrupted

**Volume too loud/quiet?**
- Adjust default volumes in AudioManager constructor
- Use audio editing software to normalize sound levels
- Test on multiple devices (headphones vs speakers)

## Next Steps

Once sounds are working:
1. Add spatial audio (3D positioning based on enemy/player location)
2. Add audio filters (reverb for abilities, distortion for boss phase)
3. Implement dynamic music (intensity changes based on enemy count)
4. Add voice lines for characters
5. Create sound effect variations to prevent repetition

---

**Remember**: Always respect audio licensing and attribution requirements!
