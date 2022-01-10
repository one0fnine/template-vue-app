import Account from '@/models/Account'
import API from '@/api/API'

export default {
	namespaced: true,
	state: {
		account: new Account(),
	},
	getters: {
		account: (state) => state.account,
	},
	mutations: {
		SET_ACCOUNT(state, val) {
			state.account = val
		},
	},
	actions: {
		setAccount({ commit }, data) {
			const account = new Account(data.data, data.included)
			commit('SET_ACCOUNT', account)
		},
		
		async detail({ commit }) {
			try {
				const response = await API.$account.detail()
				if (response) {
					const account = new Account(response.data, response.included)
					commit('SET_ACCOUNT', account)
				}
			} catch (e) {
				console.error(e.message)
			}
		},
		
		async update({ commit }, data) {
			try {
				const response = await API.$account.update(data)
				if (response) {
					const account = new Account(response.data, response.included)
					commit('SET_ACCOUNT', account)
				}
			} catch (e) {
				console.error(e.message)
			}
		},
	},
}
