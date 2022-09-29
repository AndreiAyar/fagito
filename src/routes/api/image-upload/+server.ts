/* eslint-disable @typescript-eslint/ban-ts-comment */
import { error, type RequestHandler } from '@sveltejs/kit';
export const POST: RequestHandler = async ({ request, locals }) => {
	if (!locals.userData) {
		throw error(403, 'Forbidden!');
	}
	try {
		const formData = await request.formData();
		const file = formData.get('image') as File;
		console.log('file from api', file.stream());
		const myHeaders = new Headers();
		myHeaders.append('Content-Type', 'image/jpeg');
		myHeaders.append('Authorization', 'Bearer public_FW25av7a1N6cPLgUdHdUEZuikXZw');
		const stream = file.stream();
		const response = await fetch('https://api.upload.io/v1/files/basic', {
			method: 'POST',
			headers: myHeaders,
			// @ts-expect-error
			body: stream,
			redirect: 'follow'
		});
		const data = await response.json();

		return new Response(JSON.stringify({ success: 1, file: { url: data.fileUrl } }));
	} catch (error) {
		return new Response(JSON.stringify(error));
	}
	
};
