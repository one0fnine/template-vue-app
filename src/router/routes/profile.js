export default [
	{
		path: '/profile',
		name: 'profile',
		component: () => import('@/views/pages/profile/Profile.vue'),
		meta: {
			pageTitle: 'Profile',
			breadcrumb: [
				{
					text: 'Profile',
					active: true,
				},
			],
		},
	},
]
