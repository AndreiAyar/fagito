import prisma from '$root/lib/prisma';
import type { PageServerLoad } from '.svelte-kit/types/src/routes/$types';
import { invalid, redirect, type Actions } from '@sveltejs/kit';
import { getAvailableDomains } from '$root/lib/utils';
import { env } from '$env/dynamic/private';
export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.userData) {
		throw redirect(302, '/');
	}
	const data = await prisma.groceries.findMany({
		orderBy: { createdAt: 'desc' }, include:{
			vendor:{
				select:{
					title:true
				}
			}
		}
	});
	//await new Promise(resolve => setTimeout(()=> setTimeout(resolve, 3500)))
	return {
		groceries: data
	};
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
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
				console.log('res', res);
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
