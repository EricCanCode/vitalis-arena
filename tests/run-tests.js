/* Simple Node test runner that validates a couple of GameLogic utilities.
 * This avoids adding external test dependencies so CI can run quickly.
 */
const assert = require('assert');
const path = require('path');

// Load the UMD-compatible gameLogic module
const GameLogic = require(path.join('..', 'modules', 'gameLogic.js'));

console.log('Running basic tests for GameLogic...');

// calculateDamage: base, multiplier
assert.strictEqual(GameLogic.calculateDamage(10, 1.0), 10, 'Base damage with 1.0 multiplier');
assert.strictEqual(GameLogic.calculateDamage(10, 1.5), 15, '1.5x multiplier');
assert.strictEqual(GameLogic.calculateDamage(0, 2.0), 0, 'Zero base results zero');
assert.strictEqual(GameLogic.calculateDamage(5, 0.5), 2, 'Flooring behavior');

console.log('All GameLogic tests passed.');

// Run module unit tests
require('../tests/player.test.js');
require('../tests/enemy.test.js');
require('../tests/projectile.test.js');

console.log('All module tests passed.');
