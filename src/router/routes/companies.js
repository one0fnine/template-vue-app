export default [
	{
		path: '/companies',
		name: 'companies',
		component: () => import('@/views/pages/companies/Companies.vue'),
		meta: {
			pageTitle: 'Companies',
			breadcrumb: [
				{
					text: 'Companies',
					active: true,
				},
			],
		},
	},
]
