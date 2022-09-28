import prisma from '$root/lib/prisma';
import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	const formData = request.formData();
	const searchParam = (await formData).get('search') as string;
	const searchTable = (await formData).get('searchTable') as string;
	let result;
	if (searchParam && searchParam.length >= 3) {
		switch (searchTable) {
			case 'products':
				result =
					await prisma.$queryRaw`select title, id::text, 'grocery' as table_name, "imageSrc", slug, "lastPrice" from "Groceries" where LOWER(title) LIKE LOWER(${`%${searchParam}%`})
		  `;
				break;
			default:
				result =
					await prisma.$queryRaw`select title, id::text, 'grocery' as table_name, "imageSrc", slug from "Groceries" where LOWER(title) LIKE LOWER(${`%${searchParam}%`})
				union all
		   select title, id,  'post' as table_name, "imageSrc", slug from "Post" p  where LOWER(title) LIKE LOWER(${`%${searchParam}%`})
		   `;
		}
		return new Response(JSON.stringify({ success: true, foundEntries: result }));
	}
	return new Response(JSON.stringify({ success: false, foundEntries: [] }));
};
