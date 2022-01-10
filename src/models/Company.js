export default class Company {
  _type = 'companies'

  _id = null

  _name = ''

  _consumer = false

  _producer = false
	
	_location = null
	
	_apiKey = null

  constructor(data, included) {
		this.parseData(data, included)
  }

  async parseData(data) {
    if (data) {
      this._id = data.id
			const attr = data.attributes
			this._name = attr.name
			this._location = attr.location
			this._apiKey = attr.api_key
    }
  }

  get type() { return this._type }

  get id() { return this._id }

  set id(value) { this._id = value }

  get name() { return this._name }

  set name(value) { this._name = value }

  get consumer() { return this._consumer }

  set consumer(value) { this._consumer = value }

  get producer() { return this._producer }

  set producer(value) { this._producer = value }

  toJSON() {
    return {
			id: this.id,
			type: this.type,
			attributes: {
				name: this.name,
				consumer: this.consumer,
				producer: this.producer,
			},
		}
  }

  toUpdateJSON() {
    return {
			id: this.id,
			type: this.type,
			attributes: {
				name: this.name,
			},
		}
  }
}
