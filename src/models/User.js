export default class User {
  _type = 'users'

  _id = null;

  _fullName = null;

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
    }
  }

  get type() { return this._type }

  get id() { return this._id }

  set id(value) { this._id = value }

  get fullName() { return this._fullName }

  set fullName(value) { this._fullName = value }

  toJSON() {
    return {
			id: this.id,
			type: this.type,
			attributes: {
				full_name: this.fullName,
			},
    }
  }
}
