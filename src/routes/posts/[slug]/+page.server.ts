import prisma from '$root/lib/prisma';
import { invalid, redirect, type Actions, type Load } from '@sveltejs/kit';

export const load: Load = async ({ params }) => {
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
		}
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
		postAuthor: post?.authorId,
		postId: post?.id,
		...updatedResponse
	};

	//throw error(404, 'Not found');
};

export const actions: Actions = {
	editPost: async ({ request, locals }) => {
		if (!locals.userData?.username) return invalid(403, { message: 'try again' });
		const formData = request.formData();
		const postId = (await formData).get('postId') as string;
		try {
			const hasAnyDrafts = await prisma.post.findFirst({ where: { isDraft: true } });
			if (hasAnyDrafts) {
				return { success: false, message: 'Please edit your existing draft first!' };
			}
			await prisma.post.updateMany({
				where: {
					authorId: 1,
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
