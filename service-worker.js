const CACHE_NAME = 'vitalis-arena-v34';
const urlsToCache = [
  '.',
  'index.html',
  'styles.css',
  'script_v2.js',
  'manifest.json',
  'icon-192.png',
  'icon-512.png',
  'src/config/GameConfig.js',
  'src/core/Camera.js',
  'src/data/Passives.js',
  'src/data/Evolutions.js',
  'src/data/Waves.js',
  'src/data/Bosses.js',
  'src/data/MetaUpgrades.js',
  'src/entities/Chest.js',
  'src/entities/CoinPickup.js',
  'src/systems/DamageNumbers.js',
  'src/data/Elites.js',
  'src/systems/ArenaEvents.js',
  'src/systems/Effects.js',
  'src/systems/TitleBackground.js',
  'images/title-still.jpg',
  'images/warrior.png',
  'images/ranger.png',
  'images/mage.png',
  'images/assassin.png',
  'images/tank.png',
  'images/enemy_basic.png',
  'images/enemy_fast.png',
  'images/enemy_tank.png',
  'images/demon_grunt.png',
  'images/demon.png',
  'images/demon_boss.png',
  'images/enemy_bomber.png',
  'images/enemy_charger.png',
  'images/enemy_spitter.png',
  'images/enemy_splitter.png',
  'images/enemy_spawnling.png',
  'images/boss_warden.png',
  'images/boss_emberlord.png',
  'images/boss_colossus.png',
  'sounds/shoot.mp3',
  'sounds/enemy-hit.mp3',
  'sounds/enemy-death.mp3',
  'sounds/player-hit.mp3',
  'sounds/level-up.mp3',
  'sounds/boss-warning.mp3',
  'sounds/boss-defeat.mp3',
  'sounds/pickup-xp.mp3',
  'sounds/pickup-health.mp3',
  'sounds/pickup-equipment.mp3',
  'sounds/equip-item.mp3',
  'sounds/ultimate.mp3',
  'sounds/button-click.mp3',
  'sounds/boss-phase.mp3',
  'sounds/player-death.mp3',
  'sounds/bomber-fuse.mp3',
  'sounds/charger-windup.mp3',
  'sounds/event-pack.mp3',
  'sounds/event-surge.mp3',
  'sounds/event-cache.mp3',
  'sounds/chest-open.mp3',
  'sounds/bomb.mp3',
  'sounds/evolution.mp3',
  'sounds/stage-complete.mp3',
  'sounds/boss-slam.mp3',
  'sounds/coin.mp3',

  // The three music loops are deliberately NOT precached. They are 7.3MB
  // between them — more than every other asset combined — and precaching runs
  // cache.addAll() on install, so they would gate first load on a download the
  // player does not need before the menu appears. The cache-first fetch handler
  // below stores them on first play anyway, so they are offline-capable from
  // the second run onward at no cost to the first.
];

// App code (HTML/JS/CSS) is served network-first: always try the network, fall
// back to the cache only when offline. The previous cache-first handler never
// re-checked the network, so a cached script was served forever and code
// changes were invisible until every tab was closed.
//
// Static assets (images, sounds) stay cache-first — they are large and rarely
// change, so there is no reason to pay for a network round trip.
const CODE_EXTENSIONS = ['.html', '.js', '.css', '.json', '.webmanifest'];

function isAppCode(url) {
  if (url.pathname === '/' || url.pathname.endsWith('/')) return true;
  return CODE_EXTENSIONS.some((ext) => url.pathname.endsWith(ext));
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
      // One bad URL must not abort the whole install and leave the app
      // without a worker at all.
      .catch((err) => console.warn('Precache incomplete:', err))
  );
  // Do not wait for existing tabs to close before taking over.
  self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;

  let url;
  try { url = new URL(request.url); } catch (e) { return; }
  if (url.origin !== self.location.origin) return;

  // Video is deliberately never handled here. <video> fetches with Range
  // requests, and answering a 206 from cache.match() (which returns whole
  // responses) stalls or breaks playback. Let it go straight to the network.
  if (url.pathname.endsWith('.mp4') || url.pathname.endsWith('.webm')) return;

  if (isAppCode(url)) {
    // Network-first
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response && response.ok) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(() => caches.match(request).then((cached) => cached || caches.match('index.html')))
    );
    return;
  }

  // Cache-first for everything else
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).then((response) => {
        if (response && response.ok) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        }
        return response;
      });
    })
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => Promise.all(
        cacheNames.map((name) => cacheWhitelist.indexOf(name) === -1 ? caches.delete(name) : null)
      ))
      // Take control of pages that are already open, so the very next reload
      // uses this worker rather than the previous one.
      .then(() => self.clients.claim())
  );
});
