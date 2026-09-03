const assert = require('assert');
const path = require('path');
const Projectile = require(path.join('..','modules','projectile.js'));

console.log('Running Projectile tests...');
const proj = new Projectile(0,0,0,100,10,'#fff',false,'warrior');
proj.update(0.1);
assert.ok(proj.x > 0);
proj.hit();
if (!proj.piercing) assert.ok(!proj.active || proj.hitCount > 0);

console.log('Projectile tests passed.');
