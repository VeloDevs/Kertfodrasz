import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const response = await resolve(event);

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
