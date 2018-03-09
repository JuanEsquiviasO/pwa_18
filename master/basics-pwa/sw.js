const CACHE_NAME = 'pwa-demo-rommel-cache-v1',
urlsToCache = [
	'/',
	'./',
	'./?utm=homescreen',
	'./index.html',
	'./index.html?utm=homescreen',
	'./style.css',
	'./script.js',
	'./sw.js',
	'./favicon.ico',
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
				return Promise.all(
					cachesNames.map(cacheName => {
						if ( cacheList.indexOf(cacheName) === -1 ) {
							return caches.delete(cacheName)
						}
					})
				)	
			})
			.then(() => {
				console.log('The cache is clean ad updated')
				return self.clients.claim()
			})
	)
})

self.addEventListener('fetch', e => {
	console.log('Event: Service Worker recovering')
	e.respondWith(
		caches.match(e.request)
			.then(res => {
				if ( res ) {
					return res
				}

				return fetch( request )
					.then(res => {
						let resToCache = res.clone()
						
						caches.open(cacheName)
							.then(cache => {
								cache
									.put(request, resToCache)
									.catch(err => console.log(`${request.url}: ${err.message}`))
							})
						
						return res
					})
			})
	)
})

self.addEventListener('push', e => {
	console.log('Event: Push')

	let title = 'Push Notification Demo',
		options = {
			body: 'Click for back to application',
			icon: './img/icon_192x192.png',
			vibrate: [100, 50, 100],
			data: { id: 1 },
			actions: [
				{ 'action': 'Yes', 'title': 'I love this App', icon: './img/icon_192x192.png' },
				{ 'action': 'No', 'title': 'I hate this App', icon: './img/icon_192x192.png' },
			]
		}

		e.waitUntil( self.registration.showNotification(title, options) )
})

self.addEventListener('notificationclick', e => {
	console.log(e)
	
	if ( e.action === 'Yes' ) {
		console.log('I like this App')
		clients.openWindow('https://juanesquiviaso.github.io/')
	} else if ( e.action === 'No') {
		console.log('I dont like this App')		
	}

	e.notification.close()
})