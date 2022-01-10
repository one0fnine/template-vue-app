/**
 * расширяет стандартный класс ошибки для упрощения обработки ошибок в FoodixAPI
 * @see API
 */
export default class ErrorAPI extends Error {
	/**
	 * код HTTP статуса который вернул Axios
	 * @type {number}
	 */
	status = -1;
	
	/**
	 * текст HTTP статуса который вернул Axios
	 * @type {string}
	 */
	statusText = '';
	
	/**
	 * название API метода, который вбросил ошибку
	 * @type {string}
	 */
	method = '';
	
	/**
	 * сообщение сервера в виде текста (как его прислал сервер)
	 * @type {string}
	 */
	serverMessage = '';
	
	/**
	 * сообщение сервера превращённое в статус для упрощения обработки
	 * перевод в верхний регистр и пробелы заменяются на подчёркивания
	 * "Token is Expired" -> "TOKEN_IS_EXPIRED"
	 * @type {string}
	 */
	serverAnswer = '';
	
	/**
	 * массив с сообщениями сервера
	 * @type {string[]}
	 */
	serverMessages = [];
	
	/**
	 * расширенное сообщение об ошибке
	 * @type {string}
	 */
	detailMessage = '';
	
	/**
	 * раздел data, так как его вернул axios
	 * @type {object}
	 */
	data = {};
	
	constructor(method, errResponse) {
		const sts = errResponse && errResponse.status ? errResponse.status : -1
		const sText = errResponse && errResponse.statusText ? errResponse.statusText : 'Unknown status'
		const eName = 'APIError'
		const msg = `API::${method}: ${sts} ${sText}`
		
		super(msg)
		
		this.method = method
		this.name = eName
		this.status = sts
		this.statusText = sText
		
		if (errResponse && errResponse.data) {
			this.data = errResponse.data
			
			if (errResponse.data.message) {
				this.serverMessage = (`${errResponse.data.message}`).trim()
				this.serverMessages = [this.serverMessage]
				this.serverAnswer = this.serverMessage.trim().toUpperCase().replace(/\s/g, '_')
			}
			
			if (errResponse.data.errors && Array.isArray(errResponse.data.errors) && errResponse.data.errors.length > 0) {
				// errResponse.data.errors.map((mItem) => this.serverMessages.push(mItem));
				this.serverMessages = errResponse.data.errors.map((mItem) => mItem)
				const msgs = this.serverMessages.map((eItem) => `${eItem.code} ${eItem.status}: ${eItem.detail} (${eItem.id})`)
				// this.serverMessage = this.serverMessages.join('\r\n').trim();
				this.serverMessage = msgs.join('\r\n').trim()
			}
		}
		
		this.detailMessage = `API::${this.method}: ${this.status} ${this.statusText}${this.message !== '' ? ` :${this.message}` : ''}`
		
		if (this.serverMessage) {
			this.detailMessage = `${this.detailMessage}\r\n${this.serverMessage}`
		}
		
		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, ErrorAPI)
		} else {
			this.stack = (new Error()).stack
		}
	}
	
	toString() {
		let msg = `API::${this.method}: ${this.status} ${this.statusText}`
		
		if (this.serverMessage) {
			msg = `${msg}\r\n${this.serverMessage}`
		}
		
		return msg
	}
	
	toDetails() {
		return this.serverMessages[0].detail
	}
}
