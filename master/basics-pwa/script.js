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

})(document, window, navigator, console.log);

((d, w, n, c) => {

})(document, window, navigator, console.log);

((d, w, n, c) => {

})(document, window, navigator, console.log);

((d, w, n, c) => {

})(document, window, navigator, console.log);



