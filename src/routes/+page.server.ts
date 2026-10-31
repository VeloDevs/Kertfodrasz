import * as env from '$app/env/private';
import { publicMediaUrls } from '#lib/server/public-media.js';
import type { ServiceImages } from '#lib/types/service-image.js';
import type { PageHero } from '#lib/types/hero.js';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const backendUrl = (env.BACKEND_URL || 'http://127.0.0.1:8000').replace(/\/$/, '');

	try {
		const response = await globalThis.fetch(`${backendUrl}/api/home`, {
			headers: { accept: 'application/json' },
			credentials: 'omit',
			redirect: 'error',
			signal: AbortSignal.timeout(5000)
		});
		if (response.ok) {
			const payload = publicMediaUrls(
				(await response.json()) as {
					hero?: PageHero | null;
					services?: ServiceImages;
				},
				backendUrl,
				''
			);
			return { hero: payload.hero ?? null, services: payload.services ?? ({} as ServiceImages) };
		}
	} catch {
		// The home page stays available without a hero image if the API is offline.
	}

	return { hero: null, services: {} as ServiceImages };
};
