import { v4 as uuidv4 } from 'uuid'
import RelationshipsItem from '@/models/RelationshipsItem'
import Attachment from '@/models/Attachment'
import User from '@/models/User'
import Company from '@/models/Company'

export default class Account {
  _type = 'accounts'

  _id = null;

  _email = null;

  _password = null;

  _userID = null;

  _user = new User();

  _companyID = null;

  _company = new Company();
	
	_photo = new Attachment();
	
	_signedId = new Attachment();

  constructor(data, included) {
		this.parseData(data)
		this.parseIncluded(included)
  }

  async parseData(data) {
    if (data) {
      this._id = data.id
			this._email = data.attributes?.email
			this._userID = data.relationships.user.data.id
			this._companyID = data.relationships.company.data.id
    }
  }
  
  parseIncluded(included) {
		if (included) {
			if (this._userID) {
				const userInc = included.find((inc) => inc.id === this._userID)
				this.user = new User(userInc)
			}
			if (this._companyID) {
				const companyInc = included.find((inc) => inc.id === this._companyID)
				this.company = new Company(companyInc)
			}
		
			const attachments = included.find((cItem) => cItem.type === 'attachments')
			if (attachments) {
				this._photo.parseData(attachments)
				this._signedId = this._photo.resource
			} else {
				this._photo = new Attachment()
				this._signedId = ''
			}
		}
  }

  get type() { return this._type }

  get id() { return this._id }

  set id(value) { this._id = value }

  get email() { return this._email }

  set email(value) { this._email = value }
	
	get password() { return this._password }

  set password(value) { this._password = value }
	
	get userID() { return this._userID }
	
	set userID(value) { this._userID = value }
	
	get user() { return this._user }
	
	set user(value) { this._user = value }
	
	get companyID() { return this._companyID }
	
	set companyID(value) { this._companyID = value }
	
	get company() { return this._company }
	
	set company(value) { this._company = value }
	
	get photo() { return this._photo }
	
	set photo(value) { this._photo = value }
	
	get signedId() { return this._signedId }
	
	set signedId(value) { this._signedId = value }

  toJSON() {
		if (!this.userID) {
			this.userID = uuidv4()
		}
		if (!this.companyID) {
			this.companyID = uuidv4()
		}

		const user = new RelationshipsItem('users', this.userID)
		const company = new RelationshipsItem('companies', this.companyID)

		this.company.id = this.companyID
		this.user.id = this.userID
	
		const data = {
			type: this.type,
			attributes: {
				email: this.email,
				password: this.password,
			},
			relationships: {
				user: { data: user.toJSON() },
				company: { data: company.toJSON() },
			},
		}
	
		const userInc = this.user.toJSON()
		const companyInc = this.company.toJSON()
		const included = [userInc, companyInc]

		return { data, included }
  }

  toLoginJSON() {
		const data = {
			type: this.type,
			attributes: {
				email: this.email,
				password: this.password,
			},
		}
		return { data }
  }

  toUpdateJSON() {
		if (!this.userID) {
			this.userID = uuidv4()
		}
		if (!this.companyID) {
			this.companyID = uuidv4()
		}
	
		if (this.signedId) {
			this.photoData = {
				id: this.photo.id,
				type: 'attachments',
				attributes: {
					resource: this.signedId,
					_destroy: this.photo._destroy,
				},
			}
		}

		const user = new RelationshipsItem('users', this.userID)
		const company = new RelationshipsItem('companies', this.companyID)
		const attachment = new RelationshipsItem('attachments', this.photo.id)
	
		this.user.id = this.userID
		this.company.id = this.companyID

		const data = {
			type: this.type,
			id: this.id,
			relationships: {
				user: { data: user.toJSON() },
				company: { data: company.toJSON() },
				attachment: { data: attachment.toJSON() },
			},
		}
		
		const userInc = this.user.toUpdateJSON()
		const companyInc = this.company.toUpdateJSON()
	
		const included = [userInc, companyInc]
		if (this.signedId) {
			included.push(this.photoData)
		}
		
		return { data, included }
  }
}
