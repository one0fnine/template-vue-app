import BasicAPI from './BasicAPI'
import ErrorAPI from './ErrorAPI'

export default class UserAPI extends BasicAPI {
	async detail() {
		const response = await this.axios.get('/users', this.authHeaders)
			.catch((error) => {
				throw new ErrorAPI('$users.detail', error.response)
			})

		if (response.status === 200 || response.status === 304) {
			return response.data
		}

		return null
	}

	async update({ data }) {
		const response = await this.axios.patch('/users', data, this.authHeaders)
			.catch((error) => {
				throw new ErrorAPI('$users.update', error.response)
			})

		if (response.status === 200 || response.status === 304) {
			return response.data
		}

		return null
	}
}
