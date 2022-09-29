import prisma from '$root/lib/prisma';
import type { Load } from '@sveltejs/kit';

export const load: Load = async ({ params }) => {
	const slug = params.slug;
	if (slug && slug.length) {
		const querySlug = new URLSearchParams(slug).toString();
		console.log('q',querySlug)
		try {
			const product = await prisma.groceries.findFirst({
				where: {
					slug: querySlug
				},
				include: {
					priceHistory: true
				}
			});
			if (product) {
				const groceryId = product.id;
				const priceHistory = await prisma.$queryRaw`
				SELECT "groceryId", to_char(date_trunc('day', "createdAt"), 'YYYY-MM-DD') as Date,  avg(price)  
				FROM "PriceHistory" ph   
				where "groceryId" = ${groceryId}
				GROUP BY to_char(date_trunc('day', "createdAt"), 'YYYY-MM-DD'), "groceryId" 
				ORDER BY to_char(date_trunc('day', "createdAt"), 'YYYY-MM-DD')
			`;
				console.log('prr', priceHistory);
				return {product,priceHistory};
			}
		} catch (error) {
			console.log('err', error);
		}
	}

	//throw error(404, 'Not found');
};
