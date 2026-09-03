// Start Menu Handler for Vitalis Arena
document.addEventListener('DOMContentLoaded', () => {
    const titleScreen = document.getElementById('titleScreen');
    const characterSelect = document.getElementById('characterSelect');
    const gameScreen = document.getElementById('gameScreen');
    const startGameBtn = document.getElementById('startGameBtn');
    const howToPlayBtn = document.getElementById('howToPlayBtn');
    const settingsBtn = document.getElementById('settingsBtn');
    const creditsBtn = document.getElementById('creditsBtn');
    
    // Modal panels
    const howToPlayPanel = document.getElementById('howToPlayPanel');
    const settingsPanel = document.getElementById('settingsPanel');
    const creditsPanel = document.getElementById('creditsPanel');
    
    // Close buttons
    const closeHowToPlay = document.getElementById('closeHowToPlay');
    const closeHowToPlayBtn = document.getElementById('closeHowToPlayBtn');
    const closeSettings = document.getElementById('closeSettings');
    const closeSettingsBtn = document.getElementById('closeSettingsBtn');
    const closeCredits = document.getElementById('closeCredits');
    const closeCreditsBtn = document.getElementById('closeCreditsBtn');
    
    // Settings controls
    const soundCheckbox = document.getElementById('soundCheckbox');
    const musicCheckbox = document.getElementById('musicCheckbox');
    const effectsCheckbox = document.getElementById('effectsCheckbox');
    const tutorialCheckbox = document.getElementById('tutorialCheckbox');
    const difficultyRadios = document.querySelectorAll('input[name="difficulty"]');
    const soundVolume = document.getElementById('soundVolume');
    const musicVolume = document.getElementById('musicVolume');
    const soundVolumeLabel = document.getElementById('soundVolumeLabel');
    const musicVolumeLabel = document.getElementById('musicVolumeLabel');
    const soundToggleBtn = document.getElementById('soundToggleBtn');
    const soundToggleIcon = document.getElementById('soundToggleIcon');
    const soundToggleLabel = document.getElementById('soundToggleLabel');
    
    // Ensure correct initial screen visibility
    function resetScreens() {
        if (titleScreen) titleScreen.classList.add('active');
        if (characterSelect) characterSelect.classList.remove('active');
        if (gameScreen) gameScreen.classList.remove('active');
        const reducedMotionCheckbox = document.getElementById('reducedMotionCheckbox');
        const highContrastCheckbox = document.getElementById('highContrastCheckbox');
    }
    
    // Call immediately and after a delay to override any other scripts
    resetScreens();
    setTimeout(resetScreens, 100);
    
    // Load saved settings
    function loadSettings() {
        const settings = JSON.parse(localStorage.getItem('gameSettings')) || {};
        const audioSettings = JSON.parse(localStorage.getItem('audioSettings')) || {};
        
        soundCheckbox.checked = settings.sound !== false;
        musicCheckbox.checked = settings.music !== false;
        effectsCheckbox.checked = settings.effects !== false;
        tutorialCheckbox.checked = settings.tutorial !== false;
        
        const difficulty = settings.difficulty || 'normal';
        const diffRadio = document.querySelector(`input[name="difficulty"][value="${difficulty}"]`);
        if (diffRadio) diffRadio.checked = true;

        // Audio settings fallback
        const sVol = Math.round((audioSettings.soundVolume ?? 0.5) * 100);
        const mVol = Math.round((audioSettings.musicVolume ?? 0.3) * 100);
        soundVolume.value = sVol;
        musicVolume.value = mVol;
        soundVolumeLabel.textContent = `${sVol}%`;
        musicVolumeLabel.textContent = `${mVol}%`;

        const sEnabled = audioSettings.soundEnabled !== false;
        const mEnabled = audioSettings.musicEnabled !== false;
        soundCheckbox.checked = sEnabled;
        musicCheckbox.checked = mEnabled;

        
            // Reduced motion / high contrast
            reducedMotionCheckbox.checked = settings.reducedMotion === true;
            highContrastCheckbox.checked = settings.highContrast === true;
            if (reducedMotionCheckbox.checked) document.documentElement.classList.add('reduced-motion'); else document.documentElement.classList.remove('reduced-motion');
            if (highContrastCheckbox.checked) document.documentElement.classList.add('high-contrast'); else document.documentElement.classList.remove('high-contrast');
        // Reflect top-right toggle button state
        if (soundToggleIcon && soundToggleLabel) {
            soundToggleIcon.textContent = sEnabled ? '🔊' : '🔇';
            soundToggleLabel.textContent = sEnabled ? 'Sound On' : 'Sound Off';
        }
    }
    
    // Save settings
    function saveSettings() {
        const prev = JSON.parse(localStorage.getItem('gameSettings') || '{}');
        const reducedMotion = !!document.getElementById('reducedMotionCheckbox')?.checked;
        const highContrast = !!document.getElementById('highContrastCheckbox')?.checked;
        const settings = Object.assign({}, prev, {
            sound: !!soundCheckbox.checked,
            effects: !!effectsCheckbox.checked,
            tutorial: !!tutorialCheckbox.checked,
            reducedMotion: reducedMotion,
            highContrast: highContrast,
            difficulty: document.querySelector('input[name="difficulty"]:checked')?.value || 'normal'
        });
        localStorage.setItem('gameSettings', JSON.stringify(settings));

        // Persist audio-specific settings (used by AudioManager)
        const audioSettings = {
            soundEnabled: !!soundCheckbox.checked,
            musicEnabled: !!musicCheckbox.checked,
            soundVolume: (soundVolume && Number(soundVolume.value) / 100) || 0.5,
            musicVolume: (musicVolume && Number(musicVolume.value) / 100) || 0.3
        };
        localStorage.setItem('audioSettings', JSON.stringify(audioSettings));

        // Apply to live AudioManager if available
        if (window.game && window.game.audioManager) {
            try {
                const am = window.game.audioManager;
                am.soundEnabled = !!audioSettings.soundEnabled;
                am.musicEnabled = !!audioSettings.musicEnabled;
                if (typeof am.setSoundVolume === 'function') am.setSoundVolume(audioSettings.soundVolume);
                if (typeof am.setMusicVolume === 'function') am.setMusicVolume(audioSettings.musicVolume);
                // Update gain nodes immediately if context already created
                if (am.soundGainNode) am.soundGainNode.gain.value = am.soundEnabled ? am.soundVolume : 0;
                if (am.musicGainNode) am.musicGainNode.gain.value = am.musicEnabled ? am.musicVolume : 0;
                // If music was disabled, stop music playback
                if (!am.musicEnabled && typeof am.stopMusic === 'function') am.stopMusic();
            } catch (e) { console.warn('Audio sync failed:', e); }
        }
    }
    
    // Menu navigation
    function goToCharacterSelect() {
        titleScreen.classList.remove('active');
        characterSelect.classList.add('active');
    }
    
    function goToTitleScreen() {
        characterSelect.classList.remove('active');
        gameScreen.classList.remove('active');
        titleScreen.classList.add('active');
        closeAllModals();
    }
    
    function startGameWithCharacter(characterName) {
        characterSelect.classList.remove('active');
        gameScreen.classList.add('active');
        
        // Signal to game script that a character was selected
        window.selectedCharacter = characterName;
        
        // If game is already initialized, restart it with new character
        if (window.game) {
            window.game.selectCharacter(characterName);
            window.game.startGame();
        }
    }
    
    function closeAllModals() {
        [howToPlayPanel, settingsPanel, creditsPanel].forEach(panel => {
            if (panel) panel.classList.remove('active');
        });
    }
    
    // Start game button
    startGameBtn.addEventListener('click', goToCharacterSelect);
    
    // Character selection cards
    const characterCards = document.querySelectorAll('.character-card');
    characterCards.forEach(card => {
        card.addEventListener('click', () => {
            const character = card.getAttribute('data-character');
            startGameWithCharacter(character);
        });
    });
    
    // How to Play
    howToPlayBtn.addEventListener('click', () => {
        // Save last focused element and focus first control in modal for accessibility
        window._lastFocused = document.activeElement;
        howToPlayPanel.classList.add('active');
        setTimeout(() => { howToPlayPanel.querySelector('button, a, input, [tabindex]')?.focus(); }, 50);
    });
    
    closeHowToPlay.addEventListener('click', () => {
        howToPlayPanel.classList.remove('active');
        window._lastFocused?.focus?.();
    });
    
    closeHowToPlayBtn.addEventListener('click', () => {
        howToPlayPanel.classList.remove('active');
        window._lastFocused?.focus?.();
    });
    
    howToPlayPanel.addEventListener('click', (e) => {
        if (e.target === howToPlayPanel) {
            howToPlayPanel.classList.remove('active');
        }
    });
    
    // Settings
    settingsBtn.addEventListener('click', () => {
        window._lastFocused = document.activeElement;
        loadSettings();
        settingsPanel.classList.add('active');
        setTimeout(() => { settingsPanel.querySelector('button, input, [tabindex]')?.focus(); }, 50);
    });
    
    closeSettings.addEventListener('click', () => {
        settingsPanel.classList.remove('active');
        window._lastFocused?.focus?.();
    });
    
    closeSettingsBtn.addEventListener('click', () => {
        saveSettings();
        settingsPanel.classList.remove('active');
        window._lastFocused?.focus?.();
    });
    
    settingsPanel.addEventListener('click', (e) => {
        if (e.target === settingsPanel) {
            saveSettings();
            settingsPanel.classList.remove('active');
        }
    });
    
    // Settings change handlers
    [soundCheckbox, musicCheckbox, effectsCheckbox, tutorialCheckbox, ...difficultyRadios].forEach(element => {
        element.addEventListener('change', saveSettings);
    });

    // Keybinds UI (inject keybind panel and wire handlers)
    const keybindHtmlPath = 'keybinds-panel.html';
    fetch(keybindHtmlPath).then(r => r.text()).then(html => {
        const container = document.createElement('div');
        container.innerHTML = html;
        document.body.appendChild(container);

        const keybindPanel = document.getElementById('keybindPanel');
        const openKeybindsBtn = document.getElementById('openKeybindsBtn');
        const closeKeybinds = document.getElementById('closeKeybinds');
        const closeKeybindsBtn = document.getElementById('closeKeybindsBtn');
        const resetKeybinds = document.getElementById('resetKeybinds');

        const defaultBindings = { moveUp: 'w', moveLeft: 'a', moveDown: 's', moveRight: 'd', ultimate: 'q' };
        let bindings = JSON.parse(localStorage.getItem('keyBindings')) || defaultBindings;
        // Keep game in sync if already running
        const applyBindingsToGame = () => {
            try {
                if (window.game && window.game.keyBindings) {
                    window.game.keyBindings = Object.assign({}, bindings);
                    window.game._buildReverseKeyMap();
                }
            } catch (e) {}
        };

        const refreshDisplays = () => {
            keybindPanel.querySelectorAll('.keybind-row').forEach(row => {
                const action = row.dataset.action;
                row.querySelector('.key-display').textContent = (bindings[action] || defaultBindings[action] || '').toUpperCase();
            });
        };

        let waitingForKey = null;
        const onKeyDownWhileBinding = (e) => {
            if (!waitingForKey) return;
            e.preventDefault();
            const k = e.key.toLowerCase();
            bindings[waitingForKey] = k;
            localStorage.setItem('keyBindings', JSON.stringify(bindings));
            applyBindingsToGame();
            waitingForKey = null;
            document.removeEventListener('keydown', onKeyDownWhileBinding);
            refreshDisplays();
        };

        refreshDisplays();

        openKeybindsBtn?.addEventListener('click', () => {
            window._lastFocused = document.activeElement;
            keybindPanel.style.display = 'flex';
            setTimeout(() => { keybindPanel.querySelector('.keybind-btn')?.focus(); }, 50);
        });

        closeKeybinds?.addEventListener('click', () => {
            keybindPanel.style.display = 'none';
            window._lastFocused?.focus?.();
        });
        closeKeybindsBtn?.addEventListener('click', () => {
            keybindPanel.style.display = 'none';
            window._lastFocused?.focus?.();
        });

        resetKeybinds?.addEventListener('click', () => {
            bindings = Object.assign({}, defaultBindings);
            localStorage.setItem('keyBindings', JSON.stringify(bindings));
            applyBindingsToGame();
            refreshDisplays();
        });

        keybindPanel.querySelectorAll('.keybind-row').forEach(row => {
            const btn = row.querySelector('.keybind-btn');
            const action = row.dataset.action;
            btn.addEventListener('click', () => {
                // Indicate waiting
                waitingForKey = action;
                btn.querySelector('.key-display').textContent = '...';
                document.addEventListener('keydown', onKeyDownWhileBinding);
            });
        });
    }).catch(() => { /* ignore if file not found */ });

    // Volume sliders
    if (soundVolume) {
        soundVolume.addEventListener('input', () => {
            soundVolumeLabel.textContent = `${soundVolume.value}%`;
        });
        soundVolume.addEventListener('change', () => {
            saveSettings();
        });
    }

    if (musicVolume) {
        musicVolume.addEventListener('input', () => {
            musicVolumeLabel.textContent = `${musicVolume.value}%`;
        });
        musicVolume.addEventListener('change', () => {
            saveSettings();
        });
    }

    // Top-right quick sound toggle
    if (soundToggleBtn) {
        soundToggleBtn.addEventListener('click', () => {
            // Toggle soundEnabled and persist
            const audioSettings = JSON.parse(localStorage.getItem('audioSettings')) || {};
            const newState = !(audioSettings.soundEnabled !== false);
            audioSettings.soundEnabled = newState;
            localStorage.setItem('audioSettings', JSON.stringify(audioSettings));

            if (soundToggleIcon && soundToggleLabel) {
                soundToggleIcon.textContent = newState ? '🔊' : '🔇';
                soundToggleLabel.textContent = newState ? 'Sound On' : 'Sound Off';
            }

            // Update checkbox and live AudioManager
            if (soundCheckbox) soundCheckbox.checked = newState;
            if (window.game && window.game.audioManager) {
                const am = window.game.audioManager;
                am.soundEnabled = !!newState;
                if (am.soundGainNode) am.soundGainNode.gain.value = am.soundEnabled ? am.soundVolume : 0;
            }
        });
    }
    
    // Credits
    creditsBtn.addEventListener('click', () => {
        window._lastFocused = document.activeElement;
        creditsPanel.classList.add('active');
        setTimeout(() => { creditsPanel.querySelector('button, a, input, [tabindex]')?.focus(); }, 50);
    });
    
    closeCredits.addEventListener('click', () => {
        creditsPanel.classList.remove('active');
        window._lastFocused?.focus?.();
    });
    
    closeCreditsBtn.addEventListener('click', () => {
        creditsPanel.classList.remove('active');
        window._lastFocused?.focus?.();
    });
    
    creditsPanel.addEventListener('click', (e) => {
        if (e.target === creditsPanel) {
            creditsPanel.classList.remove('active');
        }
    });
    
    // Back to menu from character select or game
    document.addEventListener('characterSelectBackBtn', () => {
        goToTitleScreen();
    });
    
    // Close modals with ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });
    
    // Any key to start (only on title screen)
    document.addEventListener('keydown', (e) => {
        if (titleScreen.classList.contains('active') && !howToPlayPanel.classList.contains('active') 
            && !settingsPanel.classList.contains('active') && !creditsPanel.classList.contains('active')) {
            if (e.key !== 'Escape') {
                goToCharacterSelect();
            }
        }
    });
    
    // Click title screen to start
    titleScreen.addEventListener('click', (e) => {
        if (!howToPlayPanel.classList.contains('active') 
            && !settingsPanel.classList.contains('active') 
            && !creditsPanel.classList.contains('active')) {
            goToCharacterSelect();
        }
    });
    
    // Load initial settings
    loadSettings();

    // Apply safe-area CSS vars and responsive HUD adjustments
    if (window.UI && typeof window.UI.applySafeAreaVars === 'function') {
        try { window.UI.applySafeAreaVars(); } catch (e) { /* ignore */ }
    }

    function onViewportResize() {
        const w = window.innerWidth;
        const h = window.innerHeight;
        if (window.Renderer && typeof window.Renderer.adjustHUDLayout === 'function') {
            try { window.Renderer.adjustHUDLayout(w, h); } catch (e) { /* ignore */ }
        }
        // Ensure game canvas uses DPR scaling if present
        const gameCanvas = document.querySelector('canvas#gameCanvas') || document.querySelector('canvas');
        if (gameCanvas && window.Renderer && typeof window.Renderer.setupCanvasDPR === 'function') {
            try { window.Renderer.setupCanvasDPR(gameCanvas); } catch (e) { /* ignore */ }
        }
    }

    window.addEventListener('resize', onViewportResize);
    // Run once to initialize
    onViewportResize();
});

