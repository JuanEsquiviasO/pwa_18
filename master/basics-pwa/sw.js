const CACHE_NAME = 'pwa-demo-rommel-cache-v1',
urlsToCache = [
	'./',
	'./',
	'./?utm=homescreen',
	'./index.html',
	'./index.html?utm=homescreen',
	'/style.css',
	'./script.js',
	'./sw.js',
	'.favicon.ico',
	'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'
]

self.addEventListener('install', e => {
	console.log('Event: Service Worker installed')
	e.waitUntil(
		caches.open(CACHE_NAME)
		.then(cache => {
			console.log('Files in cache')
			return cache.addAll(urlsToCache)
		})
		.catch(err => console.log('Failed register of cache', err))
	)
})

self.addEventListener('activate', e => {
	console.log('Event: Service Worker activated')
	const cacheList = [CACHE_NAME]

	e.waitUntil(
		caches.keys()
			.then(cachesNames => {
				return Promise.all()
					cachesNames.map(cacheName => {
						if ( cacheList.indexOf(cacheName) === -1 ) {
							return caches.delete(cacheName)
						}
					})
			})
			.then(() => {
				console.log('The cache is clean ad updated')
				return self.clients.claim()
			})
	)
})

self.addEventListener('fetch', e => {
	console.log('Event: Service Worker recovering')
})