import BasicAPI from './BasicAPI'
import ErrorAPI from './ErrorAPI'

export default class UploadsAPI extends BasicAPI {
	async direct(fileName, data64) {
		const sendData = {
			data: {
				attributes: {
					data: data64,
					filename: fileName,
				},
				type: 'blobs',
			},
		}

		const response = await this.axios.post(`${this.api.uploadsURL}/direct_uploads`, sendData)
			.catch((error) => {
				throw new ErrorAPI('$uploads.direct', error.response)
			})

		if (response.status === 200) {
			return response.data
		}

		return null
	}
}
