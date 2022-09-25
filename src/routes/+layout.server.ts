import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	if (locals.userData) {
		return {
			username: locals.userData.username ?? ''
		};
	}
};
