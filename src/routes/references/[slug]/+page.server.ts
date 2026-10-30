import { fetchReferenceApi } from '#lib/server/reference-api.js';
import type { ReferenceDetailResponse } from '#lib/types/reference.js';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, params }) => {
	const payload = await fetchReferenceApi<ReferenceDetailResponse>(
		fetch,
		`/api/references/${encodeURIComponent(params.slug)}`,
		'Nem sikerült betölteni a kiválasztott albumot.'
	);
	return {
		...payload,
		seo: {
			title: `${payload.album.title} | Referenciák | Kertfodrász`,
			description: payload.album.description || 'Referenciák a Kertfodrász oldalán.',
			image: payload.album.images[0]?.imageUrl
		}
	};
};
