import Vue from 'vue'
import { ToastPlugin, ModalPlugin } from 'bootstrap-vue'
import VueCompositionAPI from '@vue/composition-api'
import Ripple from 'vue-ripple-directive'

import router from './router'
import store from './store'
import App from './App.vue'

import configPlugin from './libs/config'

// Global Components
import './global-components'

// 3rd party plugins
import '@/libs/portal-vue'
import '@/libs/toastification'

Vue.use(configPlugin, {})

// BSV Plugin Registration
Vue.use(ToastPlugin)
Vue.use(ModalPlugin)

// Composition API
Vue.use(VueCompositionAPI)

// Directives
Ripple.color = 'rgba(255, 255, 255, 0.35)'
Vue.directive('ripple', Ripple)

// import core styles
require('@core/scss/core.scss')

// import assets styles
require('@/assets/scss/style.scss')

Vue.config.productionTip = false
Vue.config.silent = true
Vue.config.devtools = true
Vue.config.performance = true

new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount('#app')
