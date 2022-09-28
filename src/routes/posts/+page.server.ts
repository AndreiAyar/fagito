import prisma from '$root/lib/prisma';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	const page = url.searchParams.get('page') || 0;

	const perPage = 9;
	try {
        const totalPosts = await prisma.post.count()
		const response = await prisma.post.findMany({
			skip: page === 0 ? 0 : (perPage * +page) - perPage,
			take: perPage,
			where: {
				isDraft: false
			},
			include: {
				author: {
					select: {
						username: true
					}
				}
			},
			orderBy: {
				createdAt: 'desc'
			}
		});
        const totalPages = Math.ceil(totalPosts / perPage)
		console.log(totalPages);
		return { posts:response, totalPages };
	} catch (error) {
        //Everywhere like this !
		throw redirect(302, '/');
	}
};
