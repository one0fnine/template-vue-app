export default class Company {
  _type = 'companies'

  _id = null

  _name = ''

  _consumer = false

  _producer = false

	_location = {}

	_apiKey = null

	_social = {}

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
			this._social = attr.social_profiles
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

  get location() { return this._location }

  set location(value) { this._location = value }

  get social() { return this._social }

  set social(value) { this._social = value }

  toJSON(attributes) {
    const attr = attributes || {}
    return {
      type: this.type,
      id: this.id,
      attributes: {
        name: this.name,
        ...attr,
      },
    }
  }

  toNewJSON(attributes) {
    const attr = attributes || {}
    return {
      type: this.type,
      attributes: {
        name: this.name,
        ...attr,
      },
    }
  }

  toUpdateJSON(attributes) {
    const attr = attributes || {}
    return {
      type: this.type,
      id: this.id,
      attributes: {
        name: this.name,
        ...attr,
      },
    }
  }
}
