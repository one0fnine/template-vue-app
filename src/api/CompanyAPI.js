import BasicAPI from './BasicAPI'
import ErrorAPI from './ErrorAPI'

export default class CompanyAPI extends BasicAPI {
	async list({ pageNum = 1, pageSize = 5 }) {
    const { headers } = this.authHeaders
    const qParams = {
      params: {
        'page[size]': pageSize,
        'page[number]': pageNum,
      },
      headers,
    }

		const response = await this.axios.get('/companies', qParams)
			.catch((error) => {
				throw new ErrorAPI('$company.list', error.response)
			})

		if (response.status === 200 || response.status === 304) {
			return response.data
		}

		return null
	}

	async create(data) {
		const response = await this.axios.post('/companies', data, this.authHeaders)
			.catch((error) => {
				throw new ErrorAPI('$company.create', error.response)
			})

		if (response.status === 200 || response.status === 304) {
			return response.data
		}

		return null
	}

	async update({ id, data }) {
		const response = await this.axios.patch(`/companies/${id}`, data, this.authHeaders)
			.catch((error) => {
				throw new ErrorAPI('$company.update', error.response)
			})

		if (response.status === 200 || response.status === 304) {
			return response.data
		}

		return null
	}

	async delete({ id }) {
		const response = await this.axios.delete(`/companies/${id}`, this.authHeaders)
			.catch((error) => {
				throw new ErrorAPI('$company.delete', error.response)
			})

		if (response.status === 200 || response.status === 304) {
			return response.data
		}

		return null
	}

	async detail({ id }) {
		const response = await this.axios.get(`/companies/${id}`, this.authHeaders)
			.catch((error) => {
				throw new ErrorAPI('$company.detail', error.response)
			})

		if (response.status === 200 || response.status === 304) {
			return response.data
		}

		return null
	}
}
