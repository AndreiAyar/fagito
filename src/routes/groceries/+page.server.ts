import prisma from '$root/lib/prisma';
import type { PageServerLoad } from '.svelte-kit/types/src/routes/$types';
import { invalid, redirect, type Actions } from '@sveltejs/kit';
import { getAvailableDomains } from '$root/lib/utils';
 
export const load: PageServerLoad = async ({ locals, url }) => {
	if (!locals.userData) {
		throw redirect(302, '/');
	}
	const page = url.searchParams.get('page') || 0;

	const perPage = 12;
	const totalGroceries = await prisma.groceries.count();
	const data = await prisma.groceries.findMany({
		orderBy: { createdAt: 'desc' }, include:{
			vendor:{
				select:{
					title:true
				}
			}
		},
		skip: page === 0 ? 0 : (perPage * +page) - perPage,
		take: perPage,
	});
	console.log('ss',page === 0 ? 0 : (perPage * +page) - perPage)
	//await new Promise(resolve => setTimeout(()=> setTimeout(resolve, 3500)))
	const totalPages = Math.ceil(totalGroceries / perPage)
	return {
		groceries: data,
		totalPages
	};
};

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = request.formData();
		const url = (await formData).get('url') as string;
		const urlAlreadyExists = await prisma.groceries.findFirst({
			where: {
				url
			}
		});
		if (urlAlreadyExists) {
			return invalid(400, { productExists: true });
		}
		try {
			// eslint-disable-next-line no-useless-escape
			const matches = url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
			const domain = matches && matches[1]; // domain will be null if no match is found
			const vendor = domain ? getAvailableDomains(domain) : null;
			if (vendor && url) {
				const res = await fetch(
					`https://te5d4qu2xa.execute-api.us-east-1.amazonaws.com/prod/crawlurl?url=${url}&vendor=${vendor}`,
					{
						method: 'POST',
						headers: {
							authorizationToken:process.env.AUTH_TOKEN_CRAWLER || ''
						}
					}
				);
			 
				if (res.status !== 200) {
					return invalid(400, { message: 'Something went wrong!' });
				}
			}
			return { message: 'Success!' };
		} catch (error) {
			return invalid(400, { message: 'Something went wrong!' });
		}
	}
};
