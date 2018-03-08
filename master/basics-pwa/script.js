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

// if ( window.notification && notification !== 'denied' ) {
// 	notification.requestPermission(status = {
// 		console.log(status)		
// 	})
// }