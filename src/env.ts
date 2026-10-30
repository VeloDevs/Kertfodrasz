import { defineEnvVars } from '@sveltejs/kit/env';

function backendUrl(value: string | undefined): string {
	const url = new URL(value || 'http://127.0.0.1:8000');
	if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password) {
		throw new Error('Backend URL must use HTTP(S) without embedded credentials');
	}
	return url.href.replace(/\/$/, '');
}

export const variables = defineEnvVars({
	BACKEND_URL: { schema: backendUrl },
	PUBLIC_BACKEND_URL: { public: true, schema: backendUrl },
	NO_INDEX: { schema: (value: string | undefined) => value === 'true' }
});
