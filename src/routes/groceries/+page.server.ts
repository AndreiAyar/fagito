import prisma from '$root/lib/prisma';
import type { PageServerLoad } from '.svelte-kit/types/src/routes/$types';
import { invalid, redirect, type Actions } from '@sveltejs/kit';
import { randDrinks, randFloat, randPhrase } from '@ngneat/falso';
export const load: PageServerLoad = async ({locals}) => {
	if (!locals.userData) {
		throw redirect(302, '/');
	}
	const data = await prisma.groceries.findMany({
		orderBy: { createdAt: 'desc' }
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
		// if(!locals.userData){
		// 	return invalid(403, {message:"Please authenticate!" });
		// }
		//Adding fake delay 
		await new Promise(resolve => setTimeout(()=> setTimeout(resolve, 300)))
		// if (urlAlreadyExists) {
		// 	return invalid(400, { productExists: true });
		// }
		try {
		 
				await prisma.groceries.create({
					data: {
						url,
						title: randDrinks(),
						description: randPhrase(),
						vendorId: 1,
						userId: 1,
						lastPrice: randFloat({ fraction: 2 }) // 12.52
					}
				});
		 
	 
			return { message: 'Success!' };
		} catch (error) {
			return invalid(400, { message: 'Something went wrong!' });
		}
	}
};
