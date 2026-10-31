import type { RequestHandler } from './$types';
import * as env from '$app/env/private';
import { relayContact } from '#lib/server/contact-proxy.js';

export const POST: RequestHandler = async ({ request, url, getClientAddress }) => {
	let clientAddress: string;
	try {
		clientAddress = getClientAddress();
	} catch {
		return Response.json(
			{ message: 'Az üzenetküldés átmenetileg nem érhető el.' },
			{ status: 503 }
		);
	}
	return relayContact(request, {
		origin: url.origin,
		clientAddress,
		backendUrl: env.BACKEND_URL,
		secret: env.CONTACT_PROXY_SECRET
	});
};
