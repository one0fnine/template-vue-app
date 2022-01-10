import User from '@/models/User'
import API from '@/api/API'

export default {
	namespaced: true,
	state: {
		user: new User(),
	},
	getters: {
		user: (state) => state.user,
	},
	mutations: {
		SET_USER(state, val) {
			state.user = val
		},
	},
	actions: {
		async getUser({ commit }) {
			let response

			try {
				response = await API.$user.detail()
			} catch (e) {
				console.error(e.message)
			}

			if (response) {
				const _user = new User(response.data, response.included)
				commit('SET_USER', _user)
			}
		},

		async updateUser({ commit }, data) {
			let response

			try {
				response = await API.$user.update(data)
			} catch (e) {
				console.error(e.message)
			}

			if (response) {
				const _user = new User(response.data)
				commit('SET_USER', _user)
			}
		},

		setUser({ commit }, data) {
			const _user = new User(data.data, data.included)
			commit('SET_USER', _user)
		},
	},
}
