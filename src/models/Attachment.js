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
	_previewResourceUrl = '';
	
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
		this._resource = dAttrs.signed_id
		this._previewResourceUrl = dAttrs.url
	}
	
	get id() { return this._id }
	
	set id(value) { this._id = value }
	
	get type() { return this._type }
	
	set type(value) { this._type = value }
	
	get resourceType() { return this._resourceType }
	
	set resourceType(value) { this._resourceType = value }
	
	get resource() { return this._resource }
	
	set resource(value) { this._resource = value }
	
	get previewResourceUrl() { return this._previewResourceUrl }
	
	set previewResourceUrl(value) { this._previewResourceUrl = value }
	
	get destroy() { return this._destroy }
	
	set destroy(value) { this._destroy = value }
	
	toJSON() {
		return {
			type: this.type,
			id: this.id,
			attributes: {
				attachment_type: this.resourceType,
				signed_id: this.resource,
				url: this.previewResourceUrl,
			},
		}
	}
}
