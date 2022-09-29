import prisma from '$root/lib/prisma';
import { error, invalid, redirect, type Actions, type Load } from '@sveltejs/kit';

export const load: Load = async ({ locals, params }) => {
	const {id} = locals.userData
	const slug = params.slug;
	const post = await prisma.post.findUnique({
		where: {
			slug
		},
		include: {
			postGroceries: {
				include: {
					grocery: {
						include: {
							vendor: true
						}
					}
				}
			}
		},

	});
	
	if (!post) return redirect(302, '/');
	post.postGroceries = [
		...post.postGroceries.map((el) => ({
			...el,
			vendorId: el.grocery.vendor.id
		}))
	];
	const updatedResponse = {
		...post,
		totalPrice: post.postGroceries
			.reduce((acc, el) => {
				return +((el.neededQuantity * el.grocery.lastPrice) / el.quantity).toFixed(2) + acc;
			}, 0)
			?.toFixed(2)
	};

	return {
		currentUserAccount:id,
		postAuthor: post?.authorId,
		postId: post?.id,
		...updatedResponse
	};

};

export const actions: Actions = {
	editPost: async ({ request, locals }) => {
		if (!locals.userData?.username) return invalid(403, { message: 'try again' });
		const {id} = locals.userData
		const formData = request.formData();
		const postId = (await formData).get('postId') as string;
		const authorId = (await formData).get('authorId') as string;
		if(+authorId !== id) throw error(403, 'Forbidden!');
 
		try {
			const hasAnyDrafts = await prisma.post.findFirst({ where: { isDraft: true, authorId:id} });
			if (hasAnyDrafts) {
				return { success: false, message: 'Please edit your existing draft first!' };
			}
			await prisma.post.updateMany({
				where: {
					authorId:id,
					id: postId
				},
				data: {
					isDraft: true
				}
			});
			return { success: true };
		} catch (error) {
			console.log('err', error);
		}
	}
};
