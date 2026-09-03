const assert = require('assert');
const path = require('path');
const Player = require(path.join('..','modules','player.js'));

console.log('Running Player tests...');

// Basic instantiation
const mockGame = { imagesLoaded: false, audioManager: { playSound: () => {} } };
const p = new Player(100, 200, 'warrior', mockGame);
assert.strictEqual(p.x, 100);
assert.strictEqual(p.y, 200);
assert.strictEqual(p.type, 'warrior');
assert.ok(p.maxHealth > 0);

// Movement update keeps within bounds
p.x = 50; p.y = 50; p.speed = 100;
p.update(0.016, { w: true }, 800, 600);
assert.ok(p.y < 50, 'Player moved up');

// Damage and invulnerability
p.health = 10; p.armor = 0; p.invulnerable = false; p.iframeDuration = 0.1;
p.takeDamage(5);
assert.ok(p.health < 10, 'Health reduced');
assert.ok(p.invulnerable === true, 'Invulnerable set');

console.log('Player tests passed.');
