import BasicAPI from './BasicAPI'
import ErrorAPI from './ErrorAPI'

export default class AccountAPI extends BasicAPI {
	async detail() {
		const response = await this.axios.get('/me', this.authHeaders)
			.catch((error) => {
				throw new ErrorAPI('$account.detail', error.response)
			})

		if (response.status === 200 || response.status === 304) {
			return response.data
		}

		return null
	}

	async update({ data }) {
		const response = await this.axios.patch('/me', data, this.authHeaders)
			.catch((error) => {
				throw new ErrorAPI('$account.update', error.response)
			})

		if (response.status === 200 || response.status === 304) {
			return response.data
		}

		return null
	}
}
