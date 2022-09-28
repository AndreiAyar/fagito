import type { Handle } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';
import { generateTokens } from './lib/utils';
const { TokenExpiredError } = jwt;
import { env } from '$env/dynamic/private';
const SECRET = env.JWT_SECRET;
type JwtPayload = {
	email: string;
	username:string;
};

export const handle: Handle = async ({ event, resolve }) => {
	const userToken = event.cookies.get('token');
	const refreshToken = event.cookies.get('refreshToken');
	event.setHeaders({
		'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0'
	});
	const handleTokensRefresh = async (oldRefreshToken: string) => {
		try {
			if (oldRefreshToken) {
				const currentUser = jwt.verify(oldRefreshToken, SECRET) as JwtPayload;
				const { refreshToken, token } = generateTokens({email: currentUser.email, username:currentUser.username});
				// event.locals.user = currentUser.user;
				event.cookies.set('token', token, {
					// send cookie for every page
					path: '/',
					// server side only cookie so you can't use `document.cookie`
					httpOnly: true,
					// only requests from same site can send cookies
					// https://developer.mozilla.org/en-US/docs/Glossary/CSRF
					sameSite: 'strict',
					// only sent over HTTPS in production
					secure: process.env.NODE_ENV === 'production',
					// set cookie to expire after a 15 min
					maxAge: 86400
				});
				event.cookies.set('refreshToken', refreshToken, {
					// send cookie for every page
					path: '/',
					// server side only cookie so you can't use `document.cookie`
					httpOnly: true,
					// only requests from same site can send cookies
					// https://developer.mozilla.org/en-US/docs/Glossary/CSRF
					sameSite: 'strict',
					// only sent over HTTPS in production
					secure: process.env.NODE_ENV === 'production',
					// set cookie to expire after a month
					maxAge: 60 * 60 * 24 * 30
				});

				event.locals.userData = { ...event.locals.userData, email: currentUser.email, username:currentUser.username };
			}
		} catch (error) {
			event.cookies.set('token', '', {
				path: '/',
				expires: new Date(0)
			});
			event.cookies.set('refreshToken', '', {
				path: '/',
				expires: new Date(0)
			});

			if (event.url.pathname !== '/') {
				event.locals.userData = null;
			}
		}
		const response = await resolve(event);
		return response;
	};

	if (userToken && refreshToken) {
		try {
			const isUser = jwt.verify(userToken, SECRET) as JwtPayload;
			event.locals.userData = { ...event.locals.userData, username: isUser.username };
		} catch (err) {
			if (err instanceof TokenExpiredError) {
				const oldRefreshToken = refreshToken;
				return handleTokensRefresh(oldRefreshToken);
			} else {
				event.locals.userData = null;
			}
		}
	}

	const response = await resolve(event);

	return response;


};

