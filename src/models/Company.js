export default class Company {
  _type = 'companies'

  _id = null

  _name = ''

  _consumer = false

  _producer = false

  constructor(data, included) {
		this.parseData(data, included)
  }

  async parseData(data) {
    if (data) {
      this._id = data.id
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
}
