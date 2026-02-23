const CACHE_NAME = 'vitalis-arena-v2';
const urlsToCache = [
  '.',
  'index.html',
  'styles.css',
  'script_v2.js',
  'manifest.json',
  'images/warrior.png',
  'images/ranger.png',
  'images/mage.png',
  'images/assassin.png',
  'images/tank.png',
  'images/enemy_basic.png',
  'images/enemy_fast.png',
  'images/enemy_tank.png',
  'images/demon_boss.png',
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
  'sounds/menu-theme.mp3',
  'sounds/game-theme.mp3',
  'sounds/boss-theme.mp3'
];

// Install service worker and cache resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch from cache, fallback to network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

// Update service worker and clear old caches
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
