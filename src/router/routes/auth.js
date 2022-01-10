export default [
	{
		path: '/sign_in',
		name: 'sign_in',
		component: () => import('@/views/pages/auth/Login.vue'),
		meta: {
			layout: 'full',
		},
	},
	{
		path: '/sign_up',
		name: 'sign_up',
		component: () => import('@/views/pages/auth/SignUp.vue'),
		meta: {
			layout: 'full',
		},
	},
]
