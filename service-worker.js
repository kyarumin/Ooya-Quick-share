// キャッシュの名前（バージョン管理用）
const CACHE_NAME = 'oes-apps-v1';

// キャッシュするファイルのリスト（必要に応じて追加してください）
const urlsToCache = [
  './',
  './index.html',
  './apple-touch-icon.png',
  './manifest.json'
];

// インストール時にファイルをキャッシュする
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

// ネットワークがオフラインでもキャッシュから表示する
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});
