import API from '@/api/API'
import Company from '@/models/Company'
import CompaniesCollection from '@/collections/CompaniesCollection'

export default {
	namespaced: true,
	state: {
		company: new Company(),
    list: new CompaniesCollection(),
    meta: {
      page: {
        current_page: 1,
        per_page: 5,
      },
    },
	},
	getters: {
    company: (state) => state.company,
    list: (state) => state.list,
    companyById: (state) => (id) => {
      state.company = state.list.get(id)
      return state.company
    },
    meta: (state) => state.meta,
	},
	mutations: {
		SET_COMPANY(state, val) {
			state.company = val
		},
		SET_COMPANY_LIST(state, val) {
			state.list = val
		},
    SET_COMPANY_META(state, meta) {
      state.meta = meta
    },
    SET_COMPANY_META_PROP(state, meta) {
      state.meta.page[meta.prop] = meta.value
    },
	},
	actions: {
		setCompany({ commit }, data) {
			commit('SET_COMPANY', data)
		},

		async list({ commit, state }) {
			try {
				const response = await API.$company.list({
          pageNum: state.meta.page.current_page,
          pageSize: state.meta.page.per_page,
        })
        state.list = new CompaniesCollection()
				if (response) {
          commit('SET_COMPANY_META', response.meta)
          state.list.receive(response.data)
				}
			} catch (e) {
				console.error(e.message)
			}
		},

		async detail({ commit }, data) {
			try {
				const response = await API.$company.detail(data)
				if (response) {
					const company = new Company(response.data, response.included)
					commit('SET_COMPANY', company)
				}
			} catch (e) {
				console.error(e.message)
			}
		},

		async update({ commit }, data) {
			try {
				const response = await API.$company.update(data)
				if (response) {
					const company = new Company(response.data, response.included)
					commit('SET_COMPANY', company)
				}
			} catch (e) {
				console.error(e.message)
			}
		},

		async create({ commit }, data) {
			try {
				const response = await API.$company.create(data)
				if (response) {
					const company = new Company(response.data, response.included)
					commit('SET_COMPANY', company)
				}
			} catch (e) {
				console.error(e.message)
			}
		},

		async delete({ commit }, data) {
			try {
				const response = await API.$company.delete(data)
				if (response) {
					commit('SET_COMPANY', new Company())
				}
			} catch (e) {
				console.error(e.message)
			}
		},
	},
}
