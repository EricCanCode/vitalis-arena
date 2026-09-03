# Vitalis Arena — Local Development

Quick notes for running the lightweight checks and build included in this repository.

Prerequisites
- Node.js (v16+ recommended)

Useful commands
- Run unit-style smoke tests:
  ```bash
  npm test
  ```
- Build a lightweight `dist/` copy (no bundling/minification yet):
  ```bash
  npm run build
  ```
- Run the ID checker to find DOM id mismatches:
  ```bash
  node scripts/check-ids.js
  ```

Notes
- The project is primarily a browser app. `tests/run-tests.js` contains small Node-level checks for deterministic functions in `modules/gameLogic.js`.
- `modules/*.js` files expose UMD-style globals for gradual modularization while keeping in-browser compatibility.

Next steps
- Expand tests (Jest) for gameplay logic, add a bundler (esbuild/rollup), and add real E2E checks on multiple browsers.
# Vitalis Arena - Roguelike Survival Game

A fast-paced roguelike survival game with 5 unique characters, equipment progression, and epic boss battles. Built with HTML5 Canvas and vanilla JavaScript.

## 🎮 Features

- **5 Unique Characters**: Warrior, Ranger, Mage, Assassin, and Tank, each with unique abilities
- **Equipment System**: 48 items across 5 rarity tiers with 5-star leveling system
- **Stage Progression**: Battle through stages ending with challenging boss fights
- **Achievement System**: Track your accomplishments and unlock rewards
- **Mobile Support**: Touch controls with virtual joystick for mobile devices
- **PWA Support**: Install as an app and play offline

## 🕹️ How to Play

**Desktop:**
- WASD/Arrow Keys - Move
- Mouse - Aim and shoot
- Q - Ultimate ability (when charged)

**Mobile:**
- Virtual Joystick - Move
- Fire Button - Shoot
- Tap Ultimate button when ready

## 🚀 Play Online

[Play Vitalis Arena](https://ericcancode.github.io/vitalis-arena)

## 💻 Local Development

1. Clone the repository:
```bash
git clone https://github.com/EricCanCode/vitalis-arena.git
cd vitalis-arena
```

2. Open with a local server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server -p 8000
```

3. Open `http://localhost:8000` in your browser

## 📱 Mobile/PWA Setup

The game includes full PWA support for mobile devices:
- Add to home screen for standalone app experience
- Works offline after first load
- Touch controls automatically enabled on mobile

## 🛠️ Technologies

- HTML5 Canvas for rendering
- Vanilla JavaScript (ES6+)
- CSS3 for UI styling
- Service Workers for offline support
- LocalStorage for save persistence

## 📦 Game Features

- **5 Character Classes** with unique abilities
- **Equipment System** with 48+ items
- **5 Rarity Tiers**: Common, Rare, Epic, Legendary, Mythic
- **Equipment Leveling**: Upgrade items up to 5 stars
- **Boss Battles**: Epic fights every 90 seconds
- **Shop System**: Purchase equipment with earned coins
- **Achievement System**: Track your progress

## 🎯 Credits

Game developed as a roguelike survival experience inspired by Vampire Survivors and similar games.

## 📄 License

MIT License - feel free to use and modify for your own projects!
