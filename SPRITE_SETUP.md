# 🎨 Adding Sprites to Your Game

The game now supports custom sprite images! It will automatically use sprites if available, or fall back to the circle graphics if not.

## 📂 Folder Structure

Add your sprite images to the `images/` folder with these exact names:

```
images/
  ├── warrior.png      (Character: Warrior)
  ├── ranger.png       (Character: Ranger)
  ├── mage.png         (Character: Mage)
  ├── assassin.png     (Character: Assassin)
  ├── tank.png         (Character: Tank)
  ├── enemy_basic.png  (Basic enemy)
  ├── enemy_fast.png   (Fast enemy)
  └── enemy_tank.png   (Tank enemy)
```

## 🎯 Sprite Specifications

- **Format**: PNG with transparency (recommended)
- **Size**: 32x32 to 64x64 pixels work best
- **Naming**: Use exact names shown above (case-sensitive)
- **Style**: Pixel art, hand-drawn, or AI-generated all work!

## 🤖 Getting Sprites with AI

You can use AI tools to generate your sprites:

### Option 1: DALL-E, Midjourney, or Stable Diffusion
Example prompts:
- "pixel art warrior character sprite, top-down view, 64x64, transparent background"
- "cute 2d game enemy monster, red colored, simple design, 32x32 pixels"

### Option 2: Free Online Sprite Generators
- **Piskel** (piskelapp.com) - Free pixel art editor
- **OpenGameArt** - Free game assets
- **itch.io** - Many free sprite packs

### Option 3: AI Image Generation
Use ChatGPT, Microsoft Designer, or similar tools with prompts like:
```
Create a simple game character sprite for a warrior:
- Top-down or 3/4 view
- 64x64 pixels
- Transparent background
- Red and silver colors
- Holding a sword
```

## ✅ Testing

1. Add at least one sprite file to the `images/` folder
2. Refresh your browser (Ctrl+F5 or Cmd+Shift+R)
3. Check the browser console for "All sprites loaded successfully!"
4. If a sprite fails to load, you'll see a warning but the game will use circles

## 🎮 Current Status

The game is fully functional with or without sprites! Play now and add sprites later if you want.
