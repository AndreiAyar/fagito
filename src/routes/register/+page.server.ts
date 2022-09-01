import prisma from '../../lib/prisma';
import type { Action, Load } from '@sveltejs/kit';
import { validateEmail } from '$lib/utils';
export const load: Load = async () => {
	const data = await prisma.user.findMany();
	//console.log('data', data);
	return {
		users: data
	};
};

export const POST: Action<{ errors: string }> = async ({ request }) => {
	const form = await request.formData();

	const username = String(form.get('username'));
	const email = String(form.get('email'));
	const password = String(form.get('password'));
	const repeatPassword = String(form.get('password-repeat'));
	if (!username || username.length === 0 || username.length < 4) {
		return {
			status: 403,
			errors: {
				accountCreator: 'Please enter a username of at least 4 characters'
			}
		};
	}

	if (!validateEmail(email) || email.length === 0) {
		return {
			status: 403,
			errors: {
				accountCreator: 'Invalid email'
			}
		};
	}

	if (!password || password.length < 6) {
		return {
			status: 403,
			errors: {
				accountCreator: 'Please enter a password of at least 6 characters.'
			}
		};
	}

	if (!repeatPassword || repeatPassword !== password) {
		return {
			status: 403,
			errors: {
				accountCreator: 'Passwords do not match.'
			}
		};
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
	} catch (error) {
		return {
			status: 403,
			errors: {
				accountCreator: 'Email is already taken'
			}
		};
	}
};
