import prisma from '../../lib/prisma';
import { invalid, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { generateTokens } from '$root/lib/utils';
 
export const load: PageServerLoad = async ({ locals }) => {
	if (locals.userData) {
		throw redirect(302, '/account');
	}
};

export const actions: Actions = {
	default: async ({ request, cookies }) => {
 
		const formData = await request.formData();

		const email = String(formData.get('email'));
		const password = String(formData.get('password'));
		try {
			const user = await prisma.user.findUnique({
				where: {
					email
				}
			});
			if (!user) {
				return invalid(403, { missing: true, message: 'Wrong username or password.' });
			}
			if (!password || password.length < 6) {
				return invalid(403, {
					email,
					incorrect: true,
					message: "Password can't be shorter than 6 characters."
				});
			}

			if (user.password !== password) {
				return invalid(403, { email, incorrect: true, message: 'Wrong username or password.' });
			}

			const { token, refreshToken } = generateTokens({ email: user.email, username:user.username, id:user.id });

			cookies.set('token', token, {
				// send cookie for every page
				path: '/',
				httpOnly: true,
				sameSite: 'strict',
				secure: process.env.NODE_ENV === 'production',
				maxAge: 86400
			});
			cookies.set('refreshToken', refreshToken, {
				path: '/',
				httpOnly: true,
				sameSite: 'strict',
				secure: process.env.NODE_ENV === 'production',
				// set cookie to expire after a month
				maxAge: 60 * 60 * 24 * 30
			});

			return { status: 300, location: '/' };
		} catch (error) {
		 console.log('err', error);
			return invalid(403, { email, password, message: 'Something went wrong!' });
		}
	}
};
