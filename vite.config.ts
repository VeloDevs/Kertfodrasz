import tailwindcss from '@tailwindcss/vite';
import adapter from '@sveltejs/adapter-node';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig(() => {
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
						'img-src': ['self', 'data:', 'https://www.google.com'],
						'connect-src': ['self'],
						'object-src': ['none'],
						'base-uri': ['self'],
						'frame-ancestors': ['self'],
						'frame-src': ['none'],
						'form-action': ['self'],
						'report-uri': ['/csp-report']
					}
				}
			})
		]
	};
});
