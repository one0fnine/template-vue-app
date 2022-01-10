export default class RelationshipsItem {
	_type = null;

	_id = null;

	constructor(iData, id) {
		if (typeof id !== 'undefined') {
			this._type = iData ?? null
			this.id = id ?? null
		} else {
			this._type = iData.type ?? null
			this.id = iData.id ?? null
		}
	}

	get type() { return this._type }

	set type(value) { this._type = value }

	get id() { return this._id }

	set id(value) {
		if (value) {
			this._id = value
		}
	}

	toJSON() {
		return {
			type: this.type ?? '',
			id: this.id ?? '',
		}
	}
}
