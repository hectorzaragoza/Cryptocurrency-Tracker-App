let apiUrl
const apiUrls = {
	// production: 'http://localhost:8000', ** for local development **
	production: 'https://crypto-bytes.herokuapp.com',
	development: 'http://localhost:8000',
}

if (window.location.hostname === 'localhost') {
	apiUrl = apiUrls.development
} else {
	apiUrl = apiUrls.production
}

export default apiUrl
