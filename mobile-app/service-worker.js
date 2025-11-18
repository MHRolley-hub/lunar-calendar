const CACHE_NAME = 'lunar-calendar-v1';
const urlsToCache = [
  './index.html',
  './settings.html',
  './manifest.json',
  './app.js'
];

// Install service worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Fetch from cache
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

// Handle notification click
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('./')
  );
});

// Handle push notifications
self.addEventListener('push', event => {
  const data = event.data ? event.data.json() : {};
  const options = {
    body: data.body || 'Check today\'s lunar calendar events',
    icon: 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'%3E%3Ccircle cx=\'50\' cy=\'50\' r=\'45\' fill=\'%23ffd700\'/%3E%3Ctext x=\'50\' y=\'65\' font-size=\'50\' text-anchor=\'middle\' fill=\'%231a1a3e\'%3E🌙%3C/text%3E%3C/svg%3E',
    badge: 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'%3E%3Ccircle cx=\'50\' cy=\'50\' r=\'45\' fill=\'%23ffd700\'/%3E%3C/svg%3E',
    vibrate: [200, 100, 200],
    tag: 'lunar-calendar-notification',
    requireInteraction: false
  };

  event.waitUntil(
    self.registration.showNotification(data.title || 'Vietnamese Lunar Calendar', options)
  );
});
