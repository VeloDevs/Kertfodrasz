import tailwindcss from '@tailwindcss/vite';
import adapter from '@sveltejs/adapter-node';
import { sveltekit, type Config } from '@sveltejs/kit/vite';
import { defineConfig, loadEnv } from 'vite';

type CspSource = NonNullable<
	NonNullable<NonNullable<Config['csp']>['reportOnly']>['connect-src']
>[number];

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');
	const backendOrigin = new URL(
		env.PUBLIC_BACKEND_URL || env.BACKEND_URL || 'http://127.0.0.1:8000'
	).origin as CspSource;

	return {
		plugins: [
			tailwindcss(),
			sveltekit({
				adapter: adapter(),
				csp: {
					mode: 'auto',
					// Observe violations while the site is still being developed.
					reportOnly: {
						'default-src': ['self'],
						'script-src': ['self'],
						// Svelte transitions and the app template use inline styles.
						'style-src': ['self', 'unsafe-inline', 'https://fonts.googleapis.com'],
						'font-src': ['self', 'https://fonts.gstatic.com'],
						'img-src': ['self', 'data:', backendOrigin, 'https://www.google.com'],
						'connect-src': ['self', backendOrigin],
						'object-src': ['none'],
						'base-uri': ['self'],
						'frame-ancestors': ['self'],
						'frame-src': ['none'],
						'form-action': ['self', backendOrigin],
						'report-uri': ['/csp-report']
					}
				}
			})
		]
	};
});
