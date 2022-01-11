/**
 * класс упрощения работы с коллекциями
 * @see https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Map
 */
export default class Collection {
	_collection = null;
	
	constructor(inputData) {
		this._collection = new Map()
		this.receive(inputData)
	}
	
	get keys() {
		return Array.from(this._collection.keys())
	}
	
	get list() {
		return this._collection
	}
	
	get collection() {
		return this._collection
	}
	
	get size() {
		return this._collection.size
	}
	
	get length() {
		return this._collection.size
	}
	
	clear() {
		this._collection.clear()
	}
	
	get first() {
		return (Array.from(this._collection))[0][1]
	}
	
	get last() {
		return (Array.from(this._collection))[this._collection.size - 1][1]
	}
	
	/**
	 * метод сравнения для сортировки
	 * @param {any} d1
	 * @param {any} d2
	 * @returns {number}
	 */
	// eslint-disable-next-line class-methods-use-this
	compare(d1, d2) {
		if (d1 === d2) { return 0 }
		
		return d1 > d2 ? -1 : 1
	}
	
	/**
	 * @param {object} data
	 */
	add(data) {
		if (data.id) {
			const conv = this.new(data)
			this._collection.set(`${conv.id}`, conv)
			return data.id
		}
		
		return false
	}
	
	set(id, data) {
		const conv = this.new(data)
		this._collection.set(`${conv.id}`, conv)
	}
	
	receive(inputArray) {
		if (inputArray) {
			inputArray.map((oItem) => this.add(oItem))
		}
	}
	
	// eslint-disable-next-line class-methods-use-this
	new(data) {
		return data
	}
	
	update(data) {
		this.set(`${data.id}`, data)
	}
	
	/**
	 * поиск в коллекции по ID
	 * @param {number} ID - ID нужной сущности
	 * @returns {object} - нужная сущность, или UNDEFINED если не нашли
	 */
	get(ID) {
		return this._collection.get(`${ID}`)
	}
	
	delete(ID) {
		this._collection.delete(`${ID}`)
	}
	
	/**
	 * @param {Function} checkFunction
	 * @returns {Object[]}
	 */
	filter(checkFunction) {
		const arr = []
		
		this._collection.forEach((value) => {
			if (checkFunction(value)) {
				arr.push(value)
			}
		})
		
		return arr
	}
	
	/**
	 * @param {Function|null} compareFunction
	 * @returns {object[]}
	 */
	asArray(compareFunction = null) {
		const arr = []
		
		this._collection.forEach((value) => {
			arr.push(value)
		})
		
		if (compareFunction) {
			arr.sort(compareFunction)
		} else {
			arr.sort(this.compare)
		}
		
		return arr
	}
	
	toString() {
		return JSON.stringify(this.toJSON())
	}
	
	toJSON() {
		if (this.collection.size === 0) { return [] }
		
		const ret = []
		
		this.collection.forEach((aItem) => {
			ret.push(aItem.toJSON())
		})
		
		return ret
	}
}
