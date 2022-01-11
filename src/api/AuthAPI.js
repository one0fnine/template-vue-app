import User from '@/models/User'

export default class AuthAPI {
	__localStorageUserKey = 'UserKey'

	__localStorageTokenKey = 'JWToken'

	__storage = localStorage

	_token = '';

	_user = null;

	_api = null;

	_isLoaded = false;

	__isInit = false;

	__updateEventName = 'user:updated';

	constructor(apiObj) {
		this._api = apiObj
		this._user = new User(null)
		this.__isInit = true
	}

	/**
	 * загружаем тут данные которые пришли от метода api/user или из localStorage
	 * @param {Object} inputData
	 * @param {string} token
	 */
	updateAuthUserData(inputData, token) {
		this.token = token

		this._isLoaded = true

		this.storeUserData()
	}

	/**
	 * сохраняет в localStorage (по ключу localStorageKey) данные юзера в строком виде
	 * в том виде как это присылает api/user
	 * @returns {string} - данные юзера в строком виде
	 */
	storeUserData() {
		const sData = JSON.stringify(this.user.toJSON())
		this.__storage = localStorage
		this.__storage.setItem(this.__localStorageUserKey, sData)
		this.emit(this.__updateEventName)
		return sData
	}

	/**
	 * пытается восстановить данные юзера из localStorage
	 * @returns {object|null} - данные юзера в виде объекта, если данные из localStorage
	 */
	restoreData() {
		const sData = this.__storage.getItem(this.__localStorageUserKey)
		if (typeof sData === 'undefined' || sData === null || sData === '') {
			return null
		}
		return JSON.parse(sData)
	}

	cleanData() {
		this._isLoaded = false
		this.__storage.removeItem(this.__localStorageUserKey)
		this.__storage.removeItem(this.__localStorageTokenKey)
		localStorage.removeItem('remember')
	}

	get api() { return this._api }

	get isLoaded() { return this._isLoaded }

	get user() { return this._user }

	get token() { return this._token }

	get readToken() {
		return this.__storage.getItem(this.__localStorageTokenKey)
	}

	set token(jToken) {
		this._token = (`${jToken}`).trim()
		this.__storage.setItem(this.__localStorageTokenKey, this._token)
	}

	emit(eventName, eventData) {
		if (eventName) {
			this.api.emit(eventName, eventData)
		}
	}
}
