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

//API GitHub
((d, w, n, c) => {
	const userInfo = d.querySelector('.GitHubUser'),
			searchForm = d.querySelector('.GitHubUser-form')

	function fetchGitHubUser(username, requestFromBGSync) {
		let name = username || 'juanesquiviaso',
		url = `https://api.github.com/users/${name}`
		
		fetch(url, { method:'GET' })
			.then(response => response.json())
			.then(userData => {


				let template = `
					<article class="GitHubUser-info">
						<h2>${userData.name}</h2>
						<img src="${userData.avatar_url}" alt="${userData.Login}">
						<p>${userData.info}</p>
						<ul>
							<li>User GitHub ${userData.login}</li>
							<li>Url GitHub ${userData.html_url}</li>
							<li>Followers ${userData.followers}</li>
							<li>Follow ${userData.following}</li>
							<li>Ubication ${userData.location}</li>
						</ul>
					</article>
				`
				userInfo.innerHTML = template
			})
			.catch(err => {
				c(err)
			})
	}

	fetchGitHubUser()

	searchForm.addEventListener('submit', e => {
		e.preventDefault()

		let user = d.getElementById('search').value

		if ( user === '' ) return;

		localStorage.setItem('github', user)
		fetchGitHubUser(user)

		e.target.reset()
	})
})(document, window, navigator, console.log);
	
((d, w, n, c) => {	

})(document, window, navigator, console.log);

//Run Server
//http-server -p 3008 -c-1
