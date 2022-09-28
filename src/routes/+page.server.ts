import prisma from '$root/lib/prisma';
import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    try {
        const response = await prisma.post.findMany({
            where:{
                isDraft:false
            },
            include:{
                author:{
                    select:{
                        username:true
                    }
                }
            },
            take:6,
            orderBy: {
               
                  createdAt: 'desc',
           
              },
        })
        return {response}
    } catch (error) {
        throw redirect(302, '/')
    }
};

export const actions: Actions = {
	search: async ({ request }) => {
		const formData = request.formData();
		const searchParam = (await formData).get('search') as string;
        if(searchParam && searchParam.length >= 3){
            const result = await prisma.$queryRaw`
            select title, cast(id as char), 'grocery' as table_name, "imageSrc", slug from "Groceries" where LOWER(title) LIKE LOWER(${`%${searchParam}%`})
                 union all
            select title, id,  'post' as table_name, "imageSrc", slug from "Post" p  where LOWER(title) LIKE LOWER(${`%${searchParam}%`})
            `;
            console.log('result', result);
            return { success: true, foundEntries:result };
        }

	}
};
