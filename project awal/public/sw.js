// Service Worker untuk optimasi cache browser
const CACHE_VERSION = '1.1.0';
const CACHE_NAME = `cpmi-absensi-v${CACHE_VERSION}`;
const STATIC_CACHE = `cpmi-static-v${CACHE_VERSION}`;
const DYNAMIC_CACHE = `cpmi-dynamic-v${CACHE_VERSION}`;
const IMAGE_CACHE = `cpmi-images-v${CACHE_VERSION}`;

// Aset yang akan di-cache secara statis
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/favicon.ico',
  // Font Google
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
];

// Maksimal ukuran cache (dalam bytes)
const MAX_CACHE_SIZE = 50 * 1024 * 1024; // 50MB
const MAX_CACHE_AGE = 7 * 24 * 60 * 60 * 1000; // 7 hari

// Install event - cache aset statis
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker...');
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE).then((cache) => {
        console.log('[SW] Caching static assets');
        return cache.addAll(STATIC_ASSETS.map(url => {
          return new Request(url, { cache: 'reload' });
        }));
      }),
      // Pre-cache halaman utama
      caches.open(DYNAMIC_CACHE).then((cache) => {
        return cache.add(new Request('/', { cache: 'reload' }));
      })
    ]).catch((error) => {
      console.error('[SW] Failed to cache assets:', error);
    })
  );
  self.skipWaiting();
});

// Activate event - cleanup old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker...');
  event.waitUntil(
    Promise.all([
      // Hapus cache lama
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && 
                cacheName !== DYNAMIC_CACHE && 
                cacheName !== IMAGE_CACHE) {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      // Bersihkan cache yang sudah expired
      cleanExpiredCache(),
      // Batasi ukuran cache
      limitCacheSize(DYNAMIC_CACHE, 100),
      limitCacheSize(IMAGE_CACHE, 50)
    ])
  );
  self.clients.claim();
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip chrome-extension and other non-http requests
  if (!request.url.startsWith('http')) {
    return;
  }

  event.respondWith(
    handleRequest(request, url)
  );
});

async function handleRequest(request, url) {
  try {
    // Strategy 1: Cache First untuk aset statis
    if (isStaticAsset(url)) {
      return await cacheFirst(request, STATIC_CACHE);
    }

    // Strategy 2: Cache First untuk gambar
    if (isImageRequest(url)) {
      return await cacheFirst(request, IMAGE_CACHE);
    }

    // Strategy 3: Network First untuk API dan data dinamis
    if (isApiRequest(url) || isDynamicContent(url)) {
      return await networkFirst(request, DYNAMIC_CACHE);
    }

    // Strategy 4: Stale While Revalidate untuk halaman HTML
    if (isHTMLRequest(request)) {
      return await staleWhileRevalidate(request, DYNAMIC_CACHE);
    }

    // Default: Network First
    return await networkFirst(request, DYNAMIC_CACHE);

  } catch (error) {
    console.error('[SW] Request failed:', error);
    return await handleOffline(request);
  }
}

// Fungsi untuk membersihkan cache expired
async function cleanExpiredCache() {
  const cacheNames = await caches.keys();
  const now = Date.now();
  
  for (const cacheName of cacheNames) {
    const cache = await caches.open(cacheName);
    const requests = await cache.keys();
    
    for (const request of requests) {
      const response = await cache.match(request);
      if (response) {
        const cachedTime = response.headers.get('sw-cached-time');
        if (cachedTime && (now - parseInt(cachedTime)) > MAX_CACHE_AGE) {
          await cache.delete(request);
          console.log('[SW] Deleted expired cache:', request.url);
        }
      }
    }
  }
}

// Fungsi untuk membatasi ukuran cache
async function limitCacheSize(cacheName, maxItems) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  
  if (keys.length > maxItems) {
    // Hapus item tertua
    const itemsToDelete = keys.slice(0, keys.length - maxItems);
    await Promise.all(itemsToDelete.map(key => cache.delete(key)));
    console.log(`[SW] Cleaned ${itemsToDelete.length} items from ${cacheName}`);
  }
}

// Cache First Strategy
async function cacheFirst(request, cacheName) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      // Tambahkan timestamp untuk tracking cache age
      const responseToCache = networkResponse.clone();
      const headers = new Headers(responseToCache.headers);
      headers.set('sw-cached-time', Date.now().toString());
      
      const modifiedResponse = new Response(responseToCache.body, {
        status: responseToCache.status,
        statusText: responseToCache.statusText,
        headers: headers
      });
      
      cache.put(request, modifiedResponse);
    }
    return networkResponse;
  } catch (error) {
    console.error('[SW] Cache first failed:', error);
    throw error;
  }
}

// Network First Strategy
async function networkFirst(request, cacheName) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      // Tambahkan timestamp untuk tracking cache age
      const responseToCache = networkResponse.clone();
      const headers = new Headers(responseToCache.headers);
      headers.set('sw-cached-time', Date.now().toString());
      
      const modifiedResponse = new Response(responseToCache.body, {
        status: responseToCache.status,
        statusText: responseToCache.statusText,
        headers: headers
      });
      
      cache.put(request, modifiedResponse);
    }
    return networkResponse;
  } catch (error) {
    console.log('[SW] Network failed, trying cache:', request.url);
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    throw error;
  }
}

// Stale While Revalidate Strategy
async function staleWhileRevalidate(request, cacheName) {
  const cachedResponse = await caches.match(request);
  
  const networkResponsePromise = fetch(request)
    .then(async (networkResponse) => {
      if (networkResponse.ok) {
        const cache = await caches.open(cacheName);
        // Tambahkan timestamp untuk tracking cache age
        const responseToCache = networkResponse.clone();
        const headers = new Headers(responseToCache.headers);
        headers.set('sw-cached-time', Date.now().toString());
        
        const modifiedResponse = new Response(responseToCache.body, {
          status: responseToCache.status,
          statusText: responseToCache.statusText,
          headers: headers
        });
        
        cache.put(request, modifiedResponse);
      }
      return networkResponse;
    })
    .catch(() => null);

  return cachedResponse || await networkResponsePromise;
}

// Helper functions
function isStaticAsset(url) {
  return (
    url.pathname.includes('/static/') ||
    url.pathname.endsWith('.js') ||
    url.pathname.endsWith('.css') ||
    url.pathname.endsWith('.ico') ||
    url.pathname.endsWith('.woff') ||
    url.pathname.endsWith('.woff2') ||
    url.hostname.includes('fonts.googleapis.com') ||
    url.hostname.includes('fonts.gstatic.com')
  );
}

function isImageRequest(url) {
  return (
    url.pathname.endsWith('.png') ||
    url.pathname.endsWith('.jpg') ||
    url.pathname.endsWith('.jpeg') ||
    url.pathname.endsWith('.gif') ||
    url.pathname.endsWith('.webp') ||
    url.pathname.endsWith('.svg') ||
    url.pathname.includes('/images/') ||
    url.pathname.includes('/assets/') ||
    url.searchParams.has('format') // untuk dynamic images
  );
}

function isApiRequest(url) {
  return (
    url.pathname.includes('/api/') ||
    url.pathname.includes('/data/')
  );
}

function isDynamicContent(url) {
  return (
    url.pathname.includes('/dashboard/') ||
    url.searchParams.has('timestamp')
  );
}

function isHTMLRequest(request) {
  return request.headers.get('accept')?.includes('text/html');
}

// Offline fallback
async function handleOffline(request) {
  if (isHTMLRequest(request)) {
    const cachedResponse = await caches.match('/');
    if (cachedResponse) {
      return cachedResponse;
    }
  }
  
  // Return a basic offline response
  return new Response(
    JSON.stringify({ 
      error: 'Offline', 
      message: 'Tidak ada koneksi internet' 
    }),
    {
      status: 503,
      statusText: 'Service Unavailable',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
}

// Background sync untuk data yang pending
self.addEventListener('sync', (event) => {
  console.log('[SW] Background sync triggered:', event.tag);
  
  if (event.tag === 'background-sync-absensi') {
    event.waitUntil(syncAbsensiData());
  }
});

// Notify clients about cache updates
function notifyClients(message) {
  self.clients.matchAll().then(clients => {
    clients.forEach(client => {
      client.postMessage({
        type: 'CACHE_UPDATE',
        message: message,
        timestamp: Date.now()
      });
    });
  });
}

// Listen for cache updates
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'GET_CACHE_SIZE') {
    getCacheSize().then(size => {
      event.ports[0].postMessage({ size });
    });
  }
});

// Get total cache size
async function getCacheSize() {
  const cacheNames = await caches.keys();
  let totalSize = 0;
  
  for (const cacheName of cacheNames) {
    const cache = await caches.open(cacheName);
    const requests = await cache.keys();
    
    for (const request of requests) {
      const response = await cache.match(request);
      if (response) {
        const blob = await response.blob();
        totalSize += blob.size;
      }
    }
  }
  
  return totalSize;
}

async function syncAbsensiData() {
  try {
    // Implementasi sync data absensi yang tertunda
    console.log('[SW] Syncing attendance data...');
    // Logic untuk sync data akan ditambahkan ketika backend tersedia
  } catch (error) {
    console.error('[SW] Background sync failed:', error);
  }
}

// Push notification handler
self.addEventListener('push', (event) => {
  console.log('[SW] Push notification received');
  
  const options = {
    body: event.data ? event.data.text() : 'Notifikasi baru dari CPMI Absensi',
    icon: '/favicon.ico',
    badge: '/favicon.ico',
    vibrate: [200, 100, 200],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Buka Aplikasi',
        icon: '/favicon.ico'
      },
      {
        action: 'close',
        title: 'Tutup'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('CPMI Absensi', options)
  );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  console.log('[SW] Notification clicked:', event.action);
  
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});