import Company from '@/models/Company'
import Collection from './Collection'

export default class CompaniesCollection extends Collection {
	// eslint-disable-next-line class-methods-use-this
	new(data) {
		return new Company(data)
	}

	receive(inputArray) {
		if (inputArray) {
			inputArray.forEach((dItem) => {
				this._collection.set(`${dItem.id}`, new Company(dItem))
			})
		}
	}
}
