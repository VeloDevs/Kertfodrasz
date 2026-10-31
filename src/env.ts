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
	PUBLIC_UMAMI_URL: {
		public: true,
		schema: (value: string | undefined) => {
			if (!value) return '';
			const url = new URL(value);
			if (
				url.protocol !== 'https:' ||
				url.username ||
				url.password ||
				url.pathname !== '/' ||
				url.search ||
				url.hash
			)
				throw new Error('Umami URL must be an HTTPS origin without credentials');
			return url.origin;
		}
	},
	PUBLIC_UMAMI_WEBSITE_ID: {
		public: true,
		schema: (value: string | undefined) => {
			if (!value) return '';
			if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value)) {
				throw new Error('Umami website ID must be a UUID');
			}
			return value;
		}
	},
	PUBLIC_UMAMI_DOMAINS: { public: true, schema: (value: string | undefined) => value || '' },
	NO_INDEX: { schema: (value: string | undefined) => value === 'true' }
});
