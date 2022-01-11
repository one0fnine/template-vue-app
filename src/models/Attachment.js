import { v4 as uuid4 } from 'uuid'

export default class Attachment {
	/**
	 * @type {string}
	 * @private
	 */
	_type = 'attachments';

	/**
	 * @type {string}
	 * @private
	 */
	_id = '';

	/**
	 * @type {string}
	 * @private
	 */
	_resourceType = '';

	/**
	 * @type {string}
	 * @private
	 */
	_resource = '';

	/**
	 * @type {string}
	 * @private
	 */
	_url = '';

	/**
	 * @type {boolean}
	 * @private
	 */
	_destroy = false;

	constructor(aData) {
		if (aData) {
			this.parseData(aData)
		} else {
			this._id = uuid4()
		}
	}

	parseData(aData) {
		this._id = aData.id
		const dAttrs = aData.attributes
		this._resourceType = dAttrs.attachment_type
		this._resource = dAttrs.resource
		this._url = dAttrs.url
	}

	get id() { return this._id }

	set id(value) { this._id = value }

	get type() { return this._type }

	set type(value) { this._type = value }

	get resourceType() { return this._resourceType }

	set resourceType(value) { this._resourceType = value }

	get resource() { return this._resource }

	set resource(value) { this._resource = value }

	get url() { return this._url }

	set url(value) { this._url = value }

	get destroy() { return this._destroy }

	set destroy(value) { this._destroy = value }

	toJSON() {
		return {
			type: this.type,
			id: this.id,
			attributes: {
        resource: this.resource,
				_destroy: this.destroy,
			},
		}
	}
}
