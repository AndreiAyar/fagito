import prisma from '$root/lib/prisma';
import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	try {
		const latesPosts = await prisma.post.findMany({
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
			take: 6,
			orderBy: {
				createdAt: 'desc'
			}
		});
		const latesGroceries = await prisma.groceries.findMany({
			take: 5,
			orderBy: {
				createdAt: 'desc'
			}
		});
		const authorsWithMostPosts = await prisma.user.findMany({
			take: 5,
            where:{
              posts:{
                  some:{
                      enabled:1,
					  isDraft:false
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
		console.log('latesGroceries', authorsWithMostPosts);
		return { latesPosts, latesGroceries, authorsWithMostPosts };
	} catch (error) {
		throw redirect(302, '/');
	}
};

export const actions: Actions = {
	search: async ({ request }) => {
		const formData = request.formData();
		const searchParam = (await formData).get('search') as string;
		if (searchParam && searchParam.length >= 3) {
			const result = await prisma.$queryRaw`
            select title, cast(id as char), 'grocery' as table_name, "imageSrc", slug from "Groceries" where LOWER(title) LIKE LOWER(${`%${searchParam}%`})
                 union all
            select title, id,  'post' as table_name, "imageSrc", slug from "Post" p  where LOWER(title) LIKE LOWER(${`%${searchParam}%`})
            `;
			console.log('result', result);
			return { success: true, foundEntries: result };
		}
	}
};
