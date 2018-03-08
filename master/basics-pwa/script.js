if ( 'serviceWorker' in navigator ) {
	window.addEventListener('load', () => {
		navigator.serviceWorker.register('./sw.js')
			.then( registration => {
				console.log(registration)				
				console.log(
					'Service Worker successfully registered',
					registration.scope
				)
			})
			.catch( err => console.log(`Service Worker record failed`, err) )
	})
}

if ( window.Notification && Notification.permission !== 'denied' ) {
	Notification.requestPermission(status => {
		console.log(status)
		let n = new Notification('Title', {
			body: 'Hey, a notification',
			icon: './img/icon_192x192.png'
		})
	})
}