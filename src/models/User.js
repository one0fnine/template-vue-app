export default class User {
  _type = 'users'

  _id = null;

  _fullName = null;

  _firstName = null;

  _lastName = null;

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
      const [firstName, lastName] = attrs.full_name.split(' ')
      this._firstName = firstName
      this._lastName = lastName
      this._fullName = attrs.full_name
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

  toJSON() {
    return {
      type: this.type,
			id: this.id,
			attributes: {
				full_name: `${this.firstName} ${this.lastName}`,
			},
    }
  }

	toUpdateJSON() {
		return {
      type: this.type,
			id: this.id,
			attributes: {
				full_name: `${this.firstName} ${this.lastName}`,
			},
		}
	}
}
