const CACHE_NAME = 'tohsahwe-ai-tutor-v1';
const ASSETS_TO_CACHE = [
  'https://cdn.tailwindcss.com',
  'https://cdn.jsdelivr.net/npm/chart.js'
];

// 서비스 워커 설치 및 리소스 캐싱
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// 활성화 시 기존 캐시 정리
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// 네트워크 요청 인터셉트 및 캐시 응답
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
