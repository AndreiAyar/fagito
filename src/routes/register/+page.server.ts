import prisma from '../../lib/prisma';
import { invalid, redirect, type Actions, type Load } from '@sveltejs/kit';
import { validateEmail } from './utils/index';
export const load: Load = async () => {
	throw redirect(302,'/')
	const data = await prisma.user.findMany();
	return {
		users: data
	};
};

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await request.formData();

		const username = String(form.get('username'));
		const email = String(form.get('email'));
		const password = String(form.get('password'));
		const repeatPassword = String(form.get('password-repeat'));
		if (!username || username.length === 0 || username.length < 4) {
 
			return invalid(400, {
				username,
				email,
				password,
				repeatPassword,
				incorrect: true,
				message: 'Please enter a username of at least 4 characters'
			});
		}

		if (!validateEmail(email) || email.length === 0) {
			return invalid(400, {
				username,
				email,
				password,
				repeatPassword,
				incorrect: true,
				message: 'Invalid email'
			});
		}

		if (!password || password.length < 6) {
			return invalid(400, {
				email,
				username,
				password,
				repeatPassword,
				incorrect: true,
				message: 'Please enter a password of at least 6 characters.'
			});
		}

		if (!repeatPassword || repeatPassword !== password) {
			return invalid(400, {
				email,
				username,
				password,
				repeatPassword,
				incorrect: true,
				message: 'Passwords do not match.'
			});
		}

		try {
			await prisma.user.create({
				data: {
					username,
					email,
					password,
					repeatPassword
				}
			});
			return { success: true };
		} catch (error) {
			return invalid(403, {
				username,
				email,
				password,
				repeatPassword,
				incorrect:true,
				message: 'Email is already taken'
			});
		}
	}
};


