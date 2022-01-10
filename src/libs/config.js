import Vue from 'vue'

function parseConfigParam(value, fallback) {
	if (typeof value === 'undefined') {
		return fallback
	}

	switch (typeof fallback) {
	case 'boolean':
		return !!JSON.parse(value)
	case 'number':
		return +JSON.parse(value)
	default:
		return value
	}
}

const config = {
	apiBaseUrl: parseConfigParam(process.env.VUE_APP_BASE_API, 'http://localhost:8081'),
	apiUploadUrl: parseConfigParam(process.env.VUE_APP_BASE_UPLOAD_API, 'http://localhost:8081'),
	isDev: process.env.NODE_ENV === 'development',
}

export { config }

export default {
	install: () => {
		// eslint-disable-next-line
	  Vue.config.globalProperties = config
	},
}
