import prisma from '$root/lib/prisma';
import type { PageServerLoad } from '.svelte-kit/types/src/routes/$types';
import { error, redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ locals,url }) => {
    if(!locals.userData) throw error(302, '/')
    const {id} = locals.userData
    const page = url.searchParams.get('page') || 0;
	const perPage = 9;
	try {
        const totalPosts = await prisma.post.count({
			where:{
				authorId:id
			}
		})
		const response = await prisma.post.findMany({
			skip: page === 0 ? 0 : (perPage * +page) - perPage,
			take: perPage,
			where: {
				authorId:id,
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
		return { posts:response, totalPages, authorsWithPosts };
	} catch (error) {
        //Everywhere like this !
		throw redirect(302, '/');
	}
};