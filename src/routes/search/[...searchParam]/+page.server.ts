import prisma from '$root/lib/prisma';
import type { PageServerLoad, RouteParams } from '.svelte-kit/types/src/routes/$types';
import { error } from '@sveltejs/kit';
import { availableCategories } from './utils';
interface SearchParam extends RouteParams {
	searchParam: string;
}
export const load: PageServerLoad = async ({ params }) => {
	const { searchParam } = <SearchParam>params;
	const searchTerm = searchParam.split('/');
	const categoryIdx = searchTerm.indexOf('cat');
	const category = searchTerm[categoryIdx + 1] as string;

	const searchFor: string = searchTerm[0];
	console.log('sss', searchFor);
    
	const stra = 're';
	try {
		if (category && category === availableCategories.GROCERIES_TYPE) {
			console.log('here');
			// const result = await prisma.groceries.findMany({
			// 	where: {
			// 		title: {
			// 			search: searchFor.split(' ').join(' & ')
			// 		}
			// 	},
			// 	include: {
			// 		vendor: {
			// 			select: {
			// 				title: true
			// 			}
			// 		}
			// 	}
			// });
			const result = await prisma.$queryRaw`
            select title, "createdAt", cast(id as char), 'grocery' as table_name  from "Groceries" where LOWER(title) LIKE LOWER(${`%${stra}%`})
union all
select title, "createdAt", id,  'post' as table_name from "Post" p  where LOWER(title) LIKE LOWER(${`%${stra}%`})
            `;
			console.log('re', result);
			return {
				searchTerm: searchFor,
				searchResult: result
			};
		}

		if (category && category === availableCategories.RECIPES_TYPE) {
			const result = await prisma.post.findMany({
				where: {
					title: {
						search: searchFor.split(' ').join(' & ')
					}
				}
			});
			return {
				searchTerm: searchFor,
				searchResult: result
			};
		}
	} catch (err) {
		throw error(404, 'Not found!');
	}
};
