export default class User {
  _type = 'users'

  _id = null;

  _fullName = null;

  _firstName = null;

  _lastName = null;

  _phone = null;

  constructor(data, included) {
    this.updateUser(data, included)
  }

  async updateUser(data) {
    await this.parseData(data)
  }

  async parseData(data) {
    if (data) {
      this._id = data.id
      const attrs = data.attributes
      this._fullName = attrs.full_name
      this._firstName = attrs.first_name
      this._lastName = attrs.last_name
      this._phone = attrs._phone
    }
  }

  get type() { return this._type }

  get id() { return this._id }

  set id(value) { this._id = value }

  get fullName() { return this._fullName }

  set fullName(value) { this._fullName = value }

  get firstName() { return this._firstName }

  set firstName(value) { this._firstName = value }

  get lastName() { return this._lastName }

  set lastName(value) { this._lastName = value }

  get phone() { return this._phone }

  set phone(value) { this._phone = value }

  toJSON() {
    return {
			id: this.id,
			type: this.type,
			attributes: {
				full_name: this.fullName,
			},
    }
  }
	
	toUpdateJSON() {
		return {
			id: this.id,
			type: this.type,
			attributes: {
				full_name: this.fullName,
			},
		}
	}
}
