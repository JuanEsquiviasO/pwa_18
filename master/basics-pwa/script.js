;
//Register of characterists od PWA 
((d, w, n, c) => {
	//Register of service worker
	if ('serviceWorker' in n) {
		w.addEventListener('load', () => {
			n.serviceWorker.register('./sw.js')
				.then(registration => {
					c(registration)
					c(
						'Service Worker successfully registered',
						registration.scope
					)
				})
				.catch(err => c(`Service Worker record failed`, err))
		})
	}

	//Activiting Notifications
	if (w.Notification && Notification.permission !== 'denied') {
		Notification.requestPermission(status => {
			console.log(status)
			let n = new Notification('Title', {
				body: 'Hey, a notification',
				icon: './img/icon_192x192.png'
			})
		})
	}

	//Activate background sync
	if ( 'serviceWorker' in n && 'SyncManager' in w ) {
		function registerBGSync () {
			n.serviceWorker.ready
				.then(registration => {
					return registration.sync.register('github')
						.then(() => c('Registered background synchronization'))
						.catch(err => c('Background synchronization failed', err))
				})
		}

		registerBGSync()
	}
})(document, window, navigator, console.log);

//Detection conexion state
((d, w, n, c) => {
	const header = d.querySelector('.Header'),
		metaTagTheme = d.querySelector('meta[name=theme-color]')

	function networkStatus(e) {
		c( e, e.type )

		if ( n.onLine ) {
			metaTagTheme.setAttribute('content', '#F7DF1E')
			header.classList.remove('u-offline')
			alert('recovered connection')
		} else {
			metaTagTheme.setAttribute('content', '#666')
			header.classList.add('u-offline')
			alert('lost connection')
		}
	}

	d.addEventListener('DOMContentLoaded', e => {
		if ( !n.online ) {
			networkStatus(this)
		}
		
		w.addEventListener('online', networkStatus)
		w.addEventListener('offline', networkStatus)
	})

})(document, window, navigator, console.log);

((d, w, n, c) => {

})(document, window, navigator, console.log);

((d, w, n, c) => {	

})(document, window, navigator, console.log);



