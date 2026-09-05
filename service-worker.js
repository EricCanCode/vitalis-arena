const CACHE_NAME = 'vitalis-arena-v15';
const urlsToCache = [
  '.',
  'index.html',
  'styles.css',
  'script.js',
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
  // Pre-cache core assets during install
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      }).then(() => self.skipWaiting())
  );
});

// Strategic fetch handler: cache-first for static assets, network-first for navigations
self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // Ignore non-GET
  if (request.method !== 'GET') return;

  // Navigation requests (HTML) -> network-first so we can serve updates
  if (request.mode === 'navigate' || (request.headers.get('accept') || '').includes('text/html')) {
    event.respondWith(
      fetch(request).then((resp) => {
        // Update cache with fresh HTML
        caches.open(CACHE_NAME).then(cache => cache.put(request, resp.clone()));
        return resp;
      }).catch(() => caches.match('index.html'))
    );
    return;
  }

  // For same-origin static assets, use cache-first then network fallback
  if (url.origin === location.origin) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        return fetch(request).then((response) => {
          // Put a copy in cache for future
          caches.open(CACHE_NAME).then(cache => {
            try { cache.put(request, response.clone()); } catch (e) {}
          });
          return response;
        }).catch(() => {
          // Fallbacks for images/icons
          if (request.destination === 'image') return new Response('', { status: 404 });
          return new Response('', { status: 502 });
        });
      })
    );
    return;
  }

  // For cross-origin requests, use network-first
  event.respondWith(fetch(request).catch(() => caches.match(request)));
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
          return Promise.resolve();
        })
      );
    }).then(() => self.clients.claim()).then(() => {
      // Notify clients that a new service worker is active
      return self.clients.matchAll().then(clients => {
        clients.forEach(client => {
          client.postMessage({ type: 'SW_ACTIVATED', version: CACHE_NAME });
        });
      });
    })
  );
});

// Handle messages from client (e.g., skipWaiting)
self.addEventListener('message', (event) => {
  if (!event.data) return;
  if (event.data === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
