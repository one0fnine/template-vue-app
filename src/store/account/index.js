import Account from '@/models/Account'

export default {
	namespaced: true,
	state: {
		account: new Account(),
	},
	getters: {
		account: (state) => state.user,
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
	},
}
