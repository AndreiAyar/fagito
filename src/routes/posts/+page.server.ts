import prisma from '../../lib/prisma';
import type { Actions } from '@sveltejs/kit';
import { uuid } from 'uuidv4';
import { uuidToBase64 } from '../register/utils';
export const actions: Actions = {
	addPost: async ({ request }) => {
		const formData = request.formData();
		const content = (await formData).get('content');
		const title = (await formData).get('title');
		await prisma.groceries.findUnique({
			where: {
				id: 22157
			}
		});
    const uid = uuid();
    const base64 = uuidToBase64(uid);
		const response = await prisma.post.create({
			data: {
				authorId: 1,
				slug: `${title}-${base64}`,
				content: JSON.parse(content as string),
				groceries: {
					connect: [{ id: 22159 }, { id: 22162 }]
				}
			}
		});
		return { success: true, slug:response.slug};
	}
};
