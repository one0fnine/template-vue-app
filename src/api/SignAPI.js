import BasicAPI from './BasicAPI'
import ErrorAPI from './ErrorAPI'

export default class SignAPI extends BasicAPI {
	async signUp(regData) {
		const response = await this.axios.post('/auth/sign_up', regData)
			.catch((error) => {
				throw new ErrorAPI('$sign.signUp', error.response)
			})

		if (response.status === 200) {
			return {
				user: response.data.data,
				authorization: response.data.authorization,
			}
		}
		return null
	}

	async signIn(data) {
		const response = await this.axios.post('/auth/sign_in', data, {})
			.catch((error) => {
				throw new ErrorAPI('$sign.signIn', error.response)
			})

		if (response.status === 200) {
			return {
				user: response.data.data,
				authorization: response.data.authorization,
			}
		}

		return null
	}

	async signOut() {
		const response = await this.axios.delete('/auth/sign_out', {}, {})
			.catch((error) => {
				this.checkIsTokenExpires(error, '$sign.signOut')
				throw new ErrorAPI('$sign.signOut', error.response)
			})

		if (response.status === 204) {
			return response
		}

		return null
	}
}
