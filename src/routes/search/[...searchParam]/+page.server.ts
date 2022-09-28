import prisma from '$root/lib/prisma';
import type { PageServerLoad, RouteParams } from '.svelte-kit/types/src/routes/$types';
import { error, redirect } from '@sveltejs/kit';
import { availableCategories } from './utils';
interface SearchParam extends RouteParams {
	searchParam: string;
}
export const load: PageServerLoad = async ({ params, locals }) => {
	if(!locals.userData?.username) throw redirect(301, '/')
	const { searchParam } = <SearchParam>params;
	const searchTerm = searchParam.split('/');
	const categoryIdx = searchTerm.indexOf('cat');
	const category = searchTerm[categoryIdx + 1] as string;

	const searchFor: string = searchTerm[0];
	
	try {
		if (category && category === availableCategories.GROCERIES_TYPE) {
			console.log('here');
			const result = await prisma.groceries.findMany({
				where: {
					title: {
						search: searchFor.split(' ').join(' & ')
					}
				},
				include: {
					vendor: {
						select: {
							title: true
						}
					}
				}
			});
			return {
				searchTerm: searchFor,
				searchData: {result,category},
				 
			};
		}
		if (category && category === availableCategories.RECIPES_TYPE) {
			console.log('here post')
			const result = await prisma.post.findMany({
				where: {
					title: {
						search: searchFor.split(' ').join(' & ')
					},
				},
				include:{
					author:{
						select:{
							username:true
						}
					}
				}
			});
			console.log('re',result)
			return {
				searchTerm: searchFor,
				searchData: {result,category},
			};
		}
	} catch (err) {
		throw error(404, 'Not found!');
	}
};
