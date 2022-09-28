import { error, type RequestHandler } from '@sveltejs/kit';
import AWS from 'aws-sdk';
import * as fs from 'fs';
const s3 = new AWS.S3({
	accessKeyId: 'AKIA3NSCJNVZENGPNEPN',
	secretAccessKey: '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'
});
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
			body: stream,
			redirect: 'follow'
		});
		const data = await response.json();

		return new Response(JSON.stringify({ success: 1, file: { url: data.fileUrl } }));
	} catch (error) {
		console.log('err from image', error);
	}
};
