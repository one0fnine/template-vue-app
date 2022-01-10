// eslint-disable-next-line no-unused-vars
import Vue from 'vue'
import axios from 'axios'

import ErrorAPI from './ErrorAPI'
import UploadsAPI from './UploadsAPI'
import SignAPI from './SignAPI'
import UserAPI from './UserAPI'
import AccountAPI from './AccountAPI'

class APIClass {
	__storage = localStorage;

	__$root = null;

	__axios = null;

	__token = '';

	__baseURL = '';

	__uploadsURL = '';

	__defaultHeaders = {
		'Content-Type': 'application/json',
	};

	__isInit = false;

	__uploads = null;

	__sign = null;

	__user = null;

	__account = null;

	init($root, token = '') {
		if (this.__isInit) {
			return
		}

		this.__$root = $root
		if (token) {
			this.token = token
		}

		this.__baseURL = this.$root.$config.apiBaseUrl
		this.__uploadsURL = this.apiUploadsUrl

		this.__axios = axios.create({
			baseURL: this.__baseURL,
			headers: this.__defaultHeaders,
		})

		this.__uploads = new UploadsAPI(this)

		this.__sign = new SignAPI(this)
		this.__user = new UserAPI(this)
		this.__account = new AccountAPI(this)

		this.__allowEmptyToken = true
	}

	/**
	 * set auth token
	 * @param {string} jwToken
	 */
	set token(jwToken) {
		const tkn = (`${jwToken}`).trim()
		this.__token = tkn
		if (this.$root) {
			this.__storage = localStorage
			try {
				this.__storage.setItem('JWToken', tkn)
				this.__storage.setItem('authorization', tkn)
			} catch (e) {
				if (console !== undefined && console.error) {
					console.error(e)
				}
			}
		}
	}

	/**
	 * @returns {string} - auth token
	 */
	get token() { return this.__token }

	get baseURL() { return this.__baseURL }

	get uploadsURL() { return this.__uploadsURL }

	/**
	 * @returns {Vue}
	 */
	get $root() { return this.__$root }

	get axios() { return this.__axios }

	/**
	 * @returns {UserAPI}
	 */
	get $user() { return this.__user }
	
	/**
	 * @returns {AccountAPI}
	 */
	get $account() { return this.__account }

	/**
	 * @returns {UploadsAPI}
	 */
	get $uploads() { return this.__uploads }

	/**
	 * @returns {SignAPI}
	 */
	get $sign() { return this.__sign }

	/**
	 * метод для упрощения получения заголовков
	 * @returns {object}
	 */
	__getAuthHeaders() {
		return {
			headers: {
				Authorization: this.__getBearer(),
			},
		}
	}

	get authHeaders() {
		return this.__getAuthHeaders()
	}

	/**
	 * метод для упрощения получения заголовков для отправки файлов
	 * @returns {object}
	 */
	__getAuthFileHeaders() {
		return {
			headers: {
				'Content-Type': 'multipart/form-data',
				Authorization: this.__getBearer(),
			},
		}
	}

	get authFileHeaders() {
		return this.__getAuthFileHeaders()
	}

	/**
	 * геттер для получения header'а bearer
	 * @returns {string} - Bearer вместе с токеном
	 */
	__getBearer() {
		if (this.token === '') {
			const tkn = this.__storage.getItem('JWToken')

			if (tkn !== '') {
				this.__token = tkn
			}
		}

		if (!this.__allowEmptyToken && this.token === '') {
			console.warn('API:getBearer - token is empty!')

			throw new ErrorAPI('getBearer', {
				status: 401,
				statusText: 'Unauthorized',
				data: { message: 'Bearer token is empty' },
			})
		}

		return this.__token
	}

	/**
	 * бросает событие с именем eventName через Vue'шный $root.emit
	 * @param {string} eventName
	 * @param {object|boolean|null} eventData
	 */
	emit(eventName, eventData) {
		if (this._$root) {
			this._$root.$emit(eventName, eventData || {})
		}
	}

	/**
	 * @param {object} errResponse
	 * @returns {string}
	 */
	// eslint-disable-next-line class-methods-use-this
	__getServerMessage(errResponse) {
		if (errResponse && errResponse.data) {
			if (errResponse.data.message) {
				const serverMessage = (`${errResponse.data.message}`).trim()
				return serverMessage.trim().toUpperCase().replace(/\s/g, '_')
			}

			if (errResponse.data.messages && Array.isArray(errResponse.data.messages) && errResponse.data.messages.length > 0) {
				const serverMessages = []
				errResponse.data.messages.map((mItem) => serverMessages.push(mItem))
				return serverMessages.join('\r\n').trim()
			}
		}

		return null
	}

	/**
	 * если в ответе сервер вернул, что `Token is expired`, то бросит событие `api:unauthorized`
	 * @param {object} error - ответ сервера с ошибкой в том виде как возвращает axios
	 * @param {string} srcMethod - имя API-метода, который вызвал ошибку
	 * @throws {Event} - событие `api:unauthorized`
	 */
	checkIsTokenExpires(error, srcMethod) {
		const srvMsg = this.__getServerMessage(error.response)

		if (srvMsg === 'TOKEN_IS_EXPIRED') {
			this.emit('api:Unauthorized', {
				srcMethod: srcMethod || 'API',
			})
		}
	}

	/**
	 * если в ответе сервер вернул статус 401, то бросит событие `api:unauthorized`
	 * @param {object} error - ответ сервера с ошибкой в том виде как возвращает axios
	 * @param {string} srcMethod - имя API-метода, который вызвал ошибку
	 * @throws {Event} - событие `api:unauthorized`
	 */
	checkUnAuthorized(error, srcMethod) {
		if (error.response.status === 401) {
			this.emit('api:unauthorized', {
				srcMethod: srcMethod || 'API',
				status: 401,
				statusText: error.response.statusText,
			})
		}
	}
}

const API = new APIClass()
export default API
