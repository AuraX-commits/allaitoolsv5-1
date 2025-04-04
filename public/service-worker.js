
// Service Worker for AllAITools.tech
const CACHE_NAME = 'allaitools-cache-v2';
const STATIC_CACHE = 'allaitools-static-v2';
const DYNAMIC_CACHE = 'allaitools-dynamic-v2';

// Assets to cache on install (critical resources)
const CRITICAL_ASSETS = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/favicon.ico',
  '/favicon.svg'
];

// Additional assets to cache in background after installation
const SECONDARY_ASSETS = [
  '/og-image.png'
];

// Install event - cache critical assets immediately
self.addEventListener('install', (event) => {
  // Skip waiting to ensure the new service worker activates immediately
  self.skipWaiting();
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Caching critical assets');
        return cache.addAll(CRITICAL_ASSETS);
      })
      .then(() => {
        // Cache secondary assets in the background
        caches.open(STATIC_CACHE)
          .then((cache) => cache.addAll(SECONDARY_ASSETS));
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [STATIC_CACHE, DYNAMIC_CACHE];

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Deleting outdated cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      // Claim clients to control all open tabs
      return self.clients.claim();
    })
  );
});

// Helper function to determine if request is an API call
const isApiRequest = (url) => {
  return url.includes('/api/') || url.includes('supabase');
};

// Helper function to determine if request is for a static asset
const isStaticAsset = (url) => {
  return (
    url.endsWith('.js') ||
    url.endsWith('.css') ||
    url.endsWith('.svg') ||
    url.endsWith('.png') ||
    url.endsWith('.jpg') ||
    url.endsWith('.jpeg') ||
    url.endsWith('.gif') ||
    url.endsWith('.ico') ||
    url.endsWith('.woff') ||
    url.endsWith('.woff2') ||
    url.endsWith('.ttf')
  );
};

// Fetch event - using appropriate strategies based on request type
self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);
  
  // Don't cache browser-sync, POST requests, or API requests
  if (url.pathname.includes('browser-sync') || request.method !== 'GET' || isApiRequest(request.url)) {
    return;
  }

  // For page navigations - use network first with cache fallback
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(response => {
          // Clone the response and store it in cache
          const responseToCache = response.clone();
          caches.open(DYNAMIC_CACHE)
            .then(cache => cache.put(request, responseToCache));
          return response;
        })
        .catch(() => {
          // If network fails, try to serve from cache
          return caches.match(request)
            .then(cachedResponse => {
              return cachedResponse || caches.match('/');
            });
        })
    );
    return;
  }

  // For static assets - use cache first with network fallback
  if (isStaticAsset(url.pathname)) {
    event.respondWith(
      caches.match(request)
        .then(cachedResponse => {
          // Return cached response if available
          if (cachedResponse) {
            // Fetch in background to update cache for next time
            fetch(request)
              .then(networkResponse => {
                caches.open(STATIC_CACHE)
                  .then(cache => cache.put(request, networkResponse));
              })
              .catch(error => console.log('Background fetch failed:', error));
            
            return cachedResponse;
          }

          // If not in cache, fetch from network and cache the response
          return fetch(request)
            .then(networkResponse => {
              // Clone the response to cache it
              const responseToCache = networkResponse.clone();
              caches.open(STATIC_CACHE)
                .then(cache => cache.put(request, responseToCache));
              
              return networkResponse;
            });
        })
    );
    return;
  }

  // Default strategy - stale-while-revalidate
  event.respondWith(
    caches.open(DYNAMIC_CACHE).then(cache => {
      return cache.match(request).then(cachedResponse => {
        const fetchedResponse = fetch(request).then(networkResponse => {
          cache.put(request, networkResponse.clone());
          return networkResponse;
        });

        return cachedResponse || fetchedResponse;
      });
    })
  );
});

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-saved-tools') {
    event.waitUntil(syncSavedTools());
  }
});

// Function to handle background syncing of saved tools
const syncSavedTools = async () => {
  // Implementation would go here
  console.log('Background sync for saved tools triggered');
};

