import type { Handle } from '@sveltejs/kit/hooks';
import { dev } from '$app/env';
import * as env from '$app/env/private';

export const handle: Handle = async ({ event, resolve }) => {
	const response = await resolve(event);
	if (env.NO_INDEX) {
		response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
	}
	// Permit this dev server's HMR connection without allowing arbitrary websockets.
	const policy = response.headers.get('Content-Security-Policy-Report-Only');
	if (dev && policy) {
		const socket = new URL(event.url.origin);
		socket.protocol = socket.protocol === 'https:' ? 'wss:' : 'ws:';
		response.headers.set(
			'Content-Security-Policy-Report-Only',
			policy.replace(/connect-src ([^;]+)/, `connect-src $1 ${socket.origin}`)
		);
	}

	// Security Headers
	response.headers.set('X-Content-Type-Options', 'nosniff');
	response.headers.set('X-Frame-Options', 'SAMEORIGIN');
	response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
	response.headers.set(
		'Permissions-Policy',
		'camera=(), microphone=(), geolocation=(), payment=(), usb=()'
	);

	// Agent & Protocol Discovery Link Headers
	const origin = event.url.origin;
	response.headers.set(
		'Link',
		`<${origin}/llms.txt>; rel="llms-txt", <${origin}/sitemap.xml>; rel="sitemap", <${origin}/rss.xml>; rel="alternate"; type="application/rss+xml"`
	);

	return response;
};
