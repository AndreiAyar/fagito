import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.userData) {
		return {
			user: locals.userData.username ?? ''
		};
	}
};
