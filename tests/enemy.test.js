const assert = require('assert');
const path = require('path');
const Enemy = require(path.join('..','modules','enemy.js'));

console.log('Running Enemy tests...');
const mockGame = { player: { level: 1 }, performanceMode: false, particles: [] };
const e = new Enemy(0,0,'basic',1,mockGame);
assert.strictEqual(e.type,'basic');
assert.ok(e.maxHealth > 0);

// update moves towards player
const player = { x: 100, y: 0 };
const prevX = e.x;
e.update(0.016, player);
assert.notStrictEqual(e.x, prevX);

console.log('Enemy tests passed.');
