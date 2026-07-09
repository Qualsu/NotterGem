export const apiRoutes = {
	USERS: {
		ADD: (_id: string) => `/users/add/${_id}`,
		BY_USERNAME: (username: string) => `/users/by_username/${username}`,
		BY_ID: (_id: string) => `/users/by_id/${_id}`,
		UPDATE: (_id: string) => `/users/update/${_id}`,
	},
	ORGS: {
		ADD: (_id: string) => `/orgs/add/${_id}`,
		BY_USERNAME: (username: string) => `/orgs/by_username/${username}`,
		BY_ID: (_id: string) => `/orgs/by_id/${_id}`,
		UPDATE: (_id: string) => `/orgs/update/${_id}`,
	},
	ORDER: {
		CREATE: "/order/create",
		CALLBACK: "/order/callback",
		CHECK: (_id: string) => `/order/check/${_id}`,
		SUCCESS: (_id: string) => `/order/success/${_id}`,
	},
};
