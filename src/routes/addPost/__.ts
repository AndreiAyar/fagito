import prisma from '$lib/prisma';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({locals}) => {
	console.log('io')
	if(!locals.userData?.username) throw redirect(302, '/');
	try {
		const response = await prisma.post.findFirst({
			where: {
				isDraft: true
			}
		});
        console.log('re',response)
		if (response) {
			return { postId: response.id };
		}
	} catch (err) {
		console.log('err', err);
		throw error(404, 'Not found!');
	}
};
