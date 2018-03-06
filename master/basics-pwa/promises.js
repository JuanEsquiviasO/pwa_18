;
((c) => {
	const square = (value, callback) => {
		setTimeout(() => {
			callback(value, value*value)
		}, Math.random() * 100)
	}

	square(2, (value, result) => {
		c('Start of Callback')
		c(`Callback: ${value}, ${result}`)
		square(4,(value, result) => {
			c(`Callback: ${value}, ${result}`)
			square(6, (value, result) => {
				c(`Callback: ${value}, ${value}`)
				c('Finish of Callback')
			})
		})
	})
})(console.log);

;
((c) => {
	const square = value => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve({ value: value, result: value*value })
			}, Math.random() * 100)
		})
 	}

	square(2)
		.then(obj => {
			c('Start of Promise')
			c(`Promise: ${obj.value}, ${obj.result}`)
			return square(4)
		})
		.then(obj => {
			c(`Promise: ${obj.value}, ${obj.result}`)
			return square(6)
		})
		.then(obj => {
			c('Finish of Promise')
			c(`Promise: ${obj.value}, ${obj.result}`)
		})
		.catch(err => c(err))
	
})(console.log);