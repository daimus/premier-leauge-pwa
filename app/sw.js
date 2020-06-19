import { cacheNames, setCacheNameDetails, clientsClaim } from 'workbox-core'
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate, CacheFirst } from 'workbox-strategies';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';

clientsClaim();

setCacheNameDetails({
  prefix: 'plpwa'
});

precacheAndRoute(self.__WB_MANIFEST);

registerRoute(
  /https:\/\/api\.football-data\.org\/v2/,
  new StaleWhileRevalidate({
    cacheName: `${cacheNames.prefix}-api-resource-${cacheNames.suffix}`,
  }),
);

registerRoute(
  ({ request }) => request.destination === 'image' || request.destination === 'font',
  new CacheFirst({
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  }),
);

self.addEventListener('push', event => {
  let body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'No payload';
  }
  const options = {
    body: body,
    icon: 'icon72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Premier Leauge', options)
  );
});

