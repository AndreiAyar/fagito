import prisma from '$root/lib/prisma';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	const page = url.searchParams.get('page') || 0;
	const authorId = url.searchParams.get('author') as string ;
	const perPage = 9;
	try {
        const totalPosts = await prisma.post.count({
			where:{
				...(authorId ? { authorId:parseInt(authorId)} : {}),
			}
		})
		const response = await prisma.post.findMany({
			skip: page === 0 ? 0 : (perPage * +page) - perPage,
			take: perPage,
			where: {
				...(authorId ? { authorId:parseInt(authorId)} : {}),
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
		const authorsWithPosts = await prisma.user.findMany({
            where:{
              posts:{
                  some:{
                      enabled:1
                  }
              }
            },
            select:{
                id:true,
                username:true
            },
			orderBy: {
				posts: {
					_count: 'asc'
				}
			}
		});
        const totalPages = Math.ceil(totalPosts / perPage)
		console.log(totalPages);
		return { posts:response, totalPages, authorsWithPosts };
	} catch (error) {
        //Everywhere like this !
		throw redirect(302, '/');
	}
};
