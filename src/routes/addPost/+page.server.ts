
import prisma from '../../lib/prisma';
import { error, invalid, redirect, type Actions } from '@sveltejs/kit';
import { uuid } from 'uuidv4';
import { uuidToBase64 } from '../register/utils';
import type { PageServerLoad } from '.svelte-kit/types/src/routes/$types';
import { STANDARD_BLOCKS_DATA } from './utils';
import type { GroceriesForPostType } from '$root/types';
	
export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.userData?.username) throw redirect(302, '/');
	const {id} = locals.userData;
	try {
		const response = await prisma.post.findFirst({
			where: {
				isDraft: true,
				authorId:id
			},
			include: {
				postGroceries: {
					include: {
						grocery: true
					}
				}
			}
		});
		if (response) {
			response.postGroceries = [
				...response.postGroceries.map((el) => ({
					...el,
					title: el.grocery.title,
					imageSrc: el.grocery.imageSrc,
					lastPrice: el.grocery.lastPrice,
					id: el.groceryId
				}))
			];
			const updatedResponse = {
				...response,
				totalPrice:response.postGroceries.reduce((acc, el) => {
					return +((el.neededQuantity * el.lastPrice) / el.quantity).toFixed(2) + acc;
				}, 0)
			}
	 
			return { draftContent: updatedResponse };
		}
	} catch (err) {
		console.log('err', err);
		throw error(404, 'Not found!');
	}
};

export const actions: Actions = {
	addPost: async ({ request, locals }) => {
		if (!locals.userData?.username) return invalid(403, { message: 'try again' });
		const {id} = locals.userData;
		try {
			const formData = request.formData();
			const postData = JSON.parse((await formData).get('postData') as string);
			const uid = uuid();
			const base64 = uuidToBase64(uid);
			{
				const response = await prisma.post.create({
					data: {
						id: uuid(),
						title: postData.title,
						authorId: id,
						slug: `${'draft'}-${base64}`,
						content: STANDARD_BLOCKS_DATA,
						isDraft: true
					}
				});
				return { success: true, isDraft: true, id: response.id, slug: response.slug };
			}
		} catch (error) {
			console.log('err', error);
		}
	},
	updatePost: async ({ request, locals }) => {

		if (!locals.userData?.username) return invalid(403, { message: 'try again' });
		const {id} = locals.userData;
		try {
			const formData = request.formData();
			const postData = JSON.parse((await formData).get('postData') as string);
			const uid = uuid();
			const base64 = uuidToBase64(uid);
			if (postData) {
				await prisma.postGroceries.deleteMany({
					where: {
						postId: postData.postId
					}
				});
      			await prisma.postGroceries.createMany({
					data: [
						...postData.postGroceries.map((el):GroceriesForPostType => ({
							groceryId: +el.id,
							postId: postData.postId,
							quantity: el.quantity,
							quantityUnit: el.quantityUnit,
							neededQuantity: el.neededQuantity,
							neededQuantityUnit: el.neededQuantityUnit
						}))
					]
				});
				const postGroceriesResponse = await prisma.postGroceries.findMany({
					where: {
						postId: postData.postId
					}
				});

				const normalizedTitle = postData.title.toLowerCase().split(' ').join('-');
			 
				const response = await prisma.post.upsert({
					where: {
						id: postData.postId
					},
					update: {
						title: postData.title,
						content: JSON.parse(postData?.content as string),
						slug: `${normalizedTitle}-${base64}`,
						postGroceries: {
							connect: [...postGroceriesResponse.map((el) => ({ id: el.id }))]
						},
						isDraft: postData.isDraft,
						imageSrc:postData.uploadedImage,
						description:postData.description
					},
					create: {
						id: uuid(),
						title: postData.title,
						authorId: id,
						slug: `${normalizedTitle}-${base64}`,
						content: JSON.parse(postData?.content as string),
						postGroceries: {
							connect: [...postGroceriesResponse.map((el) => ({ id: el.id }))]
						},
						isDraft: postData.isDraft,
						imageSrc:postData.uploadedImage,
						description:postData.description
					}
				});
				return { success: true, isDraft: response.isDraft, slug: response.slug };
			}
		} catch (error) {
			console.log('err', error);
			return { success: false, message:'Please fill all the fields!' };
		}
	}
};
