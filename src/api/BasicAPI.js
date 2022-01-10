export default class BasicAPI {
	__base = null;
	
	__axios = null;
	
	constructor(apiParent) {
		this.__base = apiParent
		this.__axios = apiParent.axios
	}
	
	get api() {
		return this.__base
	}
	
	get axios() {
		return this.__axios
	}
	
	get authHeaders() {
		return this.__base.authHeaders
	}
	
	get authFileHeaders() {
		return this.__base.authFileHeaders
	}
	
	/**
	 * если в ответе сервер вернул, что `Token is expired`, то бросит событие `api:Unauthorized`
	 * @param {Object} error - ответ сервера с ошибкой в том виде как возвращает axios
	 * @param {string} srcMethod - имя API-метода, который вызвал ошибку
	 * @throws {Event} - событие `api:Unauthorized`
	 */
	checkIsTokenExpires(error, srcMethod) {
		this.__base.__checkIsTokenExpires(error, srcMethod)
	}
}
