import { redirect, type RequestHandler } from '@sveltejs/kit'

export const GET: RequestHandler = ({ cookies }) => {
	cookies.delete('token')
    cookies.delete('refreshToken')
	throw redirect(303, '/')
}